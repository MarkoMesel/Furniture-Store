import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-product',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent {
    @Output() closeForm = new EventEmitter<void>();
    @Output() submit = new EventEmitter<void>();

    onSubmit() {
      this.submit.emit();
    }
}
