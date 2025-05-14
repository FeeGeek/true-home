<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { fetchGetMyHomeContactInfoList, fetchGetMyHomeUserInfo } from '@/service/api';
import ContactPopup from '@/components/home/contact-popup.vue';

interface Props {
  username: string;
}

const props = defineProps<Props>();

const userInfo = ref<My.UserInfo>({
  id: '',
  username: '',
  nickName: '',
  avatar: ''
});

const contacts = ref<My.Contact[]>([]);

const getUserInfo = async (username: string) => {
  try {
    const res = await fetchGetMyHomeUserInfo({ username });
    if (res.error) return null;
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const getMyHomeContactInfoList = async (userId: string) => {
  try {
    const res = await fetchGetMyHomeContactInfoList({ userId });
    if (res.error) return [];
    return res.data ?? [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

(async () => {
  try {
    const userInfoResult = await getUserInfo(props.username);
    if (userInfoResult) {
      userInfo.value = userInfoResult;
      contacts.value = await getMyHomeContactInfoList(userInfoResult.id);
    }
  } catch (e) {
    console.error(e);
  }
})();

const currentId = ref('');

const setCurrentId = (id: string) => {
  if (currentId.value === id) {
    currentId.value = '';
    return;
  }
  currentId.value = id;
};

const copyId = ref('');

const copyToClipboard = async (text: string, id: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('复制成功:', text);
    copyId.value = id;
    setTimeout(() => {
      copyId.value = '';
    }, 2000);
  } catch (error) {
    console.error('复制失败:', error);
    copyId.value = '';
  }
};

const isPopupOpen = ref(false);
const selectedContact = ref<My.Contact | null>(null);

const openPopup = (contact: My.Contact) => {
  selectedContact.value = contact;
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
  selectedContact.value = null;
};

const handleIconClick = (contact: My.Contact) => {
  setCurrentId(contact.id);
  if (contact.linkType === 'img' || contact.linkType === 'text') {
    openPopup(contact);
  }
};
</script>

<template>
  <div
    class="mb-5 rounded-4 bg-[rgba(248,233,235,0.8)] p-5 text-left shadow-[0_4px_8px_rgba(0,0,0,0.1)] backdrop-blur-10px"
  >
    <!-- SVG 水印 -->
    <icon-local-logo class="absolute right-4 top-4 text-20 opacity-40" style="transform: rotate(25deg)" />
    <div v-if="userInfo.id" class="relative flex items-center">
      <!-- 内容 -->
      <img class="mr-5 h-15 w-15 rounded-full" :src="userInfo.avatar" alt="用户头像" />
      <div class="text-left">
        <p class="my-2.5 text-1.5em text-[#6c5b7b]">{{ userInfo.nickName }}</p>
        <!-- <p class="my-2.5 text-[#6c5b7b]">用户简介：{{ userInfo.description }}</p>-->
      </div>
    </div>
    <div v-if="!userInfo.id || contacts.length > 0" class="pb-2 pt-2 text-center text-2em text-[#6c5b7b]">
      {{ userInfo.id ? '' : '用户正在回家~' }}
    </div>
    <!-- 联系方式部分 -->
    <div class="flex flex-wrap gap-2">
      <div
        v-for="contact in contacts"
        :key="contact.id"
        :class="{ active: currentId === contact.id }"
        class="flex items-center rounded-lg bg-[#F2D7D9]/50 px-2 py-2 shadow hover:bg-[#F2D7D9]/80"
      >
        <Icon
          v-if="contact.icon"
          :icon="contact.icon"
          class="flex-shrink-0 text-2xl text-[#6c5b7b]"
          @click="handleIconClick(contact)"
        />
        <span
          v-show="contact.showContactName || currentId === contact.id"
          class="flex-shrink-0 text-[#6c5b7b]"
          @click="handleIconClick(contact)"
        >
          {{ contact.contactName }}
        </span>
        <span v-show="currentId === contact.id">
          <a
            v-if="contact.linkType === 'url'"
            :href="contact.link"
            class="ml-3 flex-1 text-[#6c5b7b] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ contact.contact }}
          </a>
          <button
            v-else-if="contact.linkType === 'copy'"
            class="ml-3 flex-1 cursor-pointer bg-transparent text-[#6c5b7b] hover:underline"
            @click="copyToClipboard(contact.link, contact.id)"
          >
            {{ copyId === contact.id ? '复制成功' : contact.contact }}
          </button>
          <button
            v-else-if="contact.linkType === 'box'"
            class="ml-3 flex-1 cursor-pointer bg-transparent text-[#6c5b7b] hover:underline"
            @click="openPopup(contact)"
          >
            {{ contact.contact }}
          </button>
        </span>
      </div>
    </div>

    <!-- 弹窗组件 -->
    <ContactPopup v-if="selectedContact" :contact="selectedContact" :is-open="isPopupOpen" @close="closePopup" />
  </div>
</template>

<style scoped></style>
