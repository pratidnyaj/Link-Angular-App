export const environment = {
  production: true,
  baseUrl: 'https://poll.unfyd.com/linkflowmanager/api',

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
    numberOfMinutes : 3, //30,  
    numberOfSeconds: 180000, //1800000, 
    lastSeconds : 120//300
  }
};