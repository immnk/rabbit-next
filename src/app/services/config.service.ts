import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * AppConfig is the interface that defines what configurations you want to provide to the application.
 * This file is implemented as suggested by angular in https://angular.io/guide/dependency-injection#injector-providers
 */
export interface AppConfig {
  appName: string;
  REST_END_POINT: string;
  login: string;
  accounts: string;
  CUSTOMER_KEY_STORAGE: string;
  GRAPH_EXPENDITURE: string;
  transactions: string;
  canibuy: string;
  transfer: string;
}

/**
 * Actual implementation of the AppConfig is defined here
 */
export const APP_DI_CONFIG: AppConfig = {
  appName: 'Genie',
  REST_END_POINT: environment.END_POINT,
  login: 'login',
  accounts: 'accounts',
  // login: '5c83a16d30000040176b0cac',
  // accounts: '5c83a0ce300000740d6b0caa',
  CUSTOMER_KEY_STORAGE: 'customerId',
  GRAPH_EXPENDITURE: 'accounts/trends',
  transactions: 'getTransactions',
  canibuy: 'https://h2h18-ml.cfapps.io/',
  transfer: 'transfer'
}

/**
 * This token tells the Dependency injector as to what type of app config is going to be injected.
 * It is easy to think that the type of the injector is going to be AppConfig
 * but that would not work because interfaces are not types in javascript.
 * so we need a type(token) for the config file to be injected.
 * More information is found here : https://angular.io/guide/dependency-injection#injection-token
 * @param  {InjectionToken} 'app.config' sample description about the InjectionToken that is createFromData
 * @return {void}           a new injected token that can identify this AppConfig
 */
export const APP_CONFIG_TOKEN = new InjectionToken<AppConfig>('app.config');
