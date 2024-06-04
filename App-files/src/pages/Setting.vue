<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
  
          <ion-label>Dark Mode</ion-label>
           <!--button toggle where it checks to see if dark is mode is on or not-->
          <ion-toggle :checked="paletteToggle" @ionChange="toggleChange($event)" 
          ></ion-toggle
        >
        </ion-item>
        <ion-item>
          <ion-label>Notifications</ion-label>
          <ion-toggle slot="end"></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>GPS</ion-label>
          <ion-toggle slot="end" interface="action-sheet" placeholder="gps tracking on" @ionchange="handleGPSChange($event)">
            <ion-toggle value="true"></ion-toggle>
            </ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>Location</ion-label>
          <ion-select slot="end" interface="action-sheet" placeholder=currentLocation>
            <ion-select-option value="spokane">Spokane, WA</ion-select-option>
            <ion-select-option value="seattle">Seattle, WA</ion-select-option>
            <ion-select-option value="portland">Portland, OR</ion-select-option>
            <ion-select-option value="boise">Boise, ID</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Temperature</ion-label>
          <ion-select slot="end" interface="action-sheet" placeholder= "Select Metric" @ionChange= "handleTempTypeChange($event)">
            @ionChange="handleTempTypeChange($event)">
            <ion-select-option value="celsius">Celsius</ion-select-option>
            <ion-select-option value="fahrenheit">Fahrenheit</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
    </ion-content>
    
  </ion-page>
</template>

<script setup lang="ts">
import userData from './user.json';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonSelect, IonItem, IonList, IonSelectOption, IonLabel, IonToggle } from '@ionic/vue';
import type { SelectCustomEvent, ToggleCustomEvent } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
  const paletteToggle = ref(false);

// Use matchMedia to check the user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Add or remove the "ion-palette-dark" class on the html element
const toggleDarkPalette = (shouldAdd: boolean | undefined) => {
  document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
};

// Check/uncheck the toggle and update the palette based on isDark
const initializeDarkPalette = (isDark: boolean | undefined) => {
  toggleDarkPalette(isDark);
};

// Initialize the dark palette based on the initial value of the prefers-color-scheme media query
initializeDarkPalette(prefersDark.matches);

// Listen for changes to the prefers-color-scheme media query
prefersDark.addEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));

// Listen for the toggle check/uncheck to toggle the dark palette
const toggleChange = (ev: ToggleCustomEvent) => {
  toggleDarkPalette(ev.detail.checked);
};

const handleTempTypeChange = (e: SelectCustomEvent)=>{
  console.log(e.detail.value);
  //change json file value to e.detail.value
  userData.User.tempType = e.detail.value;
};

const handleGPSChange = (e: ToggleCustomEvent) =>{
console.log(e.detail.value);
userData.User.gpsOn = e.detail.value;
};

function gpsOn(gps : boolean){
  if(userData.User.gpsOn == true){
    return true;
  }
  else{
  return false; 
  }
}




</script>

<style scoped>
.temp {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
  }
</style>