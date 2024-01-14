// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_ALL_EVENTS: '/API-RTAICalReforge/events',
  API_EVENTS_BY_DAYS: '/API-RTAICalReforge/events/days',
  API_EVENTS_BY_MONTHS: '/API-RTAICalReforge/events/months',

  get(type: string) {
    switch (type) {
      case 'all':
        return environment.API_ALL_EVENTS;
      case 'days':
        return environment.API_EVENTS_BY_DAYS;
      case 'months':
        return environment.API_EVENTS_BY_MONTHS;
      default:
        return environment.API_ALL_EVENTS;
    }

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
