import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { ProductService } from '../product.service';
import { Product } from '../../types';
import { AddProductComponent } from "../add-product/add-product.component";
import { ToggleService } from '../toggle.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, AddProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  selectedProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    category: 'Chair',
    image: '',
    stock: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0
    },
    material: '',
    rating: 0,
    warranty: '',
    isFeatured: false
};
  constructor(private productService: ProductService, private toggleService: ToggleService) {}
  isFormVisible = false;
  isEditForm = false;
  
  products: Product[] = [];

  ngOnInit() {
    this.toggleService.addProductVisible$.subscribe(
      (visible) => (this.isFormVisible = visible)
    )
    this.toggleService.isEditProductForm$.subscribe(
      (isEditForm) => (this.isEditForm = isEditForm)
    )
    this.fetchProducts();
  }

  showFormForEdit(product: Product) {
    this.selectedProduct = product;
    this.toggleService.toggleAddProduct(true);
    this.toggleService.toggleIsEditProduct(true);
  }

  fetchProducts() {
    this.productService.getProducts('http://localhost:3000/products', {}).subscribe((products) => {
      this.products = products.items;
      console.log(products.items);
    })
  }

  onFormSubmit(product: Product) {
    if(this.isEditForm)
    {
      if(!this.selectedProduct.id) {
        return;
      }

      this.editProduct(product, this.selectedProduct.id);
    }
    else
    {
      this.addProduct(product);
    }
    this.hideForm();
  }

  editProduct(product: Product, id: number) {
    this.productService.editProduct(`http://localhost:3000/products/${id}`, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  hideForm() {
    this.toggleService.toggleAddProduct(false);
  }

  addProduct(product: Product) {
    this.productService.addProduct(`http://localhost:3000/products`, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
