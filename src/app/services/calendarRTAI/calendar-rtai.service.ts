import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICalModel } from 'src/app/modeles/ICalModel';
import { VEventsModel } from 'src/app/modeles/VEventsModel';
import {environment} from "../../../environments/environment";
import {map} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {CalendarEvent} from "angular-calendar";
import {
  CalendarEventActionsComponent
} from "angular-calendar/modules/common/calendar-event-actions/calendar-event-actions.component";

@Injectable({
  providedIn: 'root'
})
export class CalendarRTAIService {

  private _events!: ICalModel;
  private _eventsByDay!: {date: string, events: VEventsModel[]}[];
  private _eventsByMonth!: { days: { date: string, events: VEventsModel[] }[] }[];

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  get events(): ICalModel {
    return this._events;
  }


  get eventsByMonth(): { days: { date: string; events: VEventsModel[] }[] }[] {
    return this._eventsByMonth;
  }

  getEventsByMonths() {
    // console.log("getEventsByMonth");

    return new Promise((resolve, reject) => {
      // this.httpClient.get(`${environment.get('months')}`)
      this.httpClient.get(`https://androcode.fr:2401/API-RTAICalReforge/events/months`)
        .subscribe(
          (response) => {
            // console.log(response);
            this._eventsByMonth = response as { days: { date: string, events: VEventsModel[] }[] }[];
            resolve(response);
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        );
    });
  }

  getEvents() {
    // console.log("getEventsByMonth");

    return new Promise((resolve, reject) => {
      // this.httpClient.get(`${environment.get('all')}`)
      this.httpClient.get(`https://androcode.fr:2401/API-RTAICalReforge/events`)
        .subscribe(
          (response) => {
            // console.log(response);
            this._events = response as ICalModel;
            resolve(response);
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        );
    });
  }

  formatEventsForCalendar(){
    let calendarEvents: CalendarEvent[] = [];
    let data = this.events;
    for (let event of data.VEVENTS) {
      calendarEvents.push(
        {
          id: event.UID,
          start: this.convertirStringEnDate(event.DTSTART),
          end: this.convertirStringEnDate(event.DTEND),
          title: event.SUMMARY + " - " + event.LOCATION,
          meta: {
            description: event.DESCRIPTION,
            room: event.LOCATION,
          },
          allDay: false,
          resizable: {
            beforeStart: false,
            afterEnd: false,
          }
        }
      );
    }
    // console.log(calendarEvents);
    return calendarEvents;
  }


  convertirStringEnDate(dateString: string): Date{
    const year = parseInt(dateString.substr(0, 4), 10);
    const month = parseInt(dateString.substr(4, 2), 10) - 1; // Les mois dans JavaScript sont de 0 à 11
    const day = parseInt(dateString.substr(6, 2), 10);
    const hours = parseInt(dateString.substr(9, 2), 10);
    const minutes = parseInt(dateString.substr(11, 2), 10);
    const seconds = parseInt(dateString.substr(13, 2), 10);

    // Créer un objet Date en utilisant les composants extraits
    const dateObject = new Date(Date.UTC(year, month, day, hours, minutes, seconds));

    // Vérifier si la date est valide
    if (isNaN(dateObject.getTime())) {
      console.log("Date invalide")
    }

    return dateObject;
  }


}
