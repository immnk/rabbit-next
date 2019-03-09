import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule, HttpClient, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { APP_DI_CONFIG, APP_CONFIG_TOKEN } from './services/config.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AccountListComponent } from './components/account-list/account-list.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FramesComponent } from './components/frames/frames.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { VoiceChatComponent } from './modals/voice-chat/voice-chat.component';
import { SpeechRecognitionService } from './services/speech-recognition.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AccountListComponent,
    TransactionListComponent,
    SettingsComponent,
    FramesComponent,
    TransferComponent,
    LoadingComponent,
    VoiceChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxWebstorageModule.forRoot(),
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  entryComponents: [VoiceChatComponent],
  providers: [
    { provide: APP_CONFIG_TOKEN, useValue: APP_DI_CONFIG },
    SpeechRecognitionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
