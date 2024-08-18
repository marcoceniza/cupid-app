<template>
    <div class="fixed bg-[rgba(0,0,0,0.5)] top-0 left-0 w-[100%] h-[100%]">
        <div class="w-[500px] bg-[#fff] p-[12px] mx-auto rounded-[6px] mt-[30px] relative">
          <div class="h-[300px] overflow-y-scroll">
            <span @click="commentStore.comments = false" class="absolute top-[-15px] right-[-12px] text-center rounded-[30px] text-[23px] cursor-pointer hover:opacity-[0.5] text-[#fff] bg-[#dd6e81] w-[25px] h-[25px] leading-[20px]">&times;</span>
            <div v-if="commentStore.commentLoading" class="animate-pulse">
              <div class="bg-[#ffe3e8] p-[12px] rounded-[4px] mb-[25px]"></div>
            </div>
            <p v-else class="bg-[#ffe3e8] p-[12px] rounded-[4px] mb-[25px]">{{ commentStore.msgComment }}</p>
            <hr class="bg-[#d97183] mb-5">
            <p v-if="commentStore.commentLoading" class="text-center text-[#7d7d7d] mt-5 text-[13px]">Loading...</p>
            <p v-else-if="commentStore.msgCommentList.length === 0" class="text-center text-[#7d7d7d] mt-5 text-[13px]">No comments available.</p>
            <ul v-else class="mb-5">
              <li v-for="comment in commentStore.msgCommentList" :key="comment" class="bg-[#eee] mb-[5px] rounded-[30px] leading-[16px] text-[15px] p-[12px] text-[#797979]">{{ comment.comment_content }}</li>
            </ul>
          </div>
          <div class="relative">
            <input type="text" v-model="commentStore.msg_comment" class="w-[100%] border-solid border-[#f09caa] border-[1px] rounded-[4px] bg-[#ffe6eb] py-[6px] pl-[12px] pr-[30px]" placeholder="Write a comment...">
            <PaperAirplaneIcon @click="commentStore.addComment" class="size-5 text-[#b7213b] absolute top-[10px] right-[6px] cursor-pointer hover:opacity-[0.5]" />
          </div>
        </div>
      </div>
</template>

<script setup>
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid';
import { useCommentStore } from '@/stores/commentStore';

const props = defineProps(['msg', 'id']);
const commentStore = useCommentStore();
</script>