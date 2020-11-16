<template>
  <div class="filter-setting-editor">
    <div class="filter-setting-editor__input-container">
      <v-select
        class="filter-setting-editor__input"
        label="Show Images"
        :items="sectionItems"
        v-model="filterSettingsInEditing.section"
        @input="onSectionChange"
      />

      <v-select
        class="filter-setting-editor__input"
        v-if="filterSettingsInEditing.section === 'hot'"
        label="Sort by"
        :items="hotSortItems"
        v-model="filterSettingsInEditing.sort"
      />
      <v-select
        class="filter-setting-editor__input"
        v-else-if="filterSettingsInEditing.section === 'top'"
        label="Time Span of the Scoring"
        :items="windowItems"
        v-model="filterSettingsInEditing.window"
      />
      <v-select
        class="filter-setting-editor__input"
        v-else-if="filterSettingsInEditing.section === 'user'"
        label="Sort by"
        :items="userSortItems"
        v-model="filterSettingsInEditing.sort"
      />

      <v-switch
        class="filter-setting-editor__input"
        label="Show viral images"
        v-model="filterSettingsInEditing.showViral"
      />
    </div>

    <div class="filter-setting-editor__button-container">
      <v-btn
        class="filter-setting-editor__apply-button"
        color="primary"
        @click="onApplyButtonClick"
      >
        <v-icon x-small left>fa-filter</v-icon>Apply
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { Section } from '@/services/Imgur/ImgurTypes';

import { FilterSettings } from './HomeTypes';

@Component({
  model: {
    prop: 'filterSettings',
    event: 'update:filterSettings',
  },
})
export default class FilterSettingEditor extends Vue {
  @Prop({ type: Object, required: true }) private filterSettings!: FilterSettings;

  private filterSettingsInEditing: FilterSettings | null = null;

  private sectionItems = [
    { text: 'Most Popular', value: 'hot' },
    { text: 'Top Rated', value: 'top' },
    { text: 'User Submitted', value: 'user' },
  ];

  private hotSortItems = [
    { text: 'Popularity', value: 'viral' },
    { text: 'Score', value: 'top' },
    { text: 'Time', value: 'time' },
  ];

  private userSortItems = [
    { text: 'Popularity', value: 'viral' },
    { text: 'Rising', value: 'rising' },
    { text: 'Time', value: 'time' },
  ];

  private windowItems = [
    { text: 'Day', value: 'day' },
    { text: 'Week', value: 'week' },
    { text: 'Month', value: 'month' },
    { text: 'Year', value: 'year' },
    { text: 'All', value: 'all' },
  ];

  private created() {
    this.filterSettingsInEditing = JSON.parse(JSON.stringify(this.filterSettings));
  }

  private onSectionChange(newValue: Section) {
    if (!this.filterSettingsInEditing) {
      return;
    }

    this.filterSettingsInEditing.window = (newValue === 'top') ? 'day' : null;
    this.filterSettingsInEditing.sort = 'viral';
  }

  private onApplyButtonClick() {
    this.$emit('update:filterSettings', this.filterSettingsInEditing);
  }
}
</script>

<style scoped>
.filter-setting-editor__input {
  display: block;
  width: 300px;
}

@media (min-width: 800px) {
  .filter-setting-editor__input {
    display: inline-block;
    margin-right: 20px;
    width: 230px;
  }
}
</style>
