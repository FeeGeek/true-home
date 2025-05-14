<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
  contact: My.Contact;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'copy', id: string): void;
}>();

const handleCopy = () => {
  navigator.clipboard.writeText(props.contact.link).then(() => {
    emit('copy', props.contact.id);
  });
};
</script>

<template>
  <Transition name="popup">
    <!-- 使用 Teleport 将弹窗内容渲染到 body -->
    <Teleport to="body">
      <!-- 遮罩 -->
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        @click.self="$emit('close')"
      >
        <!-- 弹窗主体 -->
        <div
          class="mix-w-[300px] relative max-h-[90%] max-w-[90%] overflow-y-auto rounded-lg bg-white p-4 pt0 shadow-lg"
          @click.stop
        >
          <div class="sticky left-0 top-0 h-14 w100% flex-center justify-between bg-white pl-4 pr-4">
            <!-- 关闭按钮 -->
            <button
              class="absolute right-3 top-3 bg-transparent text-size-2xl text-gray-600 hover:text-gray-800"
              @click="$emit('close')"
            >
              ×
            </button>
            <!-- 标题 -->
            <div class="flex items-center space-x-3">
              <Icon v-if="contact.icon" :icon="contact.icon" class="text-2xl text-[#6c5b7b]" />
              <span class="text-[#6c5b7b]">
                {{ contact.contactName }}
              </span>
            </div>
          </div>
          <!-- 内容 -->
          <div class="mt-4 h100% min-w-50 flex flex-col-center justify-center">
            <a
              v-if="contact.linkType === 'url'"
              :href="contact.link"
              class="block text-[#6c5b7b] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ contact.contact }}
            </a>
            <button
              v-else-if="contact.linkType === 'copy'"
              class="w-full cursor-pointer bg-transparent text-[#6c5b7b] hover:underline"
              @click="handleCopy"
            >
              {{ contact.contact }}
            </button>
            <span v-else-if="contact.linkType === 'text'" class="whitespace-pre-wrap break-anywhere">
              {{ contact.link }}
            </span>
            <template v-else-if="contact.linkType === 'img'">
              <img
                v-for="img in contact.link.split(',')"
                :key="img"
                :src="img"
                class="flex-1"
                :alt="contact.contactName"
              />
            </template>
          </div>
        </div>
      </div>
    </Teleport>
  </Transition>
</template>

<style scoped></style>
