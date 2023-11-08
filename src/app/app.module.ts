import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"prueba-liverpool-e0c6a","appId":"1:1039637789749:web:c1e7789cc511f59af8c57c","storageBucket":"prueba-liverpool-e0c6a.appspot.com","apiKey":"AIzaSyADJOSbCNyTZOACArSi2MtJKHtCgFjw5yg","authDomain":"prueba-liverpool-e0c6a.firebaseapp.com","messagingSenderId":"1039637789749","measurementId":"G-WVN4G0BJZC"})),
    provideAuth(() => getAuth()),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
