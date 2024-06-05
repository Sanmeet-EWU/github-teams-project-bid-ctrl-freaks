<template>
  <ion-page>
    <ion-header class="ion-no-border" mode="ios">
      <ion-toolbar class="ion-padding-start ion-padding-end">
        <ion-title>Weather</ion-title>
        <span slot="start">
          <NotificationButton :hourlyCodes=hourlyWeatherCodes :hourlyTemps=hourlyTemps />
        </span>
        <span slot="end">
          <SearchButton @searchCompleted="handleSearchCompleted" />
        </span>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <MainWeather :city=currentLocation :temperature="currentTemperatureDisplay"
        :weatherCode="getHourWeatherCode(0)" />

      <!-- <div class="infoTab ion-padding">
        <InfoTab title="Humidity" :value="getHourHumidity(currentHour)" />
        <InfoTab title="Wind" :value="getHourWind(currentHour)" />
        <InfoTab title="UV Index" :value="Math.round(getHourUV(currentHour))" />
        <InfoTab title="Visibility" :value="getHourVisibility(currentHour)" />
      </div> -->
      <div class="infoTab ion-padding">
        <InfoTab title="Humidity" value="2" />
        <InfoTab title="Wind" value="2" />
        <InfoTab title="UV Index" value="3" />
        <InfoTab title="Visibility" value="10" />
      </div>

      <ion-button @click="toggleFavorite('Spokane,WA')">
        {{ isFavorite('Spokane,WA') ? 'Remove from Favorites' : 'Add to Favorites' }}
      </ion-button>

      <div class="hourly">
        <h6 class="ion-padding-start">Today's Forecast:</h6>
        <div class="infoTab ion-padding">
          <ion-card class="ion-padding" @click="() => expand(index)" v-for="(temp, index) in hourlyTemps " :key="index">
            <!--Iterates through array of 24 hourly values, makes card for each one-->
            <h4>{{ formatHour(index) }}</h4>
            <!--Calls formatHour function in script based on index to determine if time is AM or PM and print time-->
            <GetIcon :weatherCode="getHourWeatherCode(index)" :hourOfDay="(currentHour + index) % 24" />
            <h3>{{ getFormattedTempValue(temp) }}</h3> <!--Prints rounded temperature variable from script-->
          </ion-card>
        </div>
      </div>

      <div class="daily">
        <h6 class="ion-padding-start">Weekly Forecast:</h6>
        <div class="infoTab ion-padding">
          <ion-card class="ion-padding" v-for="(hightemps, index) in hightemps" :key="index">
            <!--Iterates through array of 7 hourly values, makes card for each one-->

            <h4>{{ getDay(index) }}</h4>

            <h3>High:</h3>
            <h3>{{ getFormattedTempValue(hightemps) }}</h3> <!--Prints rounded temperature variable from script-->
            <!--Calls formatHour function in script based on index to determine if time is AM or PM and print time-->

            <GetIcon :weatherCode="getDailyWeatherCode(index)" :hourOfDay="index" />
            <h3>Low: </h3>
            <h3>{{ getFormattedTempValue(mintemps[index]) }}</h3> <!--Prints rounded temperature variable from script-->
          </ion-card>
        </div>
      </div>

      <!-- <div class="favorites">
        <h6 class="ion-padding-start">Favorite Cities:</h6>
        <div class="infoTab ion-padding">
          <ion-card class="ion-padding" v-for="city in favorites" :key="city">
            <h4>{{ city }}</h4>
            <ion-button @click="toggleFavorite(city)">
              Remove
            </ion-button>
          </ion-card>
        </div>
      </div> -->

      <teleport to="body">
        <div v-if="expandedIndex !== null" class="overlay" @click.self="collapse">
          <ion-card class="expanded-content">
            <ion-card-header>
              <ion-card-title>{{ formatHour(expandedIndex) }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <h4>Wind: {{ getHourWind(expandedIndex) }} MPH</h4>
              <h4> Humidity: {{ getHourHumidity(expandedIndex) }}</h4>
              <h4>Visibility: {{ Number(getHourVisibility(expandedIndex)) / 5280 }}</h4>
              <h4>UV Index: {{ getHourUV(expandedIndex) }}</h4>
            </ion-card-content>
          </ion-card>
        </div>
      </teleport>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonSpinner } from '@ionic/vue';
