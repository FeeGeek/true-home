<script setup lang="ts">
interface Props {
  plugin: Plugin.BasePlugin<Plugin.Component.BaseTable<{ [key: string]: any }>>;
}

defineProps<Props>();
</script>

<template>
  <div
    class="mb-5 w-full rounded-4 bg-[rgba(248,233,235,0.8)] p-5 text-center shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
    :class="plugin.meta.containerClass"
  >
    <div class="mb-5 text-1.5em text-[#6c5b7b]" :class="plugin.meta.headerClass">{{ plugin.meta.title }}</div>
    <table class="w-full border-collapse" :class="plugin.meta.tableClass">
      <thead>
        <tr>
          <th
            v-for="column in plugin.meta.columns"
            :key="column.key"
            class="border-b-[1px] border-[#e0c3c7] bg-[#f2d7d9] py-2.5 text-[#6c5b7b]"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in plugin.meta.list"
          :key="index"
          :class="index % 2 === 0 ? 'bg-[#f8e9eb]' : 'bg-[#f2d7d9]'"
        >
          <td v-for="column in plugin.meta.columns" :key="column.key" class="border-b-[1px] border-[#e0c3c7] py-2.5">
            {{ item[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
