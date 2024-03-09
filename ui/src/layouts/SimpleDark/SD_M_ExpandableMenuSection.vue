<template>
  <div :class="['flex flex-col flex-1 justify-center space-y-1 p-2']">
    <template
      v-for="(item, i) in items"
      :key="(item.id ?? item.label) + 'i' + i"
    >
      <!-- If it's a regular link, we wrap with DiscButton for parent-closing. -->
      <DisclosureButton
        v-if="!item.children?.length"
        :as="ItemItself"
        :item="item"
      />

      <!-- Otherwise, wrap in another disclosure. -->
      <Disclosure
        v-else
        as="div"
        class="flex flex-1 text-start"
      >
        <!-- The trigger for this disclosure is the same as the flat line item. -->

        <DisclosureButton
          :as="ItemItself"
          :item="item"
        />

        <FadeSlideDown>
          <DisclosurePanel :class="['sm:hidden z-[100] shadow-xl', 'bg-nh-chalet-green-200']">
            <ItemItself :item="item" />
          </DisclosurePanel>
        </FadeSlideDown>
      </Disclosure>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ListItem } from '@/components/ItemList';
import FadeSlideDown from '@/components/transitions/FadeSlideDown.vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import ItemItself from './SD_M_ItemItself.vue';

export interface ExpandableMenuSectionProps {
  items: ListItem[];
}
defineProps<ExpandableMenuSectionProps>();
</script>
