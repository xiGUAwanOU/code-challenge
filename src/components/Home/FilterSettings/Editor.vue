<template>
  <v-dialog
    class="filter-setting-editor"
    persistent
    max-width="500"
    v-model="showDialog"
    @input="onToggleShowDialog"
  >
    <template #activator="{ on, attrs }">
      <v-btn class="filter-setting-editor__active-button" icon v-bind="attrs" v-on="on">
        <v-icon color="grey darken-4">fa-filter</v-icon>
      </v-btn>
    </template>

    <v-card class="filter-setting-editor__dialog">
      <v-card-title class="filter-setting-editor__title">Filter Settings</v-card-title>

      <v-card-text v-if="this.filterSettingsInEditing" class="filter-setting-editor__form">
        <v-select
          label="Show Images"
          :items="sectionItems"
          v-model="filterSettingsInEditing.section"
          @input="onSectionChange"
        />

        <v-select
          v-if="filterSettingsInEditing.section === 'hot'"
          label="Sort by"
          :items="hotSortItems"
          v-model="filterSettingsInEditing.sort"
        />
        <v-select
          v-else-if="filterSettingsInEditing.section === 'top'"
          label="Time Span of the Scoring"
          :items="windowItems"
          v-model="filterSettingsInEditing.window"
        />
        <v-select
          v-else-if="filterSettingsInEditing.section === 'user'"
          label="Sort by"
          :items="userSortItems"
          v-model="filterSettingsInEditing.sort"
        />

        <v-switch label="Show viral images" v-model="filterSettingsInEditing.showViral" />
      </v-card-text>

      <v-card-actions class="filter-setting-editor__action">
        <v-spacer />
        <v-btn color="primary" text @click="onCancelButtonClick">Cancel</v-btn>
        <v-btn color="primary" text @click="onApplyButtonClick">Apply</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { Section, Sort, Window } from '@/services/Imgur/ImgurTypes';

import { sectionWording, sortWording, windowWording } from './CommonData';
import { FilterSettings } from './Types';

@Component({
  model: {
    prop: 'filterSettings',
    event: 'update:filterSettings',
  },
})
export default class FilterSettingEditor extends Vue {
  @Prop({ type: Object, required: true }) private filterSettings!: FilterSettings;

  private showDialog: boolean = false;
  private filterSettingsInEditing: FilterSettings | null = null;

  private sectionItems = ([ 'hot', 'top', 'user' ] as Section[])
    .map((value) => ({
      text: sectionWording[value],
      value,
    }));

  private hotSortItems = ([ 'viral', 'top', 'time' ] as Sort[])
    .map((value) => ({
      text: sortWording[value],
      value,
    }));

  private userSortItems = ([ 'viral', 'time', 'rising' ] as Sort[])
    .map((value) => ({
      text: sortWording[value],
      value,
    }));

  private windowItems = ([ 'day', 'week', 'month', 'year', 'all' ] as Window[])
    .map((value) => ({
      text: windowWording[value],
      value,
    }));

  private onToggleShowDialog(newValue: boolean) {
    if (newValue) {
      this.filterSettingsInEditing = JSON.parse(JSON.stringify(this.filterSettings));
    }
  }

  private onSectionChange(newValue: Section) {
    if (!this.filterSettingsInEditing) {
      return;
    }

    this.filterSettingsInEditing.window = (newValue === 'top') ? 'day' : null;
    this.filterSettingsInEditing.sort = 'viral';
  }

  private onCancelButtonClick() {
    this.closeDialog();
  }

  private onApplyButtonClick() {
    this.$emit('update:filterSettings', this.filterSettingsInEditing);
    this.closeDialog();
  }

  private closeDialog() {
    this.showDialog = false;
    this.filterSettingsInEditing = null;
  }
}
</script>
