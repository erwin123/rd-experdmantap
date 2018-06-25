import { Injectable, EventEmitter } from '@angular/core';
import { Draweritems } from '../models/draweritems'
import { Roles } from '../models/roles';
import { CompanyRoles } from '../models/company-roles';
import { SOPKeys } from '../models/sopkeys';
import { Dodont } from '../models/dodont';
import { Week } from '../models/week';
import { Banner } from '../models/banner';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class InitialDataService {
  public dodont: Dodont[] = [
    { roleCode: "r009", text: "Tangan diatas meja", dodont: true },
    { roleCode: "r005", text: "Senyum, Sapa, Salam", dodont: true },
    { roleCode: "r005", text: "Acuh tak acuh", dodont: false },
    { roleCode: "r005", text: "Salam satu hati", dodont: true },
    { roleCode: "r005", text: "Tangan sikap salam", dodont: true },
    { roleCode: "r009", text: "Tatapan kosong", dodont: false },
    { roleCode: "r009", text: "Salam satu hati", dodont: true },
    { roleCode: "r009", text: "Terima kasih", dodont: true },
    { roleCode: "r009", text: "Tangan diatas meja", dodont: true },
  ];


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

  initialRoles: Roles[] = [
    { roleCode: "r001", roleName: "HRD", active: false },
    { roleCode: "r002", roleName: "Vice Director", active: false },
    { roleCode: "r003", roleName: "Director", active: false },
    { roleCode: "r004", roleName: "Manager", active: false },
    { roleCode: "r005", roleName: "Security", active: false },
    { roleCode: "r006", roleName: "Customer Service", active: false },
    { roleCode: "r007", roleName: "Staff", active: false },
    { roleCode: "r008", roleName: "Branch Manager", active: false },
    { roleCode: "r009", roleName: "Teller", active: false }
  ]

  initialCompanyRole: CompanyRoles[] = [
    { roleCode: "r005", companyCode: "c000001" },
    { roleCode: "r006", companyCode: "c000001" },
    { roleCode: "r008", companyCode: "c000001" },
    { roleCode: "r009", companyCode: "c000001" },
    { roleCode: "r007", companyCode: "c000001" }
  ]

  initialWeek: Week[] = [
    { weekNum: 1, active: true, month: 6 },
    { weekNum: 2, active: false, month: 6 },
    { weekNum: 3, active: false, month: 6 },
    { weekNum: 4, active: false, month: 6 }
  ]

  initialEmployee: Employee[] = [
    { employeeFirstName: "Erwin", employeeLastName: "Antonius", employeeNIK: "33778", employeePhones: "081222255051", roleCode: "r006", mark: 10, week: 1, feedback: "Sangat baik memarkirkan mobil" },
    { employeeFirstName: "Fitria", employeeLastName: "Fitria", employeeNIK: "33238", employeePhones: "081587644", roleCode: "r006", mark: 13, week: 1, feedback: "" },
    { employeeFirstName: "Victor", employeeLastName: "Solihin", employeeNIK: "12478", employeePhones: "081136544", roleCode: "r006", mark: 53, week: 1, feedback: "" },
    { employeeFirstName: "R Fariz", employeeLastName: "Alfatah", employeeNIK: "35378", employeePhones: "0816543633", roleCode: "r006", mark: 32, week: 1, feedback: "" },
    { employeeFirstName: "Nimas", employeeLastName: "Sitorini", employeeNIK: "35428", employeePhones: "0812546455", roleCode: "r006", mark: 74, week: 1, feedback: "" },
    { employeeFirstName: "Nuni", employeeLastName: "Istiani", employeeNIK: "21478", employeePhones: "081227654333", roleCode: "r006", mark: 34, week: 1, feedback: "" },
    { employeeFirstName: "Errol", employeeLastName: "Hariman", employeeNIK: "25378", employeePhones: "0817655653", roleCode: "r005", mark: 97, week: 1, feedback: "Ramah saat memberi salam" },
    { employeeFirstName: "David", employeeLastName: "Junaidi", employeeNIK: "23418", employeePhones: "0817656744", roleCode: "r005", mark: 46, week: 1, feedback: "" },
    { employeeFirstName: "Erros", employeeLastName: "Chandra", employeeNIK: "22178", employeePhones: "081345432344", roleCode: "r005", mark: 43, week: 1, feedback: "" },
    { employeeFirstName: "Demi", employeeLastName: "Lovato", employeeNIK: "25158", employeePhones: "08138765678", roleCode: "r005", mark: 75, week: 1, feedback: "" },
    { employeeFirstName: "Anthony", employeeLastName: "Nagasastra", employeeNIK: "25178", employeePhones: "0818765674", roleCode: "r009", mark: 53, week: 1, feedback: "" },
    { employeeFirstName: "Aloysius", employeeLastName: "Fatmanto", employeeNIK: "32578", employeePhones: "087898764435", roleCode: "r009", mark: 75, week: 1, feedback: "" },
    { employeeFirstName: "Rizki", employeeLastName: "Valhevi", employeeNIK: "26478", employeePhones: "085676543544", roleCode: "r009", mark: 25, week: 1, feedback: "" },
    { employeeFirstName: "Lidya", employeeLastName: "Widjaja", employeeNIK: "21778", employeePhones: "085676543376", roleCode: "r009", mark: 74, week: 1, feedback: "" },
    { employeeFirstName: "Agus", employeeLastName: "Setiawan", employeeNIK: "35778", employeePhones: "085734575354", roleCode: "r009", mark: 84, week: 1, feedback: "" },
  ]
  public initialSOP: SOPKeys[] = [
    { SOPCode: "SOP001", SOPDesc: "Tersenyum kepada pelanggan", roleCode: "r009", imgPath: "", value: 2 },
    { SOPCode: "SOP002", SOPDesc: "Menyapa (pagi/siang)", roleCode: "r009", imgPath: "", value: 2 },
    { SOPCode: "SOP003", SOPDesc: "Menunjukkan kesediaan membantu", roleCode: "r009", imgPath: "", value: 2 },
    { SOPCode: "SOP009", SOPDesc: "Mempersilakan duduk", roleCode: "r006", imgPath: "", value: 2 },
    { SOPCode: "SOP010", SOPDesc: "Tersenyum kepada pelanggan.", roleCode: "r006", imgPath: "", value: 2 },
    { SOPCode: "SOP011", SOPDesc: "Mengucapkan salam (pagi/siang)", roleCode: "r006", imgPath: "", value: 2 },
    { SOPCode: "SOP012", SOPDesc: "Saat Anda memasuki halaman Bank, Apakah ada security di luar banking hall/di halaman parkir", roleCode: "r005", imgPath: "", value: 2 },
    { SOPCode: "SOP013", SOPDesc: "Membantu memarkir kendaraan", roleCode: "r005", imgPath: "", value: 2 },
    { SOPCode: "SOP014", SOPDesc: "Berjaga-jaga dan mengawasi", roleCode: "r005", imgPath: "", value: 2 }
  ]

  initialDodont: Dodont[] = [
    { roleCode: "r009", text: "Tangan diatas meja", dodont: true },
    { roleCode: "r005", text: "Senyum, Sapa, Salam", dodont: true },
    { roleCode: "r005", text: "Acuh tak acuh", dodont: false },
    { roleCode: "r005", text: "Salam satu hati", dodont: true },
    { roleCode: "r005", text: "Tangan sikap salam", dodont: true },
    { roleCode: "r009", text: "Tatapan kosong", dodont: false },
    { roleCode: "r009", text: "Salam satu hati", dodont: true },
    { roleCode: "r009", text: "Terima kasih", dodont: true },
    { roleCode: "r009", text: "Tangan diatas meja", dodont: true },
  ]
  constructor() {
    this.dodont = new Array<Dodont>();

  }

  setDodont(dodont: Dodont) {
    this.initialDodont.push(dodont);
  }

  getInitialDrawer() {
    return this.initialItems;
  }

  getInitialBanner() {
    return this.initialBanners;
  }

  getInitiaRole() {
    return this.initialRoles;
  }

  getInitiaCompanyRole() {
    return this.initialCompanyRole;
  }

  getInitialSOP() {
    return this.initialSOP;
  }

  getInitialEmployee() {
    return this.initialEmployee;
  }

  getInitialWeek() {
    return this.initialWeek;
  }

  getInitialDodont() {
    return this.initialDodont;
  }

  addInitialDodont(data: Dodont) {
    this.initialDodont.push(data);
  }

  removeDodont(dodont){
    const index: number =this.initialDodont.indexOf(dodont);
    if (index !== -1) {
        this.initialDodont.splice(index, 1);
    }     
  }
}
