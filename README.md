This project was made using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.9.

## Development server

From the project directory
Start a local development server, run:

```bash
ng serve
```

For a Live LAN accessible run with https:

```bash
ng serve --ssl --ssl-key ./server.key --ssl-cert ./server.crt --open --host 0.0.0.0
```
Note: This will necessitate changing the Fetch() links in main.ts

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

Run the backend server from the same directory
```bash
node --env-file=.env server.js 
```
