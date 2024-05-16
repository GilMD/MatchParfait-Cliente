<template>
    <div class="user page">
        <sidebar />
        <div class="contentPage">
            <h1 class="usuario">Usuario</h1>
        </div>
        
    </div>
</template>

<script>
import sidebar from '@/components/sidebar.vue'

export default{
    name: 'UserView',
    components:{
        sidebar
    }
}
</script>

<style>
.page {
  background-color: rgb(255, 255, 255);
  height: 98vh;
  width: calc(99.3% - 65px);
  display: flex;
  flex-direction: column;
  /* Alinear elementos en columna */
  justify-content: flex-start;
  /* Alinear elementos arriba */
  margin-left: 75px;
  margin-top: 1vh;
  border-radius: 10px;
}
</style>