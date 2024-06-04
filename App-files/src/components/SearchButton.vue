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
                <ion-input v-model="searchTerm" placeholder="Enter search term"></ion-input>
            </ion-item>
            <ion-button expand="full" @click="performSearch">Search</ion-button>
        </ion-content>
    </ion-modal>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonInput, IonModal, IonContent, IonItem, IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/vue';
import { searchSharp, closeOutline } from 'ionicons/icons';

import { ref } from 'vue';
import axios from 'axios';

const emit = defineEmits(['searchCompleted']);

const isModalOpen = ref(false);
const searchTerm = ref('');

function openSearchModal() {
    isModalOpen.value = true;
}

function closeSearchModal() {
    isModalOpen.value = false;
}

async function performSearch() {
    const response = await axios.get('https://api.radar.io/v1/geocode/forward', {
        params: {
            query: searchTerm.value,
        },
        headers: {
            Authorization: 'prj_live_pk_de61d39fb19743651d51d8d7490c72116f0c2fcc', // Replace with your actual API key
        },
    });

    emit('searchCompleted', response.data.addresses[0]);

    closeSearchModal();
}

</script>

<style scoped>
.iconnoti {
    color: gray;
}
</style>