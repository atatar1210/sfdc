# sfdc
Component Name : weatherAPILWC
Implementation:
  a. Created Location object to store name of the location and WeatherInfo to store weather details
  b. Created Apex class FetchWeatherData.cls 
      This class performs REST API callout and sends response to LWC 
  c. LWC weatherAPILWC displayed city weather and also calls apex method to save the information
  d. weatherAPILWC is added on record page of Location object on top of detail section. It fetches weather data for the city on location record
  e. The weatherInfo record is linked to the Location object as they share Lookup relationship



  Component Name: TaskManager
  Implementation:
    a.Created apex class GetUserTasks to fetch list of tasks for current user
    b.Created LWC to display the task list. 
    c.This has a new button which opens a pop up for user to create new task and save it.
   
