# help-demo
## Demonstration Client
This little console app connects to an ill-behaved (and very creatively nasty) server
as specified in acceptance criteria as a coding exercise. 
as specified in acceptance criteria as a coding exercise. 

### Installation
Make sure that you have Node.js LTS (8) and npm (5)
installed.  Clone the github repo onto your local machine.

`git clone git@github.com:wmaness/help-demo.git`

`cd help-demo`

Then install dependencies.

`npm install`

#### TODO: Server values hard coded for demo
> Because it is a terrible idea to have connection or security information on github, you will need to set three environment variables before executing the code.

>`export help_demo_host=<1.2.3.4>` IP address of the server you want to connect to.

>` export help_demo_port=<1234>` Port you want to connect to

>`export help_demo_username=<MyUserName>` The username you want used for authentication to the demo server. (Limit 12 characters)


### Test
Mocha and chai are used for unit testing.  You can execute the tests using npm.

`npm test` - Runs tests

`npm coverage` - Reports test coverage

### Execution
To launch the app, npm to the rescue.

`npm start`

The application will prompt you with your options, and allow graceful disconnection.

### Logging
Application logs are being sent to loggly.com. Yes. I'm monitoring my process and spying on you.

