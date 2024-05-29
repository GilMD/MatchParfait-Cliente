<template>
    <div class="pago">
        <sidebar />
        <div class="contenedor">
            <div class="titulo">
                <img src="@/assets/img/IMG-LOGO-RED.png" alt="">
                <h1>Método de Pago</h1>
            </div>
            <div class="formulario2">
                <div id="form2div1" class="dic2">
                    <div class="direccion">
                        <div class="tituloAddress2">
                            <span>Método de pago</span>
                        </div>
                        <div v-if="tarjetaExiste" class="infoAddress">
                            <span id="conMetodoPago">Titular: {{ tarjetaDatos.titular }}</span>
                            <span id="conMetodoPago">{{ numTarjeta
                                }}</span>
                        </div>
                        <div v-else="titularTarjeta!==''" class="infoAddress">

                            <span id="sinMetodoPago">Ops, necesitas agregar una tarjeta para
                                continuar.</span>
                        </div>
                        <div class="btnEditarAddress">
                            <span v-if="tarjetaExiste" id="conMetodoPago"
                                @click="cambiarVisibililidadform2()">Editar</span>
                            <span v-else id="sinMetodoPago" @click="cambiarVisibililidadform2()">Agregar</span>
                        </div>
                    </div>
                </div>
                <div id="form2div2" class="direccionInputs2">
                    <h1>Informacion de tarjeta</h1>
                    <div class="coloniaCalleInputs">
                        <input v-model="tarjetaDatos.titular" type="text" placeholder="Nombre completo">
                        <input v-model="tarjetaDatos.cardNumber" type="text" placeholder="Número de tarjeta"
                            minlength="12" maxlength="12" @keypress="isNumber">
                    </div>
                    <div class="numsExtIntInputs">
                        <input v-model="mes" type="number" placeholder="Mes">
                        <input v-model="year" type="number" placeholder="Año">
                        <input v-model="tarjetaDatos.cvv" type="number" class="cpNumber" placeholder="CVV" min="1"
                            max="4">
                    </div>
                    <div class="cpInput">
                        <input @click.prevent="guardarTarjeta()" class="signup-container_tabform_button" type="submit"
                            value="Guardar">
                        <!-- <input type="button" value="Guardar" class="btnGuardar"> -->
                    </div>
                    <div class="cancelar2">
                        <td @click="cambiarVisibililidadform2()" class="btnCancelar2">Cancelar</td>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sidebar from '@/components/sidebar.vue'
import axios from 'axios';
import { isEmptyObject } from 'jquery';
import { URL_DATOS } from '@/Utils/constantes';

