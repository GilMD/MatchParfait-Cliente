<template>
  <div id="app">
    <aside class="Sidebar">
      <router-link to="/home" class="Sidebar__Logo">
        <img src="@/assets/img/LOGO.png" alt="Logo" />
      </router-link>
      <div class="sidebar_items">
        <li>
          <router-link to="/search" class="Sidebar__search">
            <img class="negative" src="@/assets/img/icons/search.svg" alt="Search" />
          </router-link>
        </li>
        <li>
          <router-link to="/cart" class="Sidebar__Cart">
            <img src="@/assets/img/icons/basket.svg" alt="Cart" />
          </router-link>
        </li>
        <li>
          <router-link to="/wishlist" class="Sidebar__Cart">
            <img src="@/assets/img/wish_list_solid.svg" alt="Cart" />
          </router-link>
        </li>
      </div>
      <router-link to="/user" class="Sidebar__User">
        <img class="negative" src="@/assets/img/icons/user.svg" alt="User" />
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

html,
body {
  height: 99vh;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #f00d38;
  overflow-y: hidden;
}

body::-webkit-scrollbar {
  width: .5vh;
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
  // background-color: aquamarine;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Cambiado para centrar los elementos */
  justify-content: space-between;
  /* Distribuye el espacio entre los elementos */
  width: 3.7%;
  /* Puedes ajustar esto según necesites */
  height: 100%;
  // padding: 20px 10px; /* Ajustado para mejor apariencia */
  // border-right: 1px solid black;
  transition: 0.3s;
}

.Sidebar__Logo {
  margin-top: 20px;
  /* Añadido margen superior */
  width: 100%;
  height: 10%;
  margin-left: 8%;
}

.Sidebar__Logo img {
  width: 100%;
  height: 100%;
}



.sidebar_items {
  // background-color: aqua;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 25%;
  align-items: center;
  gap: 1vh;
  justify-content: space-evenly;
  margin-bottom: 50%;
  margin-left: 8%;
  
}

.sidebar_items li {
  width: 90%;
  height: 20%;
  // background-color: bisque;
  list-style: none;
  display: flex;
  justify-content: center;
 
  
}

.sidebar_items li img {
  width: 90%;
  height: 90%;
  object-fit: contain;
}

.Sidebar__User {
  // background-color: blueviolet;
  margin-bottom: 20px;
  /* Añadido margen inferior */
  width: 75%;
  height: 9%;
  align-items: center;
  margin-left: 8%;
}

.Sidebar__User img {
  width: 100%;
  height: 100%;
}
</style>