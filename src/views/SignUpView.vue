<template>
    <div class="signUp">
        <div class="signup-information">
            <div class="signup-information__tab">
                <h1 class="signup-information_tab_h1">Crear Cuenta</h1>
                <form class="signup-information_tab_form" action="">
                    <input v-model="user.email" class="signup-container_tabform_textbox" type="text"
                        placeholder="Correo">
                    <input v-model="user.name" class="signup-container_tabform_textbox" type="text"
                        placeholder="Nombre(s)">
                    <input @click.prevent="iniciarSesion()" class="signup-container_tabform_button" type="submit"
                        value="Iniciar Sesión">
                </form>
                <span class="signup-information__register">¿No tienes una cuenta? <a href="#">Regístrate</a></span>
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
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    background-image: url("@/assets/img/login-background.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    /* margin-top: -.4%;
    margin-left: -5%; */
    justify-content: center;
    align-items: center;
}

.signup-information {
    background-color: aqua;
    display: flex;
    height: 90%;
    width: 90%;
    align-items: start;
    margin-left: 50px;
    justify-content: center;
}

.signup-information__tab {
    display: flex;
    flex-direction: column;
    background-color: #ffff;
    height: 100%;
    width: 100%;
    border-radius: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.45);
}

.signup-information_tab_h1 {
    width: 20%;
    color: #9B0E28;
    font-size: 3.5em;
    text-align: start;
    margin-left: 10%;

}

.signup-information_tab_form {
    background-color: aqua;
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-bottom: 80px;
    margin-left: 10%;
}

.signup-information_tab_form input {
    border-radius: 50px;
    margin-bottom: 25px;
    font-size: 20px;
}

.signup-container_tabform_textbox {
    width: 400px;
    height: 40px;
    border: 2px solid lightgray;
    padding-left: 25px;

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
    height: 45px;
    transition-duration: 1s;
}

.signup-container_tabform_button:hover {
    box-shadow: 0px 0px 20px 0px rgba(230, 84, 84, 0.85);
    transition-duration: .5s;
}

.signup-information__register {
    font-size: 1.5em;
}

a {
    margin-left: 10px;
    text-decoration: none;
    color: #9B0E28;
}
</style>