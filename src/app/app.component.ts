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


  constructor(
    protected calendarRTAI: CalendarRTAIService,
  ) { }

  ngOnInit() {
    this.calendarRTAI.getCalendarData();
  }






}
