# api/serializers.py
from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    """Category моделін JSON-ға айналдыратын Serializer"""
    
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    """Product моделін JSON-ға айналдыратын Serializer"""
    
    # Қосымша: категорияның атын да көрсету
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'price', 'description', 
            'count', 'is_active', 'category', 'category_name'
        ]