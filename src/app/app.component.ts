import {Component, ViewChild} from '@angular/core';
import { ICalModel } from './modeles/ICalModel';
import { CalendarRTAIService } from './services/calendarRTAI/calendar-rtai.service';
import {AppModule} from "./app.module";
import {split} from "@angular-devkit/core";
import {VEventsModel} from "./modeles/VEventsModel";
import {settings} from "ionicons/icons";
import {IonModal} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(IonModal) modal!: IonModal;
  data!: ICalModel;
  viewDate: Date = new Date();
  currentDate: string = new Date().toISOString();
  month: string = 'Janvier'
  // view = CalendarView.Week;
  // calendarView = CalendarView;
  viewMenuTitle: string = "Semaine";
  showDatePickers: boolean = false;
  showRefreshButton: boolean = true;
  themeToggle: any;
  selectedDateTime: any;
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };

  janvierSection!: HTMLElement
  fevrierSection!: HTMLElement
  marsSection!: HTMLElement
  avrilSection!: HTMLElement
  maiSection!: HTMLElement
  juinSection!: HTMLElement
  juilletSection!: HTMLElement
  aoutSection!: HTMLElement
  septembreSection!: HTMLElement
  octobreSection!: HTMLElement
  novembreSection!: HTMLElement
  decembreSection!: HTMLElement



  constructor(
    protected calendarRTAI: CalendarRTAIService
  ) {
  }

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


  showDay() {
    let ionMain = document.querySelector("#main-content > ion-content")?.shadowRoot?.querySelector("main") as HTMLElement;

    // console.log(this.selectedDateTime)
    let splitDate = this.selectedDateTime.split('T')[0] + 'T00:00:00'
    // console.log(splitDate)
    let time = new Date(splitDate).getTime()
    // console.log(time)
    // console.log(new Date(time))


    let element = document.getElementById(String(time)) as HTMLElement
    // console.log(element.offsetTop)
    ionMain.scrollTo(0, element.offsetTop - 100)
    this.month = new Date(time).toLocaleDateString('fr-FR', { month: 'long' })
  }

  tableauDeNombres() {
    let tableau = [];
    for (let i = 0; i < 1000; i++) {
      tableau.push(i);
    }
    return tableau;
  }

  dismissModal() {
    this.modal.dismiss(null, 'cancel')
  }

  onScroll($any: any) {
    this.setMonth()
  }

  setMonth() {

    // console.log(this.isVisible(ele))
    if(this.isVisible(this.janvierSection)){
      this.month = 'Janvier'
    }
    if(this.isVisible(this.fevrierSection)){
      this.month = 'Février'
    }
    if(this.isVisible(this.marsSection)){
      this.month = 'Mars'
    }
    if(this.isVisible(this.avrilSection)){
      this.month = 'Avril'
    }
    if(this.isVisible(this.maiSection)){
      this.month = 'Mai'
    }
    if(this.isVisible(this.juinSection)){
      this.month = 'Juin'
    }
    if(this.isVisible(this.juilletSection)){
      this.month = 'Juillet'
    }
    if(this.isVisible(this.aoutSection)){
      this.month = 'Août'
    }
    if(this.isVisible(this.septembreSection)){
      this.month = 'Septembre'
    }
    if(this.isVisible(this.octobreSection)){
      this.month = 'Octobre'
    }
    if(this.isVisible(this.novembreSection)){
      this.month = 'Novembre'
    }
    if(this.isVisible(this.decembreSection)){
      this.month = 'Décembre'
    }
  }

  private isVisible(ele: HTMLElement) {

    // console.log(ele)

    if(ele != null){

      let rect = ele.getBoundingClientRect();
      let top = rect.top;
      let bottom = rect.bottom;

      // console.log(top)
      // console.log(bottom)
      // console.log(window.innerHeight)
      // console.log(top >= 0)
      // console.log(bottom <= window.innerHeight)


      let isVisible = (top <= 0) && (bottom >= window.innerHeight);
      return isVisible;
    }else{
      return false
    }

  }

  setMonthSection() {
    this.janvierSection = document.getElementById('0') as HTMLElement
    this.fevrierSection = document.getElementById('1') as HTMLElement
    this.marsSection = document.getElementById('2') as HTMLElement
    this.avrilSection = document.getElementById('3') as HTMLElement
    this.maiSection = document.getElementById('4') as HTMLElement
    this.juinSection = document.getElementById('5') as HTMLElement
    this.juilletSection = document.getElementById('6') as HTMLElement
    this.aoutSection = document.getElementById('7') as HTMLElement
    this.septembreSection = document.getElementById('8') as HTMLElement
    this.octobreSection = document.getElementById('9') as HTMLElement
    this.novembreSection = document.getElementById('10') as HTMLElement
    this.decembreSection = document.getElementById('11') as HTMLElement
  }

  reloadPage() {
    window.location.reload();
  }
}
