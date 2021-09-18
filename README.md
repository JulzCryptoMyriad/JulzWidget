# JulzWidget
A widget containing a crypto payment button that interacts with the previosly deployed contract of the user that owns the webpage where the widget runs.

## Get Started
1. Clone the project.
2. `cd julzwidgetapp`
3. Run `npm i` to install all dependencies.

## How To Run
Since we have both a back end and a front end, we need to run the following:
1. `npm start` from `./julzwidgetapp`.
2. `nodemon server.js` from `./julzwidgetapp/src/server`.
3. You can run it on its own adding `{url}/{id of target contract}/{USD price amount}`, or you can see the working Demo [here](https://github.com/JulzCryptoMyriad/JulzDemoClientSite)
4. Make sure to be connected to the same network where the deployed contract is located.
