<template>
  <div class="producto page">
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

          <div class="rating">
            <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= producto.rating }">&#9733;</span>
          </div>

          <div class="nombre">
            {{ producto.nombre }}
          </div>

          <hr class="linea-horizontal">

          <div class="gamadecolores">
            <div v-for="color in producto.gamaDeColores" :key="color" class="color-box"
              :style="{ backgroundColor: color }"></div>
            <h2 class="titulogamadecolores">
              Colores Disponibles
            </h2>
          </div>

          <hr class="linea-horizontal">

          <div class="detalles">
            <h2 class="titulodetalles">
              Detalles del Producto
            </h2>
            {{ producto.detalles }}
          </div>

          <hr class="linea-horizontal">

          <div class="ingredientes">
            <h2 class="tituloingredientes">
              Ingredientes
            </h2>
            {{ producto.ingredientes }}
          </div>
          <hr class="linea-horizontal">
        </div>
        <div class="botones">
          <button class="action-button" @click="comprar()">
            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="#FFFCF7"
                d="M12 18.39l-6.35 3.86 1.65-7.4L2.38 9.74l7.79-.67L12 2l1.83 6.07 7.79.67-5.92 4.11 1.65 7.4z" />
            </svg>
            Comprar
          </button>
          <button class="action-button" @click="probar()">Probar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageArray: [], // Array para almacenar las rutas de las imágenes
      producto: {}
    };
  },
  mounted() {
    // Cargar las rutas de las imágenes en el array
    this.loadImages();
    this.loadProducto(2);
  },
  methods: {
    loadImages() {

      // Aquí se están agregando rutas de imágenes de ejemplo, debes reemplazarlas con tus rutas reales
      this.imageArray.push(require('@/assets/imgPrueba/img1.png'));
      this.imageArray.push(require('@/assets/imgPrueba/img2.png'));
      this.imageArray.push(require('@/assets/imgPrueba/img3.png'));
      this.imageArray.push(require('@/assets/imgPrueba/img4.png'));
      this.imageArray.push(require('@/assets/imgPrueba/img5.png'));
    },
    async loadProducto(productId) {
  try {
    const response = await fetch('productos.json');
    const data = await response.json();
    // Buscar el producto con el ID proporcionado
    const productoEncontrado = data.productos.find(producto => producto.id === productId);
    if (productoEncontrado) {
      // Agregar una propiedad "imagenes" al producto si aún no existe
      if (!productoEncontrado.imagenes) {
        productoEncontrado.imagenes = [];
      }
      // Agregar la ruta completa de cada imagen al producto
      productoEncontrado.imagenes = productoEncontrado.imagenes.map(imagen => require('@/assets/' + imagen));
      // Asignar el producto encontrado a la propiedad "producto"
      this.producto = productoEncontrado;
    } else {
      console.error('No se encontró ningún producto con el ID especificado.');
    }
  } catch (error) {
    console.error('Error al cargar el producto:', error);
  }
}
  }
}
</script>

<style scoped>
.page {
  background-color: #d9d9d9;
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
  width: 100%; /* Ancho del 100% del contenedor */
  height: auto; /* Altura automática para mantener la proporción */
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


.centered-container,
.info {
  display: flex;
  justify-content: flex-start;
  height: auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.info {
  margin-top: 9%;
  flex-direction: column;
  max-height: 71%;
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
  position: absolute;
  top: 10%;
  left: -7px;
  width: 19%;
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
  left: 150px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  z-index: 1;
  max-width: 100%;
}

.imgsProduct {
  max-height: 850px;
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
  border: 0;
  border-top: 2px solid #ccc;
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
  margin-left: -24%;
  text-align: left;
}

.detalles,
.ingredientes {
  font-size: 20px;
  font-weight: 100;
  margin-top: 3%;
  margin-right: 25%;
  margin-left: 5%;
  text-align: left;
}

.gamadecolores {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

.color-box {
  margin-top: 10%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.gamadecolores {

  margin-left: 5%;
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