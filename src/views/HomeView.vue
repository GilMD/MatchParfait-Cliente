<template>
  <div id="app" class="home page">
    <sidebar />
    <div class="pagina">
      <div class="title">
        <img src="../assets/img/estrellas.png" alt="">
        <span>Acercándote a la perfección</span>
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
          <img src="../assets/img/maquillaje.png" alt="" class="imgclasif" @click.prevent="MaquillajeView()">
          <img src="../assets/img/uñas.png" alt="" class="imgclasif" @click.prevent="UñasView()">
          <img src="../assets/img/cabello.png" alt="" class="imgclasif" @click.prevent="CabelloView()">
          <img src="../assets/img/wish_list.png" alt="" class="imgclasif" @click.prevent="wishListView()">
          <img src="../assets/img/healty_skin.png" alt="" class="imgclasif" @click.prevent="SkinCareView()">
        </div>
      </div>

      <div class="carrusel">
        <h2 class="fdm">Favoritos del mes</h2>
        <div class="container">
          <div class="child" v-for="(producto, index) in productosfm" :key="producto.productId"
            @click.prevent="detalleProducto(producto.productId)">
            <div class="img_container">
              <img :src="producto.photo" class="img" />
              <img v-if="revisarMatch(producto)" class="sparkles" src="@/assets/img/icons/sparkles.svg" alt="">
            </div>
            <div class="detalles">
              <span class="titulos">{{ producto.productName }}</span><br>
              <span class="titulos">{{ producto.productBrand }}</span><br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star"
                  :class="{ filled: star <= producto.stars }">&#9733;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carrusel">
        <h2 class="fdm">Visto reciente</h2>
        <div class="container">
          <div class="child" v-for="(producto, index) in productosvr" :key="producto.productId"
            @click.prevent="detalleProducto(producto.productId)">
            <div class="img_container">
              <img :src="producto.photo" class="img" />
              <img v-if="revisarMatch(producto)" class="sparkles" src="@/assets/img/icons/sparkles.svg" alt="">
            </div>
            <div class="detalles">
              <span class="titulos">{{ producto.productName }}</span><br>
              <span class="titulos">{{ producto.productBrand }}</span><br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star"
                  :class="{ filled: star <= producto.stars }">&#9733;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { URL_DATOS } from '@/Utils/constantes';
import sidebar from '@/components/sidebar.vue'
import SkinCareView from './SkinCareView.vue';
import CabelloView from './CabelloView.vue';

export default {
  data() {
    return {
      images: [],
      productosfm: [],
      productosvr: [],
      userClassification: '',
      swiper: null,
      interval: null,
      step: 1,
    };
  },

  mounted() {
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
    this.obtenerProductsVR();
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
      // this.$router.push(`/producto/${productId}`);
      this.$router.push({ name: 'producto', params: { id: productId } });
    },
    async obtenerProductsFM() {
      const token = JSON.parse(localStorage.getItem('vue2.token'));
      this.userClassification = JSON.parse(localStorage.getItem('vue2.userData'))[0].classification;
      try {
        let p = [];
        const response = await axios.get(`${URL_DATOS}/favorites`, {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        })
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem('token')}`
          // }
          .then(response => {
            p = response.data.data;
            this.productosfm = p;
            console.log(this.productosfm);
          })
      } catch (error) {
        console.error('Error al obtener la información de los productos:', error);
      }
      this.filtrarMatch();
    },
    async obtenerProductsVR() {
      const token = JSON.parse(localStorage.getItem('vue2.token'));
      try {
        const response = await axios.get(`${URL_DATOS}/recentProducts`, {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        });
        console.log('respuesta completa', response);
        this.productosvr = response.data.data;
        console.log('recientes', this.productosvr);
      } catch (error) {
        console.error('Error al obtener la información de los productos:', error);
      }
    },
    filtrarMatch() {
      const matchingProducts = this.productosfm.filter(product => this.userClassification === product.classification);
      const nonMatchingProducts = this.productosfm.filter(product => this.userClassification !== product.classification);
      this.productosfm = matchingProducts.concat(nonMatchingProducts);
    },
    revisarMatch(product) {
      if (typeof product.classification !== 'undefined') {
        if (product.classification !== this.userClassification) {
          return false;
        }
      }
      return true;
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
    MaquillajeView() {
      this.$router.push(`/maquillaje`);
    },
    UñasView() {
      this.$router.push(`/unas`);
    },
    wishListView() {
      this.$router.push(`/wishList`);
    },
    SkinCareView() {
      this.$router.push(`/SkinCare`);
    },
    CabelloView() {
      this.$router.push(`/Cabello`);
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
  width: calc(99.3% - 7vh);
  display: flex;
  flex-direction: column;
  /* Alinear elementos en columna */
  justify-content: flex-start;
  /* Alinear elementos arriba */
  margin-left: 8vh;
  margin-top: 1vh;
  border-radius: 2vh 1vh 1vh 2vh;
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
  margin-top: 1%;
  /* Ajustar margen superior según sea necesario */
  font-family: Playfair Display;
  font-weight: 400;
}

.title span {
  font-size: 2.5vw;
  color: #440707;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-left: 1%;
  font-weight: 450;
  margin-bottom: 0%;
}

.title img {
  width: 4%;
  margin-top: 1%;
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
  padding-bottom: 2vh;
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
  cursor: pointer;
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

.sparkles {
  position: absolute;
  width: 12%;
  height: 12%;
  top: 0;
  right: 0;
  z-index: 1;
  margin-top: 24vh;
  margin-right: 1vh;
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
