import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductList } from './components/product-list/product-list';
import { ProductService } from './services/product.services'; // .services (көпше) екеніне назар аударыңыз
import { Category } from './models/category.model';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductList],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.categories = this.productService.getCategories();
    console.log('Categories:', this.categories); // Тексеру үшін
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    this.products = this.productService.getProductsByCategory(categoryId);
    console.log('Selected category:', categoryId);
    console.log('Products:', this.products);
  }

  getSelectedCategoryName(): string {
    const category = this.categories.find(c => c.id === this.selectedCategoryId);
    return category ? category.name : '';
  }

  onLike(productId: number) {
    this.productService.likeProduct(productId);
    if (this.selectedCategoryId) {
      this.products = this.productService.getProductsByCategory(this.selectedCategoryId);
    }
  }

  onDelete(productId: number) {
    this.productService.deleteProduct(productId);
    if (this.selectedCategoryId) {
      this.products = this.productService.getProductsByCategory(this.selectedCategoryId);
    }
  }
}