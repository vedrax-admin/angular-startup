import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    routing
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    AppComponent,
    LoginComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
