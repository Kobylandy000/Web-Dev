# api/admin.py
from django.contrib import admin
from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Category моделін admin-да көрсету"""
    list_display = ['id', 'name']
    list_display_links = ['id', 'name']
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """Product моделін admin-да көрсету"""
    list_display = ['id', 'name', 'price', 'count', 'is_active', 'category']
    list_display_links = ['id', 'name']
    list_filter = ['is_active', 'category']
    search_fields = ['name', 'description']
    list_editable = ['price', 'count', 'is_active']