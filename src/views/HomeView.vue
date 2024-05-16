<template>

  <div id="app" class="home page">
    <sidebar />
    <div class="pagina">
      <div class="title">
        <img src="../assets/img/estrellas.png" alt="">
        <h1 class="t1">Acercándote a la perfección</h1>
        <img src="../assets/img/estrellas.png" alt="">
      </div>

      <div class="carrusel1" @mouseover="stopScrolling" @mouseout="startScrolling">
        <div class="carrusel-items" ref="carruselItems">
          <div class="carrusel-item" v-for="(image, index) in images" :key="index">
            <img :src="image.src" :alt="image.alt" class="carousel-image">
          </div>
        </div>
      </div>

      <div class="clasificaciones">
        <div class="imagenes">
          <img src="../assets/img/maquillaje.png" alt="" class="imgclasif" onclick="imagenClicada('maquillaje')">
          <img src="../assets/img/uñas.png" alt="" class="imgclasif" onclick="imagenClicada('uñas')">
          <img src="../assets/img/cabello.png" alt="" class="imgclasif" onclick="imagenClicada('cabello')">
          <img src="../assets/img/wish_list.png" alt="" class="imgclasif" onclick="imagenClicada('wish_list')">
          <img src="../assets/img/healty_skin.png" alt="" class="imgclasif" onclick="imagenClicada('healty_skin')">
        </div>
      </div>

      <div class="carrusel">
        <h2 class="fdm">Favoritos del mes</h2>
        <div class="container">
          <div class="child" v-for="(producto, index) in products" :key="producto.productId"
            @click.prevent="detalleProducto(producto.productId)">
            <div class="img_container">
              <img :src="producto.photo" class="img" />
            </div>
            <div class="detalles">
              <span class="titulos">{{ producto.productName }}</span><br>
              <span class="titulos">{{ producto.productBrand }}</span><br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star"
                  :class="{ filled: star <= producto.rating }">&#9733;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carrusel">
        <h2 class="vr">Visto reciente</h2>
        <div class="container">
          <div class="child" v-for="(producto, index) in productosvr" :key="index">
            <div class="img_container">
              <img :src="producto.imagen" class="img" />
            </div>
            <div class="detalles">
              <span>{{ producto.nombre }}</span><br>
              <span>{{ producto.marca }}</span><br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star"
                  :class="{ filled: star <= producto.rating }">&#9733;</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button @click="Producto">Ir a Otra Página</button>
      </div>

    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { URL_DATOS } from '@/Utils/constantes';
import sidebar from '@/components/sidebar.vue'

