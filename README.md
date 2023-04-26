# simple-book-search
Simple book search web app using the Google Books API

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0-next-1.

#### Functionality:
- **Welcome screen:**<br>
  - When a user opens the app, he should insert his username (can’t be empty) and only after that redirected to the search page. There is no need to check if the user exists, just validate the form.

- **Search page:**<br>
  - Will had greeted with the username from the welcome screen on the top
  - Should have a search bar and a container which going to show the search result to the user.
  - Search will be trigger with any user input.
  - Search results should be limited to 20.
  - Clicking on any search result item should open a dialog box which going to show more details and an option to add the item to my Wishlist.
  - Bonus point: implement pagination for search. 

- **Wishlist page:**<br>
  - Should show all the Wishlist items with the option to remove from the Wishlist.

#### General Guidelines
- Write clean and clear code
- Take performance into consideration
- Use Angular CLI to create and run the project
- Bonus point: The app should be responsive.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
