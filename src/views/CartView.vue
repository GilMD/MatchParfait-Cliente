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
                            <img @click.prevent="detalleProducto(product.productId)" :src="product.photo"
                                alt="Imagen del producto">
                        </div>
                        <div class="informacion_producto">
                            <div class="nombre_marca">
                                <td @click.prevent="detalleProducto(product.productId)" class="nombre">{{
                                    product.productName }}
                                    <div class="sparkles">
                                        <img v-if="revisarMatch(product)" src="@/assets/img/sparkles_red.svg" alt="">
                                    </div>
                                </td>
                                <span class="marca">{{ product.productBrand }}</span>
                                <div class="color-box" :style="{ backgroundColor: '#' + product.color }"></div>
                            </div>
                            <div class="precio_botones">
                                <td class="precio">{{ product.price | currency }}</td>

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
                    <div id="form1div1" class="dic">
                        <div class="direccion">
                            <div class="tituloAddress">
                                <span>Dirección de envío</span>
                            </div>
                            <div class="infoAddress">
                                <span>{{ this.address }}</span>
                            </div>
                            <div class="btnEditarAddress">
                                <span @click="cambiarVisibililidadform1()">Editar</span>
                            </div>


                            <!-- <span>80197, A Robles. #3384, Felipe Angeles, Culiacan, Sinaloa, México.</span> -->

                        </div>
                    </div>
                    <div id="form1div2" class="direccionInputs">
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
                        <div class="cancelar">
                            <td @click="cambiarVisibililidadform1()" class="btnCancelar">Cancelar</td>
                        </div>
                    </div>
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
                        <h1>Método de pago</h1>
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
                            <input @click.prevent="guardarTarjeta()" class="signup-container_tabform_button"
                                type="submit" value="Guardar">
                            <!-- <input type="button" value="Guardar" class="btnGuardar"> -->
                        </div>
                        <div class="cancelar2">
                            <td @click="cambiarVisibililidadform2()" class="btnCancelar2">Cancelar</td>
                        </div>
                    </div>
                </div>
                <div class="subtotal_pagoDelimitacion">
                    <div class="subtotal_pago">
                        <span>Total: {{ subtotal | currency }}</span>
                        <hr class="linea-horizontal">
                        <div>
                            <input @click.prevent="realizarCompra" class="btnSubtotalPago" type="submit" value="Pagar">
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
import { isEmptyObject } from 'jquery';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            products: [],
            direccion: [],
            userData: [],
            subtotal: '',
            address: '',
            tarjetaExiste: false,
            tarjetaDatos: [],
            numTarjeta: '',
            mes: '',
            year: '',
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
    created() {
        this.cargarDatosUsuario();
        this.formatoDireccion();
    },
    mounted() {
        this.productList();
        this.cargarDatosTarjeta();
        // this.obtenerDireccion();
    },
    methods: {
        detalleProducto(productId) {
            // this.$router.push(`/producto/${productId}`);
            this.$router.push({ name: 'producto', params: { id: productId } });
        },
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
                        console.log('productos', p);
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

                this.cambiarVisibililidadform1();
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
        cambiarVisibililidadform1() {
            var form1div1 = document.getElementById('form1div1');
            var form1div2 = document.getElementById('form1div2');
            var form2div1 = document.getElementById('form2div1');
            var form2div2 = document.getElementById('form2div2');

            if (form1div1.style.display == 'none') {
                form1div1.style.display = 'block';
                form1div2.style.display = 'none';
                form2div1.style.display = 'block';
                form2div2.style.display = 'none';
            } else {
                form1div1.style.display = 'none';
                form1div2.style.display = 'block';
                form2div1.style.display = 'none';
                form2div2.style.display = 'none';
            }

        },
        cambiarVisibililidadform2() {
            var form1div1 = document.getElementById('form1div1');
            var form1div2 = document.getElementById('form1div2');
            var form2div1 = document.getElementById('form2div1');
            var form2div2 = document.getElementById('form2div2');
            var form2div1_1 = document.getElementById('form2div1_1');

            if (form2div1.style.display == 'none') {
                form2div1.style.display = 'block';
                form2div2.style.display = 'none';
                form1div1.style.display = 'block';
                form1div2.style.display = 'none';
            } else {
                form2div1.style.display = 'none';
                form2div2.style.display = 'block';
                form1div1.style.display = 'block';
                form1div2.style.display = 'none';

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
                if (user.int_num !== '' || user.int_num !== null) {
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
        },
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
            if (this.validarTarjeta()) {
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
            }
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
        async realizarCompra() {
            if (this.validarCampos()) {
                const token = JSON.parse(localStorage.getItem('vue2.token'))
                try {
                    const response = await axios.post(`${URL_DATOS}/sale/transaction`, {
                        cardId: this.tarjetaDatos.cardId,
                        totalAmount: parseFloat(this.subtotal)
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + token,
                        }
                    });

                    // Compra completada con éxito
                    Swal.fire({
                        icon: 'success',
                        title: 'Compra Completada',
                        text: 'Tu compra se ha realizado con éxito.',
                        confirmButtonText: 'Entendido'
                    }).then(() => {
                        this.$router.push('/historial'); // Redirigir a la página de inicio
                    });

                    console.log('Compra realizada', response);
                } catch (error) {
                    // Error al realizar la compra
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en la Compra',
                        text: 'No se pudo completar tu compra. Por favor, inténtalo de nuevo.',
                        confirmButtonText: 'Entendido'
                    });

                    console.log('Error', error);
                }

            }
        },
        validarCampos() {
            if (this.products.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Compra fallida',
                    text: 'Tu carrito está vacio',
                    confirmButtonText: 'Entendido'
                })
                return false;
            }
            if (!this.tarjetaExiste) {
                Swal.fire({
                    icon: 'failure',
                    title: 'Compra fallida',
                    text: 'Agrega un metodo de pago',
                    confirmButtonText: 'Entendido'
                })
                return false;
            }
            return true;
        },
        validarTarjeta() {
            const regex = /^[A-Za-z]+$/;
            console.log(regex.test(this.tarjetaDatos.titular));
            if (!regex.test(this.tarjetaDatos.titular)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Caracteres invalidos en Titular',
                    text: 'Por favor, complete correctamente todos los campos de la tarjeta.',
                    confirmButtonText: 'Entendido'
                });
                return false;
            }
            return true;
        },
        revisarMatch(product) {
            if (typeof product.classification !== 'undefined') {
                if (product.classification !== this.userData[0].classification) {
                    return false;
                }
            }
            return true;
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

#form1div1,
#form2div1,
#form2div1_1 {
    display: block;
}

