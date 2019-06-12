import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import VueI18n from 'vue-i18n';
import VueProgressBar from 'vue-progressbar';

// LOCAL
import App from '@/App';
import router from '@/router';
import store from '@/store';

// Plugins
import EventBus from '@/common/plugins/event-bus';
import Util from '@/common/plugins/util';
import Storage from '@/common/plugins/storage';
import Message from '@/common/plugins/message/message';
import Service from '@/common/plugins/service';
import Modal from '@/common/plugins/modal/modal';
import Datetime from '@/common/plugins/datetime';
import Filter from '@/common/plugins/filter';
import messages from '@/common/lang/';
import FileUpload from 'v-file-upload';
// import colors from 'vuetify/es5/util/colors';

// Vendor
Vue.use(FileUpload);
Vue.use(Vuetify, {
  theme: {
    primary: '#006666',
    // primary: '#00A36F',
    secondary: '#555555',
    // secondary: '#571606',
    third: '#FFB300',
    accent: '#8c9eff',
    success: '#09B629',
    error: '#b71c1c',
    warning: '#F0860B',
    info: '#1e88e5'
  }
});
Vue.use(Vuelidate);
Vue.use(VueProgressBar, {
  color: '#52d1e1',
  failedColor: '#fc4b6c',
  thickness: '4px'
});

// i18n config
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: process.env.LANG,
  messages
});

// Store Vuex
Vue.use(store);

// Plugins config
Vue.use(EventBus);
Vue.use(Util);
Vue.use(Storage);
Vue.use(Message, { timeout: 6000 });
Vue.use(Service, {
  apiUrl: process.env.API_URL,
  authUrl: process.env.AUTH_URL,
  noApiUrl: process.env.NO_API_URL,
  authToken: process.env.AUTH_TOKEN
  /* filterResponse: (response, Message) => {
    if (response.datos) {
      response = response.datos;
    } else {
      if (!response.finalizado) {
        Message.error(response.mensaje);
        response = response.datos;
      }
    }
    return response;
  } */
});
Vue.use(Modal);
Vue.use(Datetime);
Vue.use(Filter);

Vue.config.productionTip = false;
Vue.config.debug = process.env.DEBUG_MODE;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: { App }
});
