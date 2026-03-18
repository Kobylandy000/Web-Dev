import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  images: string[];
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Apple iPhone 14 Pro Max',
      description: '128GB, Deep Purple, 6.7" Super Retina XDR display',
      price: 649990,
      rating: 4.8,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/h7d/h2e/64569372475422.jpg',
      images: [
        'https://resources.cdn-kaspi.kz/img/m/p/h7d/h2e/64569372475422.jpg',
        'https://resources.cdn-kaspi.kz/img/m/p/hf4/h5a/64569372639262.jpg'
      ],
      link: 'https://kaspi.kz/shop/p/apple-iphone-14-pro-max-128gb-fioletovyi-106363342/'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23 Ultra',
      description: '256GB, Phantom Black, 6.8" Dynamic AMOLED 2X',
      price: 549990,
      rating: 4.7,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/hf4/h5a/64569372639262.jpg',
      images: [
        'https://resources.cdn-kaspi.kz/img/m/p/hf4/h5a/64569372639262.jpg',
        'https://resources.cdn-kaspi.kz/img/m/p/h7d/h2e/64569372475422.jpg'
      ],
      link: 'https://kaspi.kz/shop/p/samsung-galaxy-s23-ultra-256gb-chernyi-107599785/'
    }
  ];

  getProducts() {
    return this.products;
  }
}