import type { FunctionalComponent } from 'vue';

interface ListItemBase {
  /** The visible name of the item */
  name: string;
  /** An optional id to use as the element key - otherwise name. */
  id?: string | number;
  /** An optional value to trace the active state, used to change visual */
  current?: boolean;
}
interface ListItem_Icon extends ListItemBase {
  icon: FunctionalComponent;
}
interface ListItem_Initial extends ListItemBase {
  initial: string;
}

interface ListItem_Href {
  href: string;
}
interface ListItem_Click {
  click: () => void | Promise<void>;
}

type LinkListItem =
  | (ListItem_Href & ListItemBase)
  | (ListItem_Href & ListItem_Initial)
  | (ListItem_Href & ListItem_Icon);
type ClickListItem =
  | (ListItem_Click & ListItemBase)
  | (ListItem_Click & ListItem_Initial)
  | (ListItem_Click & ListItem_Icon);

export type ListItem = LinkListItem | ClickListItem;
