<template>
    <ion-button fill="clear" size="small">
        <ion-icon class="iconnoti" :icon="searchSharp" />
    </ion-button>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { searchSharp } from 'ionicons/icons';


</script>

<style scoped>
.iconnoti {
    color: gray; /* may need to change color depend on setting later this is placeholder */
}
</style>