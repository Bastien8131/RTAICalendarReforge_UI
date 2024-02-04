import {Component, OnInit, ViewChild} from '@angular/core';
import {FormatDetectionService} from "./services/format-detection/format-detection.service";
import * as moment from 'moment';
import {StorageManagerService} from "./services/storage-manager/storage-manager.service";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  autoTheme: boolean = true;
  isDarkTheme: boolean = false;
  systemIsDark = window.matchMedia('(prefers-color-scheme: dark)');

  constructor(
    protected formatDetectionService: FormatDetectionService,
    private storageManager: StorageManagerService
  ) { }

  ngOnInit() {
    // this.toggleDarkTheme(this.systemIsDark.matches);
    // this.systemIsDark.addEventListener('change', (mediaQuery) => {
    //   if (this.autoTheme) {
    //     this.toggleDarkTheme(mediaQuery.matches);
    //   }
    // });

  }

  toggleDarkTheme(shouldAdd: boolean) {
    this.isDarkTheme = shouldAdd;
    document.body.classList.toggle('dark', shouldAdd);
  }
}

