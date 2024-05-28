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
          <ion-toggle slot="end"></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>Location</ion-label>
          <ion-select slot="end" interface="action-sheet" placeholder="Spokane, WA">
            <ion-select-option value="spokane">Spokane, WA</ion-select-option>
            <ion-select-option value="seattle">Seattle, WA</ion-select-option>
            <ion-select-option value="portland">Portland, OR</ion-select-option>
            <ion-select-option value="boise">Boise, ID</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Temperature</ion-label>
          <ion-select slot="end" interface="action-sheet" placeholder="Fahrenheit">
            <ion-select-option value="celsius">Celsius</ion-select-option>
            <ion-select-option value="fahrenheit">Fahrenheit</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-iten class="temp">
          <ion-button slot="end" fill="outline">Login</ion-button>
          <ion-button slot="end" fill="outline">Sign Up</ion-button>
        </ion-iten>
      </ion-list>
    </ion-content>
    
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/vue';
import type { ToggleCustomEvent } from '@ionic/vue';
  import { ref } from 'vue';

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
</script>

<style scoped>
.temp {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
  }
</style>