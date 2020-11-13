<template>
  <v-app id="app" class="home">
    <v-app-bar class="home__header" height="60px" elevation="3" fixed>
      <v-toolbar-title class="home__site-title-container">
        <h1 class="home__site-title">codeChallenge</h1>
      </v-toolbar-title>
      <v-spacer />
      <filter-settings class="home__filter-settings" />
    </v-app-bar>

    <v-main class="home__content"> </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import FilterSettings from '@/components/FilterSettings.vue';

@Component({
  components: {
    FilterSettings,
  },
})
export default class Home extends Vue {
  private showDialog: boolean = false;
}
</script>

<style scoped>
.home__site-title-container {
  overflow: visible;
}

.home__site-title {
  color: #212121;
  font-family: "Lobster";
  font-size: 32px;
  font-weight: 600px;
}

.home__content {
  margin: 75px 15px;
}
</style>
