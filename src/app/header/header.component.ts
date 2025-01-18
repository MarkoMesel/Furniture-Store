import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AddProductComponent } from "../add-product/add-product.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatIconModule, AddProductComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isFormVisible = false;

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
}
