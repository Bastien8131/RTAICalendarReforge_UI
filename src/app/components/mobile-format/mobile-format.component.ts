import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";
import {ICalModel} from "../../modeles/ICalModel";
import {VEventsModel} from "../../modeles/VEventsModel";
import {CalendarRTAIService} from "../../services/calendarRTAI/calendar-rtai.service";
import {StorageManagerService} from "../../services/storage-manager/storage-manager.service";
import {CalendarView} from "angular-calendar";
import {FormatDetectionService} from "../../services/format-detection/format-detection.service";

@Component({
  selector: 'mobile-format',
  templateUrl: './mobile-format.component.html',
  styleUrls: ['./mobile-format.component.scss'],
})
export class MobileFormatComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  data!: ICalModel;
  dataMonth!: { days: { date: string, events: VEventsModel[] }[] }[];

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
  view: string = 'diary';
  calView= CalendarView.Day;


  currentDate = new Date();
  currentDateISO: string = new Date(this.currentDate.getTime() - (this.currentDate.getTimezoneOffset() * 60000)).toISOString();
  monthView: string = new Date().toLocaleString('fr-FR', { month: 'long' });
  showDatePickers: boolean = false;
  showRefreshButton: boolean = true;
  selectedDateTime: any;

  search: string = '';
  searchInput: string = '';
  searchHistory: string[] = []
  searchFav: string[] = []

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

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };

  autoTheme: boolean = true;
  isDarkTheme: boolean = false;
  systemIsDark = window.matchMedia('(prefers-color-scheme: dark)');

  constructor(
    protected calendarRTAI: CalendarRTAIService,
    private storageManager: StorageManagerService,
    private detectionService: FormatDetectionService
  ) {
  }

  ngOnInit() {
    this.dataMonth = this.calendarRTAI.eventsByMonth

    if(this.storageManager.keyExistsInLocalStorage('param')){
      this.param = this.storageManager.getItemFromLocalStorage('param', {});
      this.paramMustBeSave = this.param.saveData;
      this.autoTheme = this.param.autoTheme;
      this.isDarkTheme = this.param.isDarkTheme;
      this.showRefreshButton = this.param.showRefreshButton;
      this.searchHistory = this.param.searchHistory as string[];
      this.searchFav = this.param.searchFav as string[];
      this.view = this.param.mobileView;
      this.toggleDarkTheme(this.isDarkTheme);
    }else {
      this.toggleDarkTheme(this.systemIsDark.matches);
    }
    this.systemIsDark.addEventListener('change', (mediaQuery) => {
      if (this.autoTheme) {
        this.toggleDarkTheme(mediaQuery.matches);
      }
    });
  }

  onScroll($event: any) {
    this.setMonthView()
    this.detectionService.scrollTop = $event.detail.scrollTop
  }

  reloadPage() {
    window.location.reload();
  }

  goToTheStart(){
    let ionMain = document.querySelector("#main-content > ion-content")?.shadowRoot?.querySelector("main") as HTMLElement;
    ionMain.scrollTo(0, 0)
  }

  //---FONCTIONS POUR LE CHANGEMENT DE THEME---//

  changeTheme(ev: { detail: { checked: any; }; }) {
    this.toggleDarkTheme(ev.detail.checked);
  }

  toggleDarkTheme(shouldAdd: boolean) {
    this.isDarkTheme = shouldAdd;
    document.body.classList.toggle('dark', shouldAdd);
  }

  themeIsAsync(){
    if(this.isDarkTheme == !this.systemIsDark.matches){
      this.toggleDarkTheme(this.systemIsDark.matches)
    }
  }

  //---FONCTIONS LIEES AU CALENDRIER---//

  showDay(value: any) {
    if(this.view == 'diary'){
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
    }else if(this.view == 'calendar'){
      this.currentDate = new Date(value);
    }
  }

  setMonthView() {

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

    if(ele != null){

      let rect = ele.getBoundingClientRect();
      let top = rect.top;
      let bottom = rect.bottom;

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

  //---FONCTIONS LIEES A LA BARRE DE RECHERCHE---//

  dismissModal() {
    this.modal.dismiss(null, 'cancel')
  }

  searchbarEnter(event: any) {
    // console.log(event.target.value)
    this.search = event.target.value.toLowerCase();
    if(this.search.length >= 3){
      this.dismissModal();
      this.pushInSearchHistory(this.search);
      this.saveParam();
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
      this.saveParam();
    }

  }

  addSearchToFav(search: string) {
    console.log(this.searchFav.length)
    if(!this.searchFav.includes(search) && this.searchFav.length < 10){
      this.searchFav.unshift(search)
      this.saveParam();
    }

  }

  deleteSearchToFav(search: string) {
    console.log(this.searchFav.length)
    this.searchFav = this.searchFav.filter((value => value != search))
    this.saveParam();
  }

  searchbarIsFav(search: string) {
    return this.searchFav.includes(search)
  }

  saveParam() {
    // console.log(this.paramMustBeSave);
    if(this.paramMustBeSave) {
      this.storageManager.setItemInLocalStorage('param', {
        saveData: this.paramMustBeSave,
        autoTheme: this.autoTheme,
        isDarkTheme: this.isDarkTheme,
        showRefreshButton: this.showRefreshButton,
        searchHistory: this.searchHistory,
        searchFav: this.searchFav,
        mobileView: this.view,
        desktopView: this.storageManager.getPropertyFromItemInLocalStorage('desktopView', 'param', 'month')
      });
    }else{
      this.storageManager.clearItemOfLocalStorage('param');
    }
  }

  changeView($event: any) {
    console.log($event.detail.value);
    this.view = $event.detail.value;
    this.saveParam();
  }

  getEventsOfThisDay() {
    // let events: VEventsModel[] = []
    // // console.log(this.dataMonth)
    // this.dataMonth.forEach((month) => {
    //   month.days.forEach((day) => {
    //     if(day.date == this.currentDateISO.split('T')[0]){
    //       events = day.events
    //     }
    //   })
    // })

    return this.calendarRTAI.formatEventsForCalendar()
  }
}
