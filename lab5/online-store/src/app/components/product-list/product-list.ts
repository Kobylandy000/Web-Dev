import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList {
  @Input() products: Product[] = [];
  @Input() categoryName: string = '';
  @Output() likeProduct = new EventEmitter<number>();
  @Output() deleteProduct = new EventEmitter<number>();

  onLike(productId: number) {
    this.likeProduct.emit(productId);
  }

  onDelete(productId: number) {
    this.deleteProduct.emit(productId);
  }

  trackById(index: number, item: Product): number {
    return item.id;
  }
}