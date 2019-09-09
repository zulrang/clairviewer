<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-cube-scan</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Images</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      

      <v-toolbar-title class="headline text-uppercase">
        <span class='mr-2'>Clair</span>
        <span class="font-weight-light mr-5">Report Viewer</span>
      </v-toolbar-title>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>
      <div class="flex-grow-1"></div>
      <v-spacer></v-spacer>
      
    </v-app-bar>

    <v-content>
      <v-scroll-x-reverse-transition>
        <image-list @selected='imageSelected' v-if='!selectedItem'/>
        <report v-if='selectedItem' :image='selectedItem.name' @back='deselect'/>
      </v-scroll-x-reverse-transition>
    </v-content>
  </v-app>
</template>

<script>
import ImageList from './components/ImageList';
import Report from './components/Report';

export default {
  name: 'App',
  components: {
    ImageList,
    Report,
  },
  data: () => ({
    drawer: true,
    selectedItem: null,
  }),
  methods: {
    imageSelected(item) {
      this.selectedItem = item
    },
    deselect() {
      this.selectedItem = null
    },
  }
};
</script>
