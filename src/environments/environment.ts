// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8005/api',
  // baseUrl: 'https://poll.unfyd.com/linkflowmanager/api',
  firebase: {
    apiKey: "AIzaSyCzzo0RJU3ZGGQRIUu4cY_umq8oWjru6cg",
    authDomain: "kirti-8fa7c.firebaseapp.com",
    databaseURL: "https://kirti-8fa7c.firebaseio.com",
    projectId: "kirti-8fa7c",
    storageBucket: "kirti-8fa7c.appspot.com",
    messagingSenderId: "769901504195",
    appId: "1:769901504195:web:b3fef97702e312620e2476"
  },
  timeLogout : {
    numberOfMinutes : 15, //30,  //3
    numberOfSeconds: 900000, //1800000, //180000
    lastSeconds : 180//300
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




