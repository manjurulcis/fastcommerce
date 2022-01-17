from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/auth/reset-password/', include('django_rest_passwordreset.urls')),
    path('api/user/', include('profiles.urls')),
    path('api/cart/', include('carts.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/products/', include('products.urls')),
    path('service-worker.js', (TemplateView.as_view(template_name="static/service-worker.js",
                                                    content_type='application/javascript'))),
]

# Media urls
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

urlpatterns.append(
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')))
