import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoMaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from './core/login.service';
import { AuthService } from './core/auth.service';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './core/auth.guard';
import { AdminGuard } from './core/admin.guard';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [LoginService,AuthService,AuthGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
