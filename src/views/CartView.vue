<template>
    <div class="cart page">
        <sidebar />
        <div class="contenedor">
            <div class="lista_productos">
                <div class="titulo">
                    <h1>Bolsa de compras</h1>
                </div>
                <div v-for="product in products" :key="product.id" class="producto">
                    <div class="imagen_producto">
                        <img :src="product.imagen" alt="Imagen del producto">
                    </div>
                    <div class="informacion_producto">
                        <div class="nombre_marca">
                            <td class="nombre">{{ product.name }}</td>
                            <td class="marca">{{ product.brand }}</td>
                        </div>
                        <div class="precio_botones">
                            <td class="precio">{{ product.price | currency }}</td>
                            <div class="dec_inc">
                                <button @click="decrement(product)">-</button>
                                <td>{{ product.quantity }}</td>
                                <button @click="increment(product)">+</button>
                            </div>
                            <img src="@/assets/img/trash.png" alt="" @click.prevent="borrarProd()">
                        </div>
                    </div>
                </div>
            </div>
            <div class="informacion_envio">
                <div class="formulario">
                    <div class="direccion" style="display: none;">
                        <h1>Dirección de envío</h1>
                        <span>80197, A Robles. #3384, Felipe Angeles, Culiacan, Sinaloa, México.</span>
                        <td>Editar</td>
                    </div>
                    <div class="direccionInputs">
                        <h1>Dirección de envío</h1>
                        <div class="estadoMunicipioInputs">
                            <input type="text" placeholder="Estado">
                            <input type="text" placeholder="Municipio">
                        </div>
                        <div class="coloniaCalleInputs">
                            <input type="text" placeholder="Colonia">
                            <input type="text" placeholder="Calle">
                        </div>
                        <div class="numsExtIntInputs">
                            <input type="number" placeholder="Número externo">
                            <input type="number" placeholder="Número interno">
                        </div>
                        <div class="cpInput">
                            <input type="number" class="cpNumber" placeholder="Código postal">
                            <input @click.prevent="continuar()" class="signup-container_tabform_button" type="submit"
                                value="Guardar">
                            <!-- <input type="button" value="Guardar" class="btnGuardar"> -->
                        </div>
                    </div>
                </div>
                <div class="subtotal_pago">
                    <span>Subtotal: $200.0</span>
                    <hr class="linea-horizontal">
                    <div>
                        <input @click.prevent="continuar()" class="btnSubtotalPago" type="submit"
                            value="Proceder al pago">
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
            products: []
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
    },
    methods: {
        async productList() {
            const token = JSON.parse(localStorage.getItem('vue2.token'));
            try {
                let p = [];
                const response = await axios.get(`${URL_DATOS}/products`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                })
                    // headers: {
                    //   Authorization: `Bearer ${localStorage.getItem('token')}`
                    // }
                    .then(response => {
                        p = response.data.data;
                        this.products = p;
                    })
            } catch (error) {
                console.error('Error al obtener la información de los productos:', error);
            }
        },
        increment(product) {
            product.quantity += 1;
        },
        decrement(product) {
            if (product.quantity > 1) {
                product.quantity -= 1;
            }
        },
        borrarProd() {
            this.productos = this.products.filter(p => p.id !== product.id);
            console.log('Producto eliminado', product);
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

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
    align-items: center;

}

.producto {
    gap: 2vh;
    background-color: #FFFCF7;
    height: 23%;
    width: 80%;
    display: flex;
    flex-direction: row;
    /* Cambiado para que los elementos estén en fila */
    margin-top: 3%;
    border-radius: 10px;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);

}

.titulo {
    /* background-color: #f0f0f0; */
    width: 80%;
    height: 6%;
    overflow: hidden;
    /* Ocultar cualquier contenido que se salga */
    margin-top: 2%;
    word-wrap: break-word;
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

.imagen_producto {
    width: 30%;
    height: 100%;
    display: flex;
    object-fit: cover;
}

.imagen_producto img {
    border-radius: 10px 0 0 10px;
}

.informacion_producto {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 1rem;
    /* Añadido padding horizontal */
}

.nombre_marca {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    /* Añadido espacio entre los elementos */
}

.nombre_marca .nombre {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 22px;
    color: #391414;
    text-align: left;
}

.nombre_marca .marca {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 15px;
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
    font-size: 20px;
    color: #391414;
    text-align: left;
}

.dec_inc {
    width: 20%;
    height: 110%;
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
    font-size: 16px;
}

.dec_inc button {
    width: 40%;
    height: 100%;
    border: none;
    color: #440707;
    cursor: pointer;
}

.precio_botones img {
    width: 7%;
    margin-left: 40%;
    cursor: pointer;
}

.direccion {
    /* background-color: #FFFCF7; */
    width: 80%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 17%;
    border-radius: 12px;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
}

.direccion h1 {
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1.5rem;
    color: #440707;
    text-align: center;
    text-align: left;
}

.direccion span {
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #440707;
    text-align: left;
}

.direccion td {
    width: 10%;
    /* background-color: aqua; */
    font-family: 'dm sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    color: #9B0E28;
    text-align: left;
    cursor: pointer;
    margin-left: 1%;
}

.direccion td:hover {
    color: #440707;
    transform: scale(1.1);
    transition: 0.3s;
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
    background-color: #FFFCF7;
    height: 55%;
    width: 85%;
    display: flex;
    flex-direction: column;
    font-family: "DM Sans", sans-serif;
    margin-top: 20%;
    margin-left: 9%;
}

.formulario input {
    border-radius: 50px;
    margin-bottom: 25px;
    font-size: 17px;
}

.formulario input::placeholder {
    font-family: "DM Sans", sans-serif;
}

.subtotal_pago {
    position: relative;
    background-color: #FFFCF7;
    height: 15%;
    width: 85%;
    display: flex;
    flex-direction: column;
    margin-top: 5%;
    border-radius: 12px;
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.15);
    margin-left: 9%;
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



.btnSubtotalPago{
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
</style>