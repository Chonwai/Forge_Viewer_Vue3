import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

init();

createApp(App).use(store).use(router).mount('#app');

function init() {
    console.log('Init the App!');
}