import { ref, onMounted, computed, watch } from 'vue';

import { Geolocation } from '@capacitor/geolocation';
import { LocalNotifications } from '@capacitor/local-notifications';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/main';

import datas from './forecast.json';
import axios from 'axios';

import userData from './user.json';
import MainWeather from '@/components/MainWeather.vue';
import InfoTab from '@/components/InfoTab.vue';
import NotificationButton from '@/components/NotificationButton.vue';
import SearchButton from '@/components/SearchButton.vue';
import GetIcon from "@/components/GetIcon.vue";

const expandedIndex = ref<number | null>(null);

const date = new Date();
const currentHour = date.getHours();

const currentCity = ref("");
const currentState = ref("");
const currentTemperature = ref<number>(0);
const currentWeatherCode = ref<number>(0);


const data = datas;

const hourlyTemps = ref<number[]>([]);
const hourlyWeatherCodes = ref<number[]>([]);
const hourlyWind = ref<number[]>([]);
const hourlyVisibility = ref<number[]>([]);
const hourlyHumidity = ref<number[]>([]);
const hourlyUV = ref<number[]>([]);


const hightemps = ref(data.daily.temperature_2m_max); //weekly high temps
const mintemps = ref(data.daily.temperature_2m_min); //weekly low temps

const lat = ref<number | null>(null);
const long = ref<number | null>(null);



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


const currentTemperatureDisplay = computed(() => {
  return hourlyTemps.value.length > 0
    ? getFormattedTempValue(currentTemperature.value)
    : 'N/A';
});

const currentLocation = computed(() => {
  return `${currentCity.value}, ${currentState.value}`;
});

function getFormattedTempValue(celcius: number) {
  return userData.User.tempType === 'celsius'
    ? `${Math.round(celcius)}°C`
    : `${Math.round(celcius * 9 / 5 + 32)}°F`;
}

function formatHour(index: number) {
  const hour = (currentHour + index) % 24;
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return `${displayHour}:00 ${ampm}`;
}

function expand(index: number) {
  expandedIndex.value = index;
}

function collapse() {
  expandedIndex.value = null;
}

const favorites = ref<string[]>([]);


function getDay(index: number) {
  const day = date.getDay();
  const actualValue = (day + index) % 7;
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[actualValue];
}

function getHours() {
  console.log(date.getHours)
  return date.getHours;
}

function getHourWeatherCode(hour: number) {
  return Number(hourlyWeatherCodes.value[hour]);
}

function getHourVisibility(hour: number) {
  return String(hourlyVisibility.value[hour]);
}

function getHourWind(hour: number) {
  return String(hourlyWind.value[hour]);
}

function getHourHumidity(hour: number) {
  return String(hourlyHumidity.value[hour]);
}

function getHourUV(hour: number) {
  return String(hourlyUV.value[hour]);
}

function getDailyWeatherCode(day: number) {
  return Number(data.daily.weather_code[day]);
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

async function printCurrentPosition() {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    lat.value = coordinates.coords.latitude;
    long.value = coordinates.coords.longitude;
    await fetchCityAndState(coordinates.coords.latitude, coordinates.coords.longitude);
  } catch (error) {
    console.error('Error getting location:', error);
  } finally {
    //loading.value = false;
  }
};

async function fetchCityAndState(latitude: number, longitude: number) {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat: latitude,
        lon: longitude,
        format: 'json',
      }
    });
    const data = response.data;

    if (data.address) {
      currentCity.value = data.address.city || data.address.town || data.address.village || '';
      currentState.value = data.address.state || '';
      await addOrUpdateLocation(currentLocation.value, latitude, longitude);
    } else {
      console.error('No location data found');
    }
  } catch (error) {
    console.error('Error fetching city and state:', error);
  }
};

