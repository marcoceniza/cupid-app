import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessageStore = defineStore('message', () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const msgLoading = ref(false)
    const isLoading = ref(false);
    const message = ref('');
    const messageList = ref([]);
    const msg = ref(false);

    const index = async () => {
        try {
            msgLoading.value = true
            const res = await axios.get(apiUrl);

            if(res.data.success) {
                msgLoading.value = false
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

    return {
        apiUrl, message, store, isLoading, 
        messageList, msg, msgLoading
    }
})
