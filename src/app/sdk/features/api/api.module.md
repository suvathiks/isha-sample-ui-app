# Dependencies:-
1. "@angular/material" (dependencies - "@angular/cdk" and "@angular/animations") // for the error notifier service

# Description:-
This has useful abstractions for any application that has a backend service integrated.

## Features include:-
1. Config file that allows for specification of all the api endpoints in a single location
2. Header injection service that automatically injects headers on all outbound HTTP requests
3. Error handling service, that automatically catches Http errors on all HTTP responses and shows generic notification on such errors and also logs details of errors in the console. Notifications can be disabled or shown conditionally.

Follow instructions below to enable it.

# Instructions

1. Configure the `sdk/config/api.config.ts` file to list all API endpoints. Wherever necessary, import the endpoints from this location. 
2. Modify other details like API gateway URL (or base URL), header options etc.

