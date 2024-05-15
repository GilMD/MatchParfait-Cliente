<template>

  <div id="app" class="home page">
    <sidebar />
    <div class="pagina">
      <div class="title">
        <img src="../assets/img/estrellas.png" alt="">
        <h1 class="t1">Acercándote a la perfección</h1>
        <img src="../assets/img/estrellas.png" alt="">
      </div>
      <img src="https://drive.google.com/file/d/18JQpYXcfptFusEE-3oZhWPGQ9yyhwKfg/view?usp=drive_link" alt="">

      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(image, index) in images" :key="index">
            <img :src="image.src" :alt="image.alt" class="carousel-image">
          </div>
        </div>
        <div class="swiper-pagination"></div>
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
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosfm[0].nombre }}</span></br>
              <span>{{ productosfm[0].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosfm[0].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosfm[1].nombre }}</span></br>
              <span>{{ productosfm[1].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosfm[1].rating }">&#9733;</span>
              </div>
            </div>
          </div>

          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosfm[2].nombre }}</span></br>
              <span>{{ productosfm[2].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosfm[2].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosfm[3].nombre }}</span></br>
              <span>{{ productosfm[3].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosfm[3].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosfm[4].nombre }}</span></br>
              <span>{{ productosfm[4].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosfm[4].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosfm[5].nombre }}</span></br>
              <span>{{ productosfm[5].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosfm[5].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosfm[6].nombre }}</span></br>
              <span>{{ productosfm[6].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosfm[6].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosfm[7].nombre }}</span></br>
              <span>{{ productosfm[7].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosfm[7].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosfm[8].nombre }}</span></br>
              <span>{{ productosfm[8].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosfm[8].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosfm[9].nombre }}</span></br>
              <span>{{ productosfm[9].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosfm[9].rating }">&#9733;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carrusel">
        <h2 class="vr">Visto reciente</h2>
        <div class="container">
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosvr[0].nombre }}</span></br>
              <span>{{ productosvr[0].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosvr[0].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosvr[1].nombre }}</span></br>
              <span>{{ productosvr[1].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosvr[1].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosvr[2].nombre }}</span></br>
              <span>{{ productosvr[2].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosvr[2].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosvr[3].nombre }}</span></br>
              <span>{{ productosvr[3].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosvr[3].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosvr[4].nombre }}</span></br>
              <span>{{ productosvr[4].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosvr[4].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosvr[5].nombre }}</span></br>
              <span>{{ productosvr[5].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosvr[5].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosvr[6].nombre }}</span></br>
              <span>{{ productosvr[6].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosvr[6].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosvr[7].nombre }}</span></br>
              <span>{{ productosvr[7].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosvr[7].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosvr[8].nombre }}</span></br>
              <span>{{ productosvr[8].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosvr[8].rating }">&#9733;</span>
              </div>
            </div>
          </div>
          <div class="child">
            <div class="img_container">
              <img src="https://ss702.liverpool.com.mx/xl/1113114262.jpg" class="img" />
            </div>
            <div class="detalles">
              <span>{{ productosvr[9].nombre }}</span></br>
              <span>{{ productosvr[9].marca }}</span></br>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= productosvr[9].rating }">&#9733;</span>
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
import HelloWorld from '@/components/HelloWorld.vue'
import { ref } from 'vue'
import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import sidebar from '@/components/sidebar.vue'

Swiper.use([Navigation, Pagination]);

export default {
  data() {
    return {
      images: [],
      productosfm: [],
      productosvr: [],
    };
  },

  mounted() {
    this.obtenerProductos();

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


    // Inicializa Swiper
    new Swiper('.swiper-container', {
      // Opciones de Swiper
      slidesPerView: 'auto',
      spaceBetween: 10,
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  },

  name: 'HomeView',
  components: {
    sidebar
  },
  methods: {
    async obtenerProductos() {
      try {
        const response = await fetch('productosFav.json');
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        const data = await response.json();

        // Asignar los productos de "FavMes" a this.productosFavMes
        this.productosfm = data.FavMes;

        // Asignar los productos de "vistoreciente" a this.productosVistoReciente
        this.productosvr = data.vistoreciente;
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

.swiper-container {
  align-items: center;
  display: flex;
  width: 90%;
  height: 39%;
  margin: auto;
  margin-bottom: 2%;
  margin-top: 0%;
  overflow: hidden;
  border-radius: 20px;
}

.swiper-slide {
  width: 28%;
  height: 100%;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}



.swiper-pagination {
  position: absolute;
  bottom: 10px;
}


.clasificaciones {
  display: flex;
  width: 80%;
  height: 15%;
  margin-left: 10%;
  justify-items: center;
  align-items: center;
  margin-top: -0.5%;

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
  width: 97%;
  height: 80%;
  margin: auto;
  flex-flow: row nowrap;
  /* Alinear elementos en fila */
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
  transition: transform 0.5s ease;
}

.child {
  /* background-color: #ba3e97; */
  position: relative;
  width: 18.8%;
  height: 100%;
  border-radius: 5px;
  margin: 0 20px;
  flex: none;
  scroll-snap-align: start;
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
  width: 80%;
  height: 20%;
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
