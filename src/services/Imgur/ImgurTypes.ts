export interface GetGalleryParams {
  section: Section;
  showViral: boolean;
  window?: Window;
  page: number;
  sort: Sort;
}

export type Section = 'hot' | 'top' | 'user';
export type Sort = 'viral' | 'top' | 'time' | 'rising';
export type Window = 'day' | 'week' | 'month' | 'year' | 'all';

export interface GetGalleryResponse {
  data: GalleryItem[];
}

export type GalleryItem = GalleryImage | GalleryAlbum;

export interface GalleryAlbum extends GalleryItemMetadata {
  is_album: true;
  cover: string;
  images: GalleryImage[];
}

export interface GalleryImage extends GalleryItemMetadata {
  is_album: false;
  animated: boolean;
  type: string;
  width: number;
  height: number;
  link: string;
  mp4: string;
  looping: boolean;
}

interface GalleryItemMetadata {
  is_album: boolean;
  id: string;
  title: string | null;
  description: string | null;
  ups: number;
  downs: number;
  score: number;
}

export function isGalleryAlbum(item: GalleryItem): item is GalleryAlbum {
  return item.is_album;
}
export function isGalleryImage(item: GalleryItem): item is GalleryImage {
  return !item.is_album;
}
