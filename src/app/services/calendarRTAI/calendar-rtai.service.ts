import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICalModel } from 'src/app/modeles/ICalModel';
import { VEventsModel } from 'src/app/modeles/VEventsModel';

@Injectable({
  providedIn: 'root'
})
export class CalendarRTAIService {

  private _data!: ICalModel;

  constructor(
    private httpClient: HttpClient,
  ) { }

  get data(): ICalModel {
    return this._data;
  }

  getCalendarData(){
    // this.loadingService.changeLoadingStatus()
    this.httpClient
      .get("http://localhost:8080/api/message")
      .subscribe((response) => {
        console.log(response);
        this._data = response as ICalModel;
    });
  }

  groupRTAIEventByDay(){
    let eventsByDay: {date: string, events: VEventsModel[]}[] = [];
    for (let event of this.data.VEVENTS) {
      let date = this.convertirStringEnDate(event.DTSTART);
      let dateKey = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      let index = eventsByDay.findIndex((value) => value.date == dateKey);
      if (index == -1) {
        eventsByDay.push({date: dateKey, events: [event]});
      } else {
        eventsByDay[index].events.push(event);
      }

    }

    eventsByDay.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });


    return eventsByDay;
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
