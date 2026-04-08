# api/views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    Category үшін ViewSet
    GET    /api/categories/        - барлық категориялар
    POST   /api/categories/        - жаңа категория
    GET    /api/categories/{id}/   - бір категория
    PUT    /api/categories/{id}/   - категорияны жаңарту
    DELETE /api/categories/{id}/   - категорияны өшіру
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    @action(detail=True, methods=['get'], url_path='products')
    def products(self, request, pk=None):
        """
        GET /api/categories/{id}/products/
        Категориядағы барлық өнімдерді қайтарады
        """
        category = self.get_object()
        products = category.products.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductViewSet(viewsets.ModelViewSet):
    """
    Product үшін ViewSet
    GET    /api/products/        - барлық өнімдер
    POST   /api/products/        - жаңа өнім
    GET    /api/products/{id}/   - бір өнім
    PUT    /api/products/{id}/   - өнімді жаңарту
    DELETE /api/products/{id}/   - өнімді өшіру
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer