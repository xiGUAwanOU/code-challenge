export interface GetGalleryParams {
  section: Section;
  showViral: boolean;
  window: Window;
  page: number;
  sort: Sort;
}

type Section = 'hot' | 'top' | 'user';
type Sort = 'viral' | 'top' | 'time' | 'rising';
type Window = 'day' | 'week' | 'month' | 'year' | 'all';

export interface GetGalleryResponse {
  data: GalleryItem[];
}

export type GalleryItem = GalleryImage | GalleryAlbum;

export interface GalleryAlbum extends GalleryItemMetadata {
  is_album: true;
  cover: string;
}

export interface GalleryImage extends GalleryItemMetadata {
  is_album: false;
  type: string;
  animated: boolean;
  looping: boolean;
  size: number;
  link: string;
  mp4: string;
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
