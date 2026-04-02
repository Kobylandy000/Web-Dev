# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Router жасау
router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)  # /api/categories/
router.register(r'products', views.ProductViewSet)     # /api/products/

urlpatterns = [
    path('', include(router.urls)),  # Барлық маршруттарды қосу
]