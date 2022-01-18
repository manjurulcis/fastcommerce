from django.contrib import admin

from .models import Address, FavoritesProducts


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ('id', 'user', 'reciver_full_name',
                    'address', 'postal_code', 'created_at')
    list_display_links = ('id', 'user')
    list_filter = ('user', 'state', 'city')
    list_per_page = 25
    search_fields = (
        'user__phone_number', 'user__email',
        'reciver_full_name', 'reciver_phone_number', 'state', 'city',
        'postal_address', 'postal_code'
    )
    readonly_fields = ('reciver_full_name', 'reciver_phone_number',
                       'state', 'city', 'postal_address', 'postal_code')

    def address(self, obj):
        return f"{obj.state}, {obj.city}, {obj.postal_address}"


@admin.register(FavoritesProducts)
class FavoritesProductsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'products_count')
    list_display_links = ('id', 'user')
    list_filter = ('products__title',)
    list_per_page = 25
    search_fields = (
        'user__phone_number', 'user__email', 'products__title'
    )
