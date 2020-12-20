# NavestockWebsite

Website for navestock cricket club <https://navestockcc.org>

## Build

Run `ng build --prod --aot` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Environment Setup

1. Create /src/environments/environment.ts and /src/environments/environment.prod.ts add your Firebase and Google maps key configuration:
export const environment = {
  production: false,
  //Firebase config
  firebaseConfig: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  },
  //Google map key
  googleMapKey:{
    apiKey: '<your-key>'
  }
};

## Deploy

1. If you have an existing Firebase project you'd like to deploy, cd to the project's root directory and run: `firebase init`
2. To deploy your site, simply run the following command from your project directory: `firebase deploy --except functions`
3. Deploying functions `sudo firebase deploy --only functions` to deply a single function `sudo firebase deploy --only functions:<function name>`

## GIT

1. Upload changes to GIT
`git push origin master https://github.com/NavestockCC/navestock-website.git`

## Test Functions Locally

1. run in navestock-website: `sudo npm --prefix functions run build`
2. Then run in navestock-website : `firebase emulators:start --only functions`

Provide authentication credentials to your application code by setting the environment variable:
"export GOOGLE_APPLICATION_CREDENTIALS="/Users/lefrascoetzee/Documents/Code/navestock-website/navestock-website-b4c3fdc31495.json""

NOTE: If you're using custom functions configuration variables, run the following command in the functions directory of your project before running firebase serve.
run in navestock-website\functions: `firebase functions:config:get > .runtimeconfig.json`

## Webpack Bundle Analyzer

1. run 'ng build --prod --aot --stats-json' to create stats.json file
2. run 'npm run bundle-report' to analize data.
