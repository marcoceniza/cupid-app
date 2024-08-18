<template>
  <main>
    <div class="container mx-auto px-4 mt-5">
      <div class="flex justify-between">
        <button @click="messageStore.msg = true" class="bg-[#ff8398] w-[120px] relative leading-[40px] bold text-[#b7213b] rounded-[30px] pr-[20px] hover:bg-[#d65a6f]">ADD <PlusIcon class="size-6 text-[#b7213b] absolute top-[9px] right-[25px]" /></button>
        <input type="text" placeholder="Search..." class="rounded-[30px] py-0 px-[20px] border-[#c86e7e] border-solid border-[1px]">
      </div>
      <div class="flex flex-wrap justify-evenly mt-10 msg_wrap">
        <section v-if="messageStore.msg">
          <span @click="messageStore.msg = false" class="absolute top-[-20px] right-[-7px] text-center rounded-[30px] text-[23px] cursor-pointer hover:opacity-[0.5]">&times;</span>
          <textarea v-model="messageStore.message" cols="30" rows="10" placeholder="Enter message here..." class="w-[100%] p-2" :class="{ sending: messageStore.isLoading  }"></textarea>
          <PaperAirplaneIcon @click="messageStore.store" class="size-5 text-[#b7213b] absolute bottom-[18px] right-[20px] cursor-pointer hover:opacity-[0.5]" />
        </section>
        <p v-if="messageStore.msgLoading" class="text-center text-[#7d7d7d] mt-5">Loading...</p>
        <section v-else v-for="msg in messageStore.messageList" :key="msg">
          <MessageList :msg="msg.message_content" :id="msg.message_id" />
        </section>
      </div>

      <!-- modal -->
      <CommentList v-if="commentStore.comments" />
    </div>
  </main>
</template>

<script setup>
import { useMessageStore } from '@/stores/messageStore';
import { useCommentStore } from '@/stores/commentStore';
import { PlusIcon, PaperAirplaneIcon } from '@heroicons/vue/24/solid';
import MessageList from '@/components/MessageList.vue';
import CommentList from '@/components/CommentList.vue';

const messageStore = useMessageStore();
const commentStore = useCommentStore();
</script>

<style scoped>
.msg_wrap section {
  background: #f7e0e4;
  border-radius: 4px;
  margin: 8px;
  padding: 12px;
  width: 280px;
  max-width: 100%;
  position: relative;
  min-height: 282px;
}
.msg_wrap section p {
  border-bottom: 1px solid #cc7282;
  padding-bottom: 20px;
}
.msg_wrap section:nth-child(odd) {
  background: #ffc5cf !important;
}
.sending {
  opacity: 0.5;
  pointer-events: none;
}
</style>
