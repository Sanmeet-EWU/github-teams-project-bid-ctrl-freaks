<template>
  <h3 class="location">{{ City }}</h3>
  <div class="weather-icon">
    <GetIcon :weatherCode="weatherData.icon" :hourOfDay="date.getHours()" />
  </div>
  <h2 class="weather">{{ weatherData.name }}</h2>
  <h1 class="temperature">{{ temperature }}</h1>

  <div>
    <input v-model="newLocation" placeholder="Enter new location" /> <br />
    <button @click="handleAddOrUpdateLocation">Add or Update Location</button>
  </div>
</template>

<script setup lang="ts">
import GetIcon from './GetIcon.vue';


import { ref, computed } from 'vue'

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/main';

const props = defineProps<{
  City: string;
  temperature: string;
  weatherCode: number;
}>();

//get hour of day to output day or night weather icon
const date = new Date();

const weatherMap: { [key: number]: () => { icon: number; name: string; }; default: () => { icon: number; name: string; }; } = {
  1: () => ({ icon: 1, name: "Clear Sky" }),
  2: () => ({ icon: 2, name: "Mainly Clear" }),
  3: () => ({ icon: 3, name: "Partially cloudy" }),
  4: () => ({ icon: 4, name: "Overcast" }),
  5: () => ({ icon: 5, name: "Foggy" }),
  6: () => ({ icon: 6, name: "Drizzle" }),

  45: () => ({ icon: 45, name: "Foggy" }),
  48: () => ({ icon: 48, name: "Foggy" }),

  51: () => ({ icon: 51, name: "Light Drizzle" }),
  56: () => ({ icon: 56, name: "Light Freezing Drizzle" }),

  61: () => ({ icon: 61, name: "Light Rain" }),
  66: () => ({ icon: 66, name: "Light Freezing Rain" }),
  80: () => ({ icon: 80, name: "Slight Rain Shower" }),

  53: () => ({ icon: 53, name: "Moderate Drizzle" }),
  63: () => ({ icon: 63, name: "Moderate Rain" }),
  81: () => ({ icon: 81, name: "Moderate Rain Shower" }),

  55: () => ({ icon: 55, name: "Heavy Drizzle" }),
  65: () => ({ icon: 65, name: "Heavy Rain" }),
  67: () => ({ icon: 67, name: "Heavy Freezing Rain" }),
  82: () => ({ icon: 82, name: "Violent Rain Shower" }),

  71: () => ({ icon: 71, name: "Slight Snow" }),
  73: () => ({ icon: 73, name: "Moderate Snow" }),
  75: () => ({ icon: 75, name: "Heavy Snowfall" }),

  77: () => ({ icon: 77, name: "Snow Grains" }),

  85: () => ({ icon: 85, name: "Light Snow Shower" }),
  86: () => ({ icon: 86, name: "Heavy Snow Shower" }),
  95: () => ({ icon: 95, name: "Thunderstorm" }),
  96: () => ({ icon: 96, name: "Thunderstorm with Slight Hail" }),
  99: () => ({ icon: 99, name: "Thunderstorm with Heavy Hail" }),

  default: () => ({ icon: 1, name: "Clear Sky" }),
}


// Returns the weather data based on the weather code
const weatherData = computed(() => {
  const weatherItem = weatherMap[props.weatherCode] || weatherMap.default;
  return typeof weatherItem === 'function' ? weatherItem() : weatherItem;
});





const newLocation = ref('');

async function fetchForecast(location: string) {
  const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=47.6597&longitude=-117.4291&hourly=temperature_2m&timezone=auto&temperature_unit=fahrenheit')

  return await response.json();
}

async function addOrUpdateLocation(location: string) {
  if (!location) {
    console.error('Location name is required');
    return;
  }

  try {
    const locationRef = doc(db, 'locations', location);
    const locationDoc = await getDoc(locationRef);

    if (locationDoc.exists()) {
      const data = locationDoc.data();
      const lastUpdated = new Date(data?.lastUpdated);
      const oneHourAgo = new Date(Date.now() - 3600 * 1000);

      if (lastUpdated < oneHourAgo) {

        console.log(`Updating forecast for ${location}`);
        const forecastData = await fetchForecast(location);
        await setDoc(locationRef, {
          name: location,
          forecast: forecastData,
          lastUpdated: new Date().toISOString()
        });
        console.log(`Forecast for ${location} updated successfully`);
      } else {
        console.log(`Forecast for ${location} is already up to date`);
      }
    } else {
      console.log(`Adding new location: ${location}`);
      const forecastData = await fetchForecast(location);

      if (forecastData) {
        await setDoc(locationRef, {
          name: location,
          forecast: forecastData,
          lastUpdated: new Date().toISOString()
        });
        console.log(`New location ${location} added successfully`);
      } else {
        console.error(`Invalid forecast data for ${location}`);
      }
    }
  } catch (error) {
    console.error(`Error adding or updating location ${location}:`, error);
  }
}

function handleAddOrUpdateLocation() {
  addOrUpdateLocation(newLocation.value);
}




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
