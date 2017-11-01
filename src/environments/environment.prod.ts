// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  //Firebase config
  firebaseConfig: {
    apiKey: 'AIzaSyCZoGqv8DGcrtw1byi4XG_cNP50dTVohd8',
    authDomain: 'navestock-website.firebaseapp.com',
    databaseURL: 'https://navestock-website.firebaseio.com',
    projectId: 'navestock-website',
    storageBucket: 'navestock-website.appspot.com',
    messagingSenderId: "394030533382"
  },
  //Google map key
  googleMapKey:{
    apiKey: 'AIzaSyDpCG7lMcZ2RTOvm-ZzN5zeH6SQjj95bc0'
  }
};

