<template>
  <v-sheet class="filter-setting-labels">
    <v-chip class="filter-setting-labels__label">
      Show images:
      <b>{{ sectionLabel }}</b>
    </v-chip>

    <template v-if="filterSettings.section === 'top'">
      <v-chip class="filter-setting-labels__label">
        Time span:
        <b>{{ windowLabel }}</b>
      </v-chip>
    </template>
    <template v-else>
      <v-chip class="filter-setting-labels__label">
        Sorted by:
        <b>{{ sortLabel }}</b>
      </v-chip>
    </template>

    <v-chip class="filter-setting-labels__label">
      Viral images:
      <b>{{ filterSettings.showViral ? "Show" : "Hide" }}</b>
    </v-chip>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { sectionWording, sortWording, windowWording } from './CommonData';
import { FilterSettings } from './Types';

@Component
export default class ThumbnailCard extends Vue {
  @Prop({ type: Object, required: true }) private filterSettings!: FilterSettings;

  private get sectionLabel() {
    return sectionWording[this.filterSettings.section];
  }

  private get sortLabel() {
    return sortWording[this.filterSettings.sort];
  }

  private get windowLabel() {
    return this.filterSettings.window && windowWording[this.filterSettings.window] || '';
  }
}
</script>

<style scoped>
.filter-setting-labels__label {
  margin: 5px;
}

b {
  display: contents;
}
</style>
