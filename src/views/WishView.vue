<template>
    <div class="wish page">
        <sidebar />
        <div class="contenedor">
            <div class="lista_productos">
                <div class="titulo">
                    <h1>Wishlist</h1>
                </div>
                <div class="productos">
                    <div v-for="(product, index) in products" :key="product.id" class="producto">
                        <div class="imagen_producto">
                            <img @click.prevent="detalleProducto(product.productId)" :src="product.photo"
                                alt="Imagen del producto">
                        </div>
                        <div class="informacion_producto">
                            <div class="nombre_marca">
                                <td @click.prevent="detalleProducto(product.productId)" class="nombre"> {{
                                    product.productName }}
                                    <div v-if="revisarMatch(product)" id="sparkles" class="sparkles">
                                        <img src="@/assets/img/sparkles_red.svg" alt="">
                                    </div>
                                </td>
                                <td class="marca">{{ product.productBrand }}</td>
                            </div>
                            <div class="precio_botones">
                                <td class="precio">{{ product.price | currency }}</td>
                                <div class="color-box" :style="{ backgroundColor: '#' + product.color }"></div>
                            </div>
                            <div class="carrito-Basura">
                                <div class="carrito">
                                    <button @click.prevent="agregarCarrito(index)" class="carrito-btn">
                                        <img src="@/assets/img/cesta_ico.png" alt="">
                                        <span>Agregar al carrito</span>
                                    </button>
                                </div>
                                <div class="basura">
                                    <img src="@/assets/img/trash.png" alt="" @click.prevent="borrarProd(product.wish_listId)">
                                </div>
                            </div>
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
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            products: [],
            userData: [],
            oculto: true
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
        this.cargarDatosUsuario();
    },
    methods: {
        detalleProducto(productId) {
            // this.$router.push(`/producto/${productId}`);
            this.$router.push({ name: 'producto', params: { id: productId } });
        },
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
        async borrarProd(wishId) {
            const token = JSON.parse(localStorage.getItem('vue2.token'));
            this.products = this.products.filter(p => p.wish_listId !== wishId);

            try {
                const response = await axios.delete(`${URL_DATOS}/wishlist`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                    data: { wish_listId: wishId }
                });
                console.log(response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        },
        async agregarCarrito(index) {
            const token = JSON.parse(localStorage.getItem('vue2.token'))
            try {
                const response = await axios.post(`${URL_DATOS}/shoppingCart`, {
                    productId: this.products[index].productId,
                    color: this.products[index].color,
                    cantidad: 1
                },
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                        }
                    });

                // Producto agregado al carrito con éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Producto Agregado',
                    text: 'El producto se ha agregado a tu carrito de compras con éxito.',
                    confirmButtonText: 'Entendido'
                });

                console.log(response.data.data[0]);

                // Borrar producto de la lista de deseos
                this.borrarProd(this.products[index].wish_listId);

            } catch (error) {
                // Error al agregar el producto al carrito
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Agregar',
                    text: 'No se pudo agregar el producto al carrito de compras. Por favor, inténtalo de nuevo.',
                    confirmButtonText: 'Entendido'
                });

                console.log(error);
            }
        },
        cargarDatosUsuario() {
            this.userData = JSON.parse(localStorage.getItem('vue2.userData'));
            // if(this.userData.int_num === null){
            //     this.userData.int_num = '';
            // }
            console.log('Datos usuario', this.userData);
        },
        revisarMatch(product) {
            console.log('userCssfiltro', this.userData[0].classification);
            console.log('ProductCssfiltro', product.classification);
            if (typeof product.classification !== 'undefined') {
                if (product.classification !== this.userData[0].classification) {
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
    /* background-color: aqua; */
}

.contenedor {
    display: flex;
    /* background-color: rosybrown; */
    height: 90%;
    width: 95%;
    align-items: center;
    justify-content: center;
    gap: 20vh;
    /* Espacio entre los elementos */
}

.lista_productos {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;

}

.productos {
    /* display: flex; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 75%;
    height: 75%;
    gap: 2vh;
    /* flex-wrap: wrap; */

    padding-bottom: 2vh;
    /* Espacio entre los elementos */
    border-radius: 2vh;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
    overflow: auto;
}

.producto {
    display: flex;
    width: 60vh;
    height: 19vh;
    border-radius: 1vh;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
    margin: 2vh auto;
}

/* .producto:hover {
  transition: 0.3s;
  transform: scale(1.1);
  z-index: 1;
} */

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

.imagen_producto img:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: 0.3s;
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
    /* background-color: aqua; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1vh;
    overflow: hidden;
    /* Añadido espacio entre los elementos */
}

.nombre {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
    color: #391414;
    text-align: left;
    margin-right: .5vh;
}

.nombre_marca .marca {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 15px;
    color: #391414;
    text-align: left;
}

.nombre:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: 0.3s;
}

.sparkles {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 5vh;
    height: 100%;
}

.sparkles img {
    padding-top: 0vh;
    max-width: 80%;
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

.carrito-Basura {
    display: flex;
    justify-content: space-between;
    /* Esto coloca los elementos en los extremos */
    align-items: center;
    /* Opcional: para alinear verticalmente los elementos */
}

.carrito {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.carrito-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 5px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    border-radius: 15px;
    background-color: #9B0E28;
    color: #FFFFFF;
    height: 4vh;
    width: 20vh;
    object-fit: cover;
}

.carrito-btn:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: 0.3s;
}

.carrito-btn span {

    margin-left: -1%;
}

.carrito-btn img {
    height: 100%;
    max-width: 30%;
    margin-left: 3%;
    margin-right: 8%;
}

.basura img:hover {
    cursor: pointer;
    transform: scale(1.04);
    transition: 0.3s;
}

.color-box {
    width: 20px;
    height: 20px;
    /* padding-left: 10%; */
    border-radius: 50%;
    cursor: pointer;
}



.productos::-webkit-scrollbar {
    width: 1.4vh;
}

.productos::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 1vh;
}

.productos::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 1vh;
}
</style>