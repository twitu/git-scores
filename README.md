This web application scores the pull requests made to github repository and displays a leaderboard showing the scores of the contributors.

## Client
The client renders a leaderboard table and listens to server for updates

## Server
The server listens on a github repository for `push` events and updates the scores. It pushes the scores to the client using Server Side Events (SSE).

## Running the app
From the home folder, run the following commands:

For the very first build:

    $ docker-compose build

Every time after that:

    $ docker-compose up

The server should be running at http://localhost:8080, and the client server will be running at http://localhost:3000

To stop the services:

    $ docker-compose stop

To kill the services:

    CTRL + C and then $ docker-compose down
