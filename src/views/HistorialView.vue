<template>
    <div class="pago">
        <sidebar />
        <div class="contenedor">
            <div class="titulo">
                <img src="@/assets/img/IMG-LOGO-RED.png" alt="">
                <span>Historial</span>
            </div>
            <div class="columnas">
                <div class="columna1">
                    <div class="cards">
                        <div class="card">
                            <div class="cardInfo">
                                <div class="pedido_status">
                                    <span class="pedido">Pedido: HF93JO</span>
                                    <span class="status">Estatus: Entregado</span>
                                </div>
                                <div class="fecha_total">
                                    <span class="fecha">Fecha: 12/12/2021</span>
                                    <span class="total1">Total: $500.00</span>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="cardInfo">
                                <div class="pedido_status">
                                    <span class="pedido">Pedido: HF93JO</span>
                                    <span class="status">Estatus: Entregado</span>
                                </div>
                                <div class="fecha_total">
                                    <span class="fecha">Fecha: 12/12/2021</span>
                                    <span class="total1">Total: $500.00</span>
                                </div>
                            </div>
                        </div><div class="card">
                            <div class="cardInfo">
                                <div class="pedido_status">
                                    <span class="pedido">Pedido: HF93JO</span>
                                    <span class="status">Estatus: Entregado</span>
                                </div>
                                <div class="fecha_total">
                                    <span class="fecha">Fecha: 12/12/2021</span>
                                    <span class="total1">Total: $500.00</span>
                                </div>
                            </div>
                        </div><div class="card">
                            <div class="cardInfo">
                                <div class="pedido_status">
                                    <span class="pedido">Pedido: HF93JO</span>
                                    <span class="status">Estatus: Entregado</span>
                                </div>
                                <div class="fecha_total">
                                    <span class="fecha">Fecha: 12/12/2021</span>
                                    <span class="total1">Total: $500.00</span>
                                </div>
                            </div>
                        </div><div class="card">
                            <div class="cardInfo">
                                <div class="pedido_status">
                                    <span class="pedido">Pedido: HF93JO</span>
                                    <span class="status">Estatus: Entregado</span>
                                </div>
                                <div class="fecha_total">
                                    <span class="fecha">Fecha: 12/12/2021</span>
                                    <span class="total1">Total: $500.00</span>
                                </div>
                            </div>
                        </div><div class="card">
                            <div class="cardInfo">
                                <div class="pedido_status">
                                    <span class="pedido">Pedido: HF93JO</span>
                                    <span class="status">Estatus: Entregado</span>
                                </div>
                                <div class="fecha_total">
                                    <span class="fecha">Fecha: 12/12/2021</span>
                                    <span class="total1">Total: $500.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columna2">
                    <div class="cardDetails">
                        <div class="pedido_fecha">
                            <span class="pedido2">Pedido: HF93JO</span>
                            <span class="fecha2">Fecha: 12/12/2021</span>
                        </div>
                        <div class="statusdiv">
                            <span class="status2">Estatus: Entregado</span>
                        </div>
                        <div class="cardProductDetails">
                            <div class="imagen">
                                <img src="@/assets/img/FDM_1.jpeg" alt="">
                            </div>
                            <div class="info2">
                                <div class="nombre_sparkles">
                                    <span class="nombre">The Everyday Palette</span>
                                    <img src="@/assets/img/icons/sparkles.svg" alt="">
                                </div>
                                <div class="marcadiv">
                                    <span class="marca">Beauty Creations</span>
                                </div>
                                <div class="colorPrecioBoton">
                                    <div class="colorPrecio">
                                        <div class="color-box" :style="{ backgroundColor: '#' + '9B0E28' }"></div>
                                        <span class="precio">$200.00</span>
                                    </div>
                                    <div class="boton">
                                        <button>Agregar comentario</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="linea-horizontal">
                        <div class="totaldiv">
                            <span class="rastrear">Rastrear</span>
                            <span class="total">Total: $500.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sidebar from '@/components/sidebar.vue'
import axios from 'axios';
import { URL_DATOS } from '@/Utils/constantes';

export default {
    name: 'HistorialView',
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
    position: relative;
    background-image: url("@/assets/img/login-background.png");
    background-size: 100% 100%;
    height: 98vh;
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
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #FFFCF7;
    height: 90%;
    width: 90%;
    /* gap: 20vh; */
    border-radius: 2vh;
    box-shadow: 0vh 0.4vh 0.4vh 0vh #00000040;
    gap: 1vh;
}

