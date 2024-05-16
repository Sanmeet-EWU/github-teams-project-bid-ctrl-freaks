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
          <ion-toggle slot="end"></ion-toggle>
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
</script>

<style scoped>

.temp {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
  }



</style>