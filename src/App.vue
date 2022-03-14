<template>
  <div id="nav">
    <div class="sectionLogo">
      <div class="myLogo">
        <img src="./assets/user.png" alt="Logo" />
      </div>
      <h1>Red Social</h1>
    </div>
    <div class="navBox">
      <router-link to="/feed" title="Ir a inicio"
        ><i class="fas fa-home"></i>&nbsp;&nbsp;Inicio</router-link
      >
      <router-link to="/profile" title="Ir a mi perfil"
        ><i class="fas fa-user"></i>&nbsp;&nbsp;Perfil</router-link
      >
      <a id="signOut" class="mx-2" title="Cerrar Sesión" @click="logOutUser()"
        ><i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;Cerrar Sesión</a
      >
    </div>
  </div>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "App",
  data: () => {
    return {};
  },
  methods: {
    async logOutUser() {
      try {
        const user = await axios.post(
          "http://localhost:3000/users/logout",
          "",
          { "Content-Type": "application/json", withCredentials: true }
        );
        this.$swal({
          position: "top-end",
          icon: "success",
          title: "¡Se ha cerrado la sesión!",
          showConfirmButton: false,
          timer: 1500,
        });

        this.$router.push({ name: "LogIn" });
      } catch (e) {
        console.log(e);
      }
    },
  },
});
</script>

<style scoped>
#nav {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: rgba(255, 234, 167, 1);
  box-shadow: 0px 1px 5px 0px #333333;
  font-family: "Baloo 2", cursive;
}

.sectionLogo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}

.sectionLogo h1 {
  font-size: 28px;
  margin-left: 5px;
  position: relative;
  top: 5px;
  text-shadow: 1px 1px 3px #333333;
}

.myLogo {
  width: 54px;
}

.myLogo img {
  width: 100%;
  border-radius: 50%;
  box-shadow: 0px 0px 3px #333333;
}

.navBox {
  display: flex;
  justify-content: space-around;
  width: 500px;
  font-size: 18px;
  margin-right: 50px;
}

#nav a {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #333333;
  border-radius: 10px;
  padding: 5px 15px;
  text-shadow: 1px 1px 1px #333333;
}

#nav i {
  text-shadow: 1px 1px 1px #333333;
}

#nav a:hover {
  background: #333333;
  color: rgba(255, 234, 167, 1);
  transition: all 0.3s ease;
}

#signOut:hover {
  background: #c06060 !important;
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
