import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { FramesComponent } from './components/frames/frames.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'accounts', pathMatch: 'full' },
      { path: 'accounts', component: AccountListComponent },
      { path: 'transactions/:id', component: TransactionListComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'frames/:type', component: FramesComponent }
    ]
  },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
