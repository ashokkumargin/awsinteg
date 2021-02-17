import { NgModule } from '@angular/core';

import Amplify, { Auth } from 'aws-amplify';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';

import { NavbarComponent } from './navbar/navbar.component';
import { DatabaseComponent } from './database/database.component';
import { FormsComponent } from './forms/forms.component';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

Amplify.configure({
  Auth:{
    mandatorySignIn:true,
    region: 'us-east-1',
    userPoolId: 'us-east-1_UBRmqSrPd',
    userPoolWebClientId: '7rlcf4fbkmfj6se9a9tde0670j',
    authenticationFlowType:'USER_PASSWORD_AUTH'
  }
});
	
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
		FormsModule,
		HttpModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
		NavbarComponent,
		DatabaseComponent,
		FormsComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };