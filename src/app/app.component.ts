import {Component, OnInit, ViewChild} from '@angular/core';
import {FormatDetectionService} from "./services/format-detection/format-detection.service";
import * as moment from 'moment';
import {StorageManagerService} from "./services/storage-manager/storage-manager.service";
import {CalendarRTAIService} from "./services/calendarRTAI/calendar-rtai.service";


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
    private storageManager: StorageManagerService,
    protected calendarRTAI: CalendarRTAIService,
  ) { }

  ngOnInit() {
    this.calendarRTAI.getEvents().then(r => {
      this.calendarRTAI.getEventsByMonths();
    });
  }

  toggleDarkTheme(shouldAdd: boolean) {
    this.isDarkTheme = shouldAdd;
    document.body.classList.toggle('dark', shouldAdd);
  }
}

