import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItem } from './product-item/product-item';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  isFavorite: boolean;
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductItem],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'online-store-favorites';
  
  // Products in English
  products: Product[] = [
  { id: 1, name: 'MacBook Pro', price: 450000, category: 'Electronics', isFavorite: false,
    imageUrl: 'https://images.satu.kz/239326374_w640_h640_noutbuk-apple-macbook.jpg' },
  { id: 2, name: 'iPhone 15', price: 380000, category: 'Electronics', isFavorite: false,
    imageUrl: 'https://images.satu.kz/239371318_w640_h640_smartfon-apple-iphone.jpg' },
  { id: 3, name: 'Harry Potter Book', price: 4500, category: 'Books', isFavorite: false,
    imageUrl: 'https://resources.cdn-kaspi.kz/img/m/p/h85/hb6/86681936887838.jpg?format=gallery-medium' },
  { id: 4, name: 'Nike T-Shirt', price: 8000, category: 'Clothing', isFavorite: false,
    imageUrl: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/E79345s.jpg?im=Resize,width=750' },
  { id: 5, name: 'Samsung Tablet', price: 150000, category: 'Electronics', isFavorite: false,
    imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/uk/feature/tablets/galaxy-tab-s9/buying-guide-kv-mo.jpg' },
  { id: 6, name: 'The Alchemist', price: 3000, category: 'Books', isFavorite: false,
    imageUrl: 'https://i.ebayimg.com/images/g/R~MAAOSwdv5lVNvb/s-l1600.webp' },
  { id: 7, name: 'Adidas Shoes', price: 25000, category: 'Clothing', isFavorite: false,
    imageUrl: 'https://balleria.com.kz/image/cachewebp/products/2025-11/10851/JI3197PUTGRECGREENGUM3_01_M_2025-04-15T12-03-55.934Z-570x754.webp' },
  { id: 8, name: 'Sony Headphones', price: 35000, category: 'Electronics', isFavorite: false,
    imageUrl: 'https://images.satu.kz/239352900_w640_h640_naushniki-sony-wh-1000xm5.jpg' }
];

  favorites: Product[] = [];

  toggleFavorite(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;
    
    product.isFavorite = !product.isFavorite;
    this.favorites = this.products.filter(p => p.isFavorite);
  }
}