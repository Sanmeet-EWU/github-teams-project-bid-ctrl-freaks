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
          <ion-toggle :checked="paletteToggle" @ionChange="toggleChange($event)"></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>Notifications</ion-label>
          <ion-toggle slot="end"></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>GPS</ion-label>
          <ion-toggle :checked="gpsPermission" slot="end" disabled></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>Temperature</ion-label>
          <ion-select slot="end" interface="action-sheet" placeholder="Select Degree Metric"
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonItem, IonList, IonSelectOption, IonLabel, IonToggle } from '@ionic/vue';
import type { SelectCustomEvent, ToggleCustomEvent } from '@ionic/vue';
import { ref, onMounted } from 'vue';


const paletteToggle = ref(false);
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const gpsPermission = ref(false);

const toggleDarkPalette = (shouldAdd: boolean | undefined) => {
  document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
};

const initializeDarkPalette = (isDark: boolean | undefined) => {
  toggleDarkPalette(isDark);
};

initializeDarkPalette(prefersDark.matches);

prefersDark.addEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));


const toggleChange = (ev: ToggleCustomEvent) => {
  paletteToggle.value = ev.detail.checked;
  toggleDarkPalette(ev.detail.checked);
  localStorage.setItem('darkModeEnabled', ev.detail.checked.toString());
};

function gpsPermissionCheck() {
  navigator.geolocation.getCurrentPosition(
    () => {
      gpsPermission.value = true;
    },
    () => {
      gpsPermission.value = false;
    }
  );
}


const handleTempTypeChange = (ev: SelectCustomEvent) => {
  localStorage.setItem('tempUnit', ev.detail.value);
};


const loadSettings = () => {
  const darkModeEnabled = localStorage.getItem('darkModeEnabled');

  if (darkModeEnabled !== null) {
    paletteToggle.value = darkModeEnabled === 'true';
    toggleDarkPalette(paletteToggle.value);
  }

  gpsPermissionCheck();
};

// Load settings when the component is mounted
onMounted(() => {
  loadSettings();
});



</script>

<style scoped>
.temp {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
  }
</style>