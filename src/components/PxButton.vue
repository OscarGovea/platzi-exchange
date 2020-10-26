<template>
    <button v-on:click="buttonClick" class="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-2 border border-orange-500 hover:border-transparent rounded">
        <slot></slot>
    </button>
    
</template>


<script>
export default {
    name:'PxButton',
    methods:{
        buttonClick(){
            this.$emit('custom-click')
        }
    } 
}
</script>