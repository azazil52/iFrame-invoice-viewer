# Invoice Viewer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

The program can be run from the root folder by using the command (ng serve) which will fire up the application at localhost:4200

-   This application primarily serves as a sandbox to experiment with diffent ways of controlling the flow of information through the app.
-   The purpose of the project was to mock up an application that would allow login and registration that would then be connected to the 
    users matching credentials in a seperate financial table, displaying that data as formated data in the invoice screen
-   The invoice screen will show all invoice information and give the user the option to pay that invoice.
-   From there they will be taken through checkout where the info is validated against the stripe payment api before returning to the original
    invoice screen.
