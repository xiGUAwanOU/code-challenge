<template>
  <v-row>
    <v-col
      v-for="galleryItem in galleryItems"
      :key="galleryItem.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="2"
    >
      <thumbnail-card :galleryItem="galleryItem" @cardClick="onCardClick" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import ThumbnailCard from './Card.vue';

import { GalleryItem } from '@/services/Imgur/ImgurTypes';

@Component({
  components: {
    ThumbnailCard,
  },
})
export default class ThumbnailGrid extends Vue {
  @Prop({ type: Array, required: true }) private galleryItems!: GalleryItem[];

  private onCardClick(galleryItem: GalleryItem) {
    this.$emit('cardClick', galleryItem);
  }
}
</script>
