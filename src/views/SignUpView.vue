<template>
    <div class="signUp">
        <div class="brand-informarion">
            <img class="brand-informarion__img" src="@/assets/img/IMG-LOGO-RED.png" alt="Match Parfait Logo">
            <span class="brand-informarion__slogan">Acercandote a la <br> perfección</span>
            <p></p>
            <span class="brand-informarion__info">Estas a un paso de encontrar los mejores <br> productos para
                ti.</span>
        </div>
        <div class="login-information">
            <div class="login-information__tab">
                <h1 class="login-information_tab_h1">Iniciar Sesión</h1>
                <form class="login-information_tab_form" action="">
                    <input v-model="user.email" class="login-container_tabform_textbox" type="text"
                        placeholder="Correo">
                    <input v-model="user.password" class="login-container_tabform_textbox" type="password"
                        placeholder="Contraseña">
                    <input @click.prevent="iniciarSesion()" class="login-container_tabform_button" type="submit"
                        value="Iniciar Sesión">
                </form>
                <span class="login-information__register">¿No tienes una cuenta? <a href="#">Regístrate</a></span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { URL_DATOS } from '@/Utils/constantes';

export default {
    name: 'LoginView',
    data:function() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
        
    },
    methods: {
        async iniciarSesion() {
            try {
                const response = await axios.post(`${URL_DATOS}/auth/login`, {
                    email: this.user.email,
                    password: this.user.password
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
.signUp {
    display: flex;
    flex-direction: row;
    margin: -8px;
    overflow-y: hidden;
    font-family: inter;
    font-size: 16px;
    background-image: url("@/assets/img/login-background.png");
    background-size: 100% 100%;
}

.brand-informarion {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 50%;
    align-items: center;
    justify-content: center;
    padding: 10px 50px;

}

.brand-informarion__img {
    height: 150px;
    width: 150px;
    margin-top: -10%;
}

.brand-informarion__slogan {
    color: #9B0E28;
    font-size: 5em;
}

.brand-informarion__info {
    color: #440707;
    font-size: 2em;
}

.login-information {
    display: flex;
    flex-direction: column;
    height: 97.5vh;
    width: 50%;
    align-items: start;
    margin-left: 50px;
    justify-content: center;
}

.login-information__tab {
    display: flex;
    flex-direction: column;
    background-color: #ffff;
    height: 35em;
    width: 35em;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.45);
}

.login-information_tab_h1 {
    color: #9B0E28;
    font-size: 3.5em;
    /* margin-top: -40px; */
    margin-bottom: 60px;
}

.login-information_tab_form {
    display: flex;
    flex-direction: column;
    margin-bottom: 80px;

    input {

        border-radius: 50px;
        margin-bottom: 25px;
        font-size: 20px;
    }
}

.login-container_tabform_textbox {
    width: 400px;
    height: 40px;
    border: 2px solid lightgray;
    padding-left: 25px;

}

.login-container_tabform_textbox:hover {
    border: 2px solid rgb(230, 84, 84);
}

.login-container_tabform_textbox:focus {
    border: 2px solid rgb(230, 84, 84);
}

.login-container_tabform_button {
    background-color: #9B0E28;
    color: #ffff;
    height: 45px;
    transition-duration: 1s;
}

.login-container_tabform_button:hover {
    box-shadow: 0px 0px 20px 0px rgba(230, 84, 84, 0.85);
    transition-duration: .5s;
}

.login-information__register {
    font-size: 1.5em;
}

a {
    margin-left: 10px;
    text-decoration: none;
    color: #9B0E28;
}
</style>