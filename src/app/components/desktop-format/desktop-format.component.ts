import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalendarEvent, CalendarView, DAYS_OF_WEEK, CalendarMonthViewDay} from "angular-calendar";
import {CalendarRTAIService} from "../../services/calendarRTAI/calendar-rtai.service";
import {ICalModel} from "../../modeles/ICalModel";
import {AlertController, AlertOptions, PopoverController} from "@ionic/angular";
import { DomSanitizer } from '@angular/platform-browser';

import {AlertDayViewComponent} from "./alert-day-view/alert-day-view.component";
import {now} from "moment";
import {StorageManagerService} from "../../services/storage-manager/storage-manager.service";

@Component({
  selector: 'desktop-format',
  templateUrl: './desktop-format.component.html',
  styleUrls: ['./desktop-format.component.scss'],
})
export class DesktopFormatComponent  implements OnInit {

  protected readonly DAYS_OF_WEEK = DAYS_OF_WEEK;

  param!: {
    saveData: boolean,
    autoTheme: boolean,
    isDarkTheme: boolean,
    showRefreshButton: boolean
    searchHistory: string[];
    searchFav: string[];
    mobileView: string,
    desktopView: CalendarView
  };
  paramMustBeSave: boolean = false;

  view= CalendarView.Week;
  calendarView = CalendarView;
  viewDate: Date = new Date();
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

  autoTheme: boolean = true;
  isDarkTheme: boolean = false;
  systemIsDark = window.matchMedia('(prefers-color-scheme: dark)');


  constructor(
    protected calendarRTAI: CalendarRTAIService,
    private alertController: AlertController,
    public popoverController: PopoverController,
    private storageManager: StorageManagerService
  ) { }

  ngOnInit() {
    if(this.storageManager.keyExistsInLocalStorage('param')){
      this.param = this.storageManager.getItemFromLocalStorage('param', {});
      this.paramMustBeSave = this.param.saveData;
      this.autoTheme = this.param.autoTheme;
      this.isDarkTheme = this.param.isDarkTheme;
      this.view = this.param.desktopView as CalendarView;
      this.toggleDarkTheme(this.isDarkTheme);
    }else {
      this.toggleDarkTheme(this.systemIsDark.matches);
    }
    this.systemIsDark.addEventListener('change', (mediaQuery) => {
      if (this.autoTheme) {
        this.toggleDarkTheme(mediaQuery.matches);
      }
    });
    this.events = this.calendarRTAI.formatEventsForCalendar();
  }

  //---FONCTIONS POUR LE CHANGEMENT DE THEME---//

  changeTheme(ev: { detail: { checked: any; }; }) {
    this.toggleDarkTheme(ev.detail.checked);
  }

  toggleDarkTheme(shouldAdd: boolean) {
    this.isDarkTheme = shouldAdd;
    document.body.classList.toggle('dark', shouldAdd);
    this.saveParam();
  }

  themeIsAsync(){
    if(this.isDarkTheme == !this.systemIsDark.matches){
      this.toggleDarkTheme(this.systemIsDark.matches)
    }
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
    this.saveParam();
  }

  async eventClicked({event}: { event: CalendarEvent }) {
    let content: AlertOptions = {}
    let exeption: any[] = ["", "null", undefined]

    content.header = event.title.split(" - ")[0].trim();
    if(!exeption.includes(event.meta.description) && !exeption.includes(event.meta.room)){
      content.subHeader = event.meta.description + " - " + event.meta.room;
    }
    content.message = "De " + this.getHoursAndMinutes(event.start) + " à " + this.getHoursAndMinutes(event.end);

    const alert = await this.alertController.create(content);

    await alert.present();
  }

  async dayClicked($event: { day: CalendarMonthViewDay; sourceEvent: MouseEvent | KeyboardEvent }) {

    if($event.day.isPast){
      return;
    }
    if(!$event.day.inMonth){
      return;
    }

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

  datepickersChange(value: any) {
    this.viewDate = new Date(value);
  }

  saveParam() {
    console.log(this.paramMustBeSave);
    if(this.paramMustBeSave) {
      this.storageManager.setItemInLocalStorage('param', {
        saveData: this.paramMustBeSave,
        autoTheme: this.autoTheme,
        isDarkTheme: this.isDarkTheme,
        showRefreshButton: this.storageManager.getPropertyFromItemInLocalStorage('showRefreshButton', 'param', true),
        searchHistory: this.storageManager.getPropertyFromItemInLocalStorage('searchHistory', 'param', []),
        searchFav: this.storageManager.getPropertyFromItemInLocalStorage('searchFav', 'param', []),
        mobileView: this.storageManager.getPropertyFromItemInLocalStorage('mobileView', 'param', 'diary'),
        desktopView: this.view
      });
    }else{
      this.storageManager.clearItemOfLocalStorage('param');
    }
  }
}

