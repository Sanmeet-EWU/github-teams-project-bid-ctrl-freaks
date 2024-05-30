<template>
  <ion-page>
    <ion-header class="ion-no-border" mode="ios">
      <ion-toolbar class="ion-padding-start ion-padding-end">
        <ion-title>Weather</ion-title>
        <span slot="start">
          <ion-button fill="clear" size="small">
                <ion-icon class="iconnoti" :icon="notificationsSharp" />
          </ion-button>
        </span>
        <span slot="end">
          <ion-button fill="clear" size="small" >
                <ion-icon class="iconnoti" :icon="searchSharp" />
          </ion-button>
        </span>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="infoTab ion-padding">
        <h3 clas="title">{{currentCityName}}</h3>
        <img class="weather-icon" :src=weatherIconParser(getHourWeatherCode(date.getHours()))>
        <InfoTab title="Humidity" value="50%" />
        <InfoTab title="Wind" value="5 mph" />
        <InfoTab title="UV Index" value="3" />
        <InfoTab title="Visibility" value="10 mi" />
      </div>

      <div class="hourly">
        <h6 class="ion-padding-start">Hourly Forecast:</h6>
        <div class="infoTab ion-padding">
          <ion-card class="ion-padding" v-for="(temp, index) in temp" :key="index">
            <!--Iterates through array of 24 hourly values, makes card for each one-->
            <h4>{{ formatHour(index) }}</h4>
            <!--Calls formatHour function in script based on index to determine if time is AM or PM and print time-->
            <img class="cardimg" :src=weatherIconParser(getHourWeatherCode(index)) />
            <h3>{{ Math.round(temp) }}°F</h3> <!--Prints rounded temperature variable from script-->
          </ion-card>
        </div>
      </div>

      <div class="daily">
        <h6 class="ion-padding-start">Weekly Forecast:</h6>
        <div class="infoTab ion-padding">
          <ion-card class="ion-padding" v-for="(hightemps,index) in hightemps" :key="index">
            <!--Iterates through array of 7 hourly values, makes card for each one-->

            <h4>{{getDay(index)}}</h4>
            
            <h3>High:</h3>
            <h3>{{Math.round(hightemps) }}°F</h3> <!--Prints rounded temperature variable from script-->
            <!--Calls formatHour function in script based on index to determine if time is AM or PM and print time-->
            <img class="cardimg" :src=weatherIconParser(getDailyWeatherCode(index)) />
            <h3>Low:</h3>
            <h3>{{Math.round(mintemps[index])}}°F</h3> <!--Prints rounded temperature variable from script-->
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonCard, IonButton, IonBadge } from '@ionic/vue';
import { searchSharp, notificationsSharp } from 'ionicons/icons';
import { defineComponent,ref, onMounted } from 'vue' //Imported this
import datas from './forecast.json'
import MainWeather from '@/components/MainWeather.vue'
import InfoTab from '@/components/InfoTab.vue'
import CloudyDay from '../images/animated_icon/cloudy-day-3.svg'
import CloudyNight from '../images/animated_icon/cloudy-night-3.svg'
import Overcast from '../images/animated_icon/cloudy.svg'
import Foggy from '../images/animated_icon/foggy.gif'
import sunnyRain from '../images/animated_icon/sunnyRain.svg'
import LightRain from '../images/animated_icon/rainy-4.svg'
import moderateRain from '../images/animated_icon/rainy-5.svg'
import heavyRain from '../images/animated_icon/rainy-6.svg'
import slightSnow from '../images/animated_icon/snowy-4.svg'
import Snowy from '../images/animated_icon/snowy-6.svg'
import Sunny from '../images/animated_icon/day.svg'
import Thunderstorm from '../images/animated_icon/thunder.svg'



/*onMounted(() => {
  //set the default color to white
});
*/

const data = datas  //this import data directly from json files and use it
const currentCityName = "Spokane, WA";

