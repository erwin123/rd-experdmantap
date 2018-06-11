import { Injectable } from '@angular/core';
import { Draweritems }  from '../models/draweritems'
import { Roles } from '../models/roles';
import { SOPKeys } from '../models/sopkeys';
import { CompanyRoles } from '../models/company-roles';

@Injectable({
  providedIn: 'root'
})
export class InitialDataService {
  public initialItems:Draweritems[] = [
    {name:"Internship", icon:"flag", url:"", desc:"Hubungan dengan atasan dan rekan kerja (meliputi aspek pengawasan dan hubungan kerja)"},
    {name:"Wake Up", icon:"alarm-clock", url:"", desc:"Accountability / rasa keterikatan dan tanggung jawab thd pekerjaan yang dilakukan (meliputi aspek pekerjaan dan tanggung jawab)"},
    {name:"Get Heard", icon:"volume-up", url:"", desc:"Kesempatan untuk mengembangkan karier dan mengaktualisasikan diri (meliputi aspek aktualisasi diri dan pengembangan karier)"},
    {name:"Talk", icon:"chat-bubble", url:"", desc:"Kondisi eksternal / lingkungan kerja (meliputi aspek kondisi pekerjaan, peraturan & kebijakan)"},
    {name:"Brainstorm", icon:"lightbulb", url:"", desc:"Penghargaan yang diperoleh sebagai timbal balik dari pekerjaan yang dilakukan (meliputi aspek pengakuan & penghargaan, dan kompensasi)"},
    {name:"Reward", icon:"coin-bag", url:"", desc:"Penghargaan yang diperoleh sebagai timbal balik dari pekerjaan yang dilakukan (meliputi aspek pengakuan & penghargaan, dan kompensasi)"},
    {name:"Stay Tune", icon:"collapse-card", url:"", desc:"Penghargaan yang diperoleh sebagai timbal balik dari pekerjaan yang dilakukan (meliputi aspek pengakuan & penghargaan, dan kompensasi)"},
    {name:"Info", icon:"info-circle", url:"", desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
  ]

  public initialRoles:Roles[] = [
    {roleCode: "r001", roleName:"HRD", active:false},
    {roleCode: "r002", roleName:"Vice Director", active:false},
    {roleCode: "r003", roleName:"Director", active:false},
    {roleCode: "r004", roleName:"Manager", active:false},
    {roleCode: "r005", roleName:"Security", active:false},
    {roleCode: "r006", roleName:"CS", active:false},
    {roleCode: "r007", roleName:"Staff", active:false},
    {roleCode: "r008", roleName:"Branch Manager", active:false},
    {roleCode: "r009", roleName:"Teller", active:false}
  ]

  public initialCompanyRole:CompanyRoles[]=[
    {roleCode:"r005", companyCode:"c000001"},
    {roleCode:"r006", companyCode:"c000001"},
    {roleCode:"r008", companyCode:"c000001"},
    {roleCode:"r009", companyCode:"c000001"},
    {roleCode:"r007", companyCode:"c000001"}
  ]

  public initialSOP: SOPKeys[] = [
    { SOPCode: "SOP001", SOPDesc: "Memeriksa keabsahan setiap bukti/kwitansi pengeluaran anggaran", roleCode:"r009" },
    { SOPCode: "SOP002", SOPDesc: "Memeriksa kebenaran & kelengkapan dokumen pengadaan barang / jasa", roleCode:"r009" },
    { SOPCode: "SOP003", SOPDesc: "Memeriksa serta menandatangani surat permintaan pembayaran", roleCode:"r009" },
    { SOPCode: "SOP004", SOPDesc: "Menandatangani SPM ( surat perintah membayar )", roleCode:"r009" },
    { SOPCode: "SOP005", SOPDesc: "Memeriksa Buku Kas Umum & buku Bantu sebelum ditutup", roleCode:"r009" },
    { SOPCode: "SOP006", SOPDesc: "Memeriksa laporan rekonsiliasi", roleCode:"r009" },
    { SOPCode: "SOP007", SOPDesc: "Memeriksa laporan realisasi anggaran manual ( bulan, triwulan & semester )", roleCode:"r006" },
    { SOPCode: "SOP008", SOPDesc: "Memeriksa catatan atas laporan keuangan ( semester & tahunan )", roleCode:"r006" },
    { SOPCode: "SOP009", SOPDesc: "Melakukan evaluasi kegiatan harian", roleCode:"r006" },
    { SOPCode: "SOP010", SOPDesc: "Melakukan pencatatan setiap terjadi transaksi pada Buku Kas Umum & buku bantu ( buku bantu uang persediaan, buku bantu kredit per MAK, buku bantu pajak, buku bantu bank & register SPM ( surat perintah membayar )", roleCode:"r006" },
    { SOPCode: "SOP011", SOPDesc: "Melakukan pembayaran biaya perjalanan dinas atas dasar surat surat tugas dari pimpinan dengan menyiapkan form biaya perjalanan dinas, kwitansi SPPD, rincian SPPD & (surat pengeluaran riil atas transportasi bila diperlukan )", roleCode:"r006" },
    { SOPCode: "SOP012", SOPDesc: "Mengarsip setiap bukti/kwitansi atas pengeluaran anggaran", roleCode:"r005" },
    { SOPCode: "SOP013", SOPDesc: "Membuat SSP ( surat setoran pajak ) jika ada pengeluaran yg dikenakan pajak", roleCode:"r005" },
    { SOPCode: "SOP014", SOPDesc: "Membuat daftar uang makan ( atas dasar absen pegawai )", roleCode:"r005" },
    { SOPCode: "SOP015", SOPDesc: "Membuat SPTJM ( surat pernyataan tanggungjawab mutlak )", roleCode:"r005" },
  ]
  constructor() { }
  
  getInitialDrawer(){
    return this.initialItems;
  }

  getInitiaRole(){
    return this.initialRoles;
  }

  getInitiaCompanyRole(){
    return this.initialCompanyRole;
  }

  getInitialSOP() {
    return this.initialSOP;
  }
}
