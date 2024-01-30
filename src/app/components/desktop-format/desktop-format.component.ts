import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalendarEvent, CalendarView, DAYS_OF_WEEK, CalendarMonthViewDay} from "angular-calendar";
import {CalendarRTAIService} from "../../services/calendarRTAI/calendar-rtai.service";
import {ICalModel} from "../../modeles/ICalModel";
import {AlertController, PopoverController} from "@ionic/angular";
import { DomSanitizer } from '@angular/platform-browser';

import {AlertDayViewComponent} from "./alert-day-view/alert-day-view.component";

@Component({
  selector: 'desktop-format',
  templateUrl: './desktop-format.component.html',
  styleUrls: ['./desktop-format.component.scss'],
})
export class DesktopFormatComponent  implements OnInit {

  protected readonly DAYS_OF_WEEK = DAYS_OF_WEEK;

  view= CalendarView.Week;
  calendarView = CalendarView;
  viewDate: Date = new Date();
  showDatePickers: boolean = false;
  events: CalendarEvent[] = [
    {
      start: new Date(),
      end: new Date(),
      title: "test",
      allDay: false,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      }
    }
  ];
  alertButtons = ['Action'];

  constructor(
    protected calendarRTAI: CalendarRTAIService,
    private alertController: AlertController,
    public popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.calendarRTAI.getEvents().finally(() => {
      this.events = this.calendarRTAI.formatEventsForCalendar();
    });
  }

  setDataForCalendar(){
    let calendarEvents: CalendarEvent[] = [];
    return calendarEvents;
  }


  changeView($event: any) {
    console.log($event.detail.value);
    if($event.detail.value == "week"){
      this.view = CalendarView.Week;
    } else if ($event.detail.value == "month"){
      this.view = CalendarView.Month;
    }
  }

  async eventClicked({event}: { event: CalendarEvent }) {
    const alert = await this.alertController.create({
      header: event.title.split(" - ")[0].trim(),
      subHeader: event.meta.description + " - " + event.meta.room,
      message: "De " + this.getHoursAndMinutes(event.start) + " à " + this.getHoursAndMinutes(event.end),
      buttons: ['Fermer'],
    });

    await alert.present();
  }

  async dayClicked($event: { day: CalendarMonthViewDay; sourceEvent: MouseEvent | KeyboardEvent }) {
    const popover = await this.popoverController.create({
      component: AlertDayViewComponent,
      componentProps: {
        inputEvent: $event,
      },
      size: "auto",
      alignment: "center",

    });

    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log(`Popover dismissed with role: ${role}`);
  }

  getHoursAndMinutes(date: Date | undefined): string{
    if(date == undefined){
      return "";
    }
    return date.toLocaleString('fr-FR', { hour: 'numeric', minute: 'numeric', hour12: false });
  }


}

