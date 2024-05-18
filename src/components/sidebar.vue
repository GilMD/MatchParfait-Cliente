<template>
    <div id="app">
      <aside class="Sidebar">
        <router-link to="/home" class="Sidebar__Logo center">
          <img src="@/assets/img/LOGO.png" height="85px" alt="Logo" />
        </router-link>
        <ul>
          <li>
            <a href="#" class="Sidebar__Search">
              <img class="negative" src="@/assets/img/search_FILL0_wght400_GRAD0_opsz24.svg" height="50px" alt="Search" />
            </a>
          </li>
          <li>
            <router-link to="/cart" class="Sidebar__Cart">
              <img src="@/assets/img/cesta_ico.png" height="50px" alt="Cart" />
            </router-link>
          </li>
          <li>
            <router-link to="/wishlist" class="Sidebar__Cart">
              <img src="@/assets/img/wish_list_solid.svg" height="50px" alt="Cart" />
            </router-link>
          </li>
        </ul>
        <router-link to="/user" class="Sidebar__User center">
          <img class="negative" src="@/assets/img/circle-user-solid.svg" height="40px" alt="User" />
        </router-link>
      </aside>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'Sidebar',
  }
  </script>
  
  <style lang="scss">
  * {
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #f00d38;
    overflow: hidden;
  }
  
  #app {
    width: 95.8%;
    
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  .Sidebar {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center; /* Cambiado para centrar los elementos */
    justify-content: space-between; /* Distribuye el espacio entre los elementos */
    width: 3.7%; /* Puedes ajustar esto según necesites */
    height: 100%;
    padding: 20px 10px; /* Ajustado para mejor apariencia */
    border-right: 1px solid black;
    
    transition: 0.3s;
}

.Sidebar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.Sidebar li {
    margin-bottom: 20px; /* Añadido margen entre los elementos de la lista */
}

.Sidebar li a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%; /* Añadido para ajustar el ancho */
}

.Sidebar li img {
    margin-left: 0; /* Ajustado el margen */
}

.center {
    justify-self: center;
    align-self: center;
}

.negative {
    filter: invert(100%);
}
  </style>