<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="map" href="/pages/map">
          <ion-icon :icon="mapSharp" />
        </ion-tab-button>

        <ion-tab-button tab="weather" href="/pages/weather">
          <ion-icon :icon="cloudyNightSharp" />
        </ion-tab-button>

        <ion-tab-button tab="setting" href="/pages/setting">
          <ion-icon :icon="settings" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { mapSharp, settings, cloudyNightSharp } from 'ionicons/icons';
</script>
