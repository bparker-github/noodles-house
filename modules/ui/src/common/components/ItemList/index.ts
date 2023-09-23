import type { RequireOnlyOne } from '@nh/shared';
import type { Component } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

interface ListItem_All {
  /** The visual representation of this ListItem. */
  label: string;
  /** An optional override to use as the dom id. Defaults to @see {this.label} */
  id?: string | number;
  /** An optional indicator that the item is selected. */
  current?: boolean;

  leftIcon: Component;
  leftInitial: string;

  to: RouteLocationRaw;
  click: () => Promise<void> | void;
}

export type ListItem = RequireOnlyOne<
  RequireOnlyOne<ListItem_All, 'leftIcon' | 'leftInitial'>,
  'to' | 'click'
>;

export { default as MainItemList } from './MainList.vue';
export { default as ItemListItem } from './SingleItem.vue';
