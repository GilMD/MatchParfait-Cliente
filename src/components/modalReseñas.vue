<template>
    <div class="resena">
        <div class="resenaInner">
            <div class="info">
                <div class="tituloTexto">
                    <span class="titulo">Gracias por tu ayuda</span>
                    <span class="texto">Juntos lograremos ser mas precisos para mostrar lo mejor para ti.</span>
                </div>
                <div class="txtestrellas">
                    <span class="txtPuntuacion">Puntuación</span>
                </div>
                <div class="rating1">
                    <div class="rating">
                        <span v-for="star in 5" :key="star" class="star"
                            :class="{ filled: star <= puntuacionSeleccionada }" @click="puntuacionP(star)">
                            &#9733;
                        </span>
                    </div>
                </div>
                <div class="comentarios">
                    <textarea v-model="comentario" placeholder="Escribe un comentario"></textarea>
                </div>
                <div class="estrellas">
                    <span class="txtCalf">Califica que tanto hicieron match este producto y tu</span>
                    <div class="rating">
                        <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= puntuacionMatch }"
                            @click="puntuacionM(star)">
                            &#9733;
                        </span>
                    </div>
                </div>
                <div class="botones">
                    <button @click.prevent="save()">Guardar</button>
                    <span @click="close()">Cancelar</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { URL_DATOS } from '@/Utils/constantes';
import Swal from 'sweetalert2';

export default {
    props: {
        productId: String // Asegúrate de que la información del producto es pasada como una prop
    },
    data() {
        return {
            rating: 0,
            puntuacionSeleccionada: 0,
            puntuacionMatch: 0,
            comentario: '',
            error: '',
            errorMatch: ''
        }
    },
    methods: {
        async save() {
            if (this.puntuacionSeleccionada === 0) {
                Swal.fire({
                        icon: 'warning',
                        title: 'Reseña incompleta',
                        text: 'Dale una puntuacion al producto para continuar',
                        confirmButtonText: 'Entendido'
                    })
                return;
            }

            if (this.puntuacionMatch === 0) {
                Swal.fire({
                        icon: 'warning',
                        title: 'Reseña incompleta',
                        text: 'Dale una puntuacion de match al producto para continuar',
                        confirmButtonText: 'Entendido'
                    })
                return;
            }
            try {
                const token = JSON.parse(localStorage.getItem('vue2.token'));
                const response = await axios.post(`${URL_DATOS}/comments`, {
                    productId: this.productId,
                    score: this.puntuacionSeleccionada,
                    matchScore: this.puntuacionMatch,
                    comment: this.comentario,
                }, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                });
                console.log('Reseña guardada:', response.data);
                Swal.fire({
                        icon: 'success',
                        title: 'Reseña enviada',
                        text: 'Se ha registrado correctamente tu reseña del producto',
                        confirmButtonText: 'Entendido'
                    })
                this.close();
            } catch (error) {
                console.error('Error al guardar la reseña:', error);
            }
        },

        puntuacionP(star) {
            this.puntuacionSeleccionada = star;
            this.error = '';
        },
        puntuacionM(star) {
            this.puntuacionMatch = star;
            this.errorMatch = '';
        },
        limpiar() {
            this.rating = 0;
            this.puntuacionSeleccionada = 0;
            this.puntuacionMatch = 0;
            this.comentario = '';
            this.error = '';
            this.errorMatch = '';
        },
        close() {
            this.limpiar();
            this.$emit('close');
        },
    }
}
</script>

<style scoped>
.resena {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.resenaInner {
    background-color: white;
    width: 60vh;
    height: 60vh;
    border-radius: 2vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    align-content: center;
    border: .5vh solid var(--Subtitle, #9B0E28);
    transition: all 250ms ease-in-out;
}

.info {
    /* background-color: aqua; */
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    gap: 1.5vh;
    margin: 0 auto;


}

.tituloTexto {
    display: flex;
    flex-direction: column;
    gap: 1vh;
}

.titulo {
    font-family: 'Playfair Display', serif;
    font-size: 3vh;
    font-weight: 400;
    color: var(--Subtitle, #9B0E28);
}

.texto {
    width: 90%;
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    font-weight: 400;
    color: #391414;
}

.txtestrellas {
    display: flex;
}

.txtPuntuacion {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    font-weight: 400;
    color: #391414;
}

.rating1 {
    display: flex;
    margin-top: -2vh;
}

.rating {
    font-size: 4vh;
    color: #ccc;
    cursor: pointer;
}

.star {
    color: #ccc;
    cursor: pointer;
    border-radius: 5vh;
    fill: none;
    stroke: black;
    stroke-width: 0.1;
    /* Color de las estrellas vacías */
}

.star.filled {
    color: #ffc107;
    /* Color de las estrellas llenas */
}

.comentarios {
    display: flex;
    justify-content: center;
}

textarea {
    width: 90%;
    height: 10vh;
    border-radius: 2vh;
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    font-weight: 400;
    color: #391414;
    border: .1vh solid #7d7d7d;
    /* Borde delgado y gris claro */
    padding: 1vh;
    resize: none;
}

textarea::placeholder {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    font-weight: 400;
    color: #391414;
}

.estrellas {
    display: flex;
    flex-direction: column;
    gap: 1vh;
}

.txtCalf {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    font-weight: 400;
    color: #391414;
    margin-bottom: -2%;
}

.botones {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
    margin-top: 2vh;
}

button {
    width: 20vh;
    height: 5vh;
    border-radius: 3vh;
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    font-weight: 400;
    color: white;
    background-color: #9B0E28;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #b00909;
}

.botones span {
    font-family: 'DM Sans', sans-serif;
    font-size: 2vh;
    font-weight: 400;
    color: #391414;
    cursor: pointer;

}

.fade-enter,
.fade-leave-to {
    opacity: 0;

    .resenaInner {
        transform: translateY(-100vh);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all 250ms ease-in-out;
}

.fade-leave-active {
    transition-delay: 255ms;
}




</style>