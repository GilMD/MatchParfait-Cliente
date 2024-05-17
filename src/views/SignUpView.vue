<template>
    <div class="signUp">
        <div class="signup-information">
            <div class="signup-information__tab" style="display: none;">
                <div class="formularioParte1">
                    <form class="signup-information_tab_form" action="" >
                        <div class="imgLogo">
                            <img src="@/assets/img/IMG-LOGO-RED.png" alt="">
                            <h1 class="signup-information_tab_h1">Crear cuenta</h1>   
                        </div>
                        <span class="signup-information_tab_span">Información personal</span>
                        <div class="correoNombreInputs">
                            <input v-model="user.email" type="text" placeholder="Correo">
                            <input v-model="user.name" type="text" placeholder="Nombre(s)">
                        </div>
                        <div class="apellidosInputs">
                            <input v-model="user.lastnameP" type="text" placeholder="Apellido paterno">
                            <input v-model="user.lastnameM" type="text" placeholder="Apellido materno">
                        </div>
                        <div class="passwordsInputs">
                            <input v-model="user.password" type="text" placeholder="Contraseña">
                            <input v-model="user.passwordConfirm" type="text" placeholder="Confirma contraseña">
                        </div>
                        <div class="numberInput">
                            <input v-model="user.number" type="number" placeholder="Numero telefónico">
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
                                <input type="radio" v-model="user.gender" value="Mujer"> Mujer
                            </label>
                            <label>
                                <input type="radio" v-model="user.gender" value="Hombre"> Hombre
                            </label>
                            <label>
                                <input type="radio" v-model="user.gender" value="No especificar"> No especificar
                            </label>
                        </div>
                    </form>
                </div>

                <div class="formularioParte2">
                    <form class="signup-information_tab_form2" action="">
                        <span class="signup-information_tab_spanD">Dirección</span>
                        <div class="estadoMunicipioInputs">
                            <input v-model="user.state" type="text" placeholder="Estado">
                            <input v-model="user.municipio" type="text" placeholder="Municipio">
                        </div>
                        <div class="coloniaCalleInputs">
                            <input v-model="user.address" type="text" placeholder="Colonia">
                            <input v-model="user.street" type="text" placeholder="Calle">
                        </div>
                        <div class="numsExtIntInputs">
                            <input v-model="user.numExt" type="number" placeholder="Número externo">
                            <input v-model="user.numInt" type="number" placeholder="Número interno">
                        </div>
                        <div class="cpInput">
                            <input v-model="user.postal" type="number" placeholder="Código postal">
                        </div>
                        <div class="termsCheckbox">
                            <label>
                                <input type="checkbox" v-model="user.acceptTerms"> Acepto
                                <a href="#" @click.prevent="mostrarTerminos">Términos y Condiciones</a> de Match Parfait
                            </label>
                        </div>
                        <input @click.prevent="registrar()" class="signup-container_tabform_button" type="submit"
                            value="Continuar">

                        <span class="signup-information__register">¿Ya tienes una cuenta? <a href="#">Inicia
                                sesión</a></span>
                    </form>
                </div>
            </div>



            <div class="signup-information__tab">
                <div class="formularioParte1">
                    <form class="signup-information_tab_form" action="" >
                        <div class="imgLogo">
                            <img src="@/assets/img/IMG-LOGO-RED.png" alt="">
                            <h1 class="signup-information_tab_h1">Perfil de piel</h1>   
                        </div>
                        <span class="signup-information_tab_span">Selecciona las opciones que describan tu piel, así podremos encontrar los mejores productos para ti.</span><br>
                        <span class="signup-information_tab_spann" >Tipo de piel</span>
                        <div class="correoNombreInputs">
                            <input v-model="user.email" type="text" placeholder="Correo">
                            <input v-model="user.name" type="text" placeholder="Nombre(s)">
                        </div>
                        <div class="apellidosInputs">
                            <input v-model="user.lastnameP" type="text" placeholder="Apellido paterno">
                            <input v-model="user.lastnameM" type="text" placeholder="Apellido materno">
                        </div>
                        <div class="passwordsInputs">
                            <input v-model="user.password" type="text" placeholder="Contraseña">
                            <input v-model="user.passwordConfirm" type="text" placeholder="Confirma contraseña">
                        </div>
                        <div class="numberInput">
                            <input v-model="user.number" type="number" placeholder="Numero telefónico">
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
                                <input type="radio" v-model="user.gender" value="Mujer"> Mujer
                            </label>
                            <label>
                                <input type="radio" v-model="user.gender" value="Hombre"> Hombre
                            </label>
                            <label>
                                <input type="radio" v-model="user.gender" value="No especificar"> No especificar
                            </label>
                        </div>
                    </form>
                </div>

                <div class="formularioParte2">
                    <form class="signup-information_tab_form2" action="">
                        <span class="signup-information_tab_spanD">Dirección</span>
                        <div class="estadoMunicipioInputs">
                            <input v-model="user.state" type="text" placeholder="Estado">
                            <input v-model="user.municipio" type="text" placeholder="Municipio">
                        </div>
                        <div class="coloniaCalleInputs">
                            <input v-model="user.address" type="text" placeholder="Colonia">
                            <input v-model="user.street" type="text" placeholder="Calle">
                        </div>
                        <div class="numsExtIntInputs">
                            <input v-model="user.numExt" type="number" placeholder="Número externo">
                            <input v-model="user.numInt" type="number" placeholder="Número interno">
                        </div>
                        <div class="cpInput">
                            <input v-model="user.postal" type="number" placeholder="Código postal">
                        </div>
                        <div class="termsCheckbox">
                            <label>
                                <input type="checkbox" v-model="user.acceptTerms"> Acepto
                                <a href="#" @click.prevent="mostrarTerminos">Términos y Condiciones</a> de Match Parfait
                            </label>
                        </div>
                        <input @click.prevent="registrar()" class="signup-container_tabform_button" type="submit"
                            value="Continuar">

                        <span class="signup-information__register">¿Ya tienes una cuenta? <a href="#">Inicia
                                sesión</a></span>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { URL_DATOS } from '@/Utils/constantes';

export default {
    name: 'LoginView',
    data: function () {
        return {
            user: {
                email: '',
                password: '',
                day: '',
                month: '',
                year: ''
            },

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
            years: Array.from({ length: 121 }, (_, i) => new Date().getFullYear() - i)
        }

    },
    methods: {
        async registrar() {
            try {
                const response = await axios.post(`${URL_DATOS}/auth/register`, {
                    email: this.user.email,
                    password: this.user.password,
                    day: this.user.day,
                    month: this.user.month,
                    year: this.user.year
                });
                console.log('Response:', response.data.data);
                this.$router.push('/home');
            } catch (error) {
                console.error('Error:', error);
                console.log('Error:', error.response.data);
                alert('Correo o contraseña incorrectos');
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap");

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
    width: 49%;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    padding: 0 2%;
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
    margin-bottom: 2%;
    margin-top: 15.6%;
    font-family: "DM Sans", sans-serif;
    margin-left: 1%;
}

.signup-information_tab_spann {
    color:  #440707;
    width: 100%;
    margin-top: -1%;
    text-align: start;
    font-size: 1.4em;
    font-weight: 450;
    margin-bottom: 2%;
    
    font-family: "DM Sans", sans-serif;
    margin-left: 1%;
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

.signup-container_tabform_button:hover {
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