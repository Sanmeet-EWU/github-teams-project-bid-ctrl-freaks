<template>
    <ion-card class="ion-padding">
      <div class="basicinfo">
        <h5>{{ title }}</h5>
        <h6>{{ value }}</h6>
      </div>
    </ion-card>
  </template>

<script setup lang="ts">
import { IonCard } from '@ionic/vue';

const props = defineProps<{
  title: string;
  value: string;
}>();

</script>

<style scoped>
.basicinfo {
  margin: 0px;
  margin-top: -10px;
}
h5 {
  color: black;
  font-size: 1rem;
  font-weight: bold;
}

h6 {
  color: black;
  font-size: 1.2em;
  font-weight: normal;
}
</style>