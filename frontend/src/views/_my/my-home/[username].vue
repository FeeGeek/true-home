<script setup lang="ts">
import { ref } from 'vue';
import { fetchGetMyHomePluginInstanceList } from '@/service/api';
import BaseTable from '@/components/home/base-table.vue';
import UserInfo from '@/views/_my/my-home/modules/user-info.vue';

interface Props {
  username: string;
}
const props = defineProps<Props>();

const plugins = ref<Plugin.BasePlugin[]>([]);

const getMyHomePluginInstanceList = async (username: string) => {
  const res = await fetchGetMyHomePluginInstanceList({ username });
  if (res.error) return;
  plugins.value = res.data;
};
getMyHomePluginInstanceList(props.username);
</script>

<template>
  <div
    class="h-full flex items-start justify-center bg-[#ffe1dc] bg-[url('@/assets/imgs/my-home-page-bg.png')] bg-cover font-sans"
  >
    <div class="max-w-600px w-90% rounded-5 pb-4 pt-5 text-center">
      <!-- 用户信息 -->
      <UserInfo :username="username" />
      <!-- plugins -->
      <template v-for="plugin in plugins" :key="plugin.id">
        <BaseTable :plugin="plugin" />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
