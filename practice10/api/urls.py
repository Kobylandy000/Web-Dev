from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import (
    ProductListAPIView,
    ProductDetailAPIView,
    CategoryListAPIView,
    CategoryDetailAPIView,
    CategoryProductsAPIView,
    ProductViewSet,
    CategoryViewSet
)

# Router for ViewSets (Level 6)
router = DefaultRouter()
router.register(r'v2/products', ProductViewSet, basename='product')
router.register(r'v2/categories', CategoryViewSet, basename='category')

urlpatterns = [
    # Level 2-5 endpoints (original)
    path('products/', ProductListAPIView.as_view(), name='product-list'),
    path('products/<int:product_id>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('categories/<int:category_id>/', CategoryDetailAPIView.as_view(), name='category-detail'),
    path('categories/<int:category_id>/products/', CategoryProductsAPIView.as_view(), name='category-products'),
    
    # Level 6 endpoints (ViewSets with Router)
    path('', include(router.urls)),
]