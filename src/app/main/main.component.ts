import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('container') container: ElementRef;
  constructor() { }
  @HostListener('click', ['$event']) onClick($event) {
    if (!this.container.nativeElement.querySelector('img').classList.contains('invert') &&
      this.container.nativeElement.classList.contains('open-hamburger-menu')) {
      this.container.nativeElement.querySelector('img').classList.add('invert');
    } else {
      this.container.nativeElement.querySelector('img').classList.remove('invert');
    }
  }

  ngOnInit() {

  }

}
