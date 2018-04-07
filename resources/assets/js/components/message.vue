<template>
    <div>
        <li class="list-group-item" :class="className"><slot></slot>
        <small>{{ time }}</small>
        </li>
        <small class="float-right" :class="whoSend">{{ user }}</small>
    </div>
</template>

<script>
    export default {
        props:[
            'color',
            'time',
            'user'
        ],
        computed:{
            className(){
                return 'list-group-item-' + this.color;
            },
            whoSend(){
                return 'text-' + this.color;
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
