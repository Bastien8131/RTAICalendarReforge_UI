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

      let year = date.getFullYear().toString();
      let month = (date.getMonth() + 1).toString();
      if (month.length == 1) month = "0" + month;
      let day = date.getDate().toString();
      if (day.length == 1) day = "0" + day;

      let dateKey = year + "-" + month + "-" + day;

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

  groupRTAIEventsByMonth(){
    let eventsByDay = this.groupRTAIEventByDay();
    let eventsByMouth: { days: { date: string, events: VEventsModel[] }[] }[] = [];

    for (let i = 0; i < 12; i++) {
      eventsByMouth[i] = { days: [] };
    }

    for (let event of eventsByDay) {
      // console.log(new Date(event.date).getMonth())
      switch (new Date(event.date).getMonth()) {
        case 0:
          if (eventsByMouth[0] == undefined) eventsByMouth[0] = { days: [] };
          eventsByMouth[0].days.push(event);
          break;
        case 1:
          if (eventsByMouth[1] == undefined) eventsByMouth[1] = { days: [] };
          eventsByMouth[1].days.push(event);
          break;
        case 2:
          if (eventsByMouth[2] == undefined) eventsByMouth[2] = { days: [] };
          eventsByMouth[2].days.push(event);
          break;
        case 3:
          if (eventsByMouth[3] == undefined) eventsByMouth[3] = { days: [] };
          eventsByMouth[3].days.push(event);
          break;
        case 4:
          if (eventsByMouth[4] == undefined) eventsByMouth[4] = { days: [] };
          eventsByMouth[4].days.push(event);
          break;
        case 5:
          if (eventsByMouth[5] == undefined) eventsByMouth[5] = { days: [] };
          eventsByMouth[5].days.push(event);
          break;
        case 6:
          if (eventsByMouth[6] == undefined) eventsByMouth[6] = { days: [] };
          eventsByMouth[6].days.push(event);
          break;
        case 7:
          if (eventsByMouth[7] == undefined) eventsByMouth[7] = { days: [] };
          eventsByMouth[7].days.push(event);
          break;
        case 8:
          if (eventsByMouth[8] == undefined) eventsByMouth[8] = { days: [] };
          eventsByMouth[8].days.push(event);
          break;
        case 9:
          if (eventsByMouth[9] == undefined) eventsByMouth[9] = { days: [] };
          eventsByMouth[9].days.push(event);
          break;
        case 10:
          if (eventsByMouth[10] == undefined) eventsByMouth[10] = { days: [] };
          eventsByMouth[10].days.push(event);
          break;
        case 11:
          if (eventsByMouth[11] == undefined) eventsByMouth[11] = { days: [] };
          eventsByMouth[11].days.push(event);
      }
    }

    return eventsByMouth;
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
