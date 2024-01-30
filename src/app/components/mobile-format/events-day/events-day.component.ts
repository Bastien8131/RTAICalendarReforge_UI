import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VEventsModel} from "../../../modeles/VEventsModel";
import {CalendarRTAIService} from "../../../services/calendarRTAI/calendar-rtai.service";

@Component({
  selector: 'app-events-day',
  templateUrl: './events-day.component.html',
  styleUrls: ['./events-day.component.scss'],
})
export class EventsDayComponent  implements OnInit {
  // @Input() day!: { date: string; events: VEventsModel[] };
  // days!: { date: string; events: VEventsModel[] }[];
  months!: { days: { date: string, events: VEventsModel[] }[] }[];
  @Input() showRefreshButton!: boolean;
  @Output() afterView = new EventEmitter<void>();
  @Input() search: string = '';
  @Input() dataMonth!: Promise<{ days: { date: string; events: VEventsModel[] }[] }[] | null>;

  constructor(
    private calendarRTAI: CalendarRTAIService
  ) {
    // this.days = this.calendarRTAI.groupRTAIEventByDay();
    // console.log(this.months)
  }

  ngOnInit() {
    this.downloadEventsByMonths();
  }

  ngOnChanges() {
    // this.months = this.searchInRTAIEvents(this.calendarRTAI.groupRTAIEventsByMonth());
    this.getEventsByMonths()
  }

  downloadEventsByMonths(){
    this.calendarRTAI.getEventsByMonths()
      .then((response) => {
        // Faire quelque chose avec la réponse
        // console.log("Traitement de la réponse :", response);
        this.months = response as { days: { date: string, events: VEventsModel[] }[] }[];
      })
      .catch((error) => {
        // Gérer l'erreur
        console.error("Erreur lors de la requête :", error);
        return null
      });
  }

  getEventsByMonths(){
    this.months = this.searchInRTAIEvents(this.calendarRTAI.eventsByMonth)
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

  searchInRTAIEvents(data: { days: { date: string; events: VEventsModel[] }[] }[]): { days: { date: string; events: VEventsModel[] }[] }[]{
    let rs: { days: { date: string; events: VEventsModel[] }[] }[] = [];

    if(this.search.length < 3){
      return data;
    }else{
      for(let month of data){
        let days: { date: string; events: VEventsModel[] }[] = [];
        for(let day of month.days){
          let events: VEventsModel[] = [];
          for(let event of day.events){
            if(event.SUMMARY.toLowerCase().includes(this.search.toLowerCase())){
              events.push(event);
            }
          }
          if(events.length > 0){
            days.push({date: day.date, events: events})
          }
        }
        if(days.length > 0){
          rs.push({days: days})
        }
      }
      return rs;
    }



  }

}