#form1div2,
#form2div2 {
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
    gap: 19vh;
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

.imagen_producto img:hover {
    cursor: pointer;
    transform: scale(1.01);
    transition: 0.3s
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
    /* background-color: aqua; */
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
    margin-right: .5vh;
}

.nombre:hover {
    cursor: pointer;
    transform: scale(1.01);
    transition: 0.3s
}

.marca {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #391414;
    text-align: left;
}

.precio_botones {
    /* background-color: aqua; */
    display: flex;
    align-items: center;
    gap: 0vh;
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
    margin-left: 11%;
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

    margin-bottom: 1%;
}

.precio_botones img:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: 0.3s;
}

.dic {
    /* background-color: #E7E4DE; */
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: space-between;
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

.tituloAddress {
    /* background-color: aqua; */
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
    color: #440707;
    text-align: left;
    margin: 0;
    padding-top: 1vh;
    padding-left: 2%;
    margin-bottom: 1vh;
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
    color: #ba1936;
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
    margin-top: 0%;
    /* Añadido espacio entre los elementos */
    z-index: 1;

}

.direccionInputs h1 {
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1.3rem;
    color: #440707;
    text-align: left;
    margin-bottom: 2%;
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

.cancelar {
    /* background-color: #ff0000; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
}

.cancelar2 {
    /* background-color: #ff0000; */
    display: flex;


    margin-top: 2%;
}

.btnCancelar {
    /* background-color: aqua; */
    border: none;
    color: #9B0E28;
    font-size: 1.2rem;
    font-weight: 400;
    margin-left: 31.2%;
    margin-top: -5%;
}

.btnCancelar:hover {
    transition-duration: 1s;
    transform: scale(1.1);
    cursor: pointer;
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

.formulario {
    /* background-color: #916a26; */
    height: 18%;
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

.subtotal_pagoDelimitacion {
    display: flex;
    /* background-color: #9B0E28; */
    justify-content: center;
    align-items: center;
    height: 20%;
    width: 85%;
    margin-top: auto;
    overflow: hidden;
    margin-bottom: 1vh;
}

.subtotal_pago {

    height: 80%;
    width: 85%;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    color: #440707;
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
    width: 2vh;
    height: 2vh;
    /* padding-left: 10%; */
    border-radius: 50%;
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
    padding-top: 0vh;
    max-width: 80%;
    text-align: right;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}


/* #sinMetodoPago {
    display: block;
}

#conMetodoPago {
    display: none;
} */
</style>