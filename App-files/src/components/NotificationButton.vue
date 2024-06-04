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

            <ion-card v-for="(notif, index) in notifications " :key="index">
                <ion-card-content>
                    {{ notif }}
                </ion-card-content>
            </ion-card>


        </ion-content>
    </ion-modal>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue';
import { IonButton, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonCard, IonCardContent } from '@ionic/vue';
import { notificationsSharp, closeOutline } from 'ionicons/icons';


const props = defineProps<{
    hourlyCodes: number[],
    hourlyTemps: number[]
}>();

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
//Returns an array list of strings
var notifications = computed(() => generateDailyNotifications());

function generateDailyNotifications() {

    let notifs: Array<string> = []; //our array list that we push our messages into if we have weather conditions for today
    if (checkForFog()) notifs.push('Visibility is low outside, be careful!');
    if (rainingToday()) notifs.push('It has a high chance of rain today!');
    if (snowingToday()) notifs.push('Good chance of Snow today!');
    if (thunderstormToday()) notifs.push('Thunderstorm inbound!');
    if (veryHotToday()) notifs.push('Very hot temperatures today.');
    if (severeHeatToday()) notifs.push('Extreme heat warning! Stay inside!');
    if (veryColdToday()) notifs.push('Very cold temperatures today.');
    if (belowFreezingToday()) notifs.push('Below freezing temperatures today.');
    // if(badAirQualityToday()) notifs.push('Thunderstorm inbound!'); need new api likely
    // if(extremeWindToday()) notifs.push('Thunderstorm inbound!'); Need to see how we do this first    
    return notifs;
}

const veryHotTemp = 30;//30 c = 86 f

function veryHotToday() {
    for (var temp of props.hourlyTemps) if (temp >= veryHotTemp) return true;
    return false;
}

const severeHotTemp = 38;//38 c = 100.4 f

function severeHeatToday() {
    for (var temp of props.hourlyTemps) if (temp >= severeHotTemp) return true;
    return false;

}

const veryColdTemp = 10;//10 c = 50 f

function veryColdToday() {
    for (var temp of props.hourlyTemps) if (temp <= veryColdTemp) return true;
    return false;
}

const belowFreezingTemp = 0;//0 c = 32 f

function belowFreezingToday() {
    for (var temp of props.hourlyTemps) if (temp <= belowFreezingTemp) return true;
    return false;
}

const fogCodes = [45, 48];

function checkForFog() {
    for (var code of props.hourlyCodes) {
        if (fogCodes.includes(code)) return true;
    }
    return false;
}
const rainCodes = [45, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82];

function rainingToday() {
    for (var code of props.hourlyCodes) if (rainCodes.includes(code)) return true;
    //Or if we have rainChance > 5% we should also return true
    return false;
}

const snowCodes = [71, 73, 75, 77, 85, 86];

function snowingToday() {
    for (var code of props.hourlyCodes) if (snowCodes.includes(code)) return true;
    //Or if we have snowChance > 15% we should also return true
    return false;
}

const thunderstormCodes = [95, 96, 99];
function thunderstormToday() {
    for (var code of props.hourlyCodes) if (thunderstormCodes.includes(code)) return true;
    //Or if we have percipChance > 5% we should also return true
    return false;
}
</script>

<style scoped>
.iconnoti {
    color: black
        /* Placeholder color, adjust as needed */
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
