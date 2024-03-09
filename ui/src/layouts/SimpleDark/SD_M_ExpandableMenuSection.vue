<template>
  <div :class="['flex flex-col justify-center space-y-1 p-2']">
    <template
      v-for="(item, i) in primaryItemList"
      :key="(item.id ?? item.label) + 'i' + i"
    >
      <!-- If it's a regular link, we wrap with DiscButton for parent-closing. -->
      <ItemItself
        v-if="!item.children?.length"
        :item="item"
        @click="closeMenu"
      />

      <!-- Otherwise, wrap in disclosure. -->
      <Disclosure
        v-else
        as="div"
        class="flex flex-1 text-start"
      >
        <!-- The trigger for this disclosure is the same as the flat line item. -->

        <DisclosureButton
          :as="ItemItself"
          :item="item"
          @click="closeMenu"
        />

        <FadeSlideDown>
          <DisclosurePanel :class="['sm:hidden z-[100] shadow-xl', 'bg-nh-chalet-green-200']">
            <ItemItself
              :item="item"
              @click="closeMenu"
            />
          </DisclosurePanel>
        </FadeSlideDown>
      </Disclosure>
    </template>
  </div>
</template>

<script setup lang="ts">
import FadeSlideDown from '@/components/transitions/FadeSlideDown.vue';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import ItemItself from './SD_M_ItemItself.vue';

const { primaryItemList, closeMenu } = useDashboardStore();
</script>
