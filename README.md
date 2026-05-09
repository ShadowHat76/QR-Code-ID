# DISCLAIMER: This application is designed to be run over LAN with a locally accessible database. 
# It has not been bulletproofed for global deployment. 
# Use at your own risk.

This project was made using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.9.

This project DID NOT USE GENERATIVE AI AT ANY STAGE.
NOT PLANNING.
NOT CODING.

## Development server

From the project directory
Start a local development server, run:

```bash
ng serve
```

For a Live LAN accessible site, run with https:

```bash
ng serve --ssl --ssl-key ./server.key --ssl-cert ./server.crt --open --host 0.0.0.0
```
Note: This will require self-signed certificates and necessitate changing the Fetch() links in qrcode.ts

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

Run the backend server from the same directory
```bash
node --env-file=.env server.js 
```
