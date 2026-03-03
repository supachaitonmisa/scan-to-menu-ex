import { Component, inject, signal } from '@angular/core';
import { MenuService, MenuItem } from './services/menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  service = inject(MenuService);
  
  // 1. เพิ่ม 'cart' เข้าไปใน Type ตรงนี้ (แก้ Error เรื่อง assignable)
  viewState = signal<'menu' | 'detail' | 'fav' | 'cart'>('menu');
  selectedItem = signal<MenuItem | null>(null);

  // 2. ฟังก์ชันเปลี่ยนหน้า (แก้ Error NG9)
  changeState(state: 'menu' | 'detail' | 'fav' | 'cart') {
    this.viewState.set(state);
    window.scrollTo(0, 0);
  }

  openDetail(item: MenuItem) {
    this.selectedItem.set(item);
    this.changeState('detail');
  }

  // 3. ฟังก์ชันหาจำนวนสินค้า (แก้ Error Parser Assignment)
  getItemQty(id: number): number {
    const found = this.service.cart().find(i => i.id === id);
    return found ? found.quantity : 0;
  }
}