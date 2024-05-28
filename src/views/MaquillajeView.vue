<template>
    <div id="app" class="maquillaje page">
        <sidebar />
        <div class="contenedor">
            <div class="titulo">
                <h1>Maquillaje</h1>
            </div>
            <div class="searchBar">
                <img src="@/assets/img/icons/search.svg" alt="">
                <input type="text" placeholder="Buscar..." class="custom-placeholder" />
            </div>
            <v-container class="vcontainer">
                <v-chip-group column active-class="primary--text" v-model="selectedCategory">
                    <v-chip v-for="option in OpcionProducto" :key="option" :value="option" class="ma-2" size="x-large">
                        {{ option }}
                    </v-chip>
                </v-chip-group>
            </v-container>
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
                                Agregar a wishlist
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
            // categories: ['Rostro', 'Ojos', 'Labios'],
            selectedCategory: '',
            OpcionProducto: ['Rostro', 'Ojos', 'Labios'],
            userClassification: '',
            rostro: [
                'Polvos / Fijadores / Base / Primer / Corrector',
                'Contorno / Bronceador / Iluminadores / Blush',
                'Blush', 'Polvos', 'Fijadores', 'Base', 'Primer',
                'Corrector', 'Contorno', 'Bronceador', 'Iluminadores'],


            ojos: ['Paletas de ojos', 'Sombras liquidas',
                'Sombras individuales', 'Glitters', 'Mascara de pestanas',
                'Delineadores', 'Paletas de ojos / Sombras liquidas / Sombras individuales / Glitters',
                'Mascara de pestanas / Delineadores'],

            labios: ['Labiales', 'gloses ', 'Labiales / gloses'],
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
            console.log('Selected Category:', this.selectedCategory);
            switch (this.selectedCategory) {
                case 'Rostro':
                    return this.products.filter(product => this.rostro.includes(product.type));
                    break;
                case 'Ojos':
                    return this.products.filter(product => this.ojos.includes(product.type));
                    break;
                case 'Labios':
                    return this.products.filter(product => this.labios.includes(product.type));
                    break;
                default:
                    return this.products;
                    break;
            }
        },
        // filteredProducts() {
        //     console.log('Selected Category:', this.selectedCategory);
        //     if (this.selectedCategory !== '') {
        //         console.log('Filtered Products:', this.products.filter(product => product.type === this.selectedCategory));
        //         return this.products.filter(product => product.category === this.selectedCategory);
        //     }
        //     return this.products;
        // }
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
                        console.log('productos', this.products);
                    })
            } catch (error) {
                console.error('Error al obtener la información de los productos:', error);
            }
            this.filtrarMatch();
            this.regresarCategoria();
        },
        regresarCategoria() {
            const xd = this.products.filter(product => this.rostro.includes(product.type));
            const xd2 = xd.concat(this.products.filter(product => this.ojos.includes(product.type)));
            this.products = xd2.concat(this.products.filter(product => this.labios.includes(product.type)));
            console.log('maquillaje', this.products);
        },
        filtrarMatch() {
            this.userClassification = JSON.parse(localStorage.getItem('vue2.userData')).classification
            console.log('userCss', this.userClassification);
            const matchingProducts = this.products.filter(product => this.userClassification === product.classification);
            const nonMatchingProducts = this.products.filter(product => this.userClassification !== product.classification);
            this.products = matchingProducts.concat(nonMatchingProducts);
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
    font-size: 1.2rem;
    font-weight: 700;
    color: #9B0E28;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}


.searchBar {
    /* background-color: antiquewhite; */
    position: relative;
    margin: auto;
    width: 100%;
    max-width: 75%;
    color: #FFFCF7;
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

.v-chip-group .v-chip {
    cursor: pointer;
    border-radius: 50px;
    font-family: "DM Sans", sans-serif;
    font-size: 1.1em;
    background-color: #F00D38;
    color: #FFFCF7;
    margin-top: 0%;
}

.v-chip:hover {
    background-color: #F00D38;

}

.active-chip {

    background-color: #d00c33 !important;
}

.productos {
    /* display: flex; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 75%;
    height: 75%;
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
