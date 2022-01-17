from django.contrib import admin

from .models import Product, Size


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ('id', 'title', 'price',
                    'discount_price', 'available', 'active', 'sale_count', 'created_at')
    list_display_links = ('id', 'title')
    list_editable = ('active',)
    list_filter = ('active', 'created_at')
    list_per_page = 25
    search_fields = ('title', 'price', 'description')


@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__', 'size', 'waist_min_size',
                    'height_min_size', 'available_count')
    list_display_links = ('id', '__str__')
    list_editable = ('size', 'waist_min_size',
                     'height_min_size', 'available_count')
    list_filter = ('size', "height_min_size")
    list_per_page = 25
    search_fields = ('size', 'waist_min_size',
                     'height_min_size', "hip_min_size" 'available_count')
