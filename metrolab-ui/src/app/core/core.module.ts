import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { fakeBackendProvider } from './mocks/auth-backend';
import { jwtInterceptorProvider } from './interceptors/jwt.interceptor';
import { loaderInterceptorProvider } from './interceptors/loader.interceptor';
import { errorInterceptorProvider } from './interceptors/error.interceptor';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  declarations: [],
  providers: [
    jwtInterceptorProvider,
    loaderInterceptorProvider,
    errorInterceptorProvider,
    // provider used to create fake backend
    fakeBackendProvider
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}