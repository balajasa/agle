import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './components/modal/modal.component';
import { AppDevelopmentComponent } from './components/modal/service/app-development/app-development.component';
import { BigDataComponent } from './components/modal/service/big-data/big-data.component';
import { CustomizedComponent } from './components/modal/service/customized/customized.component';
import { HostingComponent } from './components/modal/service/hosting/hosting.component';
import { ResponsiveComponent } from './components/modal/service/responsive/responsive.component';
import { SeoComponent } from './components/modal/service/seo/seo.component';
import { ServiceComponent } from './components/modal/service/service.component';
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalComponent,
    ServiceComponent,
    CustomizedComponent,
    ResponsiveComponent,
    AppDevelopmentComponent,
    HostingComponent,
    BigDataComponent,
    SeoComponent,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
