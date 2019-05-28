# Description
This web application scores the pull requests made to github repository and displays a leaderboard showing the scores of the contributors.

## Client and Server
The client renders a leaderboard table and listens to server for updates. The server listens on a github repository for `push` events and updates the scores. It pushes the scores to the client using Server Side Events (SSE).

## Running the app from CLI using npm

You can use ngrok to make local development easier, by making a proxy to redirect github push events to local host. Follow the instructions to install ngrok from the [website](https://ngrok.com/). After installation run, `ngrok http 3000`, this will create a proxy, for e.g. `http://becdaaea.ngrok.io -> http://localhost:3000`

Add a webhook to any github repository, in which you have admin rights.
1. set the url to `<your-ngrok-url>/webhook`
2. set Content type to `application/json`
3. set password to `github-leaderboard-secret`
4. set events to `Just the push event`
5. Keep the webhook active

Fork and clone the repo. To start the client and server, you must have npm installed. Preferably use `nvm` to install `node` as it allows better version control.

```bash
cd git-scores/client
npm install
npm start
cd ../server
npm install
npm start
```

You can access the leaderboards page at `http://localhost:3000/`. Make any push to your hooked repo and you will see the score update. You can also redeliver the same github event from the web interface, to speed up development.

## Running the app with docker
From the home folder, run the following commands:

For the very first build:

    $ docker-compose build

Every time after that:

    $ docker-compose up

The webpage will be served at http://localhost:3000/, requests to server are internally proxyied to port 8080

To stop the services:

    $ docker-compose stop

To kill the services:

    CTRL + C and then $ docker-compose down
