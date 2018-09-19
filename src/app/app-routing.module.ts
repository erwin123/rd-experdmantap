import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthguardService } from './services/authguard.service';
import { LandingComponent } from './landing/landing.component';
import { StepboardComponent } from './stepboard/stepboard.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepFourComponent } from './step-four/step-four.component';
import { StepFiveComponent } from './step-five/step-five.component';
import { StepSevenComponent } from './step-seven/step-seven.component';
import { StepSixComponent } from './step-six/step-six.component';
import { ChpwdComponent } from './chpwd/chpwd.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';

const appRoutes: Routes = [
  
  { path: 'main', component: MainComponent,
    children: [
      { path: 'landing', component: LandingComponent, data: { state: 'landing' }},
      { path: 'login', component: LoginComponent, data: { state: 'login' } },
      { path: 'stepboard', component: StepboardComponent, canActivate: [AuthguardService], data: { state: 'stepboard' } },
      { path: 'chpwd', component: ChpwdComponent, canActivate: [AuthguardService] , data: { state: 'chpwd' }},
      { path: 'stepone', component: StepOneComponent, canActivate: [AuthguardService], data: { state: 'stepone' } },
      { path: 'steptwo', component: StepTwoComponent, canActivate: [AuthguardService] , data: { state: 'steptwo' }},
      { path: 'stepthree', component: StepThreeComponent, canActivate: [AuthguardService], data: { state: 'stepthree' } },
      { path: 'stepfour', component: StepFourComponent, canActivate: [AuthguardService], data: { state: 'stepfour' } },
      { path: 'stepfive', component: StepFiveComponent, canActivate: [AuthguardService], data: { state: 'stepfive' } },
      { path: 'stepsix', component: StepSixComponent, canActivate: [AuthguardService] , data: { state: 'stepsix' }},
      { path: 'stepseven', component: StepSevenComponent, canActivate: [AuthguardService], data: { state: 'stepseven' } },
      { path: 'helpdesk', component: HelpdeskComponent, data: { state: 'stepseven' } }
  ]},
  //{ path: '', redirectTo: 'main/landing'},

  // otherwise redirect to home
  { path: '**', redirectTo: 'main/landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }