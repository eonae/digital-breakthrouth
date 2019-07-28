<template lang="pug">

  .flex-cont
    here-map(:courier="this.courier", :customer="this.customer")
    tracking-details(:shown="this.detailsShown" @toggle="toggleShow()")
    message-box(
      v-if="messageBox.active"
      :props="messageBox.data"
      @close="messageBox.active = false")

</template>

<script>

import WsClient from '../services/wsClient';
import HereMap from '../components/HereMap';
import TrackingDetails from '../components/Details';
import { serverUrl, wsUrl } from '../config';
import { json, handleResponse } from '../util';
import MessageBox from '../components/MessageBox';

import bus from '../EventBus.js';

export default {

  name: 'MapScreen',
  
  components: {
    HereMap,
    TrackingDetails,
    MessageBox
  },

  data() {
    return {
      client: null,
      detailsShown: false,
      courier: { lat: 55.750352, lng:	37.609178 },
      customer: { lat: 55.740428, lng: 37.60957 },
      messageBox: {
        active: false,
        data: {}
      }
    }
  },

  computed: {
  },

  methods: {
    toggleShow() {
      this.detailsShown = !this.detailsShown;
    },
    processMessage(message) {
      if (typeof message == 'string') {
        message = {
          type: 'alarm'
        }
      }
      switch (message.type) {
        case 'position':
          bus.$emit('move', {
            lat: message.coordinates.x,
            lng: message.coordinates.y
          });
          break;
        case 'alarm': {
          bus.$emit('alarm');
        }
      }
    }
  },
  
  created() {

    this.client = new WsClient();
    this.client.url = wsUrl;
    this.client.tryConnect(100);
    this.client.on('message', this, this.processMessage.bind(this));

    Notification.requestPermission();
    bus.$on('alarm', () => {
      this.messageBox.active = true;
      this.messageBox.data = {
          title: 'Внимание!',
          content: 'Ваш груз находится в опасности!'
        };
    });
      
    setTimeout(() => {
      this.client.sendMessage({ type: 'handshake' });
    }, 1000);
  }
}

</script>

<style>

.flex-cont {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

@media (max-width: 740px) {
  .flex-cont {
    flex-direction: column;
  }
}

#add {
  position: absolute;
  top: 56px !important;

  left: 10px;
  transform: translateY(-50%);
}

</style>
