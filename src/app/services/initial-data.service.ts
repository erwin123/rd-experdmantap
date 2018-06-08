import { Injectable } from '@angular/core';
import { Draweritems }  from '../models/draweritems'
import { Roles } from '../models/roles';
import { CompanyRoles } from '../models/company-roles';

@Injectable({
  providedIn: 'root'
})
export class InitialDataService {
  initialItems:Draweritems[] = [
    {name:"Internship", icon:"flag", url:"", desc:"Hubungan dengan atasan dan rekan kerja (meliputi aspek pengawasan dan hubungan kerja)"},
    {name:"Wake Up", icon:"alarm-clock", url:"", desc:"Accountability / rasa keterikatan dan tanggung jawab thd pekerjaan yang dilakukan (meliputi aspek pekerjaan dan tanggung jawab)"},
    {name:"Get Heard", icon:"volume-up", url:"", desc:"Kesempatan untuk mengembangkan karier dan mengaktualisasikan diri (meliputi aspek aktualisasi diri dan pengembangan karier)"},
    {name:"Talk", icon:"chat-bubble", url:"", desc:"Kondisi eksternal / lingkungan kerja (meliputi aspek kondisi pekerjaan, peraturan & kebijakan)"},
    {name:"Brainstorm", icon:"lightbulb", url:"", desc:"Penghargaan yang diperoleh sebagai timbal balik dari pekerjaan yang dilakukan (meliputi aspek pengakuan & penghargaan, dan kompensasi)"},
    {name:"Reward", icon:"coin-bag", url:"", desc:"Penghargaan yang diperoleh sebagai timbal balik dari pekerjaan yang dilakukan (meliputi aspek pengakuan & penghargaan, dan kompensasi)"},
    {name:"Stay Tune", icon:"collapse-card", url:"", desc:"Penghargaan yang diperoleh sebagai timbal balik dari pekerjaan yang dilakukan (meliputi aspek pengakuan & penghargaan, dan kompensasi)"},
    {name:"Info", icon:"info-circle", url:"", desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
  ]

  initialRoles:Roles[] = [
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

  initialCompanyRole:CompanyRoles[]=[
    {roleCode:"r005", companyCode:"c000001"},
    {roleCode:"r006", companyCode:"c000001"},
    {roleCode:"r008", companyCode:"c000001"},
    {roleCode:"r009", companyCode:"c000001"},
    {roleCode:"r007", companyCode:"c000001"}
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
}
