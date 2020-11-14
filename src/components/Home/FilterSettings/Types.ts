import { Section, Sort, Window } from '@/services/Imgur/ImgurTypes';

export interface FilterSettings {
  section: Section;
  showViral: boolean;
  window: Window | null;
  sort: Sort;
}
