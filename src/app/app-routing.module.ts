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

const appRoutes: Routes = [
  
  { path: 'main', component: MainComponent,
    children: [
      { path: 'landing', component: LandingComponent},
      { path: 'login', component: LoginComponent },
      { path: 'stepboard', component: StepboardComponent, canActivate: [AuthguardService] },
      { path: 'stepone', component: StepOneComponent, canActivate: [AuthguardService] },
      { path: 'steptwo', component: StepTwoComponent, canActivate: [AuthguardService] },
      { path: 'stepthree', component: StepThreeComponent, canActivate: [AuthguardService] },
      { path: 'stepfour', component: StepFourComponent, canActivate: [AuthguardService] },
      { path: 'stepfive', component: StepFiveComponent, canActivate: [AuthguardService] },
      { path: 'stepsix', component: StepSixComponent, canActivate: [AuthguardService] },
      { path: 'stepseven', component: StepSevenComponent, canActivate: [AuthguardService] }
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