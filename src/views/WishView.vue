<template>
    <div class="wish page">
        <sidebar />
        <div class="contenedor">
            <div class="lista_productos">
                <div class="titulo">
                    <h1>Wishlist</h1>
                </div>
                <!-- <div class="producto">
                    <div class="imagen_producto">
                        <img src="@/assets/img/FDM_1.jpeg" alt="Imagen del producto">
                    </div>
                    <div class="informacion_producto">
                        <div class="nombre_marca">
                            <td class="nombre"> si jaja 
                                <div class="sparkles">
                                    <img src="@/assets/img/sparkles_red.svg" alt=""> 
                                </div>
                            </td>
                            <td class="marca"> si x2 </td>
                        </div>
                        <div class="precio_botones">
                            <td class="precio">$425.50 <div class="color-box" :style="{ backgroundColor: color }"></div>
                            </td>
                            <img src="@/assets/img/trash.png" alt="" @click.prevent="borrarProd()">
                        </div>
                        <div>
                            <button @click.prevent="agregarCarrito" class="carrito-btn">
                                <img src="@/assets/img/cesta_ico.png" alt="">
                                Comprar
                            </button>
                        </div>
                    </div>
                </div> -->
                <div v-for="product in products" :key="product.id" class="producto">
                    <div class="imagen_producto">
                        <img :src="product.photo" alt="Imagen del producto">
                    </div>
                    <div class="informacion_producto">
                        <div class="nombre_marca">
                            <td class="nombre"> {{ product.productName }} 
                                <div class="sparkles">
                                    <img src="@/assets/img/sparkles_red.svg" alt=""> 
                                </div>
                            </td>
                            <td class="marca">{{ product.productBrand }}</td>
                        </div>
                        <div class="precio_botones">
                            <td class="precio">{{ product.price | currency }}</td>
                            <div class="color-box" :style="{ backgroundColor: '#'+product.color }"></div>
                        </div>
                        <div>
                            <button @click.prevent="agregarCarrito" class="carrito-btn">
                                <img src="@/assets/img/cesta_ico.png" alt="">
                                Comprar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sidebar from '@/components/sidebar.vue';
import axios from 'axios';
import { URL_DATOS } from '@/Utils/constantes';

export default {
    data() {
        return {
            products: []
        }
    },
    name: 'WishView',
    components: {
        sidebar
    },
    filters: {
        currency(value) {
            if (typeof value !== "number") {
                return value;
            }
            return `$${value.toFixed(2)}`;
        }
    },
    mounted() {
        this.productList();
    },
    methods: {
        async productList() {
            const token = JSON.parse(localStorage.getItem('vue2.token'));
            try {
                let p = [];
                const response = await axios.get(`${URL_DATOS}/wishlist`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                })
                    // headers: {
                    //   Authorization: `Bearer ${localStorage.getItem('token')}`
                    // }
                    .then(response => {
                        console.log(response.data.data);
                        p = response.data.data;
                        this.products = p;
                    })
            } catch (error) {
                console.error('Error al obtener la información de los productos:', error);
            }
        },
        borrarProd() {
            this.productos = this.products.filter(p => p.id !== product.id);
            console.log('Producto eliminado', product);
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.page {
  background-color: rgb(255, 255, 255);
  height: 98vh;
  width: calc(99.3% - 7vh);
  display: flex;
  flex-direction: column;
  /* Alinear elementos en columna */
  justify-content: flex-start;
  /* Alinear elementos arriba */
  margin-left: 8vh;
  margin-top: 1vh;
  border-radius: 2vh;
}

.wish {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.contenedor {
    display: flex;
    /* background-color: rosybrown; */
    height: 90%;
    width: 90%;
    align-items: center;
    justify-content: center;
    gap: 20vh;
    /* Espacio entre los elementos */
}

.lista_productos,
.informacion_envio {
    display: flex;
    /* background-color: #ab5ba4; */
    height: 100%;
    width: 50%;
    flex-direction: column;
    align-items: center;

}

.producto {
    gap: 2vh;
    background-color: #FFFCF7;
    height: 23%;
    width: 80%;
    display: flex;
    flex-direction: row;
    /* Cambiado para que los elementos estén en fila */
    margin-top: 3%;
    border-radius: 10px;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);

}

.titulo {
    /* background-color: #f0f0f0; */
    width: 80%;
    height: 6%;
    overflow: hidden;
    /* Ocultar cualquier contenido que se salga */
    margin-top: 2%;
    word-wrap: break-word;
}

.titulo h1 {
    width: 100%;
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-size: 2rem;
    color: #9B0E28;
    text-align: center;
    text-align: left;
    /* Centrar el texto */
    box-sizing: border-box;
    /* Incluye padding y borde en el ancho y alto */
}

.imagen_producto {
    width: 30%;
    height: 100%;
    display: flex;
    object-fit: cover;
}

.imagen_producto img {
    border-radius: 10px 0 0 10px;
}

.informacion_producto {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 1rem;
    /* Añadido padding horizontal */
}

.nombre_marca {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    /* Añadido espacio entre los elementos */
}

.nombre_marca .nombre {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 22px;
    color: #391414;
    text-align: left;
}

.nombre_marca .marca {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #391414;
    text-align: left;
}
.sparkles {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 5vh;
    height: 100%;
}
.sparkles img {
    padding-top: 10px;
    max-width: 100%;
    text-align: right;
}
.precio_botones {
    display: flex;
    align-items: center;
    gap: 1vh;
    /* Añadido espacio entre los elementos */
}

.precio_botones .precio {
    display: flex;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #391414;
    text-align: left;
}

.dec_inc {
    width: 20%;
    height: 110%;
    align-items: center;
    justify-content: space-evenly;
    display: flex;
    gap: 1vh;
    /* Añadido espacio entre los elementos */
    border-radius: 15px;
    overflow: hidden;
    margin-left: 10%;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 16px;
}

.dec_inc button {
    width: 40%;
    height: 100%;
    border: none;
    color: #440707;
    cursor: pointer;
}

.precio_botones img {
    width: 7%;
    margin-left: 40%;
    cursor: pointer;
}

.linea-horizontal {
    margin-top: 1%;
    border: 0;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    background: #E7E4DE;
    height: 1px;
    width: 100%;
    margin-bottom: 3%;

}

.carrito-btn {
    display: flex;
    margin-right: 10px;
    /* Ajusta el margen derecho para separar los botones */
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 15px;
    background-color: #f00d38;
    color: white;
    margin: auto;
    height: 30%;
    width: 40%;
}

.carrito-btn img {
    max-width: 30%
}

.color-box {
  width: 20px;
  height: 20px;
  /* padding-left: 10%; */
  border-radius: 50%;
  cursor: pointer;
}
</style>