function handleSearchCompleted(data: any) {
  currentCity.value = data.city;
  currentState.value = data.state;
  fetchWeatherDataForSearch(data.city, data.state);
}

async function fetchWeatherDataForSearch(city: string, state: string) {
  try {
    const locationRef = doc(db, 'locations', `${city}, ${state}`);
    const locationDoc = await getDoc(locationRef);
    if (locationDoc.exists()) {
      const data = locationDoc.data();
      updateWeatherData(data.forecast);
    } else {
      const locationName = city + ", " + state
      transToCoords(locationName);
      console.error('No weather data found for the location');
    }
  } catch (error) {
    console.error('Error fetching weather data for the location:', error);
  }
}

async function transToCoords(location: any) {
  const response = await axios.get('https://api.radar.io/v1/geocode/forward', {
    params: {
      query: location,
    },
    headers: {
      Authorization: 'prj_live_pk_de61d39fb19743651d51d8d7490c72116f0c2fcc', // Replace with your actual API key
    },
  });
  const latitude = response.data.addresses[0].latitude;
  const longitude = response.data.addresses[0].longitude;
  await addOrUpdateLocation(location, latitude, longitude);
}

function updateWeatherData(forecastData: any) {
  hourlyTemps.value = forecastData.hourly.temperature_2m.slice(currentHour, currentHour + 24);
  hourlyWeatherCodes.value = forecastData.hourly.weather_code.slice(currentHour, currentHour + 24);
  hourlyWind.value = forecastData.hourly.wind_speed_10m.slice(currentHour, currentHour + 24);
  hourlyVisibility.value = forecastData.hourly.visibility.slice(currentHour, currentHour + 24);
  hourlyHumidity.value = forecastData.hourly.relative_humidity_2m.slice(currentHour, currentHour + 24);
  hourlyUV.value = forecastData.hourly.uv_index.slice(currentHour, currentHour + 24);

  currentTemperature.value = forecastData.hourly.temperature_2m[currentHour];
  currentWeatherCode.value = forecastData.hourly.weather_code[currentHour];
}

async function fetchForecast(latitude: number, longitude: number) {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,visibility,wind_speed_10m,uv_index&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto&temperature_unit=celsius`)
  return await response.json();
}

async function addOrUpdateLocation(location: string, latitude: number, longitude: number) {
  if (!location) {
    console.error('Location name is required');
    return;
  }

  try {
    const locationRef = doc(db, 'locations', location);
    const locationDoc = await getDoc(locationRef);

    if (locationDoc.exists()) {
      const data = locationDoc.data();
      const lastUpdated = new Date(data?.lastUpdated);
      const oneHourAgo = new Date(Date.now() - 3600 * 1000);

      if (lastUpdated < oneHourAgo) {
        const forecastData = await fetchForecast(latitude, longitude);
        await setDoc(locationRef, {
          name: location,
          forecast: forecastData,
          lastUpdated: new Date().toISOString()
        });
        updateWeatherData(forecastData);
      } else {
        updateWeatherData(data.forecast);
      }
    } else {
      const forecastData = await fetchForecast(latitude, longitude);

      if (forecastData) {
        await setDoc(locationRef, {
          name: location,
          forecast: forecastData,
          lastUpdated: new Date().toISOString()
        });
        updateWeatherData(forecastData);
      } else {
        console.error(`Invalid forecast data for ${location}`);
      }
    }
  } catch (error) {
    console.error(`Error adding or updating location ${location}:`, error);
  }
}

watch([currentCity, currentState], () => {
  fetchWeatherDataForSearch(currentCity.value, currentState.value);
});

onMounted(() => {
  requestLocalNotificationPermission();
  printCurrentPosition();
});
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.expanded-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 70%;
  height: 50%;
  max-width: 800px;
  max-height: 400px;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.expanded-content p {
  margin: 0;
  padding: 0;
  font-size: 1rem;
  color: #333;
}
</style>
