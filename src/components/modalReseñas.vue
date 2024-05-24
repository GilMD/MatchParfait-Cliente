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
                <div class="rating">
                    <span class="estrella" v-for="i in 5" :key="i" @click="setRating(i)" :class="{ 'selected': i <= rating }">&#9733;</span>
                </div>
                <div class="comentarios">
                    <textarea placeholder="Escribe un comentario"></textarea>
                </div>
                <div class="estrellas">
                    <span class="txtCalf">Califica que tanto hicieron match este producto y tu</span>
                    <span class="estrella" v-for="i in 5" :key="i" @click="setRating(i)" :class="{ 'selected': i <= rating }">&#9733;</span>
                </div>
                <div class="botones">
                    <button @click.prevent="save()">Guardar</button>
                    <span>Cancelar</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rating: 0
        }
    },
    methods: {
        setRating(rating) {
            this.rating = rating
        },
        save() {
            console.log('Rating:', this.rating)
        }
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
    border-radius: 1vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    align-content: center;
    
}

.info {
    background-color: aqua;
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





</style>