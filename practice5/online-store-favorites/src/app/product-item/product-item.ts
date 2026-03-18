import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../app';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.css']
})
export class ProductItem {
  @Input() product!: Product;
  @Output() toggleFavorite = new EventEmitter<number>();
  
  onToggleFavorite(): void {
    this.toggleFavorite.emit(this.product.id);
  }

  getProductIcon(category: string): string {
    switch(category) {
      case 'Electronics': return '💻';
      case 'Books': return '📚';
      case 'Clothing': return '👕';
      default: return '📦';
    }
  }
}