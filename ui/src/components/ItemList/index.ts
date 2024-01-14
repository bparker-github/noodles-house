import type { RequireOnlyOne } from '@/lib';
import type { Component } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

interface ListItem_All {
  /** The visual representation of this ListItem. */
  label: string;
  /** An optional override to use as the dom id. Defaults to @see {this.label} */
  id?: string | number;
  /** An optional indicator that the item is selected. */
  current?: boolean;

  to: RouteLocationRaw;
  click?: () => Promise<void> | void;
}
interface ListItem_Left {
  leftIcon?: Component;
  leftInitial?: string;
}
type ListItemLeft = RequireOnlyOne<ListItem_Left, 'leftIcon' | 'leftInitial'>;

export type ListItem = ListItem_All & ListItemLeft;

export { default as MainItemList } from './MainList.vue';
export { default as ItemListItem } from './SingleItem.vue';
