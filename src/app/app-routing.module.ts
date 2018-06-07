import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthguardService } from './services/authguard.service';
import { LandingComponent } from './landing/landing.component';
import { StepboardComponent } from './stepboard/stepboard.component';

const appRoutes: Routes = [
  
  { path: 'main', component: MainComponent,
    children: [
      { path: 'landing', component: LandingComponent},
      { path: 'login', component: LoginComponent },
      { path: 'stepboard', component: StepboardComponent, canActivate: [AuthguardService] }
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