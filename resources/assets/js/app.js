require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout: 5000})

Vue.component('message', require('./components/message.vue'));

const app = new Vue({
    el: '#app',
    data: {
    	message: '',
    	chat: {
    		message: [],
    		color: [],
    		time: [],
    		user: []
    	},
    	typing: '',
        numberOfUsers:0
    },
    watch:{
    	message(){
    		Echo.private('chat')
		    .whisper('typing', {
		        name: this.message
		    });
    	}
    },
    methods:{
    	send(){
    		if(this.message.length > 0){
    			this.chat.message.push(this.message);
    			this.chat.color.push('success');
    			this.chat.user.push('You');
    			this.chat.time.push(this.getTime());
    			axios.post('/send', {
    				message : this.message
				})
				.then(response => {
					console.log(response);
					this.message = '';
				})
				.catch(error => {
					console.log(error);
				});
    		}
    	},
    	getTime(){
    		let time = new Date();
    		return time.getHours() + ':' + time.getMinutes();
    	}
    },
    mounted(){
    	Echo.private('chat')
	    .listen('ChatEvent', (e) => {
	        this.chat.message.push(e.message);
	        this.chat.color.push('warning');
	        this.chat.user.push(e.user);
	        this.chat.time.push(this.getTime());
	    })
	    .listenForWhisper('typing', (e) => {
	        if(e.name != ''){
	        	this.typing = 'typing...';
	        }else{
	        	this.typing = '';
	        }
	    })

        Echo.join('chat')
        .here((users) => {
            this.numberOfUsers = users.length;
        })
        .joining((user) => {
            this.numberOfUsers += 1;
            this.$toaster.success(user.name+' is joined the chat room.');
        })
        .leaving((user) => {
            this.numberOfUsers -= 1;
            this.$toaster.success(user.name+' is leaved the chat room.');
        });
    }
});
