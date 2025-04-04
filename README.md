# EShopFE

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Running the project with Docker

To run this project using Docker, follow these steps:

1. Ensure Docker and Docker Compose are installed on your system.
2. Build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

3. Access the application in your web browser at `http://localhost:80`.

### Notes

- The application is built using Node.js version 22.13.1 and served using Nginx.
- The Docker Compose configuration exposes port 80 for the application.
- No additional environment variables are required for this setup.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.