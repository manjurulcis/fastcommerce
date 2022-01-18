from django.urls import path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('addresses', views.AddressViewSet, base_name='addresses')

urlpatterns = [
    path('', views.UserView.as_view(), name='user'),
    path('favorites-products/',
         views.FavoritesProductsView.as_view(), name='favorites-products'),
    path('favorites-products/update/<int:id>/',
         views.UpdateFavoritesProductsView.as_view(), name='update-favorites-products'),
]

urlpatterns += router.urls
