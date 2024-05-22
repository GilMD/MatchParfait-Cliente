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
            <span>
              {{ productos.productName }}
            </span>
            <img style="display: none;" src="@/assets/img/sparkles_red.svg">
          </div>

          <div class="marca">
            {{ productos.productBrand }}
          </div>

          <hr class="linea-horizontal">

          <div class="gamadecolores">
            <h2 class="titulogamadecolores">
              Colores Disponibles
            </h2>
            <div class="gamadecolores1">
              <div @click.prevent="setColor(color)" v-for="color in colorArray" :key="color" class="color-box"
                :style="{ backgroundColor: color }"></div>
            </div>

          </div>

          <div class="precio-cantidad">
            <div class="precio">
              ${{ productos.price }}
            </div>
            <div class="cantidad">
              <button @click.prevent="cambiarCantidad('-')" class="cantidad-btn">
                <img src="@/assets/img/minus.svg" alt="">
              </button>
              <input v-model="cantidad" type="number" class="cantidad-input" value="1" min="1" disabled="true">
              <button @click.prevent="cambiarCantidad('+')" class="cantidad-btn">
                <img src="@/assets/img/plus.svg" alt="">
              </button>
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
          <button class="action-button" @click.prevent="agregarCarrito">
            <img src="@/assets/img/cesta_ico.png" alt="">
            Agregar al carrito
          </button>
          <button class="action-button" @click.prevent="agregarWishlist">
            <img src="@/assets/img/sparkles.svg" alt="">
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
  props: {
    id: String
  },
  data: function () {
    return {
      colorArray: [],
      imageArray: [], // Array para almacenar las rutas de las imágenes
      productos: [],
      cantidad: 1,
      colorSelected: ''
    };
  },
  created() {
    this.traeDetalleProducto();
  },
  mounted() {
    this.traeDetalleProducto();
  },
  components: {
    sidebar
  },
  methods: {
    traeDetalleProducto: async function () {
      const token = JSON.parse(localStorage.getItem('vue2.token'))
      let p = [];
      await axios.get(URL_DATOS + "/productDetail/" + this.id, {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
        .then(function (response) {
          console.log(response.data.data[0]);
          console.log(response.data.data[0])
          p = response.data.data[0]

        })
        .catch(function (error) {
          console.log(error)
        });
      this.productos = p
      this.colorArray = this.productos.colors.split(",").map(color => "#" + color);
      this.imageArray = this.productos.photos.split(",");
      this.colorSelected = this.colorArray[0].substring(1);
      console.log(this.colorSelected);
      // this.loadImages();
    },
    setColor(color) {
      this.colorSelected = color.substring(1);
      console.log(this.colorSelected);
    },
    cambiarCantidad(op) {
      if (op === '+') {
        this.cantidad += 1;
      } else if (this.cantidad !== 1) {
        this.cantidad -= 1;
      }
    },
    async agregarWishlist() {
      const token = JSON.parse(localStorage.getItem('vue2.token'))
      const response = await axios.post(`${URL_DATOS}/wishList/`, {
        productId: this.id,
        color: this.colorSelected
      },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        }
      )
        .then(function (response) {
          console.log(response.data.data[0]);

        })
        .catch(function (error) {
          console.log(error)
        });

    },
    async agregarCarrito() {
      const token = JSON.parse(localStorage.getItem('vue2.token'))
      const response = await axios.post(`${URL_DATOS}/shoppingCart`, {
        productId: this.id,
        color: this.colorSelected,
        cantidad: parseInt(this.cantidad)
      },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        }
      )
        .then(function (response) {
          console.log(response.data.data[0]);

        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }
}
</script>

<style scoped>
.page {
  background-color: #FFFCF7;
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
  margin-left: 8%;
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
  display: flex;
  font-size: 40px;
  font-weight: 100;
  margin-top: 5%;
  margin-right: 25%;
  margin-left: 5%;
  text-align: left;
  color: #9B0E28;
  font-family: Playfair Display;
}

.nombre img {
  max-width: 9%;
  align-self: flex-end;
}

.marca {
  color: #391414;
  font-family: DM Sans;
  font-size: 20px;
  margin-left: 5%;
  font-weight: 400;
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
  font-size: 20px;
  font-weight: 100;
  margin-top: 3%;
  margin-right: 25%;
  margin-left: 0%;
  text-align: left;
  color: #391414;
  font-weight: 400;
}

.titulogamadecolores {
  font-size: 28px;
  font-weight: 100;
  margin-top: 3%;
  margin-right: 25%;
  margin-left: 5%;
  max-height: 5%;
  padding-bottom: 5%;
  text-align: left;
  font-family: DM Sans;
  font-weight: 400;
  color: #391414;
}

.detalles,
.detalles1 {
  max-width: 90%;
  text-align: justify;
  font-size: 18px;
  color: #391414;
}

.ingredientes {
  font-size: 25px;
  font-weight: 100;
  margin-top: 3%;
  margin-right: 5%;
  margin-left: 5%;
  text-align: left;
  font-family: DM Sans;
  font-weight: 400;
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
  margin: auto;
  height: 15%;
  width: 40%;
}

.action-button img {
  max-width: 15%;

}

.star-icon {
  width: 17.03px;
  height: 17.03px;
}

.precio-cantidad {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.precio {
  max-height: 31.25px;
  margin-left: 5%;
  color: #391414;
  font-weight: 400;
  font-family: DM Sans;
  font-size: 24px;
}

.cantidad {
  display: flex;
  align-items: center;
  background-color: #FFFCF7;
  border: 1px solid #ccc;
  border-radius: 50px;
  overflow: hidden;
  width: 137px;
  height: 50px;
  max-width: 40%;
  max-height: 80%;
  margin-right: 5%;
}

.cantidad-btn {
  /* background-color: #007bff; */
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 30px;
  border-radius: 50%;
  width: 35%;
}

.cantidad-btn img {
  /* background-color: #007bff; */
  border: none;
  font-size: 30px;
  border-radius: 50%;
  width: 175%;
}

.cantidad-input {
  width: 30%;
  text-align: center;
  border: none;
  outline: none;
  font-size: 20px;
  font-family: DM Sans;
  color: #391414;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>