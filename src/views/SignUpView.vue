<template>
    <div class="signUp">
        <!-- engloba todo -->
        <form id="toggleForm" class="signup-information">
            <div id="div1" class="signup-information__tab">
                <div class="formularioParte1">
                    <div class="signup-information_tab_form" action="">
                        <div class="imgLogo">
                            <img src="@/assets/img/IMG-LOGO-RED.png" alt="">
                            <h1 class="signup-information_tab_h1">Crear cuenta</h1>
                        </div>
                        <span class="signup-information_tab_span">Información personal</span>
                        <div class="correoNombreInputs">
                            <input v-model="user.email" type="text" placeholder="Correo" required>
                            <input v-model="user.name" type="text" placeholder="Nombre(s)" required>
                        </div>
                        <div class="apellidosInputs">
                            <input v-model="user.last_name1" type="text" placeholder="Apellido paterno">
                            <input v-model="user.last_name2" type="text" placeholder="Apellido materno">
                        </div>
                        <div class="passwordsInputs">
                            <input v-model="user.password" type="password" placeholder="Contraseña">
                            <input v-model="user.passwordConfirm" type="password" placeholder="Confirma contraseña">
                        </div>
                        <div class="numberInput">
                            <input v-model="user.phone_number" type="number" placeholder="Numero telefónico">
                        </div>
                        <span class="signup-information_tab_span">Fecha de nacimiento</span>
                        <div class="fechaNac">
                            <select v-model="user.day">
                                <option disabled value="">Día</option>
                                <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
                            </select>
                            <select v-model="user.month">
                                <option disabled value="">Mes</option>
                                <option v-for="month in months" :key="month.value" :value="month.value">{{ month.name }}
                                </option>
                            </select>
                            <select v-model="user.year">
                                <option disabled value="">Año</option>
                                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                            </select>
                        </div>
                        <span class="signup-information_tab_span">Género</span>
                        <div class="generoInputs">
                            <label>
                                <input type="radio" v-model="user.gender" value="M"> Mujer
                            </label>
                            <label>
                                <input type="radio" v-model="user.gender" value="H"> Hombre
                            </label>
                            <label>
                                <input type="radio" v-model="user.gender" value="S"> No especificar
                            </label>
                        </div>
                    </div>
                </div>

                <div class="formularioParte2">
                    <div class="signup-information_tab_form2" action="">
                        <span class="signup-information_tab_spanD">Dirección</span>
                        <div class="estadoMunicipioInputs">
                            <input v-model="user.state" type="text" placeholder="Estado">
                            <input v-model="user.municipality" type="text" placeholder="Municipio">
                        </div>
                        <div class="coloniaCalleInputs">
                            <input v-model="user.suburb" type="text" placeholder="Colonia">
                            <input v-model="user.street" type="text" placeholder="Calle">
                        </div>
                        <div class="numsExtIntInputs">
                            <input v-model="user.ext_num" type="number" placeholder="Número externo">
                            <input v-model="user.int_num" type="number" placeholder="Número interno">
                        </div>
                        <div class="cpInput">
                            <input v-model="user.postal_code" type="number" placeholder="Código postal">
                        </div>
                        <div class="termsCheckbox">
                            <label>
                                <input type="checkbox" v-model="user.acceptTerms"> Acepto
                                <a href="#" @click.prevent="mostrarTerminos">Términos y Condiciones</a> de Match Parfait
                            </label>
                        </div>
                        <input @click.prevent="continuar()" class="signup-container_tabform_button" type="submit"
                            value="Continuar">

                        <span class="signup-information__register">¿Ya tienes una cuenta? <a href="#"
                                @click.prevent="iniciarSesion()">Inicia
                                sesión</a></span>
                    </div>
                </div>
            </div>


            <!-- ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
            <!-- Perfil de piel -->
            <div id="div2" class="signup-information__tab">
                <div class="formularioParte1">
                    <div class="signup-information_tab_form" action="">
                        <div class="imgLogo">
                            <img src="@/assets/img/IMG-LOGO-RED.png" alt="">
                            <h1 class="signup-information_tab_h1">Perfil de piel</h1>
                        </div>
                        <span class="signup-information_tab_span" style="margin-bottom: -1%;">Selecciona las opciones
                            que describan tu piel, así
                            podremos encontrar los mejores productos para ti.</span><br>
                        <div class="capObligatorio">
                            <img src="../assets/img/estrellas.png" alt="">
                            <span class="signup-information_tab_spann">Tipo de piel</span>
                        </div>
                        <v-container class="vcontainer">
                            <v-chip-group v-model="user.texture" column active-class="primary--text">
                                <v-chip v-for="option in skinTypes" :key="option" :value="option" class="ma-2"
                                    size="x-large">
                                    {{ option }}
                                </v-chip>
                            </v-chip-group>
                        </v-container>
                        <span class="signup-information_tab_spann">Brillo</span>
                        <v-container class="vcontainer">
                            <v-chip-group v-model="user.shine" column active-class="primary--text">
                                <v-chip v-for="option in Brightness" :key="option" :value="option" class="ma-2"
                                    size="x-large">
                                    {{ option }}
                                </v-chip>
                            </v-chip-group>
                        </v-container>
                        <span class="signup-information_tab_spann">Dermatitis</span>
                        <v-container class="vcontainer">
                            <v-chip-group v-model="user.dermatitis" column active-class="primary--text">
                                <v-chip v-for="option in Dermatitis" :key="option" :value="option" class="ma-2"
                                    size="x-large">
                                    {{ option }}
                                </v-chip>
                            </v-chip-group>
                        </v-container>
                        <span class="signup-information_tab_spann">Sensibilidad</span>
                        <v-container class="vcontainer">
                            <v-chip-group v-model="user.sensibility" column active-class="primary--text">
                                <v-chip v-for="option in Sensibility" :key="option" :value="option" class="ma-2"
                                    size="x-large">
                                    {{ option }}
                                </v-chip>
                            </v-chip-group>
                        </v-container>
                        <div class="capObligatorio">
                            <img src="../assets/img/estrellas.png" alt="">
                            <span class="signup-information_tab_spann">Campos obligatorios</span>
                        </div>
                    </div>
                </div>

                <div class="formularioParte2">
                    <div class="signup-information_tab_form2" action="">
                        <span class="signup-information_tab_spanD">Imperfecciones</span>
                        <v-container class="vcontainer" style="margin-bottom: -1.5%;">
                            <v-chip-group v-model="user.imperfection" column active-class="primary--text">
                                <v-chip v-for="option in Imperfection" :key="option" :value="option" class="ma-2"
                                    size="x-large">
                                    {{ option }}
                                </v-chip>
                            </v-chip-group>
                        </v-container>
                        <div class="capObligatorio">
                            <img src="../assets/img/estrellas.png" alt="">
                            <span class="signup-information_tab_spann">Tono de piel</span>
                        </div>
                        <span class="instrucciones" style="margin-bottom: -1%;">Selecciona el grupo y subtono que mejor
                            representa tu tono de piel,
                            puedes tomar como referencia las imagenes.</span>
                        <div class="tonoPiel">
                            <div class="image-container">
                                <img :src="currentImage" alt="Tone Image" class="tone-image" />
                            </div>
                            <span class="instrucciones" style="margin-top: 1%;">Desliza para seleccionar tu tono</span>
                            <input style="margin-top: 1%;" type="range" id="tones" min="1" max="6" step="1"
                                v-model="user.rangeValue" @input="updateImageAndLabel" />
                            <p class="etiquita">{{ currentLabel }}</p>
                        </div>

                        <input @click.prevent="finalizar()" class="signup-container_tabform_buttonF" type="submit"
                            value="Finalizar">

                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { URL_DATOS } from '@/Utils/constantes';
