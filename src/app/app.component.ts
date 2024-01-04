import { Component } from '@angular/core';
import { ICalModel } from './modeles/ICalModel';
import { CalendarRTAIService } from './services/calendarRTAI/calendar-rtai.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  data!: ICalModel;
  viewDate: Date = new Date();
  // view = CalendarView.Week;
  // calendarView = CalendarView;
  viewMenuTitle: string = "Semaine";
  showDatePickers: boolean = false;
  themeToggle: any;


  constructor(
    protected calendarRTAI: CalendarRTAIService,
  ) { }

  ngOnInit() {
    this.calendarRTAI.getCalendarData();
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkTheme(mediaQuery.matches));
  }

// Check/uncheck the toggle and update the theme based on isDark
  initializeDarkTheme(isDark: boolean | undefined) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark theme
  toggleChange(ev: { detail: { checked: any; }; }) {
    this.toggleDarkTheme(ev.detail.checked);
  }

  // Add or remove the "dark" class on the document body
  toggleDarkTheme(shouldAdd: boolean | undefined) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}
