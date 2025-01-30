import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { ProductService } from '../product.service';
import { Product } from '../../types';
import { AddProductComponent } from "../add-product/add-product.component";
import { ToggleService } from '../toggle.service';
import { DeleteProductComponent } from "../delete-product/delete-product.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, AddProductComponent, DeleteProductComponent],
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
  isAddOrEditVisible = false;
  isEditForm = false;
  isDeleteVisible = false;
  
  products: Product[] = [];

  ngOnInit() {
    this.toggleService.addOrEditVisible$.subscribe(
      (visible) => (this.isAddOrEditVisible = visible)
    )
    this.toggleService.isEditProductForm$.subscribe(
      (isEditForm) => (this.isEditForm = isEditForm)
    )
    this.fetchProducts();
  }

  showFormForEdit(product: Product) {
    this.selectedProduct = product;
    this.toggleService.toggleAddOrEditProductVisible(true);
    this.toggleService.toggleIsEditProduct(true);
  }

  showFormForDelete(product: Product) {
    this.selectedProduct = product;
    this.isDeleteVisible = true;
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
    this.hideAddOrEditForm();
  }

  onDeleteSubmit() {
    if(!this.selectedProduct.id) {
      return;
    }
    
    this.deleteProduct(this.selectedProduct.id);
    this.hideDeleteForm();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(`http://localhost:3000/products/${id}`).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
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

  hideAddOrEditForm() {
    this.toggleService.toggleAddOrEditProductVisible(false);
  }

  hideDeleteForm() {
    this.isDeleteVisible = false;
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
