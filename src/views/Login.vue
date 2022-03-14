<template>
  <div class="all">
    <div class="main-section">
      <div class="modal-content">
        <div class="user-img">
          <img src="../assets/user.png" />
        </div>
        <form class="" v-on:submit.prevent="signInUser" autocomplete="off">
          <div class="form-group" id="user-group">
            <div>
              <i class="fas fa-user"></i>
            </div>
            <input
              id="myUser"
              type="text"
              class="form-control"
              v-model="user.use_email"
              placeholder="Email"
              name="username"
              ref="myUser"
            />
          </div>
          <div class="form-group">
            <div>
              <i class="fas fa-lock"></i>
            </div>
            <input
              id="myPass"
              type="password"
              class="form-control"
              v-model="user.use_password"
              placeholder="Contraseña"
              name="password"
            />
          </div>
          <button type="submit" class="btn">
            <i class="fas fa-sign-in-alt"></i> Ingresar
          </button>
        </form>
        <div class="col-12 forgot">
          <router-link to="/user/signUp" class="nav-link active"
            >No tienes una cuenta registrate aqui</router-link
          >
        </div>
        <div
          th:if="${param.error}"
          v-if="msgWrongPass"
          class="alert alert-danger"
          role="alert"
        >
          Credenciales incorrectas.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import $ from "jquery";
import axios from "axios";

export default defineComponent({
  name: "Login",
  data: () => {
    return {
      user: {
        use_email: "",
        use_password: "",
      },
      msgWrongPass: false,
    };
  },
  components: {},
  methods: {
    cleanFields() {
      this.user.use_email = "";
      this.user.use_password = "";
    },
    autoFocus() {
      // Autofocus on input
      this.$nextTick(function () {
        this.myUser = "";
        setTimeout(() => {
          this.$refs.myUser.focus();
        }, 2000);
      });
    },
    async signInUser() {
      try {
        const user = await axios.post(
          "http://localhost:3000/users/login",
          {
            use_email: this.user.use_email,
            use_password: this.user.use_password,
          },
          { "Content-Type": "application/json", withCredentials: true }
        );

        if (user.status === 201) {
          this.$swal({
            position: "top-end",
            icon: "success",
            title: "¡Las credenciales son correctas!",
            showConfirmButton: false,
            timer: 1500,
          });

          this.$router.push({ name: "Feed" });
        }
      } catch (e) {
        this.$swal({
          position: "top-end",
          icon: "error",
          title: "Credenciales incorrectas",
          showConfirmButton: false,
          timer: 1500,
        });
        this.cleanFields();
        this.autoFocus();
      }
    },
    hideNav: () => {
      let myPath = window.location.pathname.split("/")[1].toLowerCase();
      if (myPath === "login") {
        $("#nav").hide();
      }
    },
  },
  created: function () {
    this.hideNav();
  },
});
</script>

<style scoped>
.all {
  position: absolute;
  background-image: url("../assets/background.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
  font-family: "Baloo 2", cursive;
}

.main-section {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  text-align: center;
}

.modal-content {
  background-color: rgba(255, 234, 167, 0.8);
  padding: 0 56px;
  width: 385px;
  box-shadow: 0px 0px 2px 3px #ffffff;
  border-radius: 20px;
}

.user-img {
  margin-top: -50px;
  margin-bottom: 35px;
}

.user-img img {
  width: 100px;
  height: 100px;
  box-shadow: 0px 0px 2px 3px #ffffff;
  border-radius: 50%;
}

.form-group input {
  height: 42px;
  font-size: 18px;
  border: 0;
  padding: 25px;
  padding-left: 60px;
  border-radius: 5px;
  color: #34495e;
  font-weight: bold;
  margin-bottom: 25px;
  background-color: #ffffff;
}

.form-group div {
  background: #333333;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color: #ffffff;
}

button {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #333333;
  color: #ffffff;
}

button:hover {
  color: #ffffff;
  background: #444444;
}

.forgot {
  padding: 5px 0;
}

.forgot a {
  font-size: 14px;
  font-style: italic;
  font-weight: bold;
  color: #333333;
}

.forgot a:hover {
  color: #444444;
}
</style>
