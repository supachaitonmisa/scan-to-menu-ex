import { Injectable, signal, computed } from '@angular/core';

export interface MenuItem {
  id: number; name: string; price: number; category: string; image: string; description: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  // ใน MenuService
  categories = signal(['ทั้งหมด', 'ก๋วยเตี๋ยว', 'เกาเหลา', 'ข้าว', 'ของทานเล่น', 'เครื่องดื่ม']);
  selectedCategory = signal('ทั้งหมด');

  menus = signal<MenuItem[]>([
    // --- ก๋วยเตี๋ยว (Noodles) ---
    { id: 1, name: 'เล็กต้มยำแคปหมูโบราณ', price: 65, category: 'ก๋วยเตี๋ยว', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600', description: 'ต้มยำมะนาวสดแท้ โรยแคปหมูกรอบๆ' },
    { id: 2, name: 'บะหมี่ต้มยำไข่ตูม', price: 75, category: 'ก๋วยเตี๋ยว', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600', description: 'บะหมี่เป๊าะพร้อมไข่ยางมะตูมเยิ้มๆ' },
    { id: 3, name: 'เส้นใหญ่ต้มยำแห้ง', price: 65, category: 'ก๋วยเตี๋ยว', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600', description: 'ต้มยำแห้งขลุกขลิก เน้นถั่วคั่วใหม่' },
    { id: 4, name: 'วุ้นเส้นต้มยำทะเล', price: 95, category: 'ก๋วยเตี๋ยว', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600', description: 'เครื่องทะเลสดๆ ในน้ำซุปสุดแซ่บ' },
    { id: 5, name: 'บะหมี่ต้มยำหมูกรอบ', price: 85, category: 'ก๋วยเตี๋ยว', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600', description: 'บะหมี่ไข่เส้นนุ่มกับหมูกรอบชิ้นโต' },
    { id: 6, name: 'เล็กเย็นตาโฟต้มยำ', price: 70, category: 'ก๋วยเตี๋ยว', image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600', description: 'เย็นตาโฟรสเด็ด ปรุงยำมะนาวสด' },
    { id: 7, name: 'เส้นปลาต้มยำ', price: 85, category: 'ก๋วยเตี๋ยว', image: 'https://images.unsplash.com/photo-1644704170910-a0cdf183649b?auto=format&fit=crop&w=600', description: 'เส้นปลาแท้ 100% ไม่ผสมแป้ง' },
    { id: 8, name: 'หมี่ขาวต้มยำรวมมิตร', price: 75, category: 'ก๋วยเตี๋ยว', image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=600', description: 'ใส่ทุกอย่าง หมูสับ ลูกชิ้น ตับ' },
    { id: 9, name: 'มาม่าต้มยำทรงเครื่อง', price: 65, category: 'ก๋วยเตี๋ยว', image: 'https://images.unsplash.com/photo-1569058242253-92a9c71f9867?auto=format&fit=crop&w=600', description: 'เส้นมาม่าลวกกำลังดี คลุกเครื่องยำ' },
    { id: 10, name: 'บะหมี่แห้งยำโบราณ', price: 65, category: 'ก๋วยเตี๋ยว', image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&w=600', description: 'หอมน้ำมันกระเทียมเจียวและกากหมู' },

    // --- เกาเหลา (No Noodles) ---
    { id: 11, name: 'เกาเหลาต้มยำพิเศษ', price: 85, category: 'เกาเหลา', image: 'https://images.unsplash.com/photo-1503764654157-72d979d9af2f?auto=format&fit=crop&w=600', description: 'เน้นเครื่อง ไม่เอาเส้น อิ่มจุกๆ' },
    { id: 12, name: 'ต้มเลือดหมูใบจิงจูฉ่าย', price: 70, category: 'เกาเหลา', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600', description: 'น้ำซุปใส เชงเชง เครื่องในสะอาด' },
    { id: 13, name: 'เกาเหลาโฟยำทะเล', price: 110, category: 'เกาเหลา', image: 'https://images.unsplash.com/photo-1547928576-a4a33237ce35?auto=format&fit=crop&w=600', description: 'กุ้ง หมึก ลูกชิ้นปลา จัดเต็ม' },
    { id: 14, name: 'ลวกจิ้มรวมมิตร', price: 95, category: 'เกาเหลา', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600', description: 'ลวกจิ้มน้ำจิ้มซีฟู้ดรสเด็ด' },
    { id: 15, name: 'ซุปกระดูกหมูอ่อน', price: 50, category: 'เกาเหลา', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600', description: 'ซุปหวานกระดูกหมูแท้ๆ' },

    // --- ข้าว (Rice) ---
    { id: 16, name: 'ข้าวหมูแดงหมูกรอบ', price: 70, category: 'ข้าว', image: 'https://images.unsplash.com/photo-1512058560366-cd242d5930df?auto=format&fit=crop&w=600', description: 'ข้าวสวยร้อนๆ ราดน้ำแดงสูตรเข้มข้น' },
    { id: 17, name: 'ข้าวหน้าต้มยำแห้ง', price: 75, category: 'ข้าว', image: 'https://images.unsplash.com/photo-1541696497-3958a3584517?auto=format&fit=crop&w=600', description: 'เครื่องยำรสจัดจ้านราดบนข้าว' },
    { id: 18, name: 'ข้าวกะเพราหมูกรอบ', price: 80, category: 'ข้าว', image: 'https://images.unsplash.com/photo-1562607349-590ca5544565?auto=format&fit=crop&w=600', description: 'กะเพราแท้ เผ็ดร้อน หมูกรอบกรุบ' },
    { id: 19, name: 'ข้าวไข่ข้นกุ้ง', price: 85, category: 'ข้าว', image: 'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?auto=format&fit=crop&w=600', description: 'ไข่นุ่มๆ กุ้งเด้งๆ ละลายในปาก' },
    { id: 20, name: 'ข้าวขาหมูคลาวด์', price: 70, category: 'ข้าว', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600', description: 'ขาหมูพะโล้ เนื้อนุ่ม หนังเด้ง' },

    // --- ของทานเล่น (Sides) ---
    { id: 21, name: 'แคปหมูไร้มัน', price: 20, category: 'ของทานเล่น', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600', description: 'กรอบฟู สดใหม่ทุกวัน' },
    { id: 22, name: 'เกี๊ยวกรอบทอด', price: 40, category: 'ของทานเล่น', image: 'https://images.unsplash.com/photo-1541696497-3958a3584517?auto=format&fit=crop&w=600', description: 'เกี๊ยวเหลืองทอง ไส้หมูสับแน่น' },
    { id: 23, name: 'หนังปลากรอบ', price: 30, category: 'ของทานเล่น', image: 'https://images.unsplash.com/photo-1600271772470-bd22a4d788b5?auto=format&fit=crop&w=600', description: 'หนังปลาแซลมอนทอดกรอบ' },
    { id: 24, name: 'ทอดมันปลากราย', price: 60, category: 'ของทานเล่น', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600', description: 'เนื้อปลาเน้นๆ เคี้ยวหนึบ' },
    { id: 25, name: 'ลูกชิ้นปิ้ง (5 ไม้)', price: 60, category: 'ของทานเล่น', image: 'https://images.unsplash.com/photo-1562607349-590ca5544565?auto=format&fit=crop&w=600', description: 'น้ำจิ้มมะขามสูตรเด็ด' },

    // --- เครื่องดื่ม (Drinks) ---
    { id: 26, name: 'น้ำอัญชันมะนาว', price: 35, category: 'เครื่องดื่ม', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600', description: 'เปรี้ยวหวานสดชื่น ดับร้อน' },
    { id: 27, name: 'เก๊กฮวยเย็น', price: 25, category: 'เครื่องดื่ม', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a810?auto=format&fit=crop&w=600', description: 'หอมดอกเก๊กฮวยแท้ หวานน้อย' },
    { id: 28, name: 'ชาดำเย็น', price: 25, category: 'เครื่องดื่ม', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600', description: 'ชาเข้มข้น หอมใบชาแท้' },
    { id: 29, name: 'น้ำกระเจี๊ยบ', price: 25, category: 'เครื่องดื่ม', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a810?auto=format&fit=crop&w=600', description: 'เปรี้ยวอมหวาน ช่วยลดความดัน' },
    { id: 30, name: 'น้ำลำไยเนื้อเน้นๆ', price: 40, category: 'เครื่องดื่ม', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600', description: 'ลำไยอบแห้งต้มจนหอม เนื้อเยอะ' }
  ]);

  // ฟิลเตอร์เมนูตามหมวดหมู่
  filteredMenus = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'ทั้งหมด' ? this.menus() : this.menus().filter(m => m.category === cat);
  });

  favIds = signal<Set<number>>(new Set());
  favorites = computed(() => this.menus().filter(m => this.favIds().has(m.id)));

  toggleFav(id: number) {
    this.favIds.update(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // ระบบตะกร้าสินค้า
  cart = signal<CartItem[]>([]);

  // คำนวณจำนวนชิ้นทั้งหมดในตะกร้า
  totalItems = computed(() => this.cart().reduce((acc, item) => acc + item.quantity, 0));

  // คำนวณราคาทั้งหมด
  totalPrice = computed(() => this.cart().reduce((acc, item) => acc + (item.price * item.quantity), 0));

  addToCart(item: MenuItem) {
    this.cart.update(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  removeFromCart(id: number) {
    this.cart.update(prev => prev.filter(i => i.id !== id));
  }
}