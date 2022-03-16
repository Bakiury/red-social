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
  <router-view class="myBody" />
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
          { withCredentials: true }
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
.myBody {
  font-family: "Baloo 2", cursive;
  background: #3d3c3c;
  background: -webkit-linear-gradient(to right, #3d3c3c, #141414);
  background: linear-gradient(to right, #3d3c3c, #141414);
}

#nav {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: rgba(255, 234, 167, 1);
  font-family: "Baloo 2", cursive;
  position: sticky;
  top: 0;
  box-shadow: 0px 1px 5px 0px #ffffff;
  z-index: 1;
}

.sectionLogo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: default;
}

.sectionLogo:hover, #nav a:active {
  transform: scale(.98);
  transition: all .3s ease;
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
  width: 400px;
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

#signOut {
  background: #c06060 !important;
  color: rgba(255, 234, 167, 1) !important;
  cursor: pointer;
}

#signOut:hover {
  background: #be4040 !important;
  transition: all 0.3s ease;
}
</style>
