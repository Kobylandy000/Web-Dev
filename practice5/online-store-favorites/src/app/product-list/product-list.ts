import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';  // Қосу керек
import { ProductItem } from '../product-item/product-item';  // ProductItem импорт
import { Product } from '../app';

@Component({
  selector: 'app-product-list',
  standalone: true,  // ҚОСУ КЕРЕК!
  imports: [CommonModule, ProductItem],  // ProductItem-ді ҚОСУ КЕРЕК!
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList {
  @Input() products: Product[] = [];
  @Input() title: string = 'Өнімдер тізімі';
  @Input() showEmptyMessage: boolean = true;
  @Output() toggleFavorite = new EventEmitter<number>();
}