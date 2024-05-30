<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Geolocation</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h4 class="location">{{ lat }}, {{ long }}</h4> 
      <!-- Displays the lat and long from the geolocation API, uses the "location" class for setting text color and layout -->
      <h4 class="city-state">{{ city }}, {{ state }}</h4>
      <!-- Displays the city and state -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation'; //need to run command npm install @capacitor/geolocation
import { ref, onMounted } from 'vue'; // Import ref and onMounted from Vue
import axios from 'axios'; // Run command "npm install axios" to install Axios for this to work if it doesnt work

const lat = ref<number | null>(null);
const long = ref<number | null>(null);
const city = ref<string>('');
const state = ref<string>('');

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

const fetchCityAndState = async (latitude: any, longitude: any) => { //need type for it to work
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

onMounted(() => {
  printCurrentPosition();
});
// url('../images/holder.png') no-repeat center center / cover; png image holder placed here for better visual of lat and long
</script>

<style scoped>
ion-content {
  --background: none;
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
</style>