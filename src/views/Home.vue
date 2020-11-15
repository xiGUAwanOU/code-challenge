<template>
  <v-app id="app" class="home">
    <v-app-bar class="home__header" height="60px" color="grey lighten-2" elevation="7" fixed>
      <v-toolbar-title class="home__site-title-container">
        <h1 class="home__site-title">codeChallenge</h1>
      </v-toolbar-title>

      <v-spacer />

      <filter-setting-editor
        class="home__filter-setting-editor"
        :filterSettings="filterSettings"
        @update:filterSettings="onFilterSettingsChange"
      />
    </v-app-bar>

    <v-main class="home__content">
      <filter-setting-labels :filterSettings="filterSettings" />

      <thumbnail-grid :galleryItems="galleryItems" @cardClick="onCardClick" />

      <div class="home__load-more-button-container">
        <v-icon v-if="loading" class="home__loading-indicator" x-large>fa-spinner fa-spin</v-icon>
        <v-btn
          v-else
          class="home__load-more-button"
          color="grey lighten-2"
          x-large
          @click="onLoadMoreButtonClick"
        >I want more!!</v-btn>
      </div>

      <image-details-dialog ref="imageDetails" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';

import { GalleryItem, GetGalleryParams } from '@/services/Imgur/ImgurTypes';

import FilterSettingEditor from '@/components/Home/FilterSettings/Editor.vue';
import FilterSettingLabels from '@/components/Home/FilterSettings/Labels.vue';
import { FilterSettings } from '@/components/Home/FilterSettings/Types';

import ThumbnailGrid from '@/components/Home/Thumbnails/Grid.vue';

import ImageDetailsDialog from '@/components/Home/ImageDetails/Dialog.vue';

import ImgurService from '@/services/Imgur/ImgurService';

@Component({
  components: {
    FilterSettingEditor,
    FilterSettingLabels,
    ThumbnailGrid,
    ImageDetailsDialog,
  },
})
export default class Home extends Vue {
  @Ref('imageDetails')
  private imageDetails!: ImageDetailsDialog;

  private loading: boolean = false;
  private lastPage: number = 0;
  private galleryItems: GalleryItem[] = [];
  private cachedGalleryItems: GalleryItem[] = [];

  private filterSettings: FilterSettings = {
    section: 'hot',
    sort: 'viral',
    window: null,
    showViral: false,
  };

  private get getGalleryParams(): GetGalleryParams {
    return {
      section: this.filterSettings.section,
      sort: this.filterSettings.sort,
      window: this.filterSettings.window || undefined,
      page: this.lastPage,
      showViral: this.filterSettings.showViral,
    };
  }

  private async created() {
    this.clearGalleryItems();
    this.loadGalleryItems(30);
  }

  private async onFilterSettingsChange(filterSettings: FilterSettings) {
    this.filterSettings = filterSettings;
    this.clearGalleryItems();
    this.loadGalleryItems(30);
  }

  private async onLoadMoreButtonClick() {
    this.loadGalleryItems(24);
  }

  private onCardClick(galleryItem: GalleryItem) {
    this.imageDetails.show(galleryItem);
  }

  private clearGalleryItems() {
    this.lastPage = 0;
    this.galleryItems = [];
    this.cachedGalleryItems = [];
  }

  private async loadGalleryItems(numberOfItems: number) {
    this.loading = true;

    let counter = numberOfItems;

    while (counter > 0) {
      if (this.cachedGalleryItems.length === 0) {
        const getGalleryParams: GetGalleryParams = {
          section: this.filterSettings.section,
          sort: this.filterSettings.sort,
          window: this.filterSettings.window || undefined,
          page: this.lastPage,
          showViral: this.filterSettings.showViral,
        };

        this.cachedGalleryItems = (await ImgurService.getGallery(getGalleryParams)).data;
        this.cachedGalleryItems.reverse();

        this.lastPage++;
      }

      const newItem = this.cachedGalleryItems.pop()!;

      if (this.galleryItems.every((existingItem) => existingItem.id !== newItem.id)) {
        this.galleryItems.push(newItem);
        counter--;
      }
    }

    this.loading = false;
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

.home__load-more-button-container {
  margin-top: 40px;
  text-align: center;
}
</style>
