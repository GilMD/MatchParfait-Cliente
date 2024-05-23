<template>
    <div class="user page">
        <sidebar />
        <div class="contenedor">
            <div class="lista_productos">
                <div class="titulo">
                    <img src="@/assets/img/IMG-LOGO-RED.png" alt="">
                    <h1>Mi perfil</h1>
                </div>
                <div class="info_user">
                    <div class="info">
                        <span class="nombre">{{this.userData.name+' '+this.userData.last_name1+' '+this.userData.last_name2}}</span>
                        <span class="correolbl">Correo</span>
                        <span class="correo">{{this.userData.email}}</span>
                        <span class="phonelbl">Celular</span>
                        <span class="phone">{{this.userData.phone_number}}</span>
                    </div>
                    <hr class="linea-horizontal">
                    <div class="buttons">
                        <button @click.prevent="historial()" class="historial">Historial</button>
                        <button  @click.prevent="mtdPago()" class="Metodos_pago">Metodos de pago</button>
                        <button @click.prevent="cerrarSesion()" class="logout">Cerrar sesión</button>
                    </div>
                </div>
                
            </div>
            <div class="informacion_envio">
                <div class="formulario">
                    <div class="dic">
                        <div id="div1" class="direccion">
                            <h1>Dirección de envío</h1>
                            <span>{{ this.address }}</span>
                            <td @click="cambiarVisibililidad()">Editar</td>
                        </div>
                    </div>
                    <div id="div2" class="direccionInputs">
                        <h1>Dirección de envío</h1>
                        <div class="estadoMunicipioInputs">
                            <input v-model="userData.state" type="text" placeholder="Estado">
                            <input v-model="userData.municipality" type="text" placeholder="Municipio">
                        </div>
                        <div class="coloniaCalleInputs">
                            <input v-model="userData.suburb" type="text" placeholder="Colonia">
                            <input v-model="userData.street" type="text" placeholder="Calle">
                        </div>
                        <div class="numsExtIntInputs">
                            <input v-model="userData.ext_num" type="number" placeholder="Número externo">
                            <input v-model="userData.int_num" type="number" placeholder="Número interno">
                        </div>
                        <div class="cpInput">
                            <input v-model="userData.postal_code" type="number" class="cpNumber"
                                placeholder="Código postal">
                            <input @click.prevent="guardarDireccion()" class="signup-container_tabform_button"
                                type="submit" value="Guardar">
                        </div>
                        <div class="cancelar">
                            <td @click="cambiarVisibililidad()" class="btnCancelar">Cancelar</td>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import sidebar from '@/components/sidebar.vue'
export default {
    name: 'UserView',
    components: {
        sidebar
    },
    data() {
        return {
            visible: false,
            userData: [],
            address: ''
        }
    },
    mounted() {
        this.cargarDatosUsuario();
        this.formatoDireccion();
        // this.obtenerDireccion();
    },
    methods: {
        cambiarVisibililidad() {
            if (this.visible == false) {
                document.getElementById('div1').style.display = 'none';
                document.getElementById('div2').style.display = 'block';
                this.visible = true;
            } else {
                document.getElementById('div1').style.display = 'block';
                document.getElementById('div2').style.display = 'none';
                this.visible = false;
            }
        },
        cargarDatosUsuario() {
            this.userData = JSON.parse(localStorage.getItem('vue2.userData'));
            // if(this.userData.int_num === null){
            //     this.userData.int_num = '';
            // }
            console.log('Datos usuario', this.userData);
        },
        formatoDireccion() {
            this.address = this.userData.postal_code + ', ' + this.userData.street + ' #' + this.userData.ext_num;
            if (this.userData.int_num !== '') {
                this.address += ', #' + this.userData.int_num;
            }
            this.address += ", " + this.userData.suburb + ', ' + this.userData.municipality + ', ' + this.userData.state + ', ' + this.userData.country;
        },
        async guardarDireccion() {
            const token = JSON.parse(localStorage.getItem('vue2.token'));
            try {
                const response = await axios.put(
                    `${URL_DATOS}/shoppingCart/address`,
                    {
                        state: this.userData.state,
                        municipality: this.userData.municipality,
                        suburb: this.userData.suburb,
                        street: this.userData.street,
                        ext_num: this.userData.ext_num,
                        int_num: this.userData.int_num,
                        postal_code: this.userData.postal_code
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }
                )
                localStorage.setItem('vue2.userData', JSON.stringify(this.userData));

                this.cambiarVisibililidad();
            } catch (error) {
                console.error('Error al guardar la dirección:', error);
            }
            this.formatoDireccion();
        },
        cerrarSesion(){
            localStorage.removeItem('vue2.token');
            localStorage.removeItem('vue2.userData');
            this.$router.push('/');
        },
        mtdPago(){
            this.$router.push('/metodoPago');
        },
        historial(){
            this.$router.push('/historial');
        },
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}

html {
    overflow: hidden;
}

.page {
  /* background-color: #FFFCF7; */
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


#div1 {
    display: block;
    width: 100%;
}

#div2 {
    display: none;
}

