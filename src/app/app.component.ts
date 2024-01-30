import {Component, OnInit, ViewChild} from '@angular/core';
import {FormatDetectionService} from "./services/format-detection/format-detection.service";
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(protected formatDetectionService: FormatDetectionService) { }

  ngOnInit() {
    // Utilisez this.formatDetectionService.isMobile pour adapter le comportement de votre composant
  }
}

