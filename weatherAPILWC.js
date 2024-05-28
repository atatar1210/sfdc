import { LightningElement,api ,wire,track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { RefreshEvent } from 'lightning/refresh';
import getCurrentWeatherData from '@salesforce/apex/FetchWeatherData.getCurrentWeatherData';
import insertWeatherInfo from '@salesforce/apex/FetchWeatherData.insertWeatherInfo';
import { getRecord } from 'lightning/uiRecordApi';
import CITY_FIELD from "@salesforce/schema/Location__c.Name";
export default class WeatherAPILWC extends LightningElement {

@api recordId;
 city;
 description;
 tempMin;
 tempMax;
 weatherData = [];

 /**
  * @description This method gets the Location details based on record Id
  * and calls method to fetch weather details.
  * @param {RecotrdId, City} 
  */
@wire(getRecord, { recordId: '$recordId', fields: CITY_FIELD })
    location({ error, data }) {
        if (error) {
            console.log('Error Occered in @Wire-->'+error.body.message);
        } else if (data) {
            this.city = data.fields.Name.value;
            this.GetWeatherInfo(this.city);
        }
    }

    /**
     * @description This method fetches weather details of the city which is passed as attribute
     * @param {*} city 
     */
GetWeatherInfo(city){
    getCurrentWeatherData({city: this.city})
    .then(response=> {
             this.weatherData = JSON.parse(response);
             this.tempMax =  JSON.stringify(this.weatherData.main.temp_max);
             this.tempMin = JSON.stringify(this.weatherData.main.temp_min);
             this.description = JSON.stringify(this.weatherData.weather[0].description);
             this.description = this.description.replace(/"/g, "");
             this.handleSave(this.recordId);
         
    })
    .catch(error=>{
        console.log('%% error'+ JSON.stringify(error));
    })
  } 


  /**
   * @description This method saves the weather details in WeatherInfo__c object
   */
  handleSave() {
    insertWeatherInfo({
        locationId :  this.recordId,
    })
    .then(result => {
      // Show success messsage
      this.dispatchEvent(new ShowToastEvent({
        title: 'Success!!',
        message: 'Weather Info record Created Successfully!!',
        variant: 'success'
      }), );
      this.dispatchEvent(new RefreshEvent());
    })
    .catch(error => {
        const event = new ShowToastEvent({
            title : 'Error',
            message : 'Error saving weather details. Please Contact System Admin',
            variant : 'error'
        });
        this.dispatchEvent(event);
     });
  }
}

