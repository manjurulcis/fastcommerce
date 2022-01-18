from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND


from accounts.serializers import UserSerializer
from .serializers import AddressSerializer
from .models import Address, FavoritesProducts
from products.models import Product
from products.serializers import ProductListSerializer, ProductDetailSerializer


User = get_user_model()


class UserView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class AddressViewSet(ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Address.objects.all().filter(user=self.request.user)

    def perform_create(self, serailizer):
        serailizer.save(user=self.request.user)


class FavoritesProductsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        qs = get_object_or_404(FavoritesProducts, user=user).products.all()
        products = ProductListSerializer(
            qs, context={'request': request}, many=True).data
        return Response(products)


class UpdateFavoritesProductsView(APIView):
    """Get product then if product in favorites products exists remove from that, 
    else add it to favorites products"""

    permission_classes = (IsAuthenticated,)

    def post(self, request, id):
        user = request.user
        product = get_object_or_404(Product, id=id)
        obj, _ = FavoritesProducts.objects.get_or_create(user=user)
        if obj.products.filter(id=id).exists():
            obj.products.remove(product)
        else:
            obj.products.add(product)
        product = ProductDetailSerializer(
            product, context={'request': request})
        return Response(product.data)
