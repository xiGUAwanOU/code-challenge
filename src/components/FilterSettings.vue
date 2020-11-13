<template>
  <v-dialog
    class="filter-settings"
    persistent
    max-width="500"
    v-model="showDialog"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        class="filter-settings__active-button"
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon color="grey darken-4">fa-filter</v-icon>
      </v-btn>
    </template>

    <v-card class="filter-settings__dialog">
      <v-card-title class="filter-settings__dialog-title">
        Filter Settings
      </v-card-title>

      <v-card-text class="filter-settings__dialog-content">
        Hello world!
      </v-card-text>

      <v-card-actions class="filter-settings__dialog-action">
        <v-spacer />
        <v-btn color="primary" text @click="showDialog = false">Cancel</v-btn>
        <v-btn color="primary" text @click="showDialog = false">Apply</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FilterSettings extends Vue {
  private showDialog: boolean = false;
}
</script>
