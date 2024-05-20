<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Geolocation</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h4 class="location">{{ lat }}, {{ long }}</h4> 
      <!--displays the lat and long from the geolocation api, uses the "location" class for setting text color and layout-->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation'; //imported Geolocation from capacitor
import { ref, onMounted } from 'vue'; //imported as well 

const lat = ref<number | null>(null);
const long = ref<number | null>(null);

const printCurrentPosition = async () => {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    lat.value = coordinates.coords.latitude;
    long.value = coordinates.coords.longitude;
  } catch (error) {
    console.error('Error you may not be on Earth :P :', error);
  }
};

onMounted(() => {
  printCurrentPosition();
});
//url('../images/holder.png') no-repeat center center / cover; png image holder placed here for better visual of lat and long
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
    color: black;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1rem;
  }
</style>
