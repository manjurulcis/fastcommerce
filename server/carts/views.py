from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Cart
from .serializers import CartSerializer, CartItemSerializer, AddItemToCartSerializer


class CartView(ModelViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        obj, _ = Cart.objects.get_or_create(user=request.user, ordered=False)
        # Remove unavailable items from cart
        unavailable_items = obj.items.filter(size__available_count__lte=0)
        if unavailable_items.exists():
            unavailable_items.delete()
        serializer = CartSerializer(obj, context={'request': request})
        return Response(serializer.data)

    def get_queryset(self):
        return self.request.user.carts.get(ordered=False).items.all()

    def get_serializer_class(self):
        if self.action == "create":
            return AddItemToCartSerializer
        return CartItemSerializer
