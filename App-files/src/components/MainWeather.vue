<template>
<h3 class="location">{{ City }}</h3>
      <div class="weather-icon">
        <img :src="weatherIcon" alt="Weather icon">
      </div>
      <h2 class="weather">{{weather}}</h2>
      <h1 class="temperature">{{temperature}}</h1>
</template>

<script setup lang="ts">
import CloudyDay from '../images/animated_icon/cloudy-day-3.svg'
import CloudyNight from '../images/animated_icon/cloudy-night-3.svg'
import Rainy from '../images/animated_icon/rainy-6.svg'
import Snowy from '../images/animated_icon/snowy-6.svg'
import Sunny from '../images/animated_icon/day.svg'
import Thunderstorm from '../images/animated_icon/thunder.svg'
import { computed } from 'vue'

const props = defineProps<{
  City: string;
  weather: string;
  temperature: string;
}>();

const weatherIcon = computed(() => {
  switch (props.weather) {
    case 'CloudyDay':
      return CloudyDay
    case 'CloudyNight':
      return CloudyNight
    case 'Rainy':
      return Rainy
    case 'Snowy':
      return Snowy
    case 'Sunny':
      return Sunny
    case 'Thunderstorm':
      return Thunderstorm
    default:
      return Sunny
  }
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

</style>