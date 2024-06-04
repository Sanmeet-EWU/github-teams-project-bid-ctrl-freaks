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

      <div class="hourly">
        <h6 class="ion-padding-start">Today's Forecast:</h6>
        <div class="infoTab ion-padding">
          <ion-card class="ion-padding" v-for="(temp, index) in temp" :key="index">
            <h4>{{ formatHour(index) }}</h4>
            <img class="cardimg" src="../images/sunny.png" />
            <h3>{{ Math.round(temp) }}°F</h3>
          </ion-card>
        </div>
      </div>

      <div class="daily">
        <h6 class="ion-padding-start">Weekly Forecast:</h6>
        <div class="infoTab ion-padding">
          <ion-card class="ion-padding" v-for="(hightemps, index) in hightemps" :key="index">
            <h4>{{ getDay(index) }}</h4>
            <h3>High:</h3>
            <h3>{{ Math.round(hightemps) }}°F</h3>
            <img class="cardimg" src="../images/sunny.png" />
            <h3>Low:</h3>
            <h3>{{ Math.round(mintemps[index]) }}°F</h3>
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

      <ion-page>
        <ion-header>
          <ion-toolbar>
            <ion-title>Geolocation</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <h4 class="location">{{ lat }}, {{ long }}</h4>
          <h4 class="city-state">{{ city }}, {{ state }}</h4>
          <div class="favorites">
            <h4>Favorites:</h4>
            <ion-list>
              <ion-item v-for="favorite in favorites" :key="favorite">
                <ion-label>{{ favorite }}</ion-label>
                <ion-button @click="removeFavorite(favorite)" color="danger">Remove</ion-button>
              </ion-item>
            </ion-list>
          </div>
        </ion-content>
      </ion-page>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonCard, IonButton, IonList, IonItem, IonLabel } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Geolocation } from '@capacitor/geolocation';
import datas from './forecast.json';
import MainWeather from '@/components/MainWeather.vue';
import InfoTab from '@/components/InfoTab.vue';
import NotificationButton from '@/components/NotificationButton.vue';
import SearchButton from '@/components/SearchButton.vue';

const lat = ref<number | null>(null);
const long = ref<number | null>(null);
const city = ref<string>('');
const state = ref<string>('');
const favorites = ref<string[]>(['Spokane, WA', 'New York, NY', 'Los Angeles, CA']);

const data = datas;

const temp = ref(data.hourly.temperature_2m);
const hightemps = ref(data.daily.temperature_2m_max);
const mintemps = ref(data.daily.temperature_2m_min);

const printCurrentPosition = async () => {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    lat.value = coordinates.coords.latitude;
    long.value = coordinates.coords.longitude;
    await fetchCityAndState(coordinates.coords.latitude, coordinates.coords.longitude);
  } catch (error) {
    console.error('Error getting location:', error);
  }
};

const fetchCityAndState = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat: latitude,
        lon: longitude,
        format: 'json',
      }
    });
    const data = response.data;
    console.log('Geocoding response:', data);
    if (data.address) {
      city.value = data.address.city || data.address.town || data.address.village || '';
      state.value = data.address.state || '';
    } else {
      console.error('No location data found');
    }
  } catch (error) {
    console.error('Error fetching city and state:', error);
  }
};

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

function getHourWeatherCode(hour: number) {
  return Number(data.hourly.weather_code[hour]);
}

function toggleFavorite(city: string) {
  const index = favorites.value.indexOf(city);
  if (index === -1) {
    favorites.value.push(city);
  } else {
    favorites.value.splice(index, 1);
  }
}

function removeFavorite(favorite: string) {
  favorites.value = favorites.value.filter(item => item !== favorite);
}

onMounted(() => {
  printCurrentPosition();
});
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
  color: red;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
}
.city-state {
  color: red;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0.5rem;
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
  color: red;
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