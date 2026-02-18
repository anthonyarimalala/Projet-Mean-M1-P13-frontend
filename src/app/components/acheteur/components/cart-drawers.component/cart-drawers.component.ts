import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from "../../pages/cart.component/cart.component";

@Component({
  selector: 'app-cart-drawers',
  imports: [CommonModule, CartComponent],
  templateUrl: './cart-drawers.component.html',
  styleUrls: ['./cart-drawers.component.css', '../../styles.css'],
})
export class CartDrawersComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  onBackdropClick() {
    this.close.emit();
  }
}
