<template>
  <div id="nav">
    <div class="navBox">
      <router-link to="/">Inicio</router-link>
      <router-link to="/user/profile">Perfil</router-link>
    </div>
  </div>
  <router-view />

  <footer class="footer">
    <div class="myBoth">
      <div class="myOneCol">
        <router-link to="/about">Sobre mi</router-link>
        <router-link to="/contact">Contáctame</router-link>
      </div>
      <div class="myTwoCol">
        <router-link to="/terms">Términos</router-link>
        <router-link to="/privacity">Privacidad</router-link>
      </div>
    </div>
    <div class="myThreeCol">
      <a target="_blank" href="https://www.facebook.com/"><i class="fab fa-facebook-square"></i></a>
      <a target="_blank" href="https://www.instagram.com/"><i class="fab fa-instagram"></i></a>
      <a target="_blank" href="https://www.snapchat.com/"><i class="fab fa-snapchat-ghost"></i></a>
      <a target="_blank" href="https://twitter.com/"><i class="fab fa-twitter"></i></a>
      <a target="_blank" href="https://www.youtube.com/"><i class="fab fa-youtube"></i></a>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App"
});
</script>

<style scoped>
#nav {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background: #30c530;
  box-shadow: 0px 2px 5px 0px #34495e;
}

.navBox {
  display: flex;
  justify-content: space-around;
  width: 380px;
  font-size: 18px;
  margin-right: 50px;
}

#nav a {
  text-decoration: none;
  color: #ffffff;
  border-radius: 10px;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
}

#nav a:hover {
  background: #ffffff;
  color: #30c530;
  transition: all .3s ease;
}

.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #30c530;
  position: relative;
  bottom: 0px;
  height: 100px;
  width: 100%;
  box-shadow: 0px -2px 5px 0px #34495e;
}

.myBoth {
  display: flex;
  justify-content: center;
}

.myOneCol, .myTwoCol {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.myOneCol a, .myTwoCol a, .myThreeCol a {
  text-decoration: none;
  color: #ffffff;
}

.myOneCol a:hover, .myTwoCol a:hover, .myThreeCol a:hover {
  color: #34495e;
  transition: all .3s ease;
}

.myThreeCol {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 250px;
  margin-right: -100px;
}

.myThreeCol a {
  font-size: 20px;
}
</style>
