<template>
  <main>
    <div class="container mx-auto px-4 mt-5">
      <div class="flex justify-between">
        <button @click="cupidStore.msg = true" class="bg-[#ff8398] w-[120px] relative leading-[40px] bold text-[#b7213b] rounded-[30px] pr-[20px] hover:bg-[#d65a6f]">ADD <PlusIcon class="size-6 text-[#b7213b] absolute top-[9px] right-[25px]" /></button>
        <input type="text" placeholder="Search..." class="rounded-[30px] py-0 px-[20px] border-[#c86e7e] border-solid border-[1px]">
      </div>
      <div class="flex flex-wrap justify-evenly mt-10 msg_wrap">
        <section v-if="cupidStore.msg">
          <span @click="cupidStore.msg = false" class="absolute top-[-20px] right-[-7px] text-center rounded-[30px] text-[23px] cursor-pointer hover:opacity-[0.5]">&times;</span>
          <textarea v-model="cupidStore.message" cols="30" rows="10" placeholder="Enter message here..." class="w-[100%] p-2" :class="{ sending: cupidStore.isLoading  }"></textarea>
          <PaperAirplaneIcon @click="cupidStore.store" class="size-5 text-[#b7213b] absolute bottom-[18px] right-[20px] cursor-pointer hover:opacity-[0.5]" />
        </section>
        <p v-if="cupidStore.msgLoading" class="text-center text-[#7d7d7d] mt-5">Loading...</p>
        <section v-else v-for="msg in cupidStore.messageList" :key="msg">
          <p>{{ msg.message_content }}</p>
          <span @click="cupidStore.comments = true; cupidStore.viewComment(msg.message_id)" class="text-right block mt-[10px] text-[14px] cursor-pointer hover:underline">15 comments</span>
        </section>
      </div>

      <!-- modal -->
       <div v-if="cupidStore.comments" class="fixed bg-[rgba(0,0,0,0.5)] top-0 left-0 w-[100%] h-[100%]">
        <div class="w-[500px] bg-[#fff] p-[12px] mx-auto rounded-[6px] mt-[30px] relative">
          <div class="h-[300px] overflow-y-scroll">
            <span @click="cupidStore.comments = false" class="absolute top-[-15px] right-[-12px] text-center rounded-[30px] text-[23px] cursor-pointer hover:opacity-[0.5] text-[#fff] bg-[#dd6e81] w-[25px] h-[25px] leading-[20px]">&times;</span>
            <p class="bg-[#ffe3e8] p-[12px] rounded-[4px] mb-[25px]">{{ cupidStore.msgComment }}</p>
            <hr class="bg-[#d97183] mb-5">
            <ul class="mb-5">
              <li v-for="comment in cupidStore.msgCommentList" :key="comment" class="bg-[#eee] mb-[5px] rounded-[30px] leading-[16px] text-[15px] p-[12px] text-[#797979]">{{ comment.comment_content }}</li>
            </ul>
          </div>
          <div class="relative">
            <input type="text" v-model="cupidStore.msg_comment" class="w-[100%] border-solid border-[#f09caa] border-[1px] rounded-[4px] bg-[#ffe6eb] py-[6px] pl-[12px] pr-[30px]" placeholder="Write a comment...">
            <PaperAirplaneIcon @click="cupidStore.addComment" class="size-5 text-[#b7213b] absolute top-[10px] right-[6px] cursor-pointer hover:opacity-[0.5]" />
          </div>
        </div>
       </div>
    </div>
  </main>
</template>

<script setup>
import { useCupidStore } from '@/stores/cupidStore';
import { PlusIcon, PaperAirplaneIcon } from '@heroicons/vue/24/solid';

const cupidStore = useCupidStore();
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
