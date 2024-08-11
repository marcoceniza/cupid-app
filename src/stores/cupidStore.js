// import {  } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCupidStore = defineStore('cupid', () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const isLoading = ref(false);
    const message = ref('');

    const index = async () => {
        try{
            const res = await axios.get(apiUrl);
            console.log(res.data.result);
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

            const res = await axios.post(apiUrl + 'store', formData);
            if(!res.data.success) return;
            isLoading.value = false;
            message.value = '';
        }catch(error) {
            console.log('Something went wrong: ', error);
        }
    }

    return { apiUrl, message, store, isLoading }
})
