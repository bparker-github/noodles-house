<template>
  <div
    :class="[
      'task-info-and-navigation',
      'flex flex-col w-full gap-y-4',
      'bg-white rounded-md shadow-lg px-3 py-5',
    ]"
  >
    <div class="heading-section flex flex-col gap-y-2 text-nh-bourbon-900 [&>p]:text-sm">
      <h1 class="text-2xl font-semibold">Ideas List</h1>
      <p>Here we can collect "todos" or "tasks", ideas and feedback from all sources.</p>
      <p>
        Feel free to add anything and everything that will be helpful to consult at some point. We
        can add feedback, comments, progress, status, and anything else you can think of for these
        features!
      </p>
      <p>Even improvements about this List feature itself is heartily welcome!</p>
    </div>
    <hr class="border-nh-bourbon-800/50" />
  </div>
</template>
