from rest_framework import serializers

from .models import CartItem, Cart
from products.serializers import ProductListSerializer, SizeSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    size = SizeSerializer(read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = '__all__'
        read_only_fields = ('cart',)

    def get_total_price(self, obj):
        return obj.total_price


class AddItemToCartSerializer(serializers.ModelSerializer):
    cart_items_count = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ('product', 'size', 'cart_items_count')

    def validate_size(self, size):
        if size.available == False:
            raise serializers.ValidationError("Size is not available.")
        return size

    def create(self, validated_data):
        user = self.context.get('request').user
        product = validated_data.get('product')
        size = validated_data.get('size')
        cart, _ = Cart.objects.get_or_create(user=user, ordered=False)
        cart_item = CartItem.objects.filter(
            cart=cart, product=product, size=size)
        if cart_item.exists():
            cart_item = cart_item.first()
            if size.available_count > cart_item.quantity:
                cart_item.quantity += 1
                cart_item.save()
            return cart_item
        cart_item = CartItem.objects.create(
            cart=cart, product=product, size=size)
        cart.items.add(cart_item)
        return cart_item

    def get_cart_items_count(self, obj):
        user = self.context.get('request').user
        return user.carts.get(ordered=False).items.count()


class CartSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    total_customer_profit = serializers.SerializerMethodField()
    items_count = serializers.SerializerMethodField()
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = '__all__'

    def get_total_price(self, obj):
        return obj.total_price

    def get_items_count(self, obj):
        return obj.items_count

    def get_total_customer_profit(self, obj):
        return obj.total_customer_profit