import Swal from 'sweetalert2';

export default {
    name: 'LoginView',
    data: function () {
        return {
            user: {
                email: '',
                name: '',
                last_name2: '',
                last_name1: '',
                password: '',
                passwordConfirm: '',
                phone_number: '',
                day: '',
                month: '',
                year: '',
                gender: '',
                state: '',
                municipality: '',
                suburb: '',
                street: '',
                ext_num: '',
                int_num: '',
                postal_code: '',
                acceptTerms: false,
                texture: '',
                shine: '',
                dermatitis: '',
                sensibility: '',
                tightness: 0,
                rosasea: 0,
                peeling: 0,
                hives: 0,
                imperfection: '',
                acne: 0,
                enlarged_pores: 0,
                sun_spots: 0,
                cloth: 0,
                blackheads: 0,
                roughness: 0,
                rangeValue: 1
            },
            // texture: 'Normal',
            skinTypes: ['Normal', 'Sensible', 'Seca', 'Grasa', 'Mixta'],
            Brightness: ['Brillo a final del día', 'Brillo a medio día', 'Sin brillo en el día', 'Brillo en zona T'],
            Dermatitis: ['Atópica', 'Por contacto', 'Seborreica'],
            Sensibility: ['Tirantez', 'Rosacesa', 'Descamación', 'Urticaria'],
            Imperfection: ['Acné', 'Poros dilatados', 'Manchas de sol', 'Paño', 'Puntos negros', 'Sensación aspera'],
            rangeValue: 1,
            passwordError: '',
            images: [
                { src: require('@/assets/img/skintype/rangevalue1.png'), label: 'LIGHT' },
                { src: require('@/assets/img/skintype/rangevalue2.png'), label: 'LIGHT MEDIUM' },
                { src: require('@/assets/img/skintype/rangevalue3.png'), label: 'MEDIUM' },
                { src: require('@/assets/img/skintype/rangevalue4.png'), label: 'MEDIUM TAN' },
                { src: require('@/assets/img/skintype/rangevalue5.png'), label: 'MEDIUM DEEP' },
                { src: require('@/assets/img/skintype/rangevalue6.png'), label: 'DEEP' }
            ],
            currentImage: require('@/assets/img/skintype/rangevalue1.png'),
            currentLabel: 'LIGHT',


            days: Array.from({ length: 31 }, (_, i) => i + 1),
            months: [
                { value: 1, name: 'Enero' },
                { value: 2, name: 'Febrero' },
                { value: 3, name: 'Marzo' },
                { value: 4, name: 'Abril' },
                { value: 5, name: 'Mayo' },
                { value: 6, name: 'Junio' },
                { value: 7, name: 'Julio' },
                { value: 8, name: 'Agosto' },
                { value: 9, name: 'Septiembre' },
                { value: 10, name: 'Octubre' },
                { value: 11, name: 'Noviembre' },
                { value: 12, name: 'Diciembre' }
            ],
            years: Array.from({ length: 2006 - 1930 + 1 }, (_, i) => 2006 - i)
        }

    },
    watch: {
        'user.sensibility': function (newSensibility) {
            this.updateSensibilityFlags(newSensibility);
        },
        'user.imperfection': function (newImperfection) {
            this.updateImperfectionFlags(newImperfection);
        }
    },

    methods: {
        iniciarSesion() {
            this.$router.push('/');
        },
        updateImageAndLabel() {
            const imageObject = this.images[this.user.rangeValue - 1];
            this.currentImage = imageObject.src;
            this.currentLabel = imageObject.label;
        },
        cambiarVisibililidad() {
            var div1 = document.getElementById('div1');
            var div2 = document.getElementById('div2');
            if (div1.style.display == 'none') {
                div1.style.display = 'block';
                div2.style.display = 'none';
            } else {
                div1.style.display = 'none';
                div2.style.display = 'block';
            }
            document.getElementById('toggleForm').addEventListener('submit', function (event) {
                event.preventDefault();  // Evita el envío del formulario
                // continuar(); 
            });
        },
        validarFormulario() {
            // Check if required fields are filled
            if (!this.user.email || !this.user.name || !this.user.last_name1 || !this.user.last_name2 ||
                !this.user.password || !this.user.passwordConfirm || !this.user.phone_number ||
                !this.user.day || !this.user.month || !this.user.year || !this.user.gender ||
                !this.user.state || !this.user.municipality || !this.user.suburb ||
                !this.user.street || !this.user.ext_num || !this.user.postal_code || !this.user.acceptTerms) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    text: 'Por favor, complete todos los campos obligatorios.',
                    confirmButtonText: 'Entendido'
                });
                return false;
            }
            if (this.user.password !== this.user.passwordConfirm) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Contraseña',
                    text: 'Las contraseñas no coinciden.',
                    confirmButtonText: 'Entendido'
                });
                return false;
            }
            const regex = /^[A-Za-z]+$/;
            if (!regex.test(this.user.name)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Caracteres invalidos en Nombre',
                    text: 'Por favor, complete correctamente todos los campos obligatorios.',
                    confirmButtonText: 'Entendido'
                });
                return false;
            }
            if (this.user.phone_number.toString().length!==10){
                Swal.fire({
                    icon: 'warning',
                    title: 'Tamaño invalido en número de teléfono',
                    text: 'Por favor, complete correctamente todos los campos obligatorios.',
                    confirmButtonText: 'Entendido'
                });
                return false;
            }
            return true;

        },
        validarFormulario2() {
            if (!this.user.texture || !this.user.shine) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    text: 'Por favor, complete todos los campos obligatorios.',
                    confirmButtonText: 'Entendido'
                });
                return false;
            }
            return true;
        },
        async continuar() {
            if (this.validarFormulario()) {
                try {
                    this.cambiarVisibililidad();
                } catch (error) {
                    console.error('Error:', error);
                    if (error.response && error.response.data) {
                        console.log('Error:', error.response.data);
                    }
                }
            }

        },
        updateSensibilityFlags(newSensibility) {
            this.user.tightness = newSensibility.includes('Tirantez') ? '1' : '0';
            this.user.rosasea = newSensibility.includes('Rosacea') ? '1' : '0';
            this.user.peeling = newSensibility.includes('Descamación') ? '1' : '0';
            this.user.hives = newSensibility.includes('Urticaria') ? '1' : '0';
        },
        updateImperfectionFlags(newImperfection) {
            this.user.acne = newImperfection.includes('Acné') ? '1' : '0';
            this.user.enlarged_pores = newImperfection.includes('Poros dilatados') ? '1' : '0';
            this.user.sun_spots = newImperfection.includes('Manchas de sol') ? '1' : '0';
            this.user.cloth = newImperfection.includes('Paño') ? '1' : '0';
            this.user.blackheads = newImperfection.includes('Puntos negros') ? '1' : '0';
            this.user.roughness = newImperfection.includes('Sensación aspera') ? '1' : '0';
        },
        validarFormulario2() {
            if (!this.user.texture || !this.user.shine) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos incompletos',
                    text: 'Por favor, complete todos los campos obligatorios.',
                    confirmButtonText: 'Entendido'
                });
                return false;
            }
            return true;
        },
        async finalizar() {
            if (this.validarFormulario2()) {
                try {
                    const textureMapping = {
                        'Normal': '1',
                        'Sensible': '2',
                        'Seca': '3',
                        'Grasa': '4',
                        'Mixta': '5'
                    };
                    const textureValue = textureMapping[this.user.texture] || '1';
                    const shineValue = this.Brightness.includes(this.user.shine) ? '1' : '0';
                    const dermatitisValue = this.Dermatitis.includes(this.user.dermatitis) ? '1' : '0';
                    const birthDate = new Date(this.user.year, this.user.month - 1, this.user.day);
                    // Format the date as ISO string
                    const date_of_birth = birthDate.toISOString();
                    console.log('email:', this.user.email);
                    console.log('name:', this.user.name);
                    console.log('last_name1:', this.user.last_name1);
                    console.log('last_name2:', this.user.last_name2);
                    console.log('contraseña:', this.user.password);
                    console.log('phone_number:', this.user.phone_number);
                    console.log('date_of_birth:', date_of_birth);
                    console.log('gender:', this.user.gender);
                    console.log('country:', 'México');
                    console.log('state:', this.user.state);
                    console.log('municipality:', this.user.municipality);
                    console.log('suburb:', this.user.suburb);
                    console.log('street:', this.user.street);
                    console.log('ext_num:', this.user.ext_num);
                    console.log('int_num:', this.user.int_num);
                    console.log('postal_code:', this.user.postal_code);
                    console.log('texture:', textureValue);
                    console.log('shine:', shineValue);
                    console.log('dermatitis:', dermatitisValue);
                    console.log('tightness:', this.user.tightness);
                    console.log('rosasea:', this.user.rosasea);
                    console.log('peeling:', this.user.peeling);
                    console.log('hives:', this.user.hives);
                    console.log('acne:', this.user.acne);
                    console.log('enlarged_pores:', this.user.enlarged_pores);
                    console.log('sun_spots:', this.user.sun_spots);
                    console.log('cloth:', this.user.cloth);
                    console.log('blackheads:', this.user.blackheads);
                    console.log('roughness:', this.user.roughness);
                    console.log('tone:', this.user.rangeValue);

                    const response = await axios.post(`${URL_DATOS}/auth/register`, {
                        email: this.user.email,
                        name: this.user.name,
                        lastName1: this.user.last_name1,
                        lastName2: this.user.last_name2,
                        plainPassword: this.user.password,
                        phone_number: this.user.phone_number,
                        date_of_birth: date_of_birth,
                        gender: this.user.gender,
                        state: this.user.state,
                        municipality: this.user.municipality,
                        suburb: this.user.suburb,
                        street: this.user.street,
                        ext_num: this.user.ext_num,
                        int_num: this.user.int_num,
                        postal_code: this.user.postal_code,
                        texture: textureValue,
                        shine: shineValue,
                        dermatitis: dermatitisValue,
                        tightness: this.user.tightness,
                        rosacea: this.user.rosasea,
                        peeling: this.user.peeling,
                        hives: this.user.hives,
                        acne: this.user.acne,
                        enlarged_pores: this.user.enlarged_pores,
                        sun_spots: this.user.sun_spots,
                        cloth: this.user.cloth,
                        blackheads: this.user.blackheads,
                        roughness: this.user.roughness,
                        tone: this.user.rangeValue
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro Completado',
                        text: 'Te has registrado correctamente, por favor inicia sesión',
                        confirmButtonText: 'Entendido'
                    }).then(() => {
                        this.$router.push('/'); // Redirigir a la página de inicio
                    });
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en el registro',
                        text: 'No se pudo completar tu registro. Por favor, inténtalo de nuevo.',
                        confirmButtonText: 'Entendido'
                    });

                    console.error('Error:', error);
                    if (error.response && error.response.data) {
                        console.log('Error:', error.response.data);
                    }

                }

            }

        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap");

