from rest_framework import serializers
from django.db.models import F

from .models import Order, ReciverInfo
from carts.models import Cart
from carts.serializers import CartSerializer
from products.models import Product


class ReciverInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReciverInfo
        fields = '__all__'


class OrderListSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    items_count = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ('id', 'created_at', 'total_price', 'code',
                  'items_count', 'shipping_status', 'purchase_invoice')

    def get_total_price(self, obj):
        total_price = 0
        for item in obj.cart.items.all():
            total_price += item.total_price
        return total_price

    def get_items_count(self, obj):
        return obj.cart.items.all().count()


class OrderDetailSerializer(serializers.ModelSerializer):
    cart = CartSerializer()
    reciver = ReciverInfoSerializer()

    class Meta:
        model = Order
        fields = '__all__'


class CreateOrderSerializer(serializers.ModelSerializer):
    reciver = ReciverInfoSerializer()

    class Meta:
        model = Order
        exclude = ('code',)
        read_only_fields = (
            'shipping_status', 'cart', 'user',
            'shipping_method',
        )

    def create(self, data):
        user = self.context.get('request').user
        cart = user.carts.get(ordered=False)
        # Validate cart
        if cart.items.all().exists() == False:
            raise serializers.ValidationError("Cart must not be empty")
        # Update products sale count
        for item in cart.items.all():
            Product.objects.filter(id=item.product.id).update(
                sale_count=F('sale_count') + item.quantity
            )
        # Create reaciver info model
        reciver_info = ReciverInfo.objects.create(**data.get('reciver'))
        # Create order model
        cart.ordered = True
        cart.save()
        order = Order.objects.create(
            user=user, cart=cart, reciver=reciver_info,
            purchase_invoice=data.get('purchase_invoice'), shipping_status="Preparation"
        )
        # Create another cart model with ordered=False
        Cart.objects.create(user=user)
        return order
