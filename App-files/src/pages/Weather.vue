<template>
    <ion-page>
    <ion-header class="ion-no-border" mode="ios">
      <ion-toolbar class ="ion-padding-start ion-padding-end">
        <ion-title>Weather</ion-title>
        
        
          <ion-icon :icon="searchSharp" />
        <span slot="end">
          <ion-icon :icon="notificationsSharp" />
        </span>
      </ion-toolbar>
    </ion-header>

    <ion-content>
        <h4 class="location">Spokane, WA</h4> <!-- replace with location component -->
        <div class="weather-icon"> <!-- replace with weather icon to change accordingly -->
          <img src="../images/sunny.png">
        </div>
        <h2 class="weather">Sunny</h2> <!-- replace with weather component -->
        <h1 class="temperature">25°C</h1> <!-- replace with temperature component -->


        <div class="infoTab ion-padding">
        <ion-card class="ion-padding"> <!-- replace with weather details component -->
          <div class="basicinfo">        
            <h5>Wind</h5>
            <h7>W 1000 mph</h7>
          </div>
        </ion-card>
        <ion-card class="ion-padding"> 
          <div class="basicinfo">        
            <h5>Feels like</h5>
            <h7>69°C</h7>
          </div>
        </ion-card>
        <ion-card class="ion-padding">
          <div class="basicinfo">        
            <h5>Humidity</h5>
            <h7>8000 %</h7>
          </div>
        </ion-card>
        <ion-card class="ion-padding">
          <div class="basicinfo">        
            <h5>Rain</h5>
            <h7>0%</h7>
          </div>
        </ion-card>
        <ion-card class="ion-padding">
          <div class="basicinfo">        
            <h5>Cloud</h5>
            <h7>0%</h7>
          </div>
        </ion-card>
        <ion-card class="ion-padding">
          <div class="basicinfo">        
            <h5>Lightning</h5>
            <h7>666 %</h7>
          </div>
        </ion-card>
      </div>  

      <div class="hourly">
      <h6 class="ion-padding-start">Today Forecast:</h6>
        <div class="infoTab ion-padding">
          <ion-card class="ion-padding">        
            <h4>00:00</h4>
            <img class="hourimg" src="../images/sunny.png">
            <h3>25°C</h3>
          </ion-card>
          <ion-card class="ion-padding">        
            <h4>01:00</h4>
            <img class="hourimg" src="../images/sunny.png">
            <h3>25°C</h3>
          </ion-card>
          <ion-card class="ion-padding">        
            <h4>02:00</h4>
            <img class="hourimg" src="../images/sunny.png">
            <h3>25°C</h3>
          </ion-card>
          <ion-card class="ion-padding">        
            <h4>03:00</h4>
            <img class="hourimg" src="../images/sunny.png">
            <h3>25°C</h3>
          </ion-card>
          <ion-card class="ion-padding">        
            <h4>04:00</h4>
            <img class="hourimg" src="../images/sunny.png">
            <h3>25°C</h3>
          </ion-card>
          <ion-card class="ion-padding">        
            <h4>05:00</h4>
            <img class="hourimg" src="../images/sunny.png">
            <h3>25°C</h3>
          </ion-card>
          <ion-card class="ion-padding">        
            <h4>06:00</h4>
            <img class="hourimg" src="../images/sunny.png">
            <h3>25°C</h3>
          </ion-card>
          <ion-card class="ion-padding">        
            <h4>07:00</h4>
            <img class="hourimg" src="../images/sunny.png">
            <h3>25°C</h3>
          </ion-card>
        </div>


      </div>


    </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonCard} from '@ionic/vue';
import { notificationsSharp, searchSharp } from 'ionicons/icons';
</script>

<style scoped>
ion-content {
  --background: url('../images/blur-background.png') no-repeat center center / cover;
  --background-color: none;
  --background-image: none;
  --background-position: none;
  --background-size: none;
  --background-repeat: none;
  --background-attachment: none;
  --background-blend-mode: none;
  }


.location {
  color: black;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
}

.weather-icon {
  height: 14rem;
  display: flex;
  justify-content: center;
  margin-top : 2rem;
}

.weather {
  color: black;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}

.temperature {
  color: black;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
}

h5 {
  color: black;
  font-size: 1rem;
  font-weight: bold;
}

h7 {
  color: black;
  font-size: 1rem;
  font-weight: normal;
}

.basicinfo {
  margin: 0px;
  margin-top: -10px;
}

.infoTab {
  white-space: nowrap;
  overflow-x: auto;

}

ion-card {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
  margin: 0px;
  margin-right: 0.5rem;
}

h4 {
  color: black;
  font-size: 1rem;
  font-weight: bold;
  margin: 0px;
  text-align: center;
}

h3 {
  color: black;
  font-size: 1rem;
  font-weight: bold;
  margin: 0px;
  margin-top: 10px;
  text-align: center;
}

h6 {
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0px;
  margin-top: 1rem;
}

.hourimg {
  height: 3rem;
  display: flex;
  justify-content: center;
  margin-top : 0px;
}


</style>