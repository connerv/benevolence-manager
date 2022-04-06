

# Benevolence Manager

A Web App created for [Catalina Foothills Church](https://cfcpca.org/) to manage their Benevolence Ministry.

## Features

~Manage and collect client information through online survey

~Manage and assign deacons to clients

~Generate reports

~Simple budgeting tool

~Client resource page

~Easy passwordless email based authentication for users


## Technology

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Uses [Firebase](https://firebase.google.com/) for authentication, data managment and serverless functions.

[Material-UI](https://mui.com/) is the foundation of the UI.

## Disclaimer

While this app has been tested to a degree and used in an active ministry, it is most definitely still in beta and you may encounter bugs. ***ALWAYS KEEP REGULAR BACKUPS OF YOUR DATA!***
## Getting Started

First, install dependencies (You will need node and npm):

```bash
npm install
```

Second, this project uses [Firebase](https://firebase.google.com/), so knowledge of that platform and an account is required.

Note: This app uses Firebase Functions to provide backend services without the need for a server. Firebase Functions requires an upgraded Firebase account, but small - medium sized benevolence ministries should use low enough resources to remain free. NOTE - this is not a bug free app, monitor your usage so as not to acrew unexpected charges!

Create a firebase web app and set up authentication and firestore database. Add your firebase config to the **services/firebase.js** File.

Copy **database.rules.json** to the Cloud Firestore Rules

Download a service account key for the admin SDK and add it to **init-data.js** 



Run:

```bash
node init-data.js
```
to set up initial test data into the database.

Next, set up Firebase Functions.

Firebase functions will be sending emails to users, an email address will be required for this.

In the **functions** folder edit index.js with the email address you would like to use.

in **functions** run -


```bash
npm install -g firebase-tools

firebase login

#make sure the correct project is selected - firebase use your-project-name

firebase deploy --only functions
```

At this point you should be good to go!

Run 

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## UI

The app uses [Catalina Foothills Church](https://cfcpca.org/) branding, change it to whatever you would like!

## Issues

If you want to deploy this for your church and need more help, create an issue and I'll try to get to it as soon as I can.
## License

[MIT](https://choosealicense.com/licenses/mit/)

