import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BornesService } from './services/bornes.service';
import { HttpClient } from '@angular/common/http/src/client';
import { MatTableModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD6xDjryLg-VSVNrJMTlJY__Ngqv-jAJJE'
    })
  ],
  providers: [
    BornesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
