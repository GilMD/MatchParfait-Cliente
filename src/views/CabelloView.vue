<template>
    <div id="app" class="maquillaje page">
        <sidebar />
        <div class="contenedor">
            <div class="titulo">
                <span>Cabello</span>
            </div> 
            <div class="searchBar">
                <img src="@/assets/img/icons/search.svg" alt="">
                <input  v-model="searchTerm" type="text" placeholder="Buscar..." class="custom-placeholder" />
            </div>
            <div class="productos">
                <div v-for="product in filteredProducts" :key="product.id" class="producto">
                    <div class="imagen_producto">
                        <img @click.prevent="detalleProducto(product.productId)" :src="product.photo" alt="Imagen del producto" />
                    </div>
                    <div class="informacion_producto">
                        <div class="nombre_marca">
                            <div @click.prevent="detalleProducto(product.productId)" class="nombre">{{ product.productName }}</div>
                            <div class="marca">{{ product.productBrand }}</div>
                        </div>
                        <div class="precio_botones">
                            <div class="precio">{{ product.price | currency }}</div>
                        </div>
                        <div>
                            <button class="btnAgregarWishList" @click.prevent="agregarWishlist">
                                <img src="@/assets/img/sparkles.svg" alt="">
                                Wishlist
                            </button>
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
    name: 'MaquillajeView',
    components: {
        sidebar
    },
    data() {
        return {
            products: [],
            cabello: 'Productos de cabello',
            searchTerm: ''

        };
    },
    filters: {
        currency(value) {
            if (typeof value !== "number") {
                return value;
            }
            return `$${value.toFixed(2)}`;
        }
    },
    computed: {
        filteredProducts() {
            let filtered = this.products;
            filtered = this.products.filter(product => this.cabello === product.type);
            if (this.searchTerm) {
                filtered = filtered.filter(product => {
                    const nameMatch = product.productName.toLowerCase().includes(this.searchTerm.toLowerCase());
                    const brandMatch = product.productBrand.toLowerCase().includes(this.searchTerm.toLowerCase());
                    return nameMatch || brandMatch;
                });
            }
            return filtered;
        }
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        detalleProducto(productId) {
            // this.$router.push(`/producto/${productId}`);
            this.$router.push({ name: 'producto', params: { id: productId } });
        },
        async fetchProducts() {
            const token = JSON.parse(localStorage.getItem('vue2.token'))
            try {
                let p = [];
                const response = await axios.get(`${URL_DATOS}/products`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                })
                    .then(response => {
                        p = response.data.data;
                        this.products = p;
                    })
            } catch (error) {
                console.error('Error al obtener la información de los productos:', error);
            }
        },
        async agregarWishlist(product) {
            const token = JSON.parse(localStorage.getItem('vue2.token'))
            try {
                const response = await axios.post(`${URL_DATOS}/wishList/`, {
                    productId: product.productId,
                    color: product.color
                }, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Agregado a la Wishlist',
                    text: 'El producto ha sido agregado a tu wishlist.',
                    confirmButtonText: 'Entendido'
                });

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al agregar a la Wishlist',
                    text: 'No se pudo agregar el producto a la wishlist. Por favor, inténtalo de nuevo.',
                    confirmButtonText: 'Entendido'
                });
            }
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap");

.page {
    background-color: rgb(255, 255, 255);
    height: 98vh;
    width: calc(99.3% - 7vh);
    display: flex;
    flex-direction: column;
    /* Alinear elementos en columna */
    justify-content: center;
    /* Alinear elementos arriba */
    margin-left: 8vh;
    margin-top: 1vh;
    border-radius: 2vh 1vh 1vh 2vh;
    align-items: center;
}

.contenedor {
    position: relative;
    /* background-color: salmon; */
    width: 98%;
    height: 98%;
    overflow: hidden;
}

.titulo {
    /* background-color: aqua; */
    width: 74%;
    text-align: left;
    margin: 2vh auto;
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 400;
    color: #9B0E28;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}


.searchBar {
    /* background-color: antiquewhite; */
    position: relative;
    margin: auto;
    margin-bottom: 3vh;
    width: 100%;
    max-width: 75%;
    color: #FFFCF7;
    border: none;
}

.searchBar img {
    position: absolute;
    top: 50%;
    left: 1vh;
    transform: translateY(-50%);
    width: 2vh;
    height: 2vh;
}

.searchBar input {
    background: linear-gradient(90deg, #EF0C37 0%, #FF0057 100%);
    width: 100%;
    padding: 1vh 1vh 1vh 4vh;
    border-radius: 2vh;
    color: #FFFCF7;
    font-size: 1rem;
    border: none;
}

.custom-placeholder::placeholder {
    color: #ffffffbf;
    /* Cambia este color al que prefieras */
}

.vcontainer {
    /* background-color: aquamarine; */
    width: 75%;
    height: auto;
    margin-top: 1.5%;
    margin-bottom: 1.5%;
}


.productos {
    /* background-color: antiquewhite; */
    /* display: flex; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 75%;
    height: 80%;
    gap: 2vh;
    /* flex-wrap: wrap; */
    margin: auto;
    padding-bottom: 2vh;
    /* Espacio entre los elementos */
    border-radius: 2vh;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
    overflow: auto;
}

.productos::-webkit-scrollbar {
    width: 12px;
}

.productos::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
}

.productos::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 6px;
}

.producto {
    
    display: flex;
    width: 60vh;
    height: 19vh;
    border-radius: 1vh;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
    margin: 2vh auto;
}

.producto:hover {
  transition: 0.3s;
  transform: scale(1.1);
  z-index: 1;
}

.imagen_producto {
    /* background-color: antiquewhite; */
    width: 31vh;
    height: 100%;
    display: flex;
}

.imagen_producto img {
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;
    object-fit: cover;
}

.imagen_producto img:hover {
  cursor: pointer;
}

.informacion_producto {
    /* background-color: blueviolet; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1rem;
    /* Añadido padding horizontal */
}

.nombre_marca {
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
    font-size: 1.1rem;
    color: #391414;
    text-align: left;
}

.nombre:hover {
  cursor: pointer;
}

.marca {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #391414;
    text-align: left;
}

.precio_botones {
    display: flex;
    align-items: center;
    gap: 1vh;
    /* Añadido espacio entre los elementos */
}

.precio_boton .precio {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 1.3rem;
    color: #391414;
    text-align: left;
}

.btnAgregarWishList {
    display: flex;
    align-items: center;
    background-color: #f00d38;
    color: #fffcf7;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 1.5rem;
    cursor: pointer;
    font-family: "DM Sans", sans-serif;
    font-size: 1rem;
}

.btnAgregarWishList img {
    margin-right: 0.5rem;
    /* Espacio entre la imagen y el texto */
    width: 1rem;
    /* Tamaño de la imagen */
    height: 1rem;
    /* Tamaño de la imagen */
}
</style>
