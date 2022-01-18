from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('', views.CartView, base_name='cart')

urlpatterns = router.urls
