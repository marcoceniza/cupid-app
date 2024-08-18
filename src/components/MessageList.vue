<template>
    <p>{{ props.msg }}</p>
    <span @click="commentStore.comments = true; commentStore.viewComment(props.id)" class="text-right block mt-[10px] text-[14px] cursor-pointer hover:underline">15 comments</span>
</template>

<script setup>
import { useCommentStore } from '@/stores/commentStore';

const props = defineProps(['msg', 'id']);
const commentStore = useCommentStore();
</script>