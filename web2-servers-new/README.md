# Rest api and registraton form servers

This folder contains 2 folders, the registration folder containing the registration server
which serves the static files of the registration form, and the rest_api folder containing the API server which receives JSON data 
from the registration form via http requests. in the future, the rest_api would be able to initiate a payment action to
the smart contract upon receiving a transaction from the POS system.

### Running the apps

1. Ensure the folder is downloaded locally onto your device.
2. open the registration folder and rest_api folder in seperate terminals
3. install dependencies in both terminals by typing : 

```bash
npm install
```

4. next, you can turn on the respective servers 
In each terminal :

```bash
node server.js
```

5. Open [http://localhost:3000/uploads](http://localhost:3000/uploads) to view it in the browser.

6. change the input fields on the form as required.

7. click save

8. upon successful registration, a confirmation paage will appear and you should be able to see the sign up on the rest api terminal as well.
