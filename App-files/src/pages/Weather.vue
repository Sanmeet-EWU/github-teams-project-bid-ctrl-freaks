<template>
  <ion-page>
    <ion-header class="ion-no-border" mode="ios">
      <ion-toolbar class="ion-padding-start ion-padding-end">
        <ion-title>Weather</ion-title>
        <span slot="start">
          <NotificationButton />
        </span>
        <span slot="end">
          <SearchButton />
        </span>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <MainWeather City="Spokane,WA" weather="Thunderstorm" temperature="25°F" />

      <div class="infoTab ion-padding">
        <InfoTab title="Humidity" value="50%" />
        <InfoTab title="Wind" value="5 mph" />
        <InfoTab title="UV Index" value="3" />
        <InfoTab title="Visibility" value="10 mi" />
      </div>

      <div class="hourly">
        <h6 class="ion-padding-start">Today's Forecast:</h6>
        <div class="infoTab ion-padding">
          <ion-card class="ion-padding" v-for="(temp, index) in temp" :key="index">
            <!--Iterates through array of 24 hourly values, makes card for each one-->
            <h4>{{ formatHour(index) }}</h4>
            <!--Calls formatHour function in script based on index to determine if time is AM or PM and print time-->
            <img class="cardimg" src="../images/sunny.png" />
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
            <img class="cardimg" src="../images/sunny.png" />
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
import { ref, onMounted } from 'vue' //Imported this
import datas from './forecast.json'
import MainWeather from '@/components/MainWeather.vue'
import InfoTab from '@/components/InfoTab.vue'
import NotificationButton from '@/components/NotificationButton.vue';
import SearchButton from '@/components/SearchButton.vue';





onMounted(() => {
  //set the defualt color to white
});


const data = datas  //this import data directly from json files and use it


// Stores reference to the hourly temperature array that is iterated through in the template
const temp = ref(data.hourly.temperature_2m);

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
const date = new Date();
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
  height: 3rem;
  display: block;
  margin: 0 auto;
}


</style>
