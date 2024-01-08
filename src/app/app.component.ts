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
  monthView: string = new Date().toLocaleString('fr-FR', { month: 'long' });
  monthValue: number = new Date().getMonth();
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
  search: string = '';
  searchInput: string = '';
  searchHistory: string[] = ['droit', 'congé', 'maladie', 'arrêt', 'convention', 'congés', 'convention collective', 'congés payés', 'congés exceptionnels', 'congés exceptionne', "alternance"]
  searchFav: string[] = ['droit']


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
    this.monthView = new Date(time).toLocaleDateString('fr-FR', { month: 'long' })
  }

  tableauDeNombres() {
    let tableau = [];
    for (let i = 0; i < 1000; i++) {
      tableau.push(i);
    }
    return tableau;
  }



  onScroll() {
    this.setMonth()
  }

  setMonth() {

    // console.log(this.isVisible(ele))
    if(this.isVisible(this.janvierSection)){
      this.monthView = 'Janvier'
    }
    if(this.isVisible(this.fevrierSection)){
      this.monthView = 'Février'
    }
    if(this.isVisible(this.marsSection)){
      this.monthView = 'Mars'
    }
    if(this.isVisible(this.avrilSection)){
      this.monthView = 'Avril'
    }
    if(this.isVisible(this.maiSection)){
      this.monthView = 'Mai'
    }
    if(this.isVisible(this.juinSection)){
      this.monthView = 'Juin'
    }
    if(this.isVisible(this.juilletSection)){
      this.monthView = 'Juillet'
    }
    if(this.isVisible(this.aoutSection)){
      this.monthView = 'Août'
    }
    if(this.isVisible(this.septembreSection)){
      this.monthView = 'Septembre'
    }
    if(this.isVisible(this.octobreSection)){
      this.monthView = 'Octobre'
    }
    if(this.isVisible(this.novembreSection)){
      this.monthView = 'Novembre'
    }
    if(this.isVisible(this.decembreSection)){
      this.monthView = 'Décembre'
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

  dismissModal() {
    this.modal.dismiss(null, 'cancel')
  }

  searchbarEnter(event: any) {
    // console.log(event.target.value)
    this.search = event.target.value.toLowerCase();
    if(this.search.length >= 3){
      this.dismissModal();
      this.pushInSearchHistory(this.search);
    }
  }

  searchbarInput($event: any) {
    this.searchInput = $event.target.value.toLowerCase();
  }

  searchbarHistory(item: string) {
    this.search = item.toLowerCase();
    this.dismissModal();
  }

  pushInSearchHistory(search: string) {
    if(!this.searchHistory.includes(search)){
      this.searchHistory.unshift(search)
      if(this.searchHistory.length > 20 && !this.searchFav.includes(search)){
        this.searchHistory.shift()
      }
    }
  }

  deleteHistoryItem(search: string) {
    if(!this.searchFav.includes(search)){
      this.searchHistory = this.searchHistory.filter((value => value != search))
    }

  }

  addSearchToFav(search: string) {
    console.log(this.searchFav.length)
    if(!this.searchFav.includes(search) && this.searchFav.length < 10){
      this.searchFav.unshift(search)
    }

  }

  deleteSearchToFav(search: string) {
    console.log(this.searchFav.length)
    this.searchFav = this.searchFav.filter((value => value != search))
  }

  searchbarIsFav(search: string) {
    return this.searchFav.includes(search)
  }

  goBeforeMount(){
    let ionMain = document.querySelector("#main-content > ion-content")?.shadowRoot?.querySelector("main") as HTMLElement;

    let before = (this.monthValue - 1 ).toString()

    if(document.getElementById(before) != null){
      let element = document.getElementById(before) as HTMLElement
      ionMain.scrollTo(0, element.offsetTop - 100)
      this.monthValue = this.monthValue - 1
    }
  }

  goNextMount(){
    let ionMain = document.querySelector("#main-content > ion-content")?.shadowRoot?.querySelector("main") as HTMLElement;

    let after = (this.monthValue + 1 ).toString()

    if(document.getElementById(after) != null){
      let element = document.getElementById(after) as HTMLElement
      ionMain.scrollTo(0, element.offsetTop - 100)
      this.monthValue = this.monthValue + 1
    }
  }
}

