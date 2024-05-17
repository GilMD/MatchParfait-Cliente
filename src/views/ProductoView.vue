<template>
  <div class="producto page">
    <sidebar />
    <div class="container">
      <div class="column">
        <div class="previewImg ">
          <div class="panel">
            <div v-for="(image, index) in imageArray" :key="index" class="image-item">
              <img :src="image" alt="Imagen" class="gallery-image">
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="centered-container">
          <div class="imgsProduct">
            <div v-for="(image, index) in imageArray" :key="index" class="image-item2">
              <img :src="image" alt="Imagen" class="gallery-image2">
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="info">

          <!-- <div class="rating">
            <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= producto.rating }">&#9733;</span>
          </div> -->

          <div class="nombre">
            {{ productos.productName }}
          </div>

          <hr class="linea-horizontal">

          <div class="gamadecolores">
            <h2 class="titulogamadecolores">
              Colores Disponibles
            </h2>
            <div class="gamadecolores1">
              <div v-for="color in colorArray" :key="color" class="color-box"
                :style="{ backgroundColor:color }"></div>
            </div>

          </div>


          <hr class="linea-horizontal">

          <div class="ingredientes">
            <h2 class="titulodetalles">
              Detalles del Producto
            </h2>
            <div class="detalles1">
              {{ productos.description }}
            </div>

          </div>

          <hr class="linea-horizontal">

          <div class="ingredientes">
            <h2 class="tituloingredientes">
              Ingredientes
            </h2>
            <div class="detalles1">{{ productos.ingredients }}</div>
          </div>
          <hr class="linea-horizontal">
        </div>
        <div class="botones">
          <button class="action-button" @click.prevent="comprar()">
            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="#FFFCF7"
                d="M12 18.39l-6.35 3.86 1.65-7.4L2.38 9.74l7.79-.67L12 2l1.83 6.07 7.79.67-5.92 4.11 1.65 7.4z" />
            </svg>
            Agregar al carrito
          </button>
          <button class="action-button" @click.prevent="agregarWishlist()">
            Agregar a wishlist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { URL_DATOS } from '../Utils/constantes';
import sidebar from '@/components/sidebar.vue'

export default {
  props:{
            id: String
        },
  data:function() {
    return {
      colorArray: [],
      imageArray: [], // Array para almacenar las rutas de las imágenes
      productos: []
    };
  },
  created(){
            this.traeDetalleProducto();
        },
  mounted() {
    this.loadImages();
    this.traeDetalleProducto();
  },
  components: {
    sidebar
  },
  methods: {
    loadImages() {
      this.imageArray = this.productos.photos.split(",");
    },
    traeDetalleProducto: async function(){
                let p = [];
                await axios.get(URL_DATOS+"/productDetail/"+this.id)
                .then(function(response){
                    console.log(response.data.data[0]);
                    console.log(response.data.data[0].productName)
                    p = response.data.data[0]

                })
                .catch(function(error){
                    console.log(error)
                });
                this.productos = p
                this.colorArray = this.productos.colors.split(",").map(color => "#" + color);
                this.loadImages();
    }

  //   async loadProducto(productId) {
  //     try {
  //       const response = await fetch('productos.json');
  //       const data = await response.json();
  //       // Buscar el producto con el ID proporcionado
  //       const productoEncontrado = data.productos.find(producto => producto.id === productId);
  //       if (productoEncontrado) {
  //         // Agregar una propiedad "imagenes" al producto si aún no existe
  //         if (!productoEncontrado.imagenes) {
  //           productoEncontrado.imagenes = [];
  //         }
  //         // Agregar la ruta completa de cada imagen al producto
  //         productoEncontrado.imagenes = productoEncontrado.imagenes.map(imagen => require('@/assets/' + imagen));
  //         // Asignar el producto encontrado a la propiedad "producto"
  //         this.producto = productoEncontrado;
  //       } else {
  //         console.error('No se encontró ningún producto con el ID especificado.');
  //       }
  //     } catch (error) {
  //       console.error('Error al cargar el producto:', error);
  //     }
  //   }
  }
}
</script>

