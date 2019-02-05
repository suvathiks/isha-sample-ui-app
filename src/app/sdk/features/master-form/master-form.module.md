# Dependencies:-
1. "@ngxs/store"
2. "primeng" // Follow instructions in official primeng documentation

# Description:-
This module offers full featured form that can be imported wherever forms are necessary.

## Features include:-
1. Prevention of accidental loss of unsaved data. Warns the user if they are trying to close the form when unsaved changes exist. Also works when closing the tab or browser.
2. Form notifications on both successful and unsuccessful save.

# Instructions-

In order for the form notifications to be styled differently on successful and unsuccessful save, the custom stylesheet must be imported into the main styles.scss sheet of the app. Add this line to the top of the file `@import "./app/sdk/features/master-form/form-notifications/notification.style.scss";`
