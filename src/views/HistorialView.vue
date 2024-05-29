<template>
    <div class="pago">
        <sidebar />
        <transition name="fade">
            <modal-reseñas v-show="ModalReseñas" :productId="productoSeleccionado" @close="abrirModal()" />
        </transition>
        <div class="contenedor">
            <div class="titulo">
                <img src="@/assets/img/IMG-LOGO-RED.png" alt="">
                <span>Historial</span>
            </div>
            <div class="columnas">
                <div class="columna1">
                    <div class="cards">
                        <div v-for="(sale, index) in history" :key="sale.saleId" @click="selectOrder(index)"
                            class="card">
                            <div class="cardInfo">
                                <div class="pedido_status">
                                    <span class="pedido">Pedido: {{ sale.orderSale }}</span>
                                    <span class="status">Estatus: {{ regresarEstatus2(sale.status) }}</span>
                                </div>
                                <div class="fecha_total">
                                    <span class="fecha">Fecha: {{ formatDate(sale.estimatedDate) }}</span>
                                    <span class="total1">Total: {{ sale.totalAmount | currency }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columna2">
                    <div class="cardDetails">
                        <div class="pedido_fecha">
                            <span class="pedido2">Pedido: {{ ordenSeleccionado }}</span>
                            <span v-if="estatusSeleccionado === 'C' || estatusSeleccionado === 'P'" class="fecha2">Fecha
                                tentativa de entrega: {{ fechaSeleccionado }}</span>
                            <span v-if="estatusSeleccionado === 'E'" class="fecha2">Fecha de entrega: {{
                                fechaSeleccionado }}</span>
                        </div>
                        <div class="statusdiv">
                            <span class="status2">Estatus: {{ regresarEstatus() }}</span>
                        </div>
                        <div class="contenedorcards">
                            <div v-for="(product, index) in productosSeleccionados" :key="index"
                                class="cardProductDetails">
                                <div class="imagen">
                                    <img :src="product.photo" alt="">
                                </div>
                                <div class="info2">
                                    <div class="nombre_sparkles">
                                        <span class="nombre">{{ product.productName }}</span>
                                        <img v-if="revisarMatch(product)" src="@/assets/img/icons/sparkles.svg" alt="">
                                    </div>
                                    <div class="marcadiv">
                                        <span class="marca">{{ product.productBrand }}</span>
                                    </div>
                                    <div class="colorPrecioBoton">
                                        <div class="colorPrecio">
                                            <div class="color-box" :style="{ backgroundColor: '#' + product.color }">
                                            </div>
                                            <span class="precio">{{ product.price | currency }}</span>
                                        </div>
                                        <div v-if="estatusSeleccionado === 'E'" class="boton">
                                            <button @click.prevent="abrirModal(product.productId)">Agregar
                                                comentario</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="linea-horizontal">
                        <div class="totaldiv">
                            <span v-if="estatusSeleccionado === 'C'" class="rastrear">Rastrear</span>
                            <span v-else class="rastrear">&nbsp;</span>
                            <span class="total">Total: {{ totalSeleccionado | currency }}</span>
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
import ModalReseñas from '@/components/modalReseñas.vue';

export default {
    name: 'HistorialView',
    components: {
        sidebar,
        ModalReseñas,
    },
    filters: {
        currency(value) {
            if (typeof value !== "number") {
                return value;
            }
            return `$${value.toFixed(2)}`;
        }
    },
    data() {
        return {
            history: [],
            ordenSeleccionado: '',
            fechaSeleccionado: '',
            totalSeleccionado: 0,
            productosSeleccionados: [],
            productoSeleccionado: '',
            ModalReseñas: false,
            userClassification: '',
            estatusSeleccionado: ''
        }

    },
    mounted() {
        this.getHistory();
    },
    methods: {
        abrirModal(productId) {
            this.productoSeleccionado = productId;
            this.ModalReseñas = !this.ModalReseñas
        },
        async getHistory() {
            const token = JSON.parse(localStorage.getItem('vue2.token'));
            try {
                let p = [];
                const response = await axios.get(`${URL_DATOS}/sale/history`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                })
                    // headers: {
                    //   Authorization: `Bearer ${localStorage.getItem('token')}`
                    // }
                    .then(response => {
                        p = response.data.data;
                        console.log('historial', p);
                        this.history = p;
                        this.history.sort((a, b) => b.orderSale - a.orderSale);
                        this.selectOrder(0);
                    })
            } catch (error) {
                console.error('Error al obtener la información de los productos:', error);
            }
        },
        selectOrder(index) {
            this.ordenSeleccionado = this.history[index].orderSale;
            this.fechaSeleccionado = this.formatDate(this.history[index].estimatedDate);
            this.estatusSeleccionado = this.history[index].status;
            this.totalSeleccionado = this.history[index].totalAmount;
            this.productosSeleccionados = this.history[index].products;
        },
        regresarEstatus() {
            let estatus = '';
            switch (this.estatusSeleccionado) {
                case 'EP':
                    estatus = 'En espera de pago';
                    break;
                case 'C':
                    estatus = 'En camino';
                    break;
                case 'P':
                    estatus = 'Procesando';
                    break;
                case 'E':
                    estatus = 'Entregado';
                    break;
            }
            return estatus;
        },
        regresarEstatus2(status) {
            let estatus = '';
            switch (status) {
                case 'EP':
                    estatus = 'En espera de pago';
                    break;
                case 'C':
                    estatus = 'En camino';
                    break;
                case 'P':
                    estatus = 'Procesando';
                    break;
                case 'E':
                    estatus = 'Entregado';
                    break;
            }
            return estatus;
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
        revisarMatch(product) {
            this.userClassification = JSON.parse(localStorage.getItem('vue2.userData'))[0].classification;
            if (typeof product.classification !== 'undefined') {
                if (product.classification !== this.userClassification) {
                    return false;
                }
            }
            return true;
        }
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

.columna1,
.columna2 {
    position: relative;
    /* background-color:beige; */
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;

}

.cards {
    position: relative;
    width: 80%;
    height: 95%;
    /* background-color: blueviolet; */
    display: flex;
    flex-direction: column;
    gap: 2vh;
    /* margin-top: 2vh;
    margin-left: 2%; */
    align-self: center;
    margin-left: 12%;
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
    width: 94%;
    height: 20%;
    display: flex;
    flex-direction: row;
    gap: 5vh;
    border-radius: 2vh;
    box-shadow: 0vh 0.4vh 0.4vh 0vh #00000040;
    margin-top: 1%;
    margin-bottom: 1%;
    margin-left: 2.1vh;
}

.card:hover {
    cursor: pointer;
    transition-duration: .5s;
    transform: scale(1.05);
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
    height: 98vh;
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

.contenedorcards {
    /* background-color: aqua  ; */
    height: 51vh;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    margin-top: 0vh;
    margin-left: 2.5vh;
    margin-right: 2vh;
    overflow: auto;
}

.contenedorcards::-webkit-scrollbar {
    width: 1vh;
}

.contenedorcards::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 1vh;
}

.contenedorcards::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 1vh;
}

.cardProductDetails {
    position: relative;
    width: 96%;
    height: 31%;
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