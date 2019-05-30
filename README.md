# Acknowledgements
This project originated from this open source project: https://github.com/auth0-blog/angular-material.  I would like to thank the author for his valuable contributions.

## Purpose
This project is still Angular-based and utilizes the Angular Material library for UI components.  It adds to the original project in the following ways:
* Upgrades to Angular 7
* Adds more valuable unit tests
* Improves upon the user experience primarily with regard to authentication
* Upgrades from Auth0's implementation of the Implicit flow to using Auth0's newest JS SDK, which implements the [Authorization Code w\PKCE] (https://oauth.net/2/pkce/) grant type

# How to run this project

## Tool Prerequisites

To run the project outside of Docker, you must install the [Angular CLI](https://github.com/angular/angular-cli).  This project was generated with version 7.3.9.

In addition, you will find that the VSCode editor from Microsoft is very useful if you do not already use another editor:

Visual Studio Code:

   - [Mac](https://go.microsoft.com/fwlink/?LinkID=534106)
   - [Windows](https://go.microsoft.com/fwlink/?LinkID=534107)

The remaning instructions are split between not-using-Docker, and using-Docker.

## Using the Angular CLI development server

Run `ng serve` for a dev server. Navigate to `http://localhost:3100/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Using Docker

This launch configuration will start up the web service, accessible via port 3100, as well as enable remote debugging, accessible via port 9222. It will also monitor the source code directory for changes, recompiling on the fly and restarting ng serve within the container.