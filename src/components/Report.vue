<template>
  <v-card>
    <v-card-title>
      <v-btn fab text class='mr-2' @click='$emit("back")'><v-icon>mdi-arrow-left</v-icon></v-btn>
      {{imageName}}
      <v-spacer></v-spacer>
      <div v-if='vulnerabilities'>
        <severity-list :counts='vulnCounts'/>
      </div>
    </v-card-title>
    <v-card-text class='text-center' v-if='!vulnerabilities'>
      <v-text-field v-model='imageEntry' label='Image Name'></v-text-field><v-btn @click='setImage'>Load</v-btn>
    </v-card-text>
    <v-list three-line v-if='vulnerabilities'>
      <v-list-item v-for="item in vulnerabilities" :key="item.name">
        <v-list-item-icon>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon v-on='on' :color='iconColors[item.severity]'>{{icons[item.severity]}}</v-icon>
            </template>
            <span>{{item.severity}}</span>
          </v-tooltip>
        </v-list-item-icon>
        <v-list-item-content>        
          <v-list-item-title>{{item.featurename}} {{item.featureversion}} <span v-if='item.fixedby' class='ml-2 caption'>Fixed by: {{item.fixedby}}</span></v-list-item-title>
          <v-list-item-subtitle v-html='item.description'></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <span class='overline'>{{item.namespace}}</span>
          <v-btn text color='primary' :href='item.link' target='_blank'>
            {{item.vulnerability}}
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  props: ['image'],
  data: () => ({
    imageName: "",
    imageEntry: null,
    icons: {
      Critical: "mdi-alert-decagram",
      High: "mdi-alert",
      Medium: "mdi-pause-circle",
      Low: "mdi-information",
      Negligible: "mdi-checkbox-blank-circle",
      Unknown: "mdi-help-circle",
    },
    iconColors: {
      Critical: "red",
      High: "orange",
      Medium: "amber",
      Low: "blue",
      Negligible: "gray",
      Unknown: "gray",
    },
    vulnerabilities: null,
    vulnCounts: null
  }),
  watch: {
    imageName () {
      this.loadReport()
    }
  },
  methods: {
    setImage() {
      this.imageName = this.imageEntry
    },
    loadReport() {
      if(this.imageName) {
        let uri = this.imageName.replace(":", "~").replace(/\//g, "~")
        axios.get('/reports/' + uri + '.json')
        .then((response) => {
          this.vulnerabilities = response.data.vulnerabilities
          this.vulnCounts = {}
          for(var sev of Object.keys(this.icons)) {
            let count = this.vulnerabilities.filter(v => v.severity == sev).length
            if(count > 0) {
              this.vulnCounts[sev] = {
                severity: sev,
                count: count
              }
            }
          }
        })
      }
    }
  },
  created () {
    if(this.image) {
      this.imageName = this.image
    }
  }
}
</script>
