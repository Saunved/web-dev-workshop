# WORKSHOP BACKEND

## Setup

Make sure you install [node](https://nodejs.org/en/download/) using [nvm](https://github.com/nvm-sh/nvm/).

Before setting up the server install nodemon:

`npm install nodemon -g`

Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. I recommend setting it up as a global dependency (  **remove flag -g to install it as a local dependency** ).

### Install required packages

Execute the following command inside the backend project directory to install all packages and dependencies required to run the project.

`npm install`

After completing the aforementioned steps you can now execute the following commands from the backend project directory to start the server:

`nodemon server`

Runs the server in the development mode on [http://localhost:5000](http://localhost:5000).
Nodemon reloads the server if edits are made in the code.

**Note: The previously mentioned command works only if nodemon has been installed as a dependency. To start the server without installing nodemon use the command:**

`npm run start`
