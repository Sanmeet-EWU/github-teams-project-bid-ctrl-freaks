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
      <MainWeather City="Spokane,WA" temperature="25°F" :weatherCode="getHourWeatherCode" />

      <div class="infoTab ion-padding">
        <InfoTab title="Humidity" value="50%" />
        <InfoTab title="Wind" value="5 mph" />
        <InfoTab title="UV Index" value="3" />
        <InfoTab title="Visibility" value="10 mi" />
      </div>

      <ion-button @click="toggleFavorite('Spokane,WA')">
        {{ isFavorite('Spokane,WA') ? 'Remove from Favorites' : 'Add to Favorites' }}
      </ion-button>

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

      <div class="favorites">
        <h6 class="ion-padding-start">Favorite Cities:</h6>
        <div class="infoTab ion-padding">
          <ion-card class="ion-padding" v-for="city in favorites" :key="city">
            <h4>{{ city }}</h4>
            <ion-button @click="toggleFavorite(city)">
              Remove
            </ion-button>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import datas from './forecast.json';
import MainWeather from '@/components/MainWeather.vue';
import InfoTab from '@/components/InfoTab.vue';
import NotificationButton from '@/components/NotificationButton.vue';
import SearchButton from '@/components/SearchButton.vue';
import { LocalNotifications } from '@capacitor/local-notifications';

function requestLocalNotificationPermission() {
  LocalNotifications.requestPermissions().then((result) => {
    if (result.display === 'granted') {
      scheduleNotification();
    }
  }).catch((error) => {
    console.error('Error requesting local notification permission:', error);
  });
}

function scheduleNotification() {
  LocalNotifications.schedule({
    notifications: [
      {
        title: 'Weather App',
        body: 'Check the weather!',
        id: 1,
        schedule: { at: new Date(Date.now() + 5000) },
        actionTypeId: '',
        extra: null
      }
    ]
  }).catch((error) => {
    console.error('Error scheduling local notification:', error);
  });
}

onMounted(() => {
  requestLocalNotificationPermission();
});

const data = datas;

const temp = ref(data.hourly.temperature_2m);
const hightemps = ref(data.daily.temperature_2m_max);
const mintemps = ref(data.daily.temperature_2m_min);
const favorites = ref<string[]>([]);

function formatHour(index: number) {
  const hour = index % 12 === 0 ? 12 : index % 12;
  const ampm = index < 12 ? 'AM' : 'PM';
  return `${hour}:00 ${ampm}`;
}

const date = new Date();
function getDay(index: number) {
  const day = date.getDay();
  const actualValue = (day + index) % 7;
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[actualValue];
}

function toggleFavorite(city: string) {
  const index = favorites.value.indexOf(city);
  if (index === -1) {
    favorites.value.push(city);
  } else {
    favorites.value.splice(index, 1);
  }
}

function isFavorite(city: string): boolean {
  return favorites.value.includes(city);
}

function getHourWeatherCode(hour: number) {
  return Number(data.hourly.weather_code[hour]);
}
</script>

<style scoped>
ion-content {
  --background: url('../images/blur-background.png') no-repeat center center / cover;
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

.favorites {
  margin-top: 2rem;
}
</style>