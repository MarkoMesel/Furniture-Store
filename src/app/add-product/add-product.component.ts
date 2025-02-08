import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Product } from '../../types';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  CommonModule,
  MatCheckboxModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  @Input() product: Product = {
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
  @Input() submitButtonText: string = 'Add Product';
  @Output() closeForm = new EventEmitter<void>();
  @Output() submit = new EventEmitter<Product>();

  addProductForm!: FormGroup;
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.cdr.markForCheck();
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      category: [''],
      image: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      dimensions: this.fb.group({
        width: ['', [Validators.required, Validators.min(0)]],
        height: ['', [Validators.required, Validators.min(0)]],
        depth: ['', [Validators.required, Validators.min(0)]],
      }),
      material: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(0)]],
      warranty: ['', Validators.required],
      isFeatured: [false]
    });
    

    setTimeout(() => {
      this.cdr.detectChanges();
    });
    
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      this.submit.emit(this.product);
      console.log('Product Data:', this.addProductForm.value);
    }
  }
}
