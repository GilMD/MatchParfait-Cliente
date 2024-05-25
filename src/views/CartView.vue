<template>
    <div class="cart page">
        <sidebar />
        <div class="contenedor">
            <div class="lista_productos">
                <div class="titulo">
                    <h1>Bolsa de compras</h1>
                </div>
                <div class="productos">
                    <div v-for="(product, index) in products" :key="product.cartId" class="producto">
                        <div class="imagen_producto">
                            <img :src="product.photo" alt="Imagen del producto">
                        </div>
                        <div class="informacion_producto">
                            <div class="nombre_marca">
                                <td class="nombre">{{ product.productName }}
                                    <div class="sparkles">
                                        <img src="@/assets/img/sparkles_red.svg" alt="">
                                    </div>
                                </td>
                                <span class="marca">{{ product.productBrand }}</span>
                            </div>
                            <div class="precio_botones">
                                <td class="precio">{{ product.price | currency }}</td>
                                <div class="color-box" :style="{ backgroundColor: '#' + product.color }"></div>
                                <div class="dec_inc">
                                    <button @click="cambiarCantidad('-', index)">-</button>
                                    <td>{{ parseInt(product.cantidad) }}</td>
                                    <button @click="cambiarCantidad('+', index)">+</button>
                                </div>
                                <img src="@/assets/img/trash.png" alt="" @click.prevent="borrarProd(product.cartId)">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="informacion_envio">
                <div class="formulario">
                    <div class="dic">
                        <div id="div1" class="direccion">
                            <h1>Dirección de envío</h1>
                            <span>{{ this.address }}</span>
                            <!-- <span>80197, A Robles. #3384, Felipe Angeles, Culiacan, Sinaloa, México.</span> -->
                            <td @click="cambiarVisibililidad()">Editar</td>
                        </div>
                    </div>
                    <div id="div2" class="direccionInputs">
                        <h1>Dirección de envío</h1>
                        <div class="estadoMunicipioInputs">
                            <input v-model="userData[0].state" type="text" placeholder="Estado">
                            <input v-model="userData[0].municipality" type="text" placeholder="Municipio">
                        </div>
                        <div class="coloniaCalleInputs">
                            <input v-model="userData[0].suburb" type="text" placeholder="Colonia">
                            <input v-model="userData[0].street" type="text" placeholder="Calle">
                        </div>
                        <div class="numsExtIntInputs">
                            <input v-model="userData[0].ext_num" type="number" placeholder="Número externo">
                            <input v-model="userData[0].int_num" type="number" placeholder="Número interno">
                        </div>
                        <div class="cpInput">
                            <input v-model="userData[0].postal_code" type="number" class="cpNumber"
                                placeholder="Código postal">
                            <input @click.prevent="guardarDireccion()" class="signup-container_tabform_button"
                                type="submit" value="Guardar">
                            <!-- <input type="button" value="Guardar" class="btnGuardar"> -->
                        </div>
                    </div>
                </div>
                <div class="subtotal_pagoDelimitacion">
                    <div class="subtotal_pago">
                        <span>Subtotal: {{ subtotal | currency }}</span>
                        <hr class="linea-horizontal">
                        <div>
                            <input @click.prevent="continuar()" class="btnSubtotalPago" type="submit"
                                value="Proceder al pago">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sidebar from '@/components/sidebar.vue';
import axios from 'axios';
import { URL_DATOS } from '@/Utils/constantes';

