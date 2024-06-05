<template>
    <ion-button @click="openSearchModal" fill="clear" size="small">
      <ion-icon class="iconnoti" :icon="searchSharp" />
    </ion-button>
  
    <ion-modal :is-open="isModalOpen" @did-dismiss="closeSearchModal">
      <ion-header>
        <ion-toolbar>
          <ion-title>City Search</ion-title>
          <ion-buttons slot="end">
            <ion-icon class="iconnoti" @click="closeSearchModal" :icon="closeOutline" size="large" />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-item>
          <ion-input v-model="searchTerm" @input="searchCities" placeholder="Enter search city"></ion-input>
        </ion-item>
        <ion-list>
          <ion-item v-for="(match, index) in matches" :key="`${match.city_ascii}-${match.lat}-${match.lng}-${index}`" @click="SelectCity(match)">
            <div>
              <strong>{{ match.city_ascii }}</strong> ( {{ match.lat }}, {{ match.lng }} )<br>
              {{ match.admin_name }}, {{ match.country }}
            </div>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
  </template>
  
  <script setup lang="ts">
  import { IonButton, IonIcon, IonInput, IonModal, IonContent, IonItem, IonHeader, IonToolbar, IonButtons, IonTitle, IonList } from '@ionic/vue';
  import { searchSharp, closeOutline } from 'ionicons/icons';
  import { findClosestMatches, CityMatch } from '../script/CitySearch';
  import { ref, watch } from 'vue';
  import axios from 'axios';
  
  const isModalOpen = ref(false);
  const searchTerm = ref('');
  const matches = ref<CityMatch[]>([]);

const emit = defineEmits(['searchCompleted']);
  
  function openSearchModal() {
    isModalOpen.value = true;
  }
  
  function closeSearchModal() {
    isModalOpen.value = false;
    searchTerm.value = '';
    matches.value = [];
  }
  
  function searchCities() {
    if (searchTerm.value.length >= 3) {
      matches.value = findClosestMatches(searchTerm.value);
    } else {
      matches.value = [];
    }
  }

  async function SelectCity(match: CityMatch) { 
    /*can use match.city_ascii, match.lat, match.lng, match.admin_name, match.country 
      to enter data for pull here, should be the click on data
    */
    const response = await axios.get('https://api.radar.io/v1/geocode/forward', {
        params: {
            query: match.city_ascii,
        },
        headers: {
            Authorization: 'prj_live_pk_de61d39fb19743651d51d8d7490c72116f0c2fcc', // Replace with your actual API key
        },
    });
    emit('searchCompleted', response.data.addresses[0]);
    closeSearchModal();
  }
  
  watch(searchTerm, searchCities);
  
  </script>
  
  <style scoped>
  .iconnoti {
    color: gray;
  }
  </style>
  