<template>
    <div class="cart page">
        <sidebar />
        <h1>Carrito de compras</h1>
    </div>
</template>

<script>
import sidebar from '@/components/sidebar.vue'

export default{
    name: 'CartView',
    components:{
        sidebar
    }
}
</script>

<style>
</style>