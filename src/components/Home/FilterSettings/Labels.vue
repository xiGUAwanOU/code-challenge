<template>
  <v-sheet class="filter-setting-labels">
    <v-chip class="filter-setting-labels__label" color="grey lighten-2" text-color="black">
      Show images:
      <b>{{ sectionLabel }}</b>
    </v-chip>

    <template v-if="filterSettings.section === 'top'">
      <v-chip class="filter-setting-labels__label" color="grey lighten-2" text-color="black">
        Time span:
        <b>{{ windowLabel }}</b>
      </v-chip>
    </template>
    <template v-else>
      <v-chip class="filter-setting-labels__label" color="grey lighten-2" text-color="black">
        Sorted by:
        <b>{{ sortLabel }}</b>
      </v-chip>
    </template>

    <v-chip class="filter-setting-labels__label" color="grey lighten-2" text-color="black">
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
export default class FilterSettingLabels extends Vue {
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
  margin-right: 6px;
  margin-top: 3px;
  margin-bottom: 3px;
}
.filter-setting-labels__label:hover::before {
  opacity: 0;
}

b {
  display: contents;
}
</style>
