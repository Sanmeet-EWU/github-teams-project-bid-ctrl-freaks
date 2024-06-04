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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton, IonList, IonItem, IonLabel } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Geolocation } from '@capacitor/geolocation';
import NotificationButton from '@/components/NotificationButton.vue';
import SearchButton from '@/components/SearchButton.vue';

const lat = ref<number | null>(null);
const long = ref<number | null>(null);
const city = ref<string>('');
const state = ref<string>('');
const favorites = ref<string[]>(['Spokane, WA', 'New York, NY', 'Los Angeles, CA']);

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
  color: black;
  font-size: 1rem;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 10px;
  text-align: center;
}

.favorites {
  margin-top: 2rem;
}
</style>