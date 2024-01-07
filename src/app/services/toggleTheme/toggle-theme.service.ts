import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleThemeService {
  isDarkTheme: boolean = false;

  constructor() { }
}
