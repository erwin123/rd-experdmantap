import { Injectable, EventEmitter } from '@angular/core';
import { Draweritems } from '../models/draweritems'
import { Roles } from '../models/roles';
import { CompanyRoles } from '../models/company-roles';
import { SOPKeys } from '../models/sopkeys';
import { Dodont } from '../models/dodont';
import { Week } from '../models/week';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class InitialDataService {
  private dodont: Dodont[] = [
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

  private dodonts = new BehaviorSubject<Dodont[]>([{ roleCode: "r009", text: "Tangan diatas meja", dodont: true },
  { roleCode: "r005", text: "Senyum, Sapa, Salam", dodont: true },
  { roleCode: "r005", text: "Acuh tak acuh", dodont: false },
  { roleCode: "r005", text: "Salam satu hati", dodont: true },
  { roleCode: "r005", text: "Tangan sikap salam", dodont: true },
  { roleCode: "r009", text: "Tatapan kosong", dodont: false },
  { roleCode: "r009", text: "Salam satu hati", dodont: true },
  { roleCode: "r009", text: "Terima kasih", dodont: true },
  { roleCode: "r009", text: "Tangan diatas meja", dodont: true },]);

  currentDodonts = this.dodonts.asObservable();

  initialItems: Draweritems[] = [
    { name: "Internship", icon: "flag", url: "", desc: "Hubungan dengan atasan dan rekan kerja (meliputi aspek pengawasan dan hubungan kerja)" },
    { name: "Wake Up", icon: "alarm-clock", url: "", desc: "Accountability / rasa keterikatan dan tanggung jawab thd pekerjaan yang dilakukan (meliputi aspek pekerjaan dan tanggung jawab)" },
    { name: "Get Heard", icon: "volume-up", url: "", desc: "Kesempatan untuk mengembangkan karier dan mengaktualisasikan diri (meliputi aspek aktualisasi diri dan pengembangan karier)" },
    { name: "Talk", icon: "chat-bubble", url: "", desc: "Kondisi eksternal / lingkungan kerja (meliputi aspek kondisi pekerjaan, peraturan & kebijakan)" },
    { name: "Brainstorm", icon: "lightbulb", url: "", desc: "Penghargaan yang diperoleh sebagai timbal balik dari pekerjaan yang dilakukan (meliputi aspek pengakuan & penghargaan, dan kompensasi)" },
    { name: "Reward", icon: "coin-bag", url: "", desc: "Penghargaan yang diperoleh sebagai timbal balik dari pekerjaan yang dilakukan (meliputi aspek pengakuan & penghargaan, dan kompensasi)" },
    { name: "Stay Tune", icon: "collapse-card", url: "", desc: "Penghargaan yang diperoleh sebagai timbal balik dari pekerjaan yang dilakukan (meliputi aspek pengakuan & penghargaan, dan kompensasi)" },
    { name: "Info", icon: "info-circle", url: "", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" }
  ]

  initialRoles: Roles[] = [
    { roleCode: "r001", roleName: "HRD", active: false },
    { roleCode: "r002", roleName: "Vice Director", active: false },
    { roleCode: "r003", roleName: "Director", active: false },
    { roleCode: "r004", roleName: "Manager", active: false },
    { roleCode: "r005", roleName: "Security", active: false },
    { roleCode: "r006", roleName: "CS", active: false },
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
    { weekNum: 1, active: true, month:6 },
    { weekNum: 2, active: false, month:6 },
    { weekNum: 3, active: false, month:6 },
    { weekNum: 4, active: false, month:6 }
  ]

  initialEmployee: Employee[] = [
    { employeeFirstName: "Erwin", employeeLastName: "Antonius", employeeNIK: "33778", employeePhones: "081222255051", roleCode: "r006" , "mark":10, "week":1 },
    { employeeFirstName: "Fitria", employeeLastName: "Fitria", employeeNIK: "33238", employeePhones: "081587644", roleCode: "r006" , "mark":13, "week":1 },
    { employeeFirstName: "Victor", employeeLastName: "Solihin", employeeNIK: "12478", employeePhones: "081136544", roleCode: "r006" , "mark":53, "week":1 },
    { employeeFirstName: "R Fariz", employeeLastName: "Alfatah", employeeNIK: "35378", employeePhones: "0816543633", roleCode: "r006" , "mark":32, "week":1 },
    { employeeFirstName: "Nimas", employeeLastName: "Sitorini", employeeNIK: "35428", employeePhones: "0812546455", roleCode: "r006" , "mark":74, "week":1 },
    { employeeFirstName: "Nuni", employeeLastName: "Istiani", employeeNIK: "21478", employeePhones: "081227654333", roleCode: "r006" , "mark":34, "week":1 },
    { employeeFirstName: "Errol", employeeLastName: "Hariman", employeeNIK: "25378", employeePhones: "0817655653", roleCode: "r005" , "mark":97, "week":1 },
    { employeeFirstName: "David", employeeLastName: "Junaidi", employeeNIK: "23418", employeePhones: "0817656744", roleCode: "r005" , "mark":46, "week":1 },
    { employeeFirstName: "Erros", employeeLastName: "Chandra", employeeNIK: "22178", employeePhones: "081345432344", roleCode: "r005" , "mark":43, "week":1 },
    { employeeFirstName: "Demi", employeeLastName: "Lovato", employeeNIK: "25158", employeePhones: "08138765678", roleCode: "r005" , "mark":75, "week":1 },
    { employeeFirstName: "Anthony", employeeLastName: "Nagasastra", employeeNIK: "25178", employeePhones: "0818765674", roleCode: "r009" , "mark":53, "week":1 },
    { employeeFirstName: "Aloysius", employeeLastName: "Fatmanto", employeeNIK: "32578", employeePhones: "087898764435", roleCode: "r009" , "mark":75, "week":1 },
    { employeeFirstName: "Rizki", employeeLastName: "Valhevi", employeeNIK: "26478", employeePhones: "085676543544", roleCode: "r009" , "mark":25, "week":1 },
    { employeeFirstName: "Lidya", employeeLastName: "Widjaja", employeeNIK: "21778", employeePhones: "085676543376", roleCode: "r009" , "mark":74, "week":1 },
    { employeeFirstName: "Agus", employeeLastName: "Setiawan", employeeNIK: "35778", employeePhones: "085734575354", roleCode: "r009" , "mark":84, "week":1 },
  ]
  public initialSOP: SOPKeys[] = [
    { SOPCode: "SOP001", SOPDesc: "Memeriksa keabsahan setiap bukti/kwitansi pengeluaran anggaran", roleCode: "r009", imgPath: "" },
    { SOPCode: "SOP002", SOPDesc: "Memeriksa kebenaran & kelengkapan dokumen pengadaan barang / jasa", roleCode: "r009", imgPath: "" },
    { SOPCode: "SOP003", SOPDesc: "Memeriksa serta menandatangani surat permintaan pembayaran", roleCode: "r009", imgPath: "" },
    { SOPCode: "SOP004", SOPDesc: "Menandatangani SPM ( surat perintah membayar )", roleCode: "r009", imgPath: "" },
    { SOPCode: "SOP005", SOPDesc: "Memeriksa Buku Kas Umum & buku Bantu sebelum ditutup", roleCode: "r009", imgPath: "" },
    { SOPCode: "SOP006", SOPDesc: "Memeriksa laporan rekonsiliasi", roleCode: "r009", imgPath: "" },
    { SOPCode: "SOP007", SOPDesc: "Memeriksa laporan realisasi anggaran manual ( bulan, triwulan & semester )", roleCode: "r006", imgPath: "" },
    { SOPCode: "SOP008", SOPDesc: "Memeriksa catatan atas laporan keuangan ( semester & tahunan )", roleCode: "r006", imgPath: "" },
    { SOPCode: "SOP009", SOPDesc: "Melakukan evaluasi kegiatan harian", roleCode: "r006", imgPath: "" },
    { SOPCode: "SOP010", SOPDesc: "Melakukan pencatatan setiap terjadi transaksi pada Buku Kas Umum & buku bantu ( buku bantu uang persediaan, buku bantu kredit per MAK, buku bantu pajak, buku bantu bank & register SPM ( surat perintah membayar )", roleCode: "r006", imgPath: "" },
    { SOPCode: "SOP011", SOPDesc: "Melakukan pembayaran biaya perjalanan dinas atas dasar surat surat tugas dari pimpinan dengan menyiapkan form biaya perjalanan dinas, kwitansi SPPD, rincian SPPD & (surat pengeluaran riil atas transportasi bila diperlukan )", roleCode: "r006", imgPath: "" },
    { SOPCode: "SOP012", SOPDesc: "Mengarsip setiap bukti/kwitansi atas pengeluaran anggaran", roleCode: "r005", imgPath: "" },
    { SOPCode: "SOP013", SOPDesc: "Membuat SSP ( surat setoran pajak ) jika ada pengeluaran yg dikenakan pajak", roleCode: "r005", imgPath: "" },
    { SOPCode: "SOP014", SOPDesc: "Membuat daftar uang makan ( atas dasar absen pegawai )", roleCode: "r005", imgPath: "" },
    { SOPCode: "SOP015", SOPDesc: "Membuat SPTJM ( surat pernyataan tanggungjawab mutlak )", roleCode: "r005", imgPath: "" },
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
    this.dodont.push(dodont);
    this.dodonts.next(Object.assign({}, this.dodont));
  }

  getInitialDrawer() {
    return this.initialItems;
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
}
