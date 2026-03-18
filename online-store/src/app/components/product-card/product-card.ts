import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() product!: Product;
  
  // Бірінші суретті алу
  getMainImage(): string {
    return this.product?.images?.[0] || '';
  }

  // Рейтинг жұлдызшалары
  getStars(rating: number): number[] {
    return [1, 2, 3, 4, 5];
  }

  isStarFilled(star: number, rating: number): boolean {
    return star <= Math.round(rating);
  }

  // WhatsApp сілтемесі
  getWhatsAppLink(): string {
    const text = `Мына өнімді қараңыз: ${this.product?.name} - ${this.product?.link}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }

  // Telegram сілтемесі
  getTelegramLink(): string {
    const url = encodeURIComponent(this.product?.link || '');
    const text = encodeURIComponent(this.product?.name || '');
    return `https://t.me/share/url?url=${url}&text=${text}`;
  }
}