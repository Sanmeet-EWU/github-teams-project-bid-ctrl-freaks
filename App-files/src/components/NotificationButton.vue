<template>
    <div class="icon-wrapper">
        <ion-button fill="clear" size="small" @click="openModal">
            <ion-icon class="iconnoti" :icon="notificationsSharp" />
            <div v-if="hasNewNotifications" class="notification-badge"></div>
        </ion-button>
    </div>
    <ion-modal :is-open="isModalOpen" @did-dismiss="closeModal">
        <ion-content class="no-padding">
            <ion-header>
                <ion-toolbar>
                    <ion-title class="ion-text-center">Notifications</ion-title>
                    <ion-buttons slot="end">
                        <ion-icon class="iconnoti" @click="closeModal" :icon="closeOutline" size="large" />
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-card>
                <ion-card-content>
                    Look like it going to rain today. Don't forget to bring your umbrella.☂️
                </ion-card-content>
            </ion-card>
            <ion-card>
                <ion-card-content>
                    Sunny day today. Perfect day to go out and enjoy the sun.🌞
                </ion-card-content>
            </ion-card>
            <ion-card>
                <ion-card-content>
                    Thunderstorm warning in your area. Stay safe and stay inside.⚡
                </ion-card-content>
            </ion-card>
            

        </ion-content>
    </ion-modal>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonCard, IonCardContent } from '@ionic/vue';
import { notificationsSharp, closeOutline } from 'ionicons/icons';

const isModalOpen = ref(false);
const hasNewNotifications = ref(true); // set to true when pushing a new notification

// Method to open the modal
const openModal = () => {
    isModalOpen.value = true;
    hasNewNotifications.value = false; // Reset notification indicator when modal is opened
};

// Method to close the modal
const closeModal = () => {
    isModalOpen.value = false;
};
</script>


<style scoped>
.iconnoti {
    color: gray; /* Placeholder color, adjust as needed */
}

.icon-wrapper {
    position: relative;
    display: inline-block;
}

.notification-badge {
    position: absolute;
    top: -5px;
    right: -4px;
    width: 9px;
    height: 9px;
    background-color: red;
    border-radius: 50%;
}

.no-padding ion-card {
    margin: 0;
}

</style>
