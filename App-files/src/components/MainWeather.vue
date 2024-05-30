<template>
<h3 class="location">{{ City }}</h3>
      <div class="weather-icon">
        <img :src="weatherData.icon" alt="Weather icon">
      </div>
      <h2 class="weather">{{ weatherData.name }}</h2>
      <h1 class="temperature">{{temperature}}</h1>
</template>

<script setup lang="ts">
import SunnyLightCloud from "../images/animated_icon/light_cloudy_day.svg"
import SunnyMediumCloud from '../images/animated_icon/medium_cloudy_day.svg';
import SunnyHeavyCloud from '../images/animated_icon/heavy_cloudy_day.svg'; //not used
import NightLightCloud from '../images/animated_icon/light_cloudy_night.svg';
import NightMediumCloud from '../images/animated_icon/medium_cloudy_night.svg';
import NightHeavyCloud from '../images/animated_icon/heavy_cloudy_night.svg'; //not used
import Cloudy from '../images/animated_icon/only_cloudy.svg';
import SunnyLightRain from "../images/animated_icon/sunny_light_rain.svg";
import LightSunnyLightRain from "../images/animated_icon/lightsun_light_rain.svg";
import LightSunnyMediumRain from "../images/animated_icon/lightsun_medium_rain.svg"; //not used
import LightRain from "../images/animated_icon/light_rain.svg";
import MediumRain from "../images/animated_icon/medium_rain.svg";
import HeavyRain from "../images/animated_icon/heavy_rain.svg";
import Drizzle from "../images/animated_icon/drizzle.svg";
import SunnyLightSnow from "../images/animated_icon/sunny_light_snow.svg";
import LightSunnyLightSnow from "../images/animated_icon/lightsun_light_snow.svg";
import LightSunnyMediumSnow from "../images/animated_icon/lightsun_medium_snow.svg";
import LightSnow from "../images/animated_icon/light_snow.svg";
import MediumSnow from "../images/animated_icon/medium_snow.svg";
import HeavySnow from "../images/animated_icon/heavy_snow.svg";
import Sunny from '../images/animated_icon/sunny.svg';
import Night from '../images/animated_icon/night.svg';
import Thunder from '../images/animated_icon/thunder.svg';
import Foggy from '../images/animated_icon/Foggy.gif';



import { computed } from 'vue'

const props = defineProps<{
  City: string;
  temperature: string;
  weatherCode: number;
}>();

//get hour of day to output day or night weather icon
const date = new Date();

const weatherMap: { [key: number]: () => { icon: string; name: string; }; default: () => { icon: string; name: string; }; } = {
  1: () => date.getHours() < 16 ? { icon: Sunny, name: "Clear Sky" } : { icon: Night, name: "Clear Sky" },
  2: () => date.getHours() < 16 ? { icon: SunnyLightCloud, name: "Mainly Clear" } : { icon: NightLightCloud, name: "Mainly Clear" },
  3: () => date.getHours() < 16 ? { icon: SunnyMediumCloud, name: "Partially cloudy" } : { icon: NightMediumCloud, name: "Partially cloudy" },
  4: () => ({ icon: Cloudy, name: "Overcast" }),
  5: () => ({ icon: Foggy, name: "Foggy" }),
  6: () => ({ icon: Drizzle, name: "Drizzle" }),

  45: () => ({ icon: Foggy, name: "Foggy" }),
  48: () => ({ icon: Foggy, name: "Foggy" }),


  51 : () => date.getHours() < 16 ? { icon: LightSunnyLightRain, name: "Light Drizzle" } : { icon: LightRain, name: "Light Drizzle" },
  56: () => date.getHours() < 16 ? { icon: LightSunnyLightRain, name: "Light Freezing Drizzle" } : { icon: LightRain, name: "Light Freezing Drizzle" },


  61: () => date.getHours() < 16 ? { icon: LightSunnyLightRain, name: "Light Rain" } : { icon: LightRain, name: "Light Rain" },
  66: () => date.getHours() < 16 ? { icon: LightSunnyLightRain, name: "Light Freezing Rain" } : { icon: LightRain, name: "Light Freezing Rain" },
  80: () => date.getHours() < 16 ? { icon: LightSunnyLightRain, name: "Slight Rain Shower" } : { icon: LightRain, name: "Slight Rain Shower" },

  53: () => date.getHours() < 16 ? { icon: SunnyLightRain, name: "Moderate Drizzle" } : { icon: MediumRain, name: "Moderate Drizzle" },
  63: () => date.getHours() < 16 ? { icon: SunnyLightRain, name: "Moderate Rain" } : { icon: MediumRain, name: "Moderate Rain" },
  81: () => date.getHours() < 16 ? { icon: SunnyLightRain, name: "Moderate Rain Shower" } : { icon: MediumRain, name: "Moderate Rain Shower" },


  55: () => ({ icon: Drizzle, name: "Heavy Drizzle" }),
  65: () => ({ icon: HeavyRain, name: "Heavy Rain" }),
  67: () => ({ icon: HeavyRain, name: "Heavy Freezing Rain" }),
  82: () => ({ icon: HeavyRain, name: "Violent Rain Shower" }),


  71: () => date.getHours() < 16 ? { icon: LightSunnyLightSnow, name: "Slight Snow" } : { icon: LightSnow, name: "Slight Snow" },
  73: () => date.getHours() < 16 ? { icon: LightSunnyMediumSnow, name: "Moderate Snow" } : { icon: MediumSnow, name: "Moderate Snow" },
  75: () => ({ icon: HeavySnow, name: "Heavy Snowfall" }),

  77: () => date.getHours() < 16 ? { icon: SunnyLightSnow, name: "Moderate Rain Shower" } : { icon: MediumSnow, name: "Snow Grains" },

  85: () => date.getHours() < 16 ? { icon: LightSunnyLightSnow, name: "Moderate Rain Shower" } : { icon: LightSnow, name: "Light Snow Shower" },
  86: () => ({ icon: HeavySnow, name: "Heavy Snow Shower" }),
  95: () => ({ icon: Thunder, name: "Thunderstorm" }),
  96: () => ({ icon: Thunder, name: "Thunderstorm with Slight Hail" }),
  99: () => ({ icon: Thunder, name: "Thunderstorm with Heavy Hail" }),
  
  default: () => date.getHours() < 16 ? { icon: Sunny, name: "Clear Sky" } : { icon: Night, name: "Clear Sky" },
}


// Returns the weather data based on the weather code
const weatherData = computed(() => {
  const weatherItem = weatherMap[props.weatherCode] || weatherMap.default;
  return typeof weatherItem === 'function' ? weatherItem() : weatherItem;
});

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