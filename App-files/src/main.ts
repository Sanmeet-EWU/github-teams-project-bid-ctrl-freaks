import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
import '@ionic/vue/css/palettes/dark.class.css';
//import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlHY2K26ydYgoQYJnQ7hKl1eMYO5CyRAY",
  authDomain: "cscd-350-weather-app.firebaseapp.com",
  projectId: "cscd-350-weather-app",
  storageBucket: "cscd-350-weather-app.appspot.com",
  messagingSenderId: "49599983789",
  appId: "1:49599983789:web:b05da787a215796993d624",
  measurementId: "G-D53D5WCNCX"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
