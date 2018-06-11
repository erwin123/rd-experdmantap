import { Injectable, EventEmitter } from '@angular/core';
import { Draweritems } from '../models/draweritems'
import { Roles } from '../models/roles';
import { CompanyRoles } from '../models/company-roles';
import { SOPKeys } from '../models/sopkeys';
import { Dodont } from '../models/dodont';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

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
  private dodonts = new BehaviorSubject<Dodont[]>([ { roleCode: "r009", text: "Tangan diatas meja", dodont: true },
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

  initialSOP: SOPKeys[] = [
    { SOPCode: "SOP001", SOPDesc: "Memeriksa keabsahan setiap bukti/kwitansi pengeluaran anggaran" },
    { SOPCode: "SOP002", SOPDesc: "Memeriksa kebenaran & kelengkapan dokumen pengadaan barang / jasa" },
    { SOPCode: "SOP003", SOPDesc: "Memeriksa serta menandatangani surat permintaan pembayaran" },
    { SOPCode: "SOP004", SOPDesc: "Menandatangani SPM ( surat perintah membayar )" },
    { SOPCode: "SOP005", SOPDesc: "Memeriksa Buku Kas Umum & buku Bantu sebelum ditutup" },
    { SOPCode: "SOP006", SOPDesc: "Memeriksa laporan rekonsiliasi" },
    { SOPCode: "SOP007", SOPDesc: "Memeriksa laporan realisasi anggaran manual ( bulan, triwulan & semester )" },
    { SOPCode: "SOP008", SOPDesc: "Memeriksa catatan atas laporan keuangan ( semester & tahunan )" },
    { SOPCode: "SOP009", SOPDesc: "Melakukan evaluasi kegiatan harian" },
    { SOPCode: "SOP010", SOPDesc: "Melakukan pencatatan setiap terjadi transaksi pada Buku Kas Umum & buku bantu ( buku bantu uang persediaan, buku bantu kredit per MAK, buku bantu pajak, buku bantu bank & register SPM ( surat perintah membayar )" },
    { SOPCode: "SOP011", SOPDesc: "Melakukan pembayaran biaya perjalanan dinas atas dasar surat surat tugas dari pimpinan dengan menyiapkan form biaya perjalanan dinas, kwitansi SPPD, rincian SPPD & (surat pengeluaran riil atas transportasi bila diperlukan )" },
    { SOPCode: "SOP012", SOPDesc: "Mengarsip setiap bukti/kwitansi atas pengeluaran anggaran" },
    { SOPCode: "SOP013", SOPDesc: "Membuat SSP ( surat setoran pajak ) jika ada pengeluaran yg dikenakan pajak" },
    { SOPCode: "SOP014", SOPDesc: "Membuat daftar uang makan ( atas dasar absen pegawai )" },
    { SOPCode: "SOP015", SOPDesc: "Membuat SPTJM ( surat pernyataan tanggungjawab mutlak )" },
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

  getInitialDodont() {
    return this.initialDodont;
  }

  addInitialDodont(data: Dodont) {
    this.initialDodont.push(data);
  }
}
