import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VEventsModel} from "../../modeles/VEventsModel";
import {ToggleThemeService} from "../../services/toggleTheme/toggle-theme.service";
import {CalendarRTAIService} from "../../services/calendarRTAI/calendar-rtai.service";

@Component({
  selector: 'app-events-day',
  templateUrl: './events-day.component.html',
  styleUrls: ['./events-day.component.scss'],
})
export class EventsDayComponent  implements OnInit {
  // @Input() day!: { date: string; events: VEventsModel[] };
  days!: { date: string; events: VEventsModel[] }[];
  months!: { days: { date: string, events: VEventsModel[] }[] }[];
  @Input() showRefreshButton!: boolean;
  @Output() afterView = new EventEmitter<void>();

  constructor(
    protected theme: ToggleThemeService,
    private calendarRTAI: CalendarRTAIService
  ) {
    // this.days = this.calendarRTAI.groupRTAIEventByDay();
    this.months = this.calendarRTAI.groupRTAIEventsByMonth();
    // console.log(this.months)
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.afterView.emit();
  }

  getDateInfo(day: { date: string; events: VEventsModel[] }){
    let rs!: {day: string, dayNumber: string, month: string, monthNumber: string, year: string, yearNumber: string, time: number};
    let date = new Date(day.date + 'T00:00:00');
    // console.log(date)

    rs = {
      day: date.toLocaleDateString('fr-FR', { weekday: 'long' }).slice(0, 3),
      dayNumber: date.toLocaleDateString('fr-FR', { day: 'numeric' }),
      month: date.toLocaleDateString('fr-FR', { month: 'long' }),
      monthNumber: date.toLocaleDateString('fr-FR', { month: 'numeric' }),
      year: date.toLocaleDateString('fr-FR', { year: 'numeric' }),
      yearNumber: date.toLocaleDateString('fr-FR', { year: 'numeric' }),
      time: date.getTime(),
    }


    return rs;
  }

  reloadPage(){
    // this.calendarRTAI.getCalendarData();
    // this.days = this.calendarRTAI.groupRTAIEventByDay();
    // console.log('reloadData')
    window.location.reload();
  }

  getMonthImg(month: { days: { date: string; events: VEventsModel[] }[] }) {

    switch (new Date(month.days[0].date).getMonth()) {
      case 0:
        return "assets/img/google_agenda_month_card/Janvier.jpg";
      case 1:
        return "assets/img/google_agenda_month_card/Fevrier.jpg";
      case 2:
        return "assets/img/google_agenda_month_card/Mars.jpg";
      case 3:
        return "assets/img/google_agenda_month_card/Avril.jpg";
      case 4:
        return "assets/img/google_agenda_month_card/Mai.jpg";
      case 5:
        return "assets/img/google_agenda_month_card/Juin.jpg";
      case 6:
        return "assets/img/google_agenda_month_card/Juillet.jpg";
      case 7:
        return "assets/img/google_agenda_month_card/Aout.jpg";
      case 8:
        return "assets/img/google_agenda_month_card/Septembre.jpg";
      case 9:
        return "assets/img/google_agenda_month_card/Octobre.jpg";
      case 10:
        return "assets/img/google_agenda_month_card/Novembre.jpg";
      case 11:
        return "assets/img/google_agenda_month_card/Decembre.jpg";
      default:
        return "assets/img/google_agenda_month_card/Decembre.jpg";

    }
  }

  getMonthId(month: { days: { date: string; events: VEventsModel[] }[] }) {
    if (month.days.length > 0) {
      return new Date(month.days[0].date).getMonth()
    } else {
      return -1
    }
  }
}
