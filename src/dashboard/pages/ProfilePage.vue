<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-6 sm:px-6">
      <h3 class="text-gray-900 text-base font-semibold leading-7">Applicant Information</h3>
      <p class="mt-1 text-gray-500 max-w-2xl text-sm leading-6">
        Personal details and application.
      </p>
    </div>
    <div class="border-gray-100 border-t">
      <dl class="divide-gray-100 divide-y">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-gray-900 text-sm font-medium">Full name</dt>
          <dd class="mt-1 text-gray-700 sm:mt-0 text-sm leading-6 sm:col-span-2">Margot Foster</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-gray-900 text-sm font-medium">Application for</dt>
          <dd class="mt-1 text-gray-700 sm:mt-0 text-sm leading-6 sm:col-span-2">
            Backend Developer
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-gray-900 text-sm font-medium">Email address</dt>
          <dd class="mt-1 text-gray-700 sm:mt-0 text-sm leading-6 sm:col-span-2">
            margotfoster@example.com
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-gray-900 text-sm font-medium">Salary expectation</dt>
          <dd class="mt-1 text-gray-700 sm:mt-0 text-sm leading-6 sm:col-span-2">$120,000</dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-gray-900 text-sm font-medium">About</dt>
          <dd class="mt-1 text-gray-700 sm:mt-0 text-sm leading-6 sm:col-span-2">
            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa
            consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit
            nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing
            reprehenderit deserunt qui eu.
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-gray-900 text-sm font-medium leading-6">Attachments</dt>
          <dd class="mt-2 text-gray-900 sm:mt-0 text-sm sm:col-span-2">
            <ul
              role="list"
              class="divide-gray-100 border-gray-200 divide-y rounded-md border"
            >
              <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                <div class="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    class="text-gray-400 h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div class="ml-4 flex min-w-0 flex-1 gap-2">
                    <span class="truncate font-medium">resume_back_end_developer.pdf</span>
                    <span class="text-gray-400 flex-shrink-0">2.4mb</span>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a
                    href="#"
                    class="text-indigo-600 hover:text-indigo-500 font-medium"
                    >Download</a
                  >
                </div>
              </li>
              <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                <div class="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    class="text-gray-400 h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div class="ml-4 flex min-w-0 flex-1 gap-2">
                    <span class="truncate font-medium">coverletter_back_end_developer.pdf</span>
                    <span class="text-gray-400 flex-shrink-0">4.5mb</span>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a
                    href="#"
                    class="text-indigo-600 hover:text-indigo-500 font-medium"
                    >Download</a
                  >
                </div>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PaperClipIcon } from '@heroicons/vue/20/solid';
</script>
