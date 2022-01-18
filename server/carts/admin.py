from django.contrib import admin

from .models import Cart, CartItem


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ('id', 'user', 'total_price', 'total_customer_profit', 'items_count',
                    'ordered', 'created_at')
    list_display_links = ('id', 'user')
    list_filter = ('ordered', 'created_at')
    list_per_page = 25
    search_fields = ('user__phone_number', 'user__email',
                     'items__product__title')
    readonly_fields = ('ordered',)


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'product', 'size', 'quantity',
                    'total_price', 'total_customer_profit')
    list_display_links = ('id', 'cart')
    list_per_page = 25
    search_fields = ('cart__user__phone_number',
                     'cart__user__email', 'product__title')
    readonly_fields = ('quantity',)
