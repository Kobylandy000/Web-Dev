import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() like = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  
  currentImageIndex = 0;

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

  // Like батырмасы
  onLike() {
    this.like.emit(this.product.id);
  }

  // Delete батырмасы
  onDelete() {
    if (confirm('Өнімді жойғыңыз келе ме?')) {
      this.delete.emit(this.product.id);
    }
  }

  // Суреттерді ауыстыру
  nextImage() {
    if (this.currentImageIndex < this.product.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }
}