#div1 {
    display: block;

}

#div2 {
    display: none;
}


.etiquita {
    width: auto;
    font-family: "DM Sans", sans-serif;
    font-size: 1.2em;
    font-weight: 500;
    margin-top: 1%;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 25px;
    display: inline-block;
    margin-bottom: 2%;

}


.instrucciones {
    font-weight: 400;
    font-family: "DM Sans", sans-serif;
    margin-bottom: 1%;
}

.image-container {
    text-align: center;
    margin-top: 20px;
}

.tone-image {
    max-width: 50%;
    height: auto;
    border-radius: 1.5vh;
    transition: 10s;
}

.tonoPiel {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tonoPiel input {
    margin-top: 2%;
    width: 70%;

}

.tonoPiel input[type="range"] {
    -webkit-appearance: none;
    width: 70%;
    height: 20%;
    margin: 5.5px 0;
}

.tonoPiel input[type=range]::-webkit-slider-thumb {
    /* -webkit-appearance: none; */
    appearance: none;
    height: 25px;
    /* Altura del botón */
    width: 25px;
    /* Ancho del botón */
    background: #9B0E28;
    /* Color del botón */
    border-radius: 50%;
    /* Bordes redondeados */
    cursor: pointer;
    /* Cambiar cursor al pasar sobre el botón */
    transition: 0.3s ease;
    margin-top: -1%;
}

.tonoPiel input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 15px;
    cursor: pointer;
    transition: 0.8s;
    box-shadow: 1px 1px 1px #0d0d0d;
    background: linear-gradient(90deg, #FFDCC6 0%, #EEB992 19.45%, #E8A26F 37.79%, #B65625 59.63%, #B75625 78.37%, #5C3620 100%);
    border-radius: 8px;
}

.vcontainer {
    width: 100%;
    height: auto;
    margin-top: 1.5%;
    margin-left: 0%;
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

.signUp {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    background-image: url("@/assets/img/login-background.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    justify-content: center;
    align-items: center;
}

.signup-information {
    display: flex;
    height: 90%;
    width: 90%;
    align-items: start;
    justify-content: center;
}

.signup-information__tab {
    display: flex;
    justify-content: space-between;
    background-color: #FFFCF7;
    height: 100%;
    width: 100%;
    border-radius: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.45);
    overflow: hidden;
}

.imgLogo {

    display: flex;
    width: 60%;
    height: 12%;
    margin-top: 5%;
    margin-left: -14%;

}

.formularioParte1,
.formularioParte2 {
    /* background-color: blanchedalmond; */
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    padding: 0 2%;
    float: left;
}



.signup-information_tab_h1 {
    margin-top: 0%;
    width: 80%;
    color: #9B0E28;
    font-size: 3.1em;
    text-align: start;
    font-family: 'Playfair Display', serif;
    font-weight: 400;
}

.signup-information_tab_span {
    width: 100%;
    margin-top: -1%;
    text-align: start;
    font-size: 1.4em;
    margin-bottom: 2%;
    margin-top: -2%;
    font-family: "DM Sans", sans-serif;
    margin-left: 1%;
}

.signup-information_tab_spanD {
    width: 100%;
    margin-top: -1%;
    text-align: start;
    font-size: 1.4em;
    margin-bottom: 0%;
    margin-top: 15.6%;
    font-family: "DM Sans", sans-serif;
    margin-left: 1%;
}

.signup-information_tab_spann {
    color: #440707;
    width: 100%;
    margin-top: -1%;
    text-align: start;
    font-size: 1.4em;
    font-weight: 450;
    margin-bottom: -1%;

    font-family: "DM Sans", sans-serif;
    margin-left: 1%;
}

/* -------Tipo de piel------- */
.capObligatorio {
    display: flex;
    margin-top: 3%;
    margin-bottom: -1.5%;
}

.capObligatorio img {
    margin-top: -1%;
    margin-left: -6.9%;
}

.capObligatorio span {
    margin-top: -1%;
    margin-left: -.5%;
}

.signup-information_tab_form {
    /* background-color: blueviolet; */
    height: 90%;
    width: 85%;
    display: flex;
    flex-direction: column;
    margin-left: 17%;
    font-family: "DM Sans", sans-serif;
}

.signup-information_tab_form input {
    border-radius: 50px;
    margin-bottom: 25px;
    font-size: 17px;
}

.signup-information_tab_form input::placeholder {
    font-family: "DM Sans", sans-serif;
}

.signup-information_tab_form2 {
    /* background-color: blueviolet; */
    height: 90%;
    width: 85%;
    display: flex;
    flex-direction: column;
    margin-left: 9%;
    font-family: "DM Sans", sans-serif;
}

.signup-information_tab_form2 input {
    border-radius: 50px;
    margin-bottom: 25px;
    font-size: 17px;
}

.signup-information_tab_form2 input::placeholder {
    font-family: "DM Sans", sans-serif;
}

.correoNombreInputs,
.coloniaCalleInputs {
    display: flex;
    flex-direction: column;

}

.correoNombreInputs input,
.coloniaCalleInputs input {
    width: 85%;
    height: 50px;
    border: 2px solid lightgray;
    padding-left: 25px;
}

.apellidosInputs,
.passwordsInputs,
.numberInput,
.fechaNac,
.generoInputs,
.estadoMunicipioInputs,
.numsExtIntInputs {
    display: flex;
}

.apellidosInputs input,
.estadoMunicipioInputs input,
.passwordsInputs input,
.numsExtIntInputs input,
.numberInput input,
.cpInput input {
    width: 41%;
    height: 50px;
    border: 2px solid lightgray;
    padding-left: 25px;
    margin-right: 3%;
}


.fechaNac,
.numberInput input {
    margin-bottom: 5%;
}

.fechaNac select {
    width: 15%;
    height: 50px;
    border: 2px solid lightgray;
    padding-left: 25px;
    margin-right: 3%;
    border-radius: 50px;
    font-size: 17px;
    font-family: "DM Sans", sans-serif;
}

.fechaNac option:disabled {
    color: #888;
    font-style: italic;
}

.generoInputs {
    gap: 10px;
}

.generoInputs label {
    font-size: 1.3em;
    font-family: "DM Sans", sans-serif;
}

.termsCheckbox {
    margin-top: 3%;
    font-size: 1.2em;
    font-family: "DM Sans", sans-serif;
}

.signup-container_tabform_textbox:hover {
    border: 2px solid rgb(230, 84, 84);
}

.signup-container_tabform_textbox:focus {
    border: 2px solid rgb(230, 84, 84);
}

.signup-container_tabform_button {
    background-color: #9B0E28;
    color: #ffff;
    height: 50px;
    width: 350px;
    transition-duration: 1s;
    align-items: center;
    margin-left: 16%;
    margin-top: 2%;
    border: none;
}

.signup-container_tabform_buttonF {
    background-color: #9B0E28;
    color: #ffff;
    height: 70px;
    width: 400px;
    transition-duration: 1s;
    align-items: center;
    margin: auto;
    border: none;

}

.signup-container_tabform_button:hover,
.signup-container_tabform_buttonF:hover {
    box-shadow: 0px 0px 20px 0px rgba(230, 84, 84, 0.85);
    transition-duration: .5s;
    transform: scale(1.1);
    cursor: pointer;
}

.signup-information__register {
    font-size: 1.2em;
    margin-left: 13%;
}

a {
    margin-left: 10px;
    text-decoration: none;
    color: #9B0E28;
}
</style>