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

  setItemInLocalStorage(key: string, value: any) {
    if(this.saveData){
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItemFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  removeItemFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  clearItemOfLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  keyExistsInLocalStorage(key: string) {
    return localStorage.getItem(key) !== null;
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
