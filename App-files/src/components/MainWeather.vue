<template>
<h3 class="location">{{ City }}</h3>
      <div class="weather-icon">
        <img :src=weatherIcon>
        <h3>{{weatherIcon}}</h3>
      </div>c
      <h1 class="temperature">{{temperature}}</h1>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  City: String,
  temperature: String,
  weatherIcon: String
}) 

</script>

<style scoped>
h3 {
  color: black;
  font-size: 1rem;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 10px;
  text-align: center;
}

.location {
  color: black;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
}

.weather-icon {
  height: 17rem;
  display: flex;
  justify-content: center;
  margin: 0px;
}

.weather {
  color: black;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-top: -2rem;
}

.temperature {
  color: black;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  margin-top: -0.5rem;
}

</style>a