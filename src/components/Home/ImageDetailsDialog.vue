<template>
  <v-dialog
    class="image-details-dialog"
    persistent
    fullscreen
    transition="dialog-bottom-transition"
    v-model="showDialog"
  >
    <v-card
      v-if="galleryItem"
      class="image-details-dialog__dialog"
      color="black"
      v-resize="onResize"
    >
      <v-responsive class="image-details-dialog__container" max-width="800px" height="100%">
        <v-toolbar
          ref="toolbar"
          class="image-details-dialog__toolbar"
          max-width="800px"
          width="100%"
          height="auto"
          elevation="0"
        >
          <v-btn
            class="image-details-dialog__close-button"
            color="white"
            icon
            @click="onCloseButtonClick"
          >
            <v-icon>fa-times</v-icon>
          </v-btn>

          <div class="image-details-dialog__infobar">
            <div class="image-details-dialog__title">{{galleryItem.title}}</div>

            <div class="image-details-dialog__rating-data">
              <span class="image-details-dialog__rating-data-item">
                <v-icon x-small color="white">fa-thumbs-up</v-icon>
                {{ galleryItem.ups }}
              </span>
              <span class="image-details-dialog__rating-data-item">
                <v-icon x-small color="white">fa-thumbs-down</v-icon>
                {{ galleryItem.downs }}
              </span>
              <span class="image-details-dialog__rating-data-item">
                <v-icon x-small color="white">fa-trophy</v-icon>
                {{ galleryItem.score }}
              </span>
            </div>
          </div>
        </v-toolbar>

        <v-sheet
          class="image-details-dialog__content"
          :style="{ 'marginTop': `${contentMarginTop}px` }"
          color="transparent"
        >
          <p
            v-if="galleryItem.description"
            class="image-details-dialog__description"
          >{{galleryItem.description }}</p>

          <template v-for="(image, i) in images">
            <template v-if="image.animated">
              <video
                :key="i"
                class="image-details-dialog__image"
                controls
                :autoplay="i === 0"
                :loop="image.looping"
              >
                <source type="video/mp4" :src="image.mp4" />
              </video>
            </template>
            <template v-else>
              <img :key="i" class="image-details-dialog__image" :src="image.link" />
            </template>
          </template>
        </v-sheet>
      </v-responsive>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';

import { GalleryImage, GalleryItem, isGalleryAlbum } from '@/services/Imgur/ImgurTypes';

@Component
export default class ImageDetailsDialog extends Vue {
  @Ref('toolbar') private toolbar!: Vue;

  private contentMarginTop: number = 0;
  private resizeEventListener = () => { this.calculateContentMarginTop(); };

  private galleryItem: GalleryItem | null = null;
  private currentImageIndex: number = 0;

  private get showDialog() {
    return this.galleryItem !== null;
  }

  private get images(): GalleryImage[] {
    if (!this.galleryItem) {
      return [];
    }

    if (isGalleryAlbum(this.galleryItem)) {
      return this.galleryItem.images;
    } else {
      return [this.galleryItem];
    }
  }

  public close() {
    this.galleryItem = null;
  }

  public async show(galleryItem: GalleryItem) {
    this.galleryItem = galleryItem;

    await this.$nextTick();
    this.calculateContentMarginTop();
  }

  private onCloseButtonClick() {
    this.close();
  }

  private onResize() {
    this.calculateContentMarginTop();
  }

  private calculateContentMarginTop() {
    this.contentMarginTop = this.toolbar.$el.scrollHeight + 40;
  }
}
</script>

<style scoped>
.image-details-dialog__dialog {
  border-radius: 0;
}

.image-details-dialog__container {
  margin: 0 auto;
}

.image-details-dialog__toolbar {
  position: fixed;
  top: 0;
  z-index: 1;
  color: #ffffff;
  background-color: #00000088 !important;
}

.image-details-dialog__infobar {
  margin-left: 20px;
}

.image-details-dialog__title {
  font-size: 130%;
  font-weight: bold;
}

.image-details-dialog__rating-data-item {
  display: inline-block;
  margin-right: 10px;
}

.image-details-dialog__description {
  padding: 0 20px;
  color: white;
}

.image-details-dialog__image {
  display: block;
  max-width: 100%;
  max-height: 100vh;
  margin: 40px auto;
  outline: none;
}
</style>