<style scoped>
.page {
  background-color: #FFFCF7;
;
  height: 98vh;
  width: calc(99.3% - 65px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 75px;
  margin-top: 1vh;
  border-radius: 10px;

}

.image-gallery {
  display: flex;
  flex-direction: column;
}

.image-item {
  margin-bottom: 5%;
  margin-top: 5%;
}

.image-item img {
  width: 100%;
  /* Ancho del 100% del contenedor */
  height: auto;
  /* Altura automática para mantener la proporción */
}

.image-item2 {
  margin-bottom: 5px;
}

.gallery-image2 {
  width: 85%;
  /* Ancho de cada imagen */
  height: auto;
  /* Altura ajustada automáticamente para mantener la proporción */
  border-radius: 3%;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
}


.container {
  display: flex;
}

.column {
  flex: 1;
}

.column:first-child {
  max-width: 25%;
}


.centered-container,
.info {
  display: flex;
  justify-content: flex-start;
  height: 57%;
  display: flex;
  margin-right: 3%;
  flex-direction: column;
  overflow-y: auto;
}

.info {
  margin-top: 9%;
  flex-direction: column;
  max-height: 70%;
  overflow-y: auto;
}

.gallery-image {

  top: 20%;
  max-width: 90%;
  /* Ancho de cada imagen */
  max-height: 115px;
  border-radius: 8%;
  height: auto;
  /* Altura ajustada automáticamente para mantener la proporción */

}

.panel1 {
  position: absolute;
  /* Posiciona el panel de fondo */
  top: 17%;
  /* Ajusta la posición superior */
  left: 145px;
  /* Ajusta la posición izquierda */
  width: 7%;
  /* Ajusta el ancho del panel */
  height: 73%;
  /* Ajusta la altura del panel */
  background-color: #959292;
  /* Color de fondo del panel */
  border-radius: 15px;
  /* Bordes redondeados */
  z-index: 0;
  /* Coloca el panel detrás de las imágenes */
}

.panel {
  padding: 5% 0;
  position: absolute;
  top: 10%;
  width: 28%;
  height: auto;
  background-color: rgb(146, 143, 143);
  /* Asegura que el panel sea transparente */
  border-radius: 15px;
  z-index: -14;
}

.previewImg {
  position: relative;
  top: 0%;
  height: 89%;
  left: 18%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  z-index: 1;
  max-width: 100%;
}

.imgsProduct {
  max-height: 1200px;
  width: 90%;
  overflow-y: auto;
  margin-top: 60px;
}

.imgsProduct::-webkit-scrollbar {
  width: 12px;
}

.imgsProduct::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}

.imgsProduct::-webkit-scrollbar-track {
  background-color: #f0f0f0;
  border-radius: 6px;
}

.info::-webkit-scrollbar {
  width: 12px;

}

.info::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}

.info::-webkit-scrollbar-track {
  background-color: #f0f0f0;
  border-radius: 6px;
}

.column:nth-child(2) {
  margin-left: -10%;
  /* Ajusta el margen izquierdo según sea necesario */
}

/* Estilos del rating */
.rating {
  margin-top: -2%;
  margin-left: -65%;
  font-size: 40px;
}

.star {
  color: #ccc;
  /* Color de las estrellas vacías */
}

.star.filled {
  color: #ffc107;
  /* Color de las estrellas llenas */
}

/* Estilos del nombre */
.nombre {

  font-size: 40px;
  font-weight: 100;
  margin-top: 5%;
  margin-right: 25%;
  margin-left: 5%;
  text-align: left;
}

.linea-horizontal {
  margin-top: 3%;
  border: 0;
  border-radius: 5px;
  border-top: 5px solid #211d1d;
  width: 90%;
  margin-left: 5%;
}

.titulodetalles,
.tituloingredientes {
  font-size: 28px;
  font-weight: 100;
  margin-top: 3%;
  margin-right: 25%;
  margin-left: 0%;
  text-align: left;
}

.titulogamadecolores {
  font-size: 28px;
  font-weight: 100;
  margin-top: 3%;
  margin-right: 25%;
  margin-left: 5%;
  max-height: 5%;
  text-align: left;
}

.detalles,

.detalles1 {
  max-width: 90%;
  text-align: justify;
}

.ingredientes {
  font-size: 25px;
  font-weight: 100;
  margin-top: 3%;
  margin-right: 5%;
  margin-left: 5%;
  text-align: left;
}

.gamadecolores {
  margin-top: 10px;
}

.color-box {
  margin-top: 2%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.gamadecolores1 {
  display: flex;
  margin-left: 5%;
  max-height: 5%;
}

.botones {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  margin-left: 27%;
}

.action-button {
  margin-right: 10px;
  /* Ajusta el margen derecho para separar los botones */
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 15px;
  background-color: #f00d38;
  color: white;
  border: 2px solid #ccc;

}

.star-icon {
  width: 17.03px;
  height: 17.03px;
}
</style>