# Checklist

It's my home project for my current work. This application serves to help you check information systems in your enterprise and as result you get a report with results.

This application consists of a list where each position is some kind of information system that you need to check and set the result to "OK" or "NOK". If the result is "NOK" you can add a description of the fault.
Based on the results of the check, you receive a report with all the results, as well as a generated letter that can be sent to someone by mail.
The application has an ".hta" extension and can only run on IE11 and below. This is because it uses an ActiveX library that can interact with your operating system and open and save files on your computer.
This application can search for files in the file system, execute SQL database queries, search for information from other sites using ajax requests, run programs from your computer, open sites, generate excel files and emails.

<p align="center">
<img src="https://media.giphy.com/media/rHR0Zt52FxgfTShrD4/giphy.gif" width="80%"></p>

The application uses the jQuery library and is built with gulp.
To start working with the application, run the command:

<code>npm i</code>

To build the project, run the command:

<code>gulp build</code>

Also you can run local server, run the command:

<code>gulp serve</code>
