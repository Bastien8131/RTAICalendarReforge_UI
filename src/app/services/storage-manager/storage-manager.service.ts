import { Injectable } from '@angular/core';
import {locale} from "moment";
import {key} from "ionicons/icons";

@Injectable({
  providedIn: 'root'
})
export class StorageManagerService {

  private _saveData: boolean = false;

  constructor() {}

  get saveData(): boolean {
    return this._saveData;
  }

  set saveData(value: boolean) {
    this._saveData = value;
  }

  setItemInLocalStorage(item: string, value: any) {
    if(this.saveData){
      return;
    }
    localStorage.setItem(item, JSON.stringify(value));
  }

  getItemFromLocalStorage(item: string, defaultReturn: any) {
    if(this.keyExistsInLocalStorage(item)){
      return JSON.parse(localStorage.getItem(item) as string);
    }
    return defaultReturn;
  }

  getPropertyFromItemInLocalStorage(prop: string, item: string, defaultReturn: any) {
    if(this.keyExistsInLocalStorage(item)){
      return JSON.parse(localStorage.getItem(item) as string)[prop];
    }
    return defaultReturn;
  }

  removeItemFromLocalStorage(item: string) {
    localStorage.removeItem(item);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  clearItemOfLocalStorage(item: string) {
    localStorage.removeItem(item);
  }

  keyExistsInLocalStorage(item: string) {
    return localStorage.getItem(item) !== null;
  }

  setItemInSessionStorage(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItemFromSessionStorage(key: string) {
    return JSON.parse(sessionStorage.getItem(key) as string);
  }

  removeItemFromSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }

  keyExistsInSessionStorage(key: string) {
    return sessionStorage.getItem(key) !== null;
  }

}
