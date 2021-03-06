import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthguardService } from './services/authguard.service';
import { LandingComponent } from './landing/landing.component';
import { NguCarouselModule } from '@ngu/carousel';
import { CarouselComponent } from './carousel/carousel.component';
import { DrawerComponent } from './drawer/drawer.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { StepboardComponent } from './stepboard/stepboard.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepFourComponent } from './step-four/step-four.component';
import { StepFiveComponent } from './step-five/step-five.component';
import { StepSixComponent } from './step-six/step-six.component';
import { StepSevenComponent } from './step-seven/step-seven.component';
import { EmployeerolePipe } from './pipes/employeerole.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HeaderStepComponent } from './header-step/header-step.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { StdservicerolePipe } from './pipes/stdservicerole.pipe';
import { StdservicerolevalPipe } from './pipes/stdserviceroleval.pipe';
import { GetheardPipe } from './pipes/getheard.pipe';
import { ToastrModule } from 'ngx-toastr';
import { ChpwdComponent } from './chpwd/chpwd.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AspekparentPipe } from './pipes/aspekparent.pipe';
import { AspekflagPipe } from './pipes/aspekflag.pipe';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    LandingComponent,
    DrawerComponent,
    CarouselComponent,
    FooterComponent,
    LoginComponent,
    StepboardComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    StepSixComponent,
    StepSevenComponent,
    EmployeerolePipe,
    HeaderStepComponent,
    StdservicerolePipe,
    StdservicerolevalPipe,
    GetheardPipe,
    ChpwdComponent,
    FeedbackComponent,
    AspekparentPipe,
    AspekflagPipe,
    HelpdeskComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NguCarouselModule,
    PdfViewerModule,
    ScrollToModule.forRoot(),
    HttpModule,
    HttpClientModule,
    BlockUIModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [AuthguardService, {provide: LocationStrategy, useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