export default {
    data() {
        return {
            products: [],
            direccion: [],
            userData: [],
            subtotal: '',
            address: ''
        }
    },
    name: 'CartView',
    components: {
        sidebar
    },
    filters: {
        currency(value) {
            if (typeof value !== "number") {
                return value;
            }
            return `$${value.toFixed(2)}`;
        }
    },
    mounted() {
        this.productList();
        this.cargarDatosUsuario();
        this.formatoDireccion();
        // this.obtenerDireccion();
    },
    methods: {
        async productList() {
            const token = JSON.parse(localStorage.getItem('vue2.token'));
            try {
                let p = [];
                const response = await axios.get(`${URL_DATOS}/shoppingCart`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                })
                    // headers: {
                    //   Authorization: `Bearer ${localStorage.getItem('token')}`
                    // }
                    .then(response => {
                        p = response.data.data;
                        console.log(p);
                        this.products = p;
                    })
            } catch (error) {
                console.error('Error al obtener la información de los productos:', error);
            }
            this.calcularSubTotal();
        },
        async guardarDireccion() {
            const token = JSON.parse(localStorage.getItem('vue2.token'));
            try {
                const response = await axios.put(
                    `${URL_DATOS}/shoppingCart/address`,
                    {
                        state: this.userData[0].state,
                        municipality: this.userData[0].municipality,
                        suburb: this.userData[0].suburb,
                        street: this.userData[0].street,
                        ext_num: this.userData[0].ext_num,
                        int_num: this.userData[0].int_num,
                        postal_code: this.userData[0].postal_code
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
        cambiarCantidad(op, index) {
            let aux = this.products[index].price / this.products[index].cantidad;
            if (op === '+') {
                this.products[index].cantidad += 1;
            } else if (this.products[index].cantidad !== 1) {
                this.products[index].cantidad -= 1;
            }
            this.products[index].price = aux * this.products[index].cantidad;
            this.actualizarCantidad(index);
            this.calcularSubTotal();
        },
        async actualizarCantidad(index) {
            const token = JSON.parse(localStorage.getItem('vue2.token'));
            try {
                const response = await axios.put(
                    `${URL_DATOS}/shoppingCart`,
                    {
                        cartId: this.products[index].cartId,
                        cantidad: this.products[index].cantidad
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
        async borrarProd(idCart) {
            const token = JSON.parse(localStorage.getItem('vue2.token'));
            this.products = this.products.filter(p => p.cartId !== idCart);
            console.log('Producto eliminado');

            try {
                const response = await axios.delete(`${URL_DATOS}/shoppingCart`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                    data: { cartId: idCart }
                });
                console.log(response.data.data[0]);
            } catch (error) {
                console.log(error);
            }
            this.calcularSubTotal();
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
        },
        cargarDatosUsuario() {
            this.userData = JSON.parse(localStorage.getItem('vue2.userData'));
            // if(this.userData.int_num === null){
            //     this.userData.int_num = '';
            // }
            console.log('Datos usuario', this.userData);
        },
        formatoDireccion() {
            if (this.userData.length > 0) {
                const user = this.userData[0];
                this.address = user.postal_code + ', ' + user.street + ' #' + user.ext_num;
                if (user.int_num !== '') {
                    this.address += ', #' + user.int_num;
                }
                this.address += ', ' + user.suburb + ', ' + user.municipality + ', ' + user.state + ', ' + user.country;
                console.log('direccion', this.address);
            } else {
                console.log('No user data available');
            }
        },
        calcularSubTotal() {
            this.subtotal = 0;
            for (const product of this.products) {
                this.subtotal += product.price;
            }
            console.log('subtotal', this.subtotal);
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

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
    border-radius: 2vh;
}

#div1 {
    display: block;
    width: 100%;
}

#div2 {
    display: none;
}

.cart {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.contenedor {
    display: flex;
    /* background-color: rosybrown; */
    height: 90%;
    width: 90%;
    align-items: center;
    justify-content: center;
    gap: 20vh;
    /* Espacio entre los elementos */
}

.lista_productos,
.informacion_envio {
    display: flex;
    /* background-color: #ab5ba4; */
    height: 100%;
    width: 50%;
    flex-direction: column;
    /* align-items: center; */
}



.productos {
    /* background-color: #3db599; */
    height: 90%;
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
    /* Espacio entre los elementos */
    margin-top: 3%;
    border-radius: 2vh;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1rem;
    margin-left: 2.6%;
}

.productos::-webkit-scrollbar {
    width: 1.4vh;
}

.productos::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 1vh;
}

.productos::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 1vh;
}



.titulo {
    display: flex;
    text-align: left;
    /* background-color: #f0f0f0; */
    /* width: 80%;
    height: 6%; */
    /* Ocultar cualquier contenido que se salga */
    margin-top: 2%;
    margin-left: 6%;


}

.titulo h1 {
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-size: 2rem;
    color: #9B0E28;
    /* Centrar el texto */
    box-sizing: border-box;
    /* Incluye padding y borde en el ancho y alto */
}

.producto {
    /* background-color: #6441b6; */
    height: 20vh;
    width: 95%;
    display: flex;
    flex-direction: row;
    /* Cambiado para que los elementos estén en fila */
    margin-top: 3%;
    border-radius: 2vh;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
}

.imagen_producto {
    /* background-color: antiquewhite; */
    width: 31vh;
    height: 100%;
    display: flex;
}

.imagen_producto img {
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;
    object-fit: cover;
}

.informacion_producto {
    /* background-color: blueviolet; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1rem;
    /* Añadido padding horizontal */
}

.nombre_marca {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1vh;
    overflow: hidden;
    /* Añadido espacio entre los elementos */
}

.nombre {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
    color: #391414;
    text-align: left;
}

.marca {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #391414;
    text-align: left;
}

.precio_botones {
    display: flex;
    align-items: center;
    gap: 1vh;
    /* Añadido espacio entre los elementos */
}

.precio_botones .precio {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 1.3rem;
    color: #391414;
    text-align: left;
}

.dec_inc {
    width: 20%;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;
    display: flex;
    gap: 1vh;
    /* Añadido espacio entre los elementos */
    border-radius: 15px;
    overflow: hidden;
    margin-left: 10%;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 2%;
}

.dec_inc button {
    width: 40%;
    height: 100%;
    border: none;
    color: #440707;
    cursor: pointer;
}

.precio_botones img {
    width: 6%;
    margin-left: 40%;
    cursor: pointer;
    margin-bottom: 1%;
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
    overflow: hidden;
}

.divnombre h1 {
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1.5rem;
    color: #440707;
    text-align: left;
    margin: 0;
    padding-bottom: 1vh;
    padding-left: 2%;
}

.adreess span {
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #440707;
    text-align: left;
    margin: 0;
    padding-bottom: 1vh;
    padding-left: 2%;
}

.btnEditar td {

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
    margin-top: -22%;
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

.btnGuardar {
    width: 41%;
    height: 50px;
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
    margin-top: 15%;
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

.subtotal_pagoDelimitacion {
    display: flex;
    /* background-color: #9B0E28; */
    justify-content: center;
    align-items: center;
    height: 20%;
    width: 85%;
    margin-top: 5%;
    overflow: hidden;
}

.subtotal_pago {

    background-color: #FFFCF7;
    height: 80%;
    width: 85%;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
    margin-left: 0%;
    overflow: hidden;
}

.subtotal_pago span {
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
    color: #440707;
    text-align: left;
    margin-left: 2%;
    margin-top: 2%;
}

.linea-horizontal {
    margin-top: 1%;
    border: 0;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    background: #E7E4DE;
    height: 1px;
    width: 100%;
    margin-bottom: 3%;

}

.color-box {
    width: 20px;
    height: 20px;
    /* padding-left: 10%; */
    border-radius: 50%;
    cursor: pointer;
}

.btnSubtotalPago {
    width: 41%;
    height: 50px;
    border: none;
    background-color: #9B0E28;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 25px;

}

.subtotal_pago div {
    display: flex;
    justify-content: center;
}


.subtotal_pago .btnSubtotalPago:hover {
    transition-duration: 1s;
    transform: scale(1.1);
    box-shadow: 0px 0px 20px 0px rgba(230, 84, 84, 0.85);
}

.sparkles {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 5vh;
    height: 100%;
}

.sparkles img {
    padding-top: 10px;
    max-width: 100%;
    text-align: right;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>