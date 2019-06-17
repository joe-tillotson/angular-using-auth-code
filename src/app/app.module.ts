import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ApiService } from './services/api.service';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { CallApiComponent } from './call-api/call-api.component';
import { AuthConfiguration, AUTH_CONFIG } from './models/auth-config';
import { environmentVariables } from '../../src/config/environment.variables';

const authConfig: AuthConfiguration = new AuthConfiguration( {
  apiBaseUrl: environmentVariables.API_BASE_URL,
  oAuth2Config: {
    clientId: environmentVariables.OAUTH2_CONFIG.client_id,
    clientDomain: environmentVariables.OAUTH2_CONFIG.client_domain,
    audience: environmentVariables.OAUTH2_CONFIG.audience
  }
} );

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    PostDialogComponent,
    CallApiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    AuthService,
    ApiService,
    AuthGuardService,
    {
      provide: AUTH_CONFIG,
      useValue: authConfig
    }
  ],
  entryComponents: [
    PostDialogComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
