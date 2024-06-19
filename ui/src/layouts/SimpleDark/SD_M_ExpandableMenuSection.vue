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
        class="rounded-md"
        @dblClick.prevent
        @click="closeMenu"
      />

      <!-- Otherwise, wrap in disclosure. -->
      <Disclosure
        v-else
        v-slot="{ open }"
        as="div"
        class="flex flex-1 flex-col text-start"
      >
        <!-- The trigger for this disclosure is the same as the flat line item. -->

        <DisclosureButton
          :as="ItemItself"
          :item="item"
          :class="!open ? 'rounded-md' : 'rounded-t-md bg-nh-chalet-green-600'"
        />

        <FadeSlideDown>
          <DisclosurePanel
            :class="['sm:hidden z-[100] shadow-xl rounded-b-md', 'bg-nh-chalet-green-600']"
          >
            <div
              :class="[
                'ml-4 bg-nh-chalet-green-500/50 rounded-md rounded-tr-none',
                'border-l-2 border-t-2 border-nh-chalet-green-700',
              ]"
            >
              <ItemItself
                v-for="(child, i) in item.children"
                :key="(child.id ?? child.label) + '-' + i"
                :item="child"
                :class="[
                  'last:rounded-br-md first:rounded-tl-md',
                  'border-r-2 last:border-b-2 border-nh-chalet-green-600',
                ]"
                @click="closeMenu"
              />
            </div>
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
