<template lang="pug">
  div#map
  
</template>

<script>

import bus from '../EventBus.js';

export default {
  props: {
    courier: Object,
    customer: Object
  },
  data() {
    return {
      apiKey: 'QL-Xw5NiIwF5m_AO9hZgJVi8Br__7mT5GWrojHRi2Ro',
      platform: null,
      map: null,
      courierMark: null,
      customerMark: null,
      mark: null
    }
  },
  methods: {
    createCourierMark(geometry) {
      const courierSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 46 53">' +
          '<g fill="none" fill-rule="evenodd">' +
            '<path fill="#FD7016" d="M4 0h38a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4H0V4a4 4 0 0 1 4-4z"/>' +
            '<path fill="#BE4F07" d="M18 53L0 40h18z"/>' +
          '</g>' +
        '</svg>';
      return this.createMark(courierSvg, geometry);
    },
    createCustomerMark() {
      var customerSvg = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">H</text></svg>';
      return this.createMark(customerSvg, this.customer);
    },

    createMark(svg, geometry) {
      const icon = new H.map.Icon(svg);
      const mark = new H.map.Marker(geometry, { icon });
      this.map.addObject(mark);
      return mark;
    },
    setCourierCoordinates(geometry) {

      if (!geometry) return;

      if (this.courierMark) {
        this.courierMark.setGeometry(geometry);
      } else {
        console.log('markCreated');
        this.courierMark = this.createCourierMark(geometry);
      }
      console.log(geometry);
    }
  },
  mounted() {
    this.platform = new H.service.Platform({
      apikey: this.apiKey
    });
    const dl = this.platform.createDefaultLayers();
    const $host = document.getElementById('map');
    this.map = new H.Map($host, dl.vector.normal.map, {
      zoom: 14.0,
      center: this.customer
    });
    const ui = H.ui.UI.createDefault(this.map, dl, 'ru-RU');
    // var mapSettings = ui.getControl('mapsettings');
    // var zoom = ui.getControl('zoom');
    // var scalebar = ui.getControl('scalebar');

    // mapSettings.setAlignment('top-right');
    // zoom.setAlignment('top-right');
    // scalebar.setAlignment('top-right');


    var mapEvents = new H.mapevents.MapEvents(this.map);

    this.map.addEventListener('tap', function(evt) {
      // Log 'tap' and 'mouse' events:
      console.log(evt.type, evt.currentPointer.type); 
    });
    var behavior = new H.mapevents.Behavior(mapEvents);

    this.customerMark = this.createCustomerMark();

    this.setCourierCoordinates = this.setCourierCoordinates.bind(this);
    bus.$on('move', this.setCourierCoordinates);
  }
}
</script>

<style>
  .hello {
    background: red;
  }
  #map {
    width: 100%;
    height: 100%;
  }
</style>