export default {
  data() {
    return {
      products: [],
      images: [],
      productosfm: [],
      productosvr: [],
      swiper: null,
      interval: null,
      step: 1,
    };
  },

  mounted() {
    this.obtenerProductos();
    this.startScrolling();

    // Carga imágenes
    fetch('rutaimagenes.json')
      .then(response => response.json()) // Convierte la respuesta a formato JSON
      .then(data => {
        // Mapea las rutas de las imágenes y aplica require() a cada una
        this.images = data.imagenescarrusel1.map(imagen => ({
          src: require('@/assets/' + imagen.src), // Aplica require() a la ruta de la imagen
          alt: imagen.alt
        }));
      })
      .catch(error => {
        console.error('Error al cargar las imágenes:', error);
      });



  },
  created() {
    this.obtenerProductsFM();
  },
  beforeDestroy() {
    this.stopScrolling();
  },

  name: 'HomeView',
  components: {
    sidebar
  },
  methods: {
    detalleProducto(productId) {
      this.$router.push(`/producto/${productId}`);
    },

    async obtenerProductsFM() {
      try {
        let p = [];
        const response = await axios.get(`${URL_DATOS}/products`)
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem('token')}`
          // }
          .then(response => {
            p = response.data.data;
            this.products = p;
          })
      } catch (error) {
        console.error('Error al obtener la información de los productos:', error);
      }

    },

    startScrolling() {
      this.interval = setInterval(() => {
        const carrusel = this.$refs.carruselItems;
        carrusel.scrollLeft += this.step;
        if (carrusel.scrollLeft + carrusel.clientWidth >= carrusel.scrollWidth) {
          carrusel.scrollLeft = 0;
        }
      }, 10);
    },

    stopScrolling() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },


    async obtenerProductos() {
      try {
        const response = await fetch('productosFav.json');
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        const data = await response.json();

        // Asignar los productos de "FavMes" a this.productosFavMes
        // this.productosfm = data.FavMes;
        this.productosfm = data.FavMes.map(producto => ({
          nombre: producto.nombre,
          marca: producto.marca,
          rating: producto.rating,
          imagen: require('@/assets/' + producto.imagen)
        }));




        // Asignar los productos de "vistoreciente" a this.productosVistoReciente
        // this.productosvr = data.vistoreciente;
        this.productosvr = data.vistoreciente.map(producto => ({
          nombre: producto.nombre,
          marca: producto.marca,
          rating: producto.rating,
          imagen: require('@/assets/' + producto.imagen)
        }));

      } catch (error) {
        console.error('Error al obtener la información de los productos:', error);
      }
    },


    Producto() {
      this.$router.push('/producto')
    },

    imagenClicada(maquillaje) {
    },
    imagenClicada(uñas) {
    },
    imagenClicada(cabello) {
    },
    imagenClicada(wish_list) {
    },
    imagenClicada(healty_skin) {
    }

  }


}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap");

/*Home code*/
.page {
  background-color: rgb(255, 255, 255);
  height: 98vh;
  width: calc(99.3% - 65px);
  display: flex;
  flex-direction: column;
  /* Alinear elementos en columna */
  justify-content: flex-start;
  /* Alinear elementos arriba */
  margin-left: 75px;
  margin-top: 1vh;
  border-radius: 10px;
}

.pagina {
  overflow: auto;
}

.pagina::-webkit-scrollbar {
  width: 12px;
}

.pagina::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}

.pagina::-webkit-scrollbar-track {
  background-color: #f0f0f0;
  border-radius: 6px;
}

.title {

  display: flex;
  align-items: center;
  justify-content: center;
  /* Centrar elementos horizontalmente */
  margin-top: -1%;
  /* Ajustar margen superior según sea necesario */
  font-family: 'Playfair Display', serif;
  font-weight: 700;
}

.title h1 {
  font-size: 2.5vw;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-left: 1%;
  font-weight: 450;
  margin-bottom: 0%;
}

.title img {
  width: 4%;
  margin-top: 3%;
  margin-right: 0%;
  margin-left: 0%;

}

.carrusel1 {
  /* background-color: aquamarine; */
  width: 91%;
  height: 50%;
  margin: auto;
  margin-top: 0%;
  overflow: hidden;
  display: flex;
  align-items: center;
  /* Add this line */
  justify-content: center;
  margin-bottom: 1%;
  overflow: hidden;
}

.carrusel-items {
  /* background-color: bisque; */
  display: flex;
  width: 100%;
  height: 99%;
  margin: auto;
  flex-flow: row nowrap;
  /* Alinear elementos en fila */
  overflow-y: hidden;
  overflow-x: hidden;
  white-space: nowrap;
  transition: transform 0.10s ease;

  align-items: center;

}

.carrusel-item {
  /* background-color: #ffc107; */
  position: relative;
  width: 30%;
  height: 90%;
  border-radius: 5px;
  margin: 0 20px;
  flex: none;
  scroll-snap-align: start;
  margin-left: 0%;
  padding: 30px 0px;


}

.carrusel-item img {
  /* background-color: #ffc107; */
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: 3px 8px 15px rgba(0, 0, 0, 0.2);
  /* Agregar sombra */
  transition: transform 0.3s ease;
  object-fit: cover;
}

.carrusel-item img:hover {
  transform: scale(1.2);
  z-index: 1;
}


.clasificaciones {
  display: flex;
  width: 80%;
  height: 15%;
  margin-left: 10%;
  justify-items: center;
  align-items: center;
  margin-top: -1.5%;

}

.imagenes {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.imgclasif {
  object-fit: cover;
  width: auto;
  height: auto;
  margin-right: 3%;
  cursor: pointer;
}

.imgclasif:hover {
  opacity: 0.8;
  transition: 0.3s;
  transform: scale(1.2);
}

.fdm,
.vr {
  font-size: 2vw;
  font-weight: 100;
  margin-top: 2%;
  margin-right: 25%;
  margin-left: 3%;
  text-align: left;
}

/* carruseles */
.carrusel {
  /* background-color: aquamarine; */
  width: 95%;
  height: 60%;
  margin: auto;
  margin-top: 1%;
  overflow: hidden;
}

.carrusel::-webkit-scrollbar {
  display: none;
}

.container::-webkit-scrollbar {
  width: 12px;
  height: 10px;
}

.container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}

.container::-webkit-scrollbar-track {
  background-color: #f0f0f0;
  border-radius: 6px;
}


.container {
  /* background-color: antiquewhite; */
  position: relative;
  display: flex;
  align-items: center;
  width: 97%;
  height: 80%;
  margin: auto;
  flex-flow: row nowrap;
  /* Alinear elementos en fila */
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  transition: transform 0.5s ease;
  margin-top: -3%;
}

.child {
  /* background-color: #ba3e97; */
  position: relative;
  width: 18.8%;
  height: 350px;
  border-radius: 5px;
  margin: 0 20px;
  flex: none;
  scroll-snap-align: start;

}

.child:hover {
  transition: 0.3s;
  transform: scale(1.1);
  z-index: 1;
}

.child>.img_container {

  position: relative;
  width: 100%;
  height: 80%;
  /* background-color: white; */
  border-radius: 10px;
}

.img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 3px 8px 15px rgba(0, 0, 0, 0.2);
  /* Agregar sombra */
  transition: transform 0.3s ease;
  /* Agregar transición suave */
}





.detalles {
  /* background-color: #81b7b7; */
  width: 100%;
  height: 30%;
  /* background-color: thistle; */
  position: relative;
  font-size: 1vw;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 450;
  border-radius: 5%;
  text-align: start;
  margin-left: 2%;
  margin-top: 2%;

}


.titulos {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 50px);

}

.rating {
  margin-top: -5%;
  margin-left: -2%;
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
</style>
