import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common'; // Ajoutez cette importation
import {
  CalendarDateFormatter,
  CalendarDayModule,
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarNativeDateFormatter, CalendarWeekModule,
  DateFormatterParams
} from "angular-calendar";
import {CalendarRTAIService} from "../../../services/calendarRTAI/calendar-rtai.service";
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');
class CustomDateFormatter extends CalendarNativeDateFormatter {
  public override dayViewHour({ date, locale }: DateFormatterParams): string{
    return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: 'numeric'}).format(date);
  }

  public override weekViewHour({ date, locale }: DateFormatterParams): string{
    return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: 'numeric'}).format(date);
  }
}

@Component({
  selector: 'app-alert-day-view',
  templateUrl: './alert-day-view.component.html',
  styleUrls: ['./alert-day-view.component.scss'],
  standalone: true,
  imports: [CommonModule, CalendarDayModule, CalendarWeekModule],
  providers: [
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter },
  ]
})

export class AlertDayViewComponent  implements OnInit {

  @Input() inputEvent!: { day: CalendarMonthViewDay; sourceEvent: MouseEvent | KeyboardEvent };
  viewDate: Date = new Date();
  eventsDay: CalendarEvent[] = [];


  constructor(
    protected calendarRTAI: CalendarRTAIService
  ) {}

  ngOnInit() {
    console.log(this.inputEvent.day.date);
  }

}
