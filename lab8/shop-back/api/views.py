from django.http import JsonResponse
from .models import Product, Category


def product_to_dict(p):
    return {
        "id":          p.id,
        "name":        p.name,
        "price":       p.price,
        "description": p.description,
        "count":       p.count,
        "is_active":   p.is_active,
        "category_id": p.category_id,
    }


def category_to_dict(c):
    return {
        "id":   c.id,
        "name": c.name,
    }


# GET /api/products/
def product_list(request):
    products = Product.objects.all()
    data = [product_to_dict(p) for p in products]
    return JsonResponse(data, safe=False)


# GET /api/products/<int:id>/
def product_detail(request, id):
    try:
        product = Product.objects.get(id=id)
        return JsonResponse(product_to_dict(product))
    except Product.DoesNotExist:
        return JsonResponse({"error": "Product not found"}, status=404)


# GET /api/categories/
def category_list(request):
    categories = Category.objects.all()
    data = [category_to_dict(c) for c in categories]
    return JsonResponse(data, safe=False)


# GET /api/categories/<int:id>/
def category_detail(request, id):
    try:
        category = Category.objects.get(id=id)
        return JsonResponse(category_to_dict(category))
    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found"}, status=404)


# GET /api/categories/<int:id>/products/
def category_products(request, id):
    try:
        category = Category.objects.get(id=id)
        products = category.products.all()
        data = [product_to_dict(p) for p in products]
        return JsonResponse(data, safe=False)
    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found"}, status=404)
