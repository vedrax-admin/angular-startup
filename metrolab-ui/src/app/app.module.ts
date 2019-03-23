import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    LayoutModule,
    AuthModule,
    routing
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