.contenedor {
    display: flex;
    background-color: #FFFCF7;
    height: 90%;
    width: 90%;
    align-items: center;
    justify-content: center;
    /* gap: 20vh; */
    border-radius: 2vh;
    box-shadow: 0px 4px 4px 0px #00000040;
    gap: 1vh;
    
}

.lista_productos,
.informacion_envio {
    display: flex;
    /* background-color: #ab5ba4; */
    height: 100%;
    width: 50%;
    flex-direction: column;
    align-items: center;
    

}

.titulo {
    background-color: #FFFCF7;
    display: flex;
    width: 80%;
    height: 10%;
    /* Ocultar cualquier contenido que se salga */
    margin-top: 2%;
    word-wrap: break-word;
    justify-content: center;
    align-items: center;

}
.titulo h1 {
    width: 100%;
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-size: 2rem;
    color: #9B0E28;
    text-align: center;
    text-align: left;
    /* Centrar el texto */
    box-sizing: border-box;
    /* Incluye padding y borde en el ancho y alto */
    
}

.titulo img {
    display: flex;
    width: 13%;
    height: 100%;
    
    
}

.info_user{
    display: flex;
    flex-direction: column;
    background-color: #FFFCF7;
    width: 80%;
    height: 80%;
    border-radius: 12px;
    /* box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15); */
    margin-top: 2%;
    
}

.info {
    height: 30%;
    width: 70%;
    /* background-color:#ab5ba4; */
    display: flex;
    flex-direction: column;
    gap: 2vh;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: 12%;
    
}

.info span {
    font-family: 'dm sans', sans-serif;
}

.info .nombre {
    
    font-weight: 400;
    font-size: 1.5rem;
    color: #9B0E28;
    text-align: left;
    margin: 0;
    padding-bottom: 1vh;
    
}

.correolbl, .phonelbl {
    
    font-weight: 400;
    font-size: 1.2rem;
    color: #440707;
    text-align: left;
    margin: 0;
}

.correo, .phone {
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #440707;
    text-align: left;
    margin: 0;
}

.linea-horizontal {
    margin-top: 1%;
    border: 0;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    background: #E7E4DE;
    height: 1px;
    width: 88%;
    margin-bottom: 3%;
    margin-left: 12%;

}

.buttons {
    height: 30%;
    width: 70%;
    /* background-color:aqua; */
    display: flex;
    flex-direction: column;
    gap: 2vh;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: 12%;
    align-items: self-start;
    justify-content: center;
}

.buttons button {
    font-family: 'dm sans', sans-serif;
    width: 40%;
    height: 24.5%;
    border: none;
    background-color: #9B0E28;
    color: #FFFFFF;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    border-radius: 25px; 
    
}

.dic {
    /* background-color: #E7E4DE; */
    width: 90%;
    height: 28%;
    display: flex;
}

.direccion {
    /* background-color: #1d1c5d; */
    width: 90%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 12px;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
}

.direccion h1 {
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1.5rem;
    color: #440707;
    text-align: left;
    margin: 0;
    padding-bottom: 1vh;
    padding-left: 2%;
}

.direccion span {
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #440707;
    text-align: left;
    margin: 0;
    padding-bottom: 1vh;
    padding-left: 2%;
}

.direccion td {

    /* background-color: aqua; */
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #9B0E28;
    cursor: pointer;
    margin: 0;
    padding-top: 1vh;
    padding-left: 30%;
}

.direccion td:hover {
    color: #440707;
    transform: scale(1.1);
    transition: 0.3s;
}

.direccionInputs {
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh;
    margin-top: -18%;
    /* Añadido espacio entre los elementos */

}

.direccionInputs h1 {
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1.3rem;
    color: #440707;
    text-align: left;
    margin-bottom: 2%;
}


.estadoMunicipioInputs input {
    width: 41%;
    height: 50px;
    border: 2px solid lightgray;
    padding-left: 25px;
    margin-right: 3%;
}

.estadoMunicipioInputs {
    display: flex;
}

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
    width: 29%;
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

.cancelar {
    /* background-color: #ff0000; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
}
.btnCancelar {
    /* background-color: aqua; */
    border: none;
    color: #9B0E28;
    font-size: 1.2rem;
    font-weight: 400;
    margin-left: 27.2%;
    margin-top: -5%;
   
    
}

.btnCancelar:hover {
    transition-duration: 1s;
    transform: scale(1.1);
    cursor: pointer;
}

.btnGuardar {
    width: 41%;
    height: 8%;
    border: none;
    background-color: #9B0E28;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
}

.formulario {
    /* background-color: #916a26; */
    height: 55%;
    width: 85%;
    display: flex;
    flex-direction: column;
    font-family: "DM Sans", sans-serif;
    margin-top: 16%;
    margin-left: 5%;

}

.formulario input {
    border-radius: 50px;
    margin-bottom: 25px;
    font-size: 17px;
}

.formulario input::placeholder {
    font-family: "DM Sans", sans-serif;
}


</style>