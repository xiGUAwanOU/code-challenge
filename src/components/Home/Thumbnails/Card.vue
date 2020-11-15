<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="thumbnail-card__card"
      v-intersect="onCardIntersect"
      :elevation="hover ? 12 : 5"
      @click="onCardClick"
    >
      <div v-if="isVideo" class="thumbnail-card__image-container">
        <div class="thumbnail-card__image-overlay">
          <video
            v-if="showImage"
            class="thumbnail-card__image"
            :class="{
              'thumbnail-card__image--fill-width': !isLandscape,
              'thumbnail-card__image--fill-height': isLandscape,
            }"
            draggable="false"
            playsinline
            autoplay
            loop
            muted
          >
            <source type="video/mp4" :src="link" />
          </video>
        </div>
      </div>

      <div v-else class="thumbnail-card__image-container">
        <div class="thumbnail-card__image-overlay">
          <img
            v-if="showImage"
            class="thumbnail-card__image"
            :class="{
              'thumbnail-card__image--fill-width': !isLandscape,
              'thumbnail-card__image--fill-height': isLandscape,
            }"
            :src="link"
          />
        </div>
      </div>

      <v-card-text class="thumbnail-card__title">{{ title }}</v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { GalleryImage, GalleryItem, isGalleryAlbum } from '@/services/Imgur/ImgurTypes';

@Component
export default class ThumbnailCard extends Vue {
  @Prop({ type: Object, required: true }) private galleryItem!: GalleryItem;

  private showImage: boolean = false;

  private get image(): GalleryImage {
    if (isGalleryAlbum(this.galleryItem)) {
      const cover = this.galleryItem.cover;
      return this.galleryItem.images.find((image) => image.id === cover) || this.galleryItem.images[0];
    } else {
      return this.galleryItem;
    }
  }

  private get isLandscape(): boolean {
    return this.image.width > this.image.height;
  }

  private get isVideo(): boolean {
    return this.image.animated && this.image.type !== 'image/gif';
  }

  private get link(): string {
    if (this.image.animated) {
      return this.image.link;
    } else {
      const parts = this.image.link.split('.');
      parts[parts.length - 2] += 'l';
      return parts.join('.');
    }
  }

  private get title(): string {
    return this.galleryItem.title || '';
  }

  private onCardIntersect(entries: IntersectionObserverEntry[]) {
    this.showImage = entries[0].isIntersecting;
  }

  private onCardClick() {
    this.$emit('cardClick', this.galleryItem);
  }
}
</script>

<style scoped>
.thumbnail-card__card {
  overflow: hidden;
  cursor: pointer;
}

.thumbnail-card__image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  text-align: center;
  overflow: hidden;
}

.thumbnail-card__image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.thumbnail-card__image {
  position: relative;
}

.thumbnail-card__image--fill-width {
  width: 100%;
}

.thumbnail-card__image--fill-height {
  height: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
}

.thumbnail-card__title {
  position: absolute;
  bottom: 0;
  padding: 10px;
  color: #ffffff !important;
  background-color: #00000088;
}
</style>
