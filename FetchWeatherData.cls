/**
 * @description This class is invoked from weatherAPILWC component.
 * It performed REST callout to openWeatherAPI and also save relevant information
 */
public with sharing class FetchWeatherData {
    /**
     * @description : This method is used to get weather Data for city by making callout
     * @param : city
     */
   @AuraEnabled(cacheable=true)
    public static string getCurrentWeatherData (string city) {
        
        String apiKey = '5e4229f9ef2a7f051ca29c33e9583435';
 
                String requestEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
                requestEndpoint += '?q=' + city;
                requestEndpoint += '&APPID=' + apiKey;
        
                Http http = new Http();
                HttpRequest request = new HttpRequest();
                request.setEndpoint(requestEndpoint);
                request.setMethod('GET');
                HttpResponse response = http.send(request);
                if (response.getStatusCode() == 200) {
                    return response.getBody();
                }
                 else {
                    return 'Error fetching weather data';
                } 
              } 
    
     /*
     * @description This method is used to insert weather data
     * @param locationId
     */  
      @AuraEnabled
      public static void insertWeatherInfo(String locationId) {
         try {
            WeatherInfo__c weatherInfoRecord = new WeatherInfo__c();
            insert weatherInfoRecord;
         } catch (Exception e) {
      		System.debug('--->'+e);
      }
   }
}