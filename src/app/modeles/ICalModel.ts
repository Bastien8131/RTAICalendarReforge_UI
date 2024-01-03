import {VEventsModel} from "./VEventsModel";

export interface ICalModel {
  BEGIN: string;
  METHOD: string;
  PRODID: string;
  VERSION: string;
  CALSCALE: string;
  VEVENTS: VEventsModel[];
  END: string;
}


