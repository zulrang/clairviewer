<template>
    <span>
        {{idontexist}}
        <v-tooltip bottom v-for='sev in counts' :key='sev.severity'>
            <template v-slot:activator="{ on }">
                <v-chip v-on='on' :color='iconColors[sev.severity]' class='mr-1' dark>
                        <v-icon left v-if='!small'>{{icons[sev.severity]}}</v-icon>
                        {{sev.count}}                
                </v-chip>
            </template>
            <span>{{sev.severity}}</span>
        </v-tooltip>  
    </span>
</template>

<script>
export default {
    props: ['counts'],
    data: () => {
      return {
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
      }
    },
}
</script>
