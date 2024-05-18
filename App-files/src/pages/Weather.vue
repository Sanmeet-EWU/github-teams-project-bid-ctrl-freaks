<template>
  <ion-page>
    <ion-header class="ion-no-border" mode="ios">
      <ion-toolbar class="ion-padding-start ion-padding-end">
        <ion-title>Weather</ion-title>
        <span slot="end">
          <ion-icon :icon="searchSharp" />
        </span>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h4 class="location">Spokane, WA</h4>
      <div class="weather-icon">
        <img src="../images/sunny.png">
      </div>
      <h2 class="weather">Sunny</h2>
      <h1 class="temperature">25°F</h1>


      <div class="infoTab ion-padding">
        <ion-card class="ion-padding">
          <div class="basicinfo">
            <h5>Wind</h5>
            <h6>10 mph</h6>
          </div>
        </ion-card>
        <ion-card class="ion-padding">
          <div class="basicinfo">
            <h5>Feels like</h5>
            <h6>69°C</h6>
          </div>
        </ion-card>
        <ion-card class="ion-padding">
          <div class="basicinfo">
            <h5>Feels like</h5>
            <h6>69°C</h6>
          </div>
        </ion-card>
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

        <div class="hourly">
          <h6 class="ion-padding-start">Daily Forecast:</h6>
          <div class="infoTab ion-padding">
            <ion-card class="ion-padding">
              <h4>Monday</h4>
              <img class="cardimg" src="../images/sunny.png">
              <h3>25°C</h3>
            </ion-card>
            <ion-card class="ion-padding">
              <h4>Tuesday</h4>
              <img class="cardimg" src="../images/sunny.png">
              <h3>25°C</h3>
            </ion-card>
            <ion-card class="ion-padding">
              <h4>Wednesday</h4>
              <img class="cardimg" src="../images/sunny.png">
              <h3>25°C</h3>
            </ion-card>
            <ion-card class="ion-padding">
              <h4>Thursday</h4>
              <img class="cardimg" src="../images/sunny.png">
              <h3>25°C</h3>
            </ion-card>
            <ion-card class="ion-padding">
              <h4>Friday</h4>
              <img class="cardimg" src="../images/sunny.png">
              <h3>25°C</h3>
            </ion-card>
            <ion-card class="ion-padding">
              <h4>Saturday</h4>
              <img class="cardimg" src="../images/sunny.png">
              <h3>25°C</h3>
            </ion-card>
            <ion-card class="ion-padding">
              <h4>Sunday</h4>
              <img class="cardimg" src="../images/sunny.png">
              <h3>25°C</h3>
            </ion-card>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonCard } from '@ionic/vue';
import { notificationsSharp, searchSharp } from 'ionicons/icons';

import { ref } from 'vue' //Imported this

//This is a temp json data structure for testing
const data = {
  "latitude": 52.52,
  "longitude": 13.419998,
  "generationtime_ms": 0.06198883056640625,
  "utc_offset_seconds": 0,
  "timezone": "GMT",
  "timezone_abbreviation": "GMT",
  "elevation": 38.0,
  "hourly_units": {
    "time": "iso8601",
    "temperature_2m": "°F",
    "weather_code": "wmo code",
    "wind_speed_10m": "mp/h"
  },
  "hourly": {
    "time": [
      "2024-05-18T00:00",
      "2024-05-18T01:00",
      "2024-05-18T02:00",
      "2024-05-18T03:00",
      "2024-05-18T04:00",
      "2024-05-18T05:00",
      "2024-05-18T06:00",
      "2024-05-18T07:00",
      "2024-05-18T08:00",
      "2024-05-18T09:00",
      "2024-05-18T10:00",
      "2024-05-18T11:00",
      "2024-05-18T12:00",
      "2024-05-18T13:00",
      "2024-05-18T14:00",
      "2024-05-18T15:00",
      "2024-05-18T16:00",
      "2024-05-18T17:00",
      "2024-05-18T18:00",
      "2024-05-18T19:00",
      "2024-05-18T20:00",
      "2024-05-18T21:00",
      "2024-05-18T22:00",
      "2024-05-18T23:00"
    ],
    "temperature_2m": [
      60.3,
      59.5,
      58.6,
      57.3,
      56.5,
      57.3,
      58.7,
      61.2,
      63.0,
      64.9,
      66.6,
      65.9,
      66.6,
      66.9,
      65.7,
      63.7,
      64.2,
      64.0,
      63.0,
      61.6,
      60.2,
      59.1,
      58.4,
      57.4
    ],
    "weather_code": [
      2,
      3,
      3,
      2,
      3,
      3,
      2,
      2,
      3,
      2,
      3,
      3,
      3,
      3,
      61,
      61,
      80,
      2,
      3,
      2,
      3,
      3,
      2,
      2
    ],
    "wind_speed_10m": [
      6.7,
      6.8,
      7.4,
      6.9,
      6.5,
      6.8,
      7.2,
      8.0,
      8.8,
      8.1,
      9.5,
      8.5,
      9.2,
      8.6,
      6.3,
      7.3,
      3.0,
      4.9,
      6.1,
      3.3,
      3.0,
      3.5,
      3.0,
      3.4
    ]
  }
}

// Stores reference to the temperature array that is iterated through in the template
const temp = ref(data.hourly.temperature_2m);

// Formats hour time based on the index
function formatHour(index) {
  const hour = index % 12 === 0 ? 12 : index % 12;
  const ampm = index < 12 ? 'AM' : 'PM';
  return `${hour}:00 ${ampm}`;
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


.location {
  color: black;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
}

.weather-icon {
  height: 14rem;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.weather {
  color: black;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}

.temperature {
  color: black;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
}

h5 {
  color: black;
  font-size: 1rem;
  font-weight: bold;
}

h6 {
  color: black;
  font-size: 1rem;
  font-weight: normal;
}

.basicinfo {
  margin: 0px;
  margin-top: -10px;
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
