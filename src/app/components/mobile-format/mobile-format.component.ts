import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal} from "@ionic/angular";
import {ICalModel} from "../../modeles/ICalModel";
import {VEventsModel} from "../../modeles/VEventsModel";
import {CalendarRTAIService} from "../../services/calendarRTAI/calendar-rtai.service";
import {StorageManagerService} from "../../services/storage-manager/storage-manager.service";

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
  };
  paramMustBeSave: boolean = false;

  currentDate: string = new Date().toISOString();
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
    private storageManager: StorageManagerService
  ) {
  }

  ngOnInit() {
    // this.calendarRTAI.getCalendarData();
    if(this.storageManager.keyExistsInLocalStorage('param')){
      this.param = this.storageManager.getItemFromLocalStorage('param');
      this.paramMustBeSave = this.param.saveData;
      this.autoTheme = this.param.autoTheme;
      this.isDarkTheme = this.param.isDarkTheme;
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

  onScroll() {
    this.setMonthView()
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

  saveParam() {
    console.log(this.paramMustBeSave);
    if(this.paramMustBeSave) {
      this.storageManager.setItemInLocalStorage('param', {
        saveData: this.paramMustBeSave,
        autoTheme: this.autoTheme,
        isDarkTheme: this.isDarkTheme,
        showRefreshButton: this.showRefreshButton
      });
    }else{
      this.storageManager.clearItemOfLocalStorage('param');
    }
  }
}