.titulo {
    position: relative;
    /* background-color: #7fca65; */
    font-family: 'Playfair Display', serif;
    display: flex;
    height: 10%;
    width: 100%;
    font-size: 5vh;
    font-weight: 400;
    color: var(--Subtitle, #9B0E28);
    align-items: center;
    margin-top: 2%;
    margin-left: 2%;
}

.titulo img {
    position: relative;
    width: 10vh;
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

.columnas {
    /* background-color: aqua; */
    position: relative;
    display: flex;
    flex-direction: row;
    height: 84.9%;
    width: 100%;
    /* gap: 1vh; */
}

.columna1, .columna2 {
    position: relative;
    /* background-color:beige; */
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;
    
}

.cards {
    position: relative;
    width: 78%;
    height: 95%;
    /* background-color: blueviolet; */
    display: flex;
    flex-direction: column;
    gap: 2vh;
    /* margin-top: 2vh;
    margin-left: 2%; */
    align-self: center;
    margin-left: 10%;
    overflow: auto;
}

.cards::-webkit-scrollbar {
    width: 1vh;
}

.cards::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 1vh;
}

.cards::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 1vh;
}

.card {
    position: relative;
    background-color: #FFFCF7;
    width: 96%;
    height: 20%;
    display: flex;
    flex-direction: row;
    gap: 5vh;
    border-radius: 2vh;
    box-shadow: 0vh 0.4vh 0.4vh 0vh #00000040;
    margin-top: 1%;
    margin-bottom: 1%;
}

.cardInfo {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    margin-left: 2.5vh;
    margin-top: 1vh;
    margin-bottom: 1vh;
}

.pedido_status {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2vh;
}

.pedido {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
}

.status {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
}

.fecha_total {
    /* background-color: aqua; */
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
}

.fecha {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
}

.total1 {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
    margin-right: 3%;
}

.cardDetails {
    position: relative;
    background-color: #FFFCF7;
    width: 96%;
    height: 95%;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    border-radius: 2vh;
    box-shadow: 0vh 0.4vh 0.4vh 0vh #00000040;
    margin-top: .5%;
    margin-bottom: 1%;
    margin-left: -.8%;
}

.pedido_fecha {
    /* background-color: aqua; */
    position: relative;
    display: flex;
    flex-direction: row;
    margin-left: 2.5vh;
    margin-top: 2vh;
    justify-content: space-between;
    margin-right: 3%;
}

.pedido2 {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
}

.fecha2 {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
}

.statusdiv {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 45vh;
    margin-left: 2.5vh;
}

.status2 {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
}

.cardProductDetails {
    position: relative;
    width: 96%;
    height: 20%;
    /* background-color: bisque; */
    display: flex;
    flex-direction: row;
    margin-left: 1vh;
    box-shadow: 0vh 0.4vh 0.4vh 0vh #00000040;
    border-radius: 2vh;
}

.imagen {
    position: relative;
    width: 33%;
    height: 100%;
    background-color: #FFFCF7;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2vh 0 0 2vh;
}

.imagen img {
    position: relative;
    width: 80%;
    height: 80%;
    object-fit: cover;
    
}

.info2 {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
}

.nombre_sparkles {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 1.3vh;
    margin-top: 1vh;
    margin-right: 2vh;
}

.nombre {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
}

.info2 img {
    position: relative;
    width: 3vh;
    height: 2.8vh;
}

.marcadiv {
    position: relative;
    display: flex;
    flex-direction: row;
    margin-left: 1.3vh;
}

.marca {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.8vh;
    color: #391414;
}

.colorPrecioBoton {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1vh;
    margin-left: 1.3vh;
    margin-right: 2vh;
}

.colorPrecio {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: .5vh;
}

.color-box {
    position: relative;
    width: 2.3vh;
    height: 2.3vh;
    /* padding-left: 10%; */
    border-radius: 50%;
    cursor: pointer;
}

.color {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.8vh;
    color: #391414;
}

.precio {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.9vh;
    color: #391414;
}

.boton {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

button {
    background-color: #9B0E28;
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 1.5vh;
    border: none;
    border-radius: 3vh;
    padding: 1vh 2vh;
    cursor: pointer;
}

button:hover {
    background-color: #823030;
}

.linea-horizontal {
    position: relative;
    border: 0;
    border-radius: 2vh;
    box-shadow: 0 0.2vh 0.5vh rgba(0, 0, 0, 0.2);
    background: #E7E4DE;
    height: .2vh;
    width: 88%;
    margin-bottom: .5%;
    margin-top: auto;
    align-self: center;
}

.totaldiv {
    position: relative;
    display: flex;
    flex-direction: row;
    margin-left: 5vh;
    justify-content: space-between;
    margin-right: 5vh;
    margin-bottom: 3vh;
}

.rastrear {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
    /* margin-top: 2vh; */
}

.total {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
    /* margin-top: 2vh; */
}

</style>