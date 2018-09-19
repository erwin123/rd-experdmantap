import { Component, OnInit, ViewChild, ElementRef, HostListener, Optional } from '@angular/core';
import { trigger, animate, style, group, animateChild, query, stagger, transition, state } from '@angular/animations';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { StatemanagementService } from '../services/statemanagement.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('routerTransition', [
      transition('* => stepboard', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' })
          , { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
          ], { optional: true }),
        ])
      ]),
      transition('stepboard => *', [
        group([
          query(':enter, :leave', style({ position: 'fixed', width: '100%' })
            , { optional: true }),
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
          ], { optional: true }),
        ])
      ])
    ])
  ]
})
export class MainComponent implements OnInit {
  @BlockUI('content') blockUIList: NgBlockUI;
  traffic: boolean = false;
  progress:number = 0;
  message:string = "Memuat...";
  @ViewChild('container') container: ElementRef;
  constructor(private stateService: StatemanagementService) { }
  @HostListener('click', ['$event']) onClick($event) {
    if (!this.container.nativeElement.querySelector('img').classList.contains('invert') &&
      this.container.nativeElement.classList.contains('open-hamburger-menu')) {
      this.container.nativeElement.querySelector('img').classList.add('invert');
    } else {
      this.container.nativeElement.querySelector('img').classList.remove('invert');
    }
  }

  ngOnInit() {
    // Wires up BlockUI instance
    this.stateService.currentExistTraffic.subscribe(res => {
      this.traffic = res;
      if(this.traffic)
      {
        this.blockUIList.start(this.message); // Start blocking element only
      }else{
        this.blockUIList.stop(); // Stop blocking
      }
    });

    this.stateService.currentNumberProgrees.subscribe(res => {
      this.progress = res;
    });
    
  }

}
