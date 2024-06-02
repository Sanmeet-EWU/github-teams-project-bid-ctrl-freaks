<template>
  <div class="weather-icon">
    <img :src="weatherIcon" alt="Weather icon">
  </div>
</template>

<script setup lang="ts">
import Sunny from '../images/animated_icon/sunny.svg';
import Night from '../images/animated_icon/night.svg';
import SunnyLightCloud from '../images/animated_icon/light_cloudy_day.svg';
import SunnyMediumCloud from '../images/animated_icon/medium_cloudy_day.svg';
import NightLightCloud from '../images/animated_icon/light_cloudy_night.svg';
import NightMediumCloud from '../images/animated_icon/medium_cloudy_night.svg';
import Cloudy from '../images/animated_icon/only_cloudy.svg';
import SunnyLightRain from '../images/animated_icon/sunny_light_rain.svg';
import LightSunnyLightRain from '../images/animated_icon/lightsun_light_rain.svg';
import LightRain from '../images/animated_icon/light_rain.svg';
import MediumRain from '../images/animated_icon/medium_rain.svg';
import HeavyRain from '../images/animated_icon/heavy_rain.svg';
import Drizzle from '../images/animated_icon/drizzle.svg';
import SunnyLightSnow from '../images/animated_icon/sunny_light_snow.svg';
import LightSunnyLightSnow from '../images/animated_icon/lightsun_light_snow.svg';
import LightSnow from '../images/animated_icon/light_snow.svg';
import MediumSnow from '../images/animated_icon/medium_snow.svg';
import HeavySnow from '../images/animated_icon/heavy_snow.svg';
import Thunder from '../images/animated_icon/thunder.svg';
import Foggy from '../images/animated_icon/Foggy.gif';

import { computed } from 'vue';

const props = defineProps<{
  weatherCode: number;
  hourOfDay: number;
}>();

const date = new Date();
var isDaytime = (props.hourOfDay < 16 || props.hourOfDay > 7);


const weatherMap: { [key: number]: string } = {
  0: isDaytime ? Sunny : Night,
  1: isDaytime ? Sunny : Night,
  2: isDaytime ? SunnyLightCloud : NightLightCloud,
  3: isDaytime ? SunnyMediumCloud : NightMediumCloud,
  4: Cloudy,
  5: Foggy,
  6: Drizzle,
  45: Foggy,
  48: Foggy,
  51: isDaytime ? LightSunnyLightRain : LightRain,
  56: isDaytime ? LightSunnyLightRain : LightRain,
  61: isDaytime ? LightSunnyLightRain : LightRain,
  66: isDaytime ? LightSunnyLightRain : LightRain,
  80: isDaytime ? LightSunnyLightRain : LightRain,
  53: isDaytime ? SunnyLightRain : MediumRain,
  63: isDaytime ? SunnyLightRain : MediumRain,
  81: isDaytime ? SunnyLightRain : MediumRain,
  55: Drizzle,
  65: HeavyRain,
  67: HeavyRain,
  82: HeavyRain,
  71: isDaytime ? LightSunnyLightSnow : LightSnow,
  73: isDaytime ? LightSunnyLightSnow : MediumSnow,
  75: HeavySnow,
  77: isDaytime ? SunnyLightSnow : MediumSnow,
  85: isDaytime ? LightSunnyLightSnow : LightSnow,
  86: HeavySnow,
  95: Thunder,
  96: Thunder,
  99: Thunder,
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