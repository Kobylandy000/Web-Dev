# Level 6 active - ViewSets
from .viewsets import ProductViewSet, CategoryViewSet
from .generics import (
    ProductListAPIView,
    ProductDetailAPIView,
    CategoryListAPIView,
    CategoryDetailAPIView,
    CategoryProductsAPIView
)

# Level 5 қосу үшін (егер Level 5-ке ауысқыңыз келсе):
# from .generics import *

# Level 4 қосу үшін:
# from .mixins import ProductListAPIView, ProductDetailAPIView

# Level 3 қосу үшін:
# from .cbv import ProductListAPIView, ProductDetailAPIView

# Level 2 қосу үшін:
# from .fbv import products_list as ProductListAPIView, product_detail as ProductDetailAPIView