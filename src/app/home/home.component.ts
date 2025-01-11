import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts('http://localhost:3000/products', {}).subscribe((products) => {
      console.log(products);
    })
  }

  images = [
    { src: '/images/image1.jpg', alt: 'Image 1' },
    { src: '/images/image2.jpg', alt: 'Image 2' },
    { src: '/images/image3.jpg', alt: 'Image 3' },
    { src: '/images/image4.jpg', alt: 'Image 4' },
    { src: '/images/image5.jpg', alt: 'Image 5' },
    { src: '/images/image6.jpg', alt: 'Image 6' },
    { src: '/images/image7.jpg', alt: 'Image 7' },
    { src: '/images/image8.jpg', alt: 'Image 8' },
    { src: '/images/image9.jpg', alt: 'Image 9' },
    { src: '/images/image10.jpg', alt: 'Image 10' },
    { src: '/images/image11.jpg', alt: 'Image 11' },
    { src: '/images/image12.jpg', alt: 'Image 12' }
  ];
}
