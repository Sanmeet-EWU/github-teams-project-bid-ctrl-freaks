<template>
  <div class="weather-icon">
    <img :src="weatherIcon" alt="Weather icon">
  </div>
</template>

<script setup lang="ts">
import Sunny from '../images/animated_icon/clear-day.svg';
import Night from '../images/animated_icon/clear-night.svg';
import SunnyCloud from '../images/animated_icon/cloudy-day.svg';
import NightCloud from '../images/animated_icon/cloudy-night.svg';
import DayOvercast from '../images/animated_icon/overcast-day.svg';
import NightOvercast from '../images/animated_icon/overcast-night.svg';
import DaySleet from '../images/animated_icon/sleet-day.svg';
import NightSleet from '../images/animated_icon/sleet-night.svg';
import DayRain from '../images/animated_icon/rain-day.svg';
import NightRain from '../images/animated_icon/night-rain.svg';
import DayDrizzle from '../images/animated_icon/drizzle-day.svg';
import NightDrizzle from '../images/animated_icon/drizzle-night.svg';
import DaySnow from '../images/animated_icon/snow-day.svg';
import NightSnow from '../images/animated_icon/snow-night.svg';
import DayThunder from '../images/animated_icon/thunder-day.svg';
import NightThunder from '../images/animated_icon/thunder-night.svg';
import DayFog from '../images/animated_icon/fog-day.svg';
import NightFog from '../images/animated_icon/fog-night.svg';

import { computed } from 'vue';

const props = defineProps<{
  weatherCode: number;
  hourOfDay: number;
}>();

const isDaytime = (props.hourOfDay > 6 && props.hourOfDay < 19);


const weatherMap: { [key: number]: string } = {
  0: isDaytime ? Sunny : Night, //clear sky
  1: isDaytime ? Sunny : Night, // Mainly clear 
  2: isDaytime ? SunnyCloud : NightCloud, //Partly Cloudy
  3: isDaytime ? DayOvercast : NightOvercast, // Overcast
  45: isDaytime ? DayFog : NightFog, //fog
  48: isDaytime ? DayFog : NightFog, //fog
  51: isDaytime ? DayDrizzle : NightDrizzle, //drizzle light
  53: isDaytime ? DayDrizzle : NightDrizzle, //drizzle medium
  55: isDaytime ? DayDrizzle : NightDrizzle, //drizzle heavy
  56: isDaytime ? DayDrizzle : NightDrizzle, // light Freezing drizzle
  61: isDaytime ? DayDrizzle : NightDrizzle, // heavy freezing drizzle
  63: isDaytime ? DayRain : NightRain, //Moderate rain
  65: isDaytime ? DayRain : NightRain, //heavy rain
  66: isDaytime ? DaySleet : NightSleet, //light freezing rain
  67: isDaytime ? DaySleet : NightSleet, //heavy freezing rain
  71: isDaytime ? DaySnow : NightSnow, //snow light
  73: isDaytime ? DaySnow : NightSnow, // snow moderate
  75: isDaytime ? DaySnow : NightSnow, //snow heavy
  77: isDaytime ? DaySnow : NightSnow, // Snow grains
  80: isDaytime ? DayDrizzle : NightDrizzle, //Slight rain show
  81: isDaytime ? DayRain : NightRain, //medium rain shower
  82: isDaytime ? DayRain : NightRain, //heavy rain shower
  85: isDaytime ? DaySnow : NightSnow, // snow shower light
  86: isDaytime ? DaySnow : NightSnow, //snow shower heavy
  95: isDaytime ? DayThunder : NightThunder, //thunder
  96: isDaytime ? DayThunder : NightThunder, //thunder with hail
  99: isDaytime ? DayThunder : NightThunder, //thunder with heavy hail
};

const weatherIcon = computed(() => weatherMap[props.weatherCode] || (isDaytime ? Sunny : Night));
</script>

<style scoped>
.weather-icon {
  display: flex;
  justify-content: center;
  margin: 0px;
}
</style>