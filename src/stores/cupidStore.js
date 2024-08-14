import axios from 'axios';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const useCupidStore = defineStore('cupid', () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const loader = reactive({
        message: false,
        comment: false,
    });
    const isLoading = ref(false);
    const message = ref('');
    const messageList = ref([]);
    const msg = ref(false);
    const comments = ref(false);
    const msgComment = ref([]);
    const msgCommentList = ref('');
    const commentID = ref('');
    const msg_comment = ref('');

    const index = async () => {
        try {
            loader.message = true
            const res = await axios.get(apiUrl);

            if(res.data.success) {
                loader.message = false
                messageList.value = res.data.result;
            }
        }catch(error) {
            console.log('Something went wrong: ', error);
        }
    }

    index();

    const store = async () => {
        try {
            isLoading.value = true;
            const formData = new FormData();
            formData.append('message', message.value);

            const res = await axios.post(apiUrl + 'store-message', formData);

            if(res.data.success) {
                isLoading.value = false;
                msg.value = false;
                message.value = '';

                index();
            }
        }catch(error) {
            console.log('Something went wrong: ', error);
        }
    }

    const viewComment = async (id) => {
        try {
            commentID.value = id;
            loader.comment = true;
            msgCommentList.value = [];
            const res = await axios.get(apiUrl + `comments/${id}`);

            if(res.data.success) msgCommentList.value = res.data.result;

            messageList.value.forEach(msg => {
                if(msg.message_id === id) {
                    msgComment.value = msg.message_content;
                    loader.comment = false;
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
        apiUrl, message, store, isLoading, 
        messageList, msg, comments, loader, 
        viewComment, msgComment, msg_comment,
        addComment, msgCommentList
    }
})