// Stores reference to the hourly temperature array that is iterated through in the template
const temp = ref(data.hourly.temperature_2m);
const date = new Date();
// Formats hour time based on the index
function formatHour(index : number) {
  const hour = index % 12 === 0 ? 12 : index % 12;
  const ampm = index < 12 ? 'AM' : 'PM';
  return `${hour}:00 ${ampm}`;
}
// Stores reference to the daily high temperature array that is iterated through in the template
const hightemps = ref(data.daily.temperature_2m_max);


// Stores reference to the daily min temperature array that is iterated through in the template
const mintemps = ref(data.daily.temperature_2m_min);

// Formats hour time based on the index

function getDay(index: number) {
  const day = date.getDay();
  const actualValue = (day+index) % 7;
  switch (actualValue) {
    case 0:
        return "Sunday";
        break;
    case 1:
        return "Monday";
        break;
    case 2:
        return "Tuesday";
        break;
    case 3:
        return "Wednesday";
        break;
    case 4:
        return "Thursday";
        break;
    case 5:
         return "Friday";
        break;
    case 6:
        return "Saturday";
        break;
    default:
        console.log("No such day exists!");
        break;
      }
}
function getHourWeatherCode(hour : number){
  return Number(data.hourly.weather_code[hour]);
}
function getDailyWeatherCode(day  : number){
  return Number(data.daily.weather_code[day]);
}

function weatherIconParser(weatherCode : Number){
  const date = new Date();
  switch (weatherCode){
    case 0: //clear sky
    case 1: //mainly clear
      return Sunny
    
    case 2: //partially cloudy
          //sun and clouds or moon and clouds
          if(date.getHours() > 15) return CloudyNight
          return CloudyDay
    case 3: //Overcast
      return Overcast
    case 45: //Fog  
    case 48: //also fog lets be real
      return Foggy 
    case 51://light drizzle
    case 56://light freezing drizzle
    case 61://light rain
    case 66://light freezing rain
    case 80://slight rain shower
      if(date.getHours() <16) return sunnyRain
      return LightRain
    case 53: //moderate drizzle
    case 63: //Moderate Rain
    case 81: //Moderate rain shower
      return moderateRain
    case 55://Heavy drizzle
    case 65://Heavy rain
    case 67://Heavy freezing rain
    case 82://Violent rain shower
      return heavyRain 
    case 71://Slight snowy
     // if(date.getHours() < 16) return sunSlightSnow
      return slightSnow
    case 73: //moderate snowy
    case 75: //Heavy Snowfall
    case 77: //Snow grains
    case 85: //Light snow shower
    case 86: //heavy snow shower
      return Snowy
    case 95: //thunderstorm
    case 96: //Thunderstorm slight hail
    case 99: //Thunderstorm heavy hail
      return Thunderstorm
    default:
      return Sunny
  }
}


</script>

<style scoped>
ion-content {
  --background: url('../images/blur-background.png') no-repeat center center / cover;
  --background-color: none;
  --background-image: none;
  --background-position: none;
  --background-size: none;
  --background-repeat: none;
  --background-attachment: none;
  --background-blend-mode: none;
}

.infoTab {
  white-space: nowrap;
  overflow-x: auto;

}

ion-card {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  margin: 0px;
  margin-right: 0.5rem;
  width: 115px;
}

h4 {
  color: black;
  font-size: 1rem;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 10px;
  text-align: center;
}

h3 {
  color: black;
  font-size: 1rem;
  font-weight: bold;
  margin: 0px;
  margin-top: 10px;
  text-align: center;
}

h6 {
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0px;
  margin-top: 1rem;
}

.cardimg {
  height: 5rem;
  display: block;
  margin: 0 auto;
}
.weather-icon {
  height: 16rem;
  display: flex;
  justify-content: center;
  margin: 0px;
}


.iconnoti {
    color: purple; /* may need to change color depend on setting later this is placeholder */
}
.title {
  color: black;
  font-size: 1rem;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 10px;
  text-align: center;
}
</style>
