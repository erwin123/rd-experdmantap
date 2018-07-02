import { Injectable } from '@angular/core';
import { Draweritems } from '../models/draweritems'
import { Banner } from '../models/banner';

@Injectable({
  providedIn: 'root'
})
export class InitialDataService {

  initialItems: Draweritems[] = [
    { name: "1. Internship", icon: "flag", url: "", desc: "“Tak kenal maka tak sayang”. Sebagai Kepala Cabang kita mungkin sulit merabarasakan kesenangan serta kesulitan yang dirasakan Frontliner setiap harinya. Untuk mendalami hal itu, cara yang paling ampuh adalah masuk ke dalam kegiatan Frontliner, on the spot." },
    { name: "2. Zoom The Ground", icon: "alarm-clock", url: "", desc: "“Learning through Observation”. Kenali kekuatan dan area perbaikan cabang Anda, Bangkitkan semangat perubahan seluruh jajaran team Anda hingga menjadi aksi nyata dengan Wake Up Call." },
    { name: "3. Get Heard", icon: "volume-up", url: "", desc: "Libatkan seluruh frontliners dalam penyusunan langkah perbaikan sehingga mereka memiliki sense of belonging yang sama terhadap peningkatan kualitas servis. Put your employee first, customer second and stakeholders third adalah semboyan yang dimiliki oleh Southwest Airlines si juara servis." },
    { name: "4. Walk The Talk", icon: "chat-bubble", url: "", desc: "“A dream becomes a goal when action is taken”. Tunjukkan komitmen Anda dan seluruh anggota team untuk mewujudkan impian menjadi juara servis melalui langkah nyata perubahan setiap harinya." },
    { name: "5. Talk The Walk", icon: "lightbulb", url: "", desc: "“Stop, Think, Observe, Proceed”. Kenali strategi apa yang masih bisa disempurnakan lagi, libatkan pihak lain dalam strategi perubahan  ini bilamana diperlukan." },
    { name: "6. Team Reward", icon: "coin-bag", url: "", desc: "“It’s time for celebration!!!”. Apresiasi sekecil apapun perubahan positif yang telah terjadi, bangun terus semangat team sehingga mereka tidak berhenti sebelum mencapai garis akhir." },
    { name: "7. Stay Tune", icon: "collapse-card", url: "", desc: "“There is always room for improvement”. Perbaikan terus menerus membutuhkan evaluasi yang tepat dan sistematis. Selalu jeli melihat setiap celah untuk perbaikan" },
    // { name: "Info", icon: "info-circle", url: "", desc: "Experd Serve merupakan salah satu Solution yang ditawarkan Experd Consultant dalam membantu peningkatan kualitas layanan. Info lebih lanjut mengenai Experd Consultant silakan kunjungi www.experd.com" }
  ]

  initialBanners: Banner[] = [
    { BannerDesc:"title-7-step", BannerPath:"assets/img/banner-1.webp" },
    { BannerDesc:"title-7-step-1", BannerPath:"assets/img/banner-2.webp" },
    { BannerDesc:"title-7-step-2", BannerPath:"assets/img/banner-3.webp" },
    // { BannerDesc:"title-7-step-3", BannerPath:"assets/img/banner-4.jpeg" },
    // { BannerDesc:"title-7-step-4", BannerPath:"assets/img/banner-5.jpeg" }
  ]

  constructor() {

  }

  getInitialDrawer() {
    return this.initialItems;
  }

  getInitialBanner() {
    return this.initialBanners;
  }
}