export default {
    name: 'LoginView',
    components: {
        sidebar
    },
    data() {
        return {
            tarjetaExiste: false,
            tarjetaDatos: [],
            numTarjeta: '',
            mes: '',
            year: ''
        }

    },
    created(){
        this.cargarDatosTarjeta();
    },
    methods: {
        async cargarDatosTarjeta() {
            const token = JSON.parse(localStorage.getItem('vue2.token'));
            try {
                const response = await axios.get(`${URL_DATOS}/cards`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                })
                this.tarjetaDatos = response.data.data[0];
                console.log('tarjeta', this.tarjetaDatos);
                console.log(typeof this.tarjetaDatos);
                if (!isEmptyObject(this.tarjetaDatos)) {
                    this.obtenerFechas();
                    this.tarjetaExiste = true;
                }
                else {
                    this.tarjetaDatos = [];
                    this.tarjetaExiste = false;
                    console.log(this.tarjetaExiste);
                }
            } catch (error) {
                console.error('Error al obtener la información de tarjetas:', error);
            }

        },
        guardarTarjeta() {
            if (this.tarjetaExiste) {
                console.log('Llego aqui');
                this.actualizarTarjeta();
            } else {
                this.agregarTarjeta();
            }
            this.cambiarVisibililidadform2();
        },
        async agregarTarjeta() {
            const token = JSON.parse(localStorage.getItem('vue2.token'))
            const response = await axios.post(`${URL_DATOS}/cards`, {
                titular: this.tarjetaDatos.titular,
                cardNumber: parseInt(this.tarjetaDatos.cardNumber),
                cvv: this.tarjetaDatos.cvv,
                expDate: this.mes + '/' + this.year
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            )
                .then(function (response) {
                    console.log(response);
                    this.tarjetaDatos.expDate = this.mes + '/' + this.year;
                    this.tarjetaExiste = true;
                })
                .catch(function (error) {
                    console.log(error)
                });

        },
        async actualizarTarjeta() {
            const token = JSON.parse(localStorage.getItem('vue2.token'));
            try {
                const response = await axios.put(
                    `${URL_DATOS}/cards`,
                    {
                        cardId: this.tarjetaDatos.cardId,
                        titular: this.tarjetaDatos.titular,
                        cardNumber: parseInt(this.tarjetaDatos.cardNumber),
                        cvv: this.tarjetaDatos.cvv,
                        expDate: this.mes + '/' + this.year
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }
                );
                console.log(response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
        },
        obtenerFechas() {
            const partes = this.tarjetaDatos.expDate.split('/');
            this.mes = partes[0];
            this.year = partes[1];
            this.numTarjeta = 'XXXX-XXXX-XXXX-' + this.tarjetaDatos.cardNumber.substring(8, 12);
        },
        isNumber(event) {
            const char = String.fromCharCode(event.keyCode);
            if (!/[0-9]/.test(char)) {
                event.preventDefault();
            }
        },
        cambiarVisibililidadform2() {
            var form2div1 = document.getElementById('form2div1');
            var form2div2 = document.getElementById('form2div2');
            var form2div1_1 = document.getElementById('form2div1_1');

            if (form2div1.style.display == 'none') {
                form2div1.style.display = 'block';
                form2div2.style.display = 'none';
            } else {
                form2div1.style.display = 'none';
                form2div2.style.display = 'block';
            }
        },
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');


#form2div1,
#form2div1_1 {
    display: block;
}


#form2div2 {
    display: none;
}


.pago {
    background-image: url("@/assets/img/login-background.png");
    background-size: 100% 100%;
    height: 100vh;
    width: calc(99.3% - 7vh);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 8vh;
    border-radius: 2vh;
    margin-top: .5%;
}

.contenedor {
    display: flex;
    flex-direction: column;
    background-color: #FFFCF7;
    height: 90%;
    width: 90%;
    /* gap: 20vh; */
    border-radius: 2vh;
    box-shadow: 0px 4px 4px 0px #00000040;
    gap: 1vh;
}

.titulo {
    /* background-color: #7fca65; */
    font-family: 'Playfair Display', serif;
    display: flex;
    height: 10%;
    width: 100%;
    font-size: 2.5vh;
    font-weight: bold;
    color: #FF5733;
    align-items: center;
    margin-top: 2%;
    margin-left: 2%;
}

.titulo img {
    height: 10vh;
    margin-left: 2vh;
}

.info {
    font-family: 'DM Sans', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    margin-top: 2vh;
    font-size: 2vh;
    color: #391414;
    margin-left: 9%;
}

.formulario2 {
    /* background-color: #916a26; */
    height: 18%;
    width: 85%;
    display: flex;
    flex-direction: column;
    font-family: "DM Sans", sans-serif;
    margin-top: 8%;
    margin-left: 5%;
}

.formulario2 input {
    border-radius: 50px;
    margin-bottom: 25px;
    font-size: 17px;
}

.formulario2 input::placeholder {
    font-family: "DM Sans", sans-serif;
}

.dic2 {
    /* background-color: #E7E4DE; */
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: space-between;

}

.direccion {
    /* background-color: #706ed6; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 1.2vh;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
    overflow: hidden;
    padding: 1rem;
}

.tituloAddress2 {
    /* background-color: aqua; */
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
    color: #440707;
    text-align: left;
    margin: 0;
    padding-top: 0vh;
    padding-left: 2%;
    margin-bottom: 1vh;

}

.infoAddress {
    /* background-color: aqua; */
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #440707;
    text-align: left;
    margin: 0;
    padding-left: 2%;
    margin-bottom: 1vh;
    display: flex;
    flex-direction: column;
    gap: 1vh;
}

.btnEditarAddress {
    /* background-color: aqua; */
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #9B0E28;
    cursor: pointer;
    margin: 0;
    padding-left: 2%;
}

.direccionInputs2 {
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh;
    margin-top: 0%;
    /* Añadido espacio entre los elementos */

}

.direccionInputs2 h1 {
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1.3rem;
    color: #440707;
    text-align: left;
    margin-bottom: 2%;
}

.coloniaCalleInputs {
    display: flex;
    flex-direction: column;

}

.coloniaCalleInputs input {
    width: 85%;
    height: 50px;
    border: 2px solid lightgray;
    padding-left: 25px;
}

.numsExtIntInputs {
    display: flex;

}

.numsExtIntInputs input {
    width: 41%;
    height: 50px;
    border: 2px solid lightgray;
    padding-left: 25px;
    margin-right: 3%;
}

.cpInput .cpNumber {
    width: 41%;
    height: 50px;
    border: 2px solid lightgray;
    padding-left: 25px;
    margin-right: 3%;
}

.cpInput .signup-container_tabform_button {
    background-color: #9B0E28;
    color: #ffff;
    height: 50px;
    width: 200px;
    transition-duration: 1s;
    align-items: center;
    justify-content: center;
    border: none;
    margin-left: 5%;
}

.cpInput .signup-container_tabform_button:hover {
    transition-duration: 1s;
    transform: scale(1.1);
    box-shadow: 0px 0px 20px 0px rgba(230, 84, 84, 0.85);
    cursor: pointer;
}

.cancelar2 {
    /* background-color: #ff0000; */
    display: flex;
    margin-top: 4%;
    margin-left: 3.7vh;
}

.btnCancelar2 {
    /* background-color: aqua; */
    border: none;
    color: #9B0E28;
    font-size: 1.2rem;
    font-weight: 400;
    margin-left: 10vh;
    margin-top: -5%;
}

.btnCancelar2:hover {
    transition-duration: 1s;
    transform: scale(1.1);
    cursor: pointer;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

</style>