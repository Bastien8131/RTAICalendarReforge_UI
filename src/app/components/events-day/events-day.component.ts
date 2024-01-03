import {Component, Input, OnInit} from '@angular/core';
import {VEventsModel} from "../../modeles/VEventsModel";

@Component({
  selector: 'app-events-day',
  templateUrl: './events-day.component.html',
  styleUrls: ['./events-day.component.scss'],
})
export class EventsDayComponent  implements OnInit {
  @Input() day!: { date: string; events: VEventsModel[] };
  test!: boolean;

  constructor() { }

  ngOnInit() {
    let val1= this.day.date;
    let val2 = '2024-1-8';
    // console.log(val1);
    // console.log(val2);
     if(val1 == val2){
       this.test = true;
     }else {
       this.test = false;
     }
  }

  getDateInfo(){
    let rs!: {day: string, dayNumber: string, month: string, monthNumber: string, year: string, yearNumber: string};
    let date = new Date(this.day.date);

    rs = {
      day: date.toLocaleDateString('fr-FR', { weekday: 'long' }).slice(0, 3),
      dayNumber: date.toLocaleDateString('fr-FR', { day: 'numeric' }),
      month: date.toLocaleDateString('fr-FR', { month: 'long' }),
      monthNumber: date.toLocaleDateString('fr-FR', { month: 'numeric' }),
      year: date.toLocaleDateString('fr-FR', { year: 'numeric' }),
      yearNumber: date.toLocaleDateString('fr-FR', { year: 'numeric' }),
    }


    return rs;
  }

}
