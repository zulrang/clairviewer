<template>
  <v-container>
    <v-list two-line>
      <v-list-item-group v-model="selected">
        <template v-for="item in items">
          <v-list-item :key="item.name">
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title class='headline' v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle class='text--primary' v-text='item.updated'></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <severity-list :counts='sevCounts(item)' :asdf='item'/>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    selected: null,
    smallSevs: true,
    items: [
      {
        name: "traidupapp:latest",
        updated: '2 days ago',
        vulnerabilities: {
          Critical: 1,
          High: 28,
          Medium: 98,
          Low: 82,
          Negligible: 115,
          Unknown: 8,
        }
      },
      {
        name: "docker-vscec.di2e.net/ext/elasticsearch:6.7.1",
        updated: '2 days ago',
        vulnerabilities: {
          Critical: 0,
          High: 7,
          Medium: 19,
          Low: 8,
          Negligible: 0,
          Unknown: 0,
        }
      }
    ]
  }),
  methods: {
    sevCounts (item) {
      let counts = {}
      for(var sev in item.vulnerabilities) {
        if(item.vulnerabilities[sev] > 0) {
          counts[sev] = {
            severity: sev,
            count: item.vulnerabilities[sev]
          }
        }
      }
      return counts
    }
  },
  watch: {
    selected () {
      this.$emit('selected', this.items[this.selected])
    }
  }
};
</script>
