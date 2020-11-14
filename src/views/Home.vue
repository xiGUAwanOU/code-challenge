<template>
  <v-app id="app" class="home">
    <v-app-bar class="home__header" height="60px" elevation="3" fixed>
      <v-toolbar-title class="home__site-title-container">
        <h1 class="home__site-title">codeChallenge</h1>
      </v-toolbar-title>

      <v-spacer />

      <filter-setting-editor
        class="home__filter-setting-editor"
        v-model="filterSettings"
        @update:filterSettings="onFilterSettingsChange"
      />
    </v-app-bar>

    <v-main class="home__content">
      <filter-setting-labels :filter-settings="filterSettings" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { GalleryItem } from '@/services/Imgur/ImgurTypes';

import FilterSettingEditor from '@/components/Home/FilterSettings/Editor.vue';
import FilterSettingLabels from '@/components/Home/FilterSettings/Labels.vue';
import { FilterSettings } from '@/components/Home/FilterSettings/Types';

@Component({
  components: {
    FilterSettingEditor,
    FilterSettingLabels,
  },
})
export default class Home extends Vue {
  private filterSettings: FilterSettings = {
    section: 'hot',
    sort: 'viral',
    window: null,
    showViral: false,
  };

  private galleryItems: GalleryItem[] = [];

  private onFilterSettingsChange(filterSettings: FilterSettings) {
    console.log('search', JSON.stringify(filterSettings, null, 2));
  }
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
