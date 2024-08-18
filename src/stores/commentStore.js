import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useMessageStore } from './messageStore';

export const useCommentStore = defineStore('comment', () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const commentLoading = ref(false)
    const isLoading = ref(false);
    const comments = ref(false);
    const msgComment = ref([]);
    const msgCommentList = ref('');
    const commentID = ref('');
    const msg_comment = ref('');
    const messageStore = useMessageStore();
    
    const viewComment = async (id) => {
        try {
            commentID.value = id;
            commentLoading.value = true;
            msgCommentList.value = [];
            const res = await axios.get(apiUrl + `comments/${id}`);

            if(res.data.success) msgCommentList.value = res.data.result;

            messageStore.messageList.forEach(msg => {
                if(msg.message_id === id) {
                    msgComment.value = msg.message_content;
                    commentLoading.value = false;
                }
            });
        }catch(error) {
            console.log('Something went wrong: ', error);
        }
    }

    const addComment = async () => {
        try {
            const formData = new FormData();
            formData.append('id', commentID.value);
            formData.append('comment', msg_comment.value);

            const res = await axios.post(apiUrl + 'store-comment', formData);

            if(res.data.success) msg_comment.value = '';

            viewComment(commentID.value);
        }catch(error) {
            console.log('Something went wrong: ', error);
        }
    }

    return {
        apiUrl, isLoading, comments, commentLoading, 
        viewComment, msgComment, msg_comment,
        addComment, msgCommentList
    }
})
