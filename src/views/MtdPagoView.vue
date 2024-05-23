<template>
    <div class="pago">
        <sidebar />
        <div class="contenedor">
            <div class="titulo">
                <img src="@/assets/img/IMG-LOGO-RED.png" alt="">
                <h1>Método de Pago</h1>
            </div>
            <div class="info">
                <span>Para completar tus compras, deposita la cantidad indicada en tu historial de compras.</span>
                <span>Número de tranferencia</span>
                <span>648294736405827485</span>
            </div>
        </div>
    </div>
</template>

<script>
import sidebar from '@/components/sidebar.vue'
import axios from 'axios';
import { URL_DATOS } from '@/Utils/constantes';

export default {
    name: 'LoginView',
    components: {
        sidebar
    },
    data: function () {
        return {
            user: {
                email: '',
                password: ''
            }
        }

    },
    methods: {
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.pago {
    background-image: url("@/assets/img/login-background.png");
    background-size: 100% 100%;
    height: 100vh;
    width: calc(99.3% - 7vh);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 8vh;
    border-radius: 2vh;
    margin-top: .5%;
}

.contenedor {
    display: flex;
    flex-direction: column;
    background-color: #FFFCF7;
    height: 90%;
    width: 90%;
    /* gap: 20vh; */
    border-radius: 2vh;
    box-shadow: 0px 4px 4px 0px #00000040;
    gap: 1vh;
}

.titulo {
    /* background-color: #7fca65; */
    font-family: 'Playfair Display', serif;
    display: flex;
    height: 10%;
    width: 100%;
    font-size: 2.5vh;
    font-weight: bold;
    color: #FF5733;
    align-items: center;
    margin-top: 2%;
    margin-left: 2%;
}

.titulo img {
    height: 10vh;
    margin-left: 2vh;
}

.info {
    font-family: 'DM Sans', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    margin-top: 2vh;
    font-size: 2vh;
    color: #391414;
    margin-left: 9%;
}
</style>