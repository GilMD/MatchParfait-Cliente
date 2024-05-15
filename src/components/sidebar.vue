<template>
    <div>
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
  
  body {
    background-color: #f00d38;
    overflow: hidden;
  }
  
  #app {
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
    align-items: flex-start;
    justify-content: center;
    width: 80px;
    height: 100%;
    padding: 40px 10px 30px 10px;
    border-right: 1px solid black;
    transition: 0.3s;
  
    ul {
      list-style-type: none;
      width: 0px;
      margin: auto;
  
      li {
        a {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
  
          img {
            margin-left: -40px;
          }
        }
      }
    }
  }
  
  .center {
    justify-self: center;
    align-self: center;
  }
  
  .negative {
    filter: invert(100%);
  }
  </style>