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
                                    <span class="total">Total: $500.00</span>
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
                                    <span class="total">Total: $500.00</span>
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
                                    <span class="total">Total: $500.00</span>
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
                                    <span class="total">Total: $500.00</span>
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
                                    <span class="total">Total: $500.00</span>
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
                                    <span class="total">Total: $500.00</span>
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
                                    <span class="total">Total: $500.00</span>
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
                                        <span class="color">Color: 01</span>
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
    display: flex;
    flex-direction: row;
    height: 84.9%;
    width: 100%;
    /* gap: 1vh; */
}

.columna1, .columna2 {
    /* background-color:beige; */
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;
    
}

.cards {
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
    display: flex;
    flex-direction: column;
    gap: 2vh;
    margin-left: 2.5vh;
    margin-top: 1vh;
    margin-bottom: 1vh;
}

.pedido_status {
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
    display: flex;
    flex-direction: row;
    gap: 28vh;
}

.fecha {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
}

.total {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
}

.cardDetails {
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
    display: flex;
    flex-direction: row;
    gap: 45vh;
    margin-left: 2.5vh;
    margin-top: 2vh;
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
    width: 33%;
    height: 100%;
    background-color: #FFFCF7;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2vh 0 0 2vh;
}

.imagen img {
    width: 80%;
    height: 80%;
    object-fit: cover;
    
}

.info2 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
}

.nombre_sparkles {
    display: flex;
    flex-direction: row;
    gap: 35vh;
    margin-left: 1.3vh;
    margin-top: 1vh;
}

.nombre {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
}

.info2 img {
    width: 3vh;
    height: 2.8vh;
}

.marcadiv {
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
    display: flex;
    flex-direction: row;
    gap: 32vh;
    margin-top: 1vh;
    margin-left: 1.3vh;
}

.colorPrecio {
    display: flex;
    flex-direction: column;
    gap: .5vh;
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
    margin-top: 1%;
    border: 0;
    border-radius: 5px;
    box-shadow: 0 0.2vh 0.5vh rgba(0, 0, 0, 0.2);
    background: #E7E4DE;
    height: .2vh;
    width: 88%;
    margin-bottom: .5%;
    margin-top: 42%;
    margin-left: 4vh;

}

.totaldiv {
    display: flex;
    flex-direction: row;
    margin-left: 61.2vh;
}

.total {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    color: #391414;
    margin-left: 2.5vh;
    /* margin-top: 2vh; */
}

</style>