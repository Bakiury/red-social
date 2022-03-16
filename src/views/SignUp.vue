<template>
  <section class="contact-box">
    <div class="myRegister">
      <div class="myBox text-center">
        <img src="../assets/user.png" alt="logo" />
      </div>

      <div>
        <div class="container align-self-center p-6">
          <h1 class="font-weight-bold mb-3 text-center">Crea tu cuenta</h1>
          <p class="text-muted mb-2 text-center">
            Ingresa la siguiente información para registrarte.
          </p>

          <form v-on:submit.prevent="createUser">
            <div class="row">
              <div class="col-6">
                <div class="form-group mb-3">
                  <label class="font-weight-bold">
                    Nombre
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.use_name"
                    placeholder="Ingrese su nombre"
                  />
                </div>

                <div class="form-group mb-3">
                  <label class="font-weight-bold">
                    Apellido
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.use_last_name"
                    placeholder="Ingrese su apellido"
                  />
                </div>

                <div class="form-group mb-3">
                  <label class="font-weight-bold">
                    Email
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="user.use_email"
                    placeholder="Ingrese su email"
                  />
                </div>

                <div class="form-group mb-3">
                  <label class="font-weight-bold">
                    Contraseña
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.use_password"
                    placeholder="Ingrese su contraseña"
                  />
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-3">
                  <label class="font-weight-bold">
                    Foto Perfil
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.use_profile_image"
                    placeholder="Ingrese su foto de perfil"
                  />
                </div>

                <div class="form-group mb-3">
                  <label class="font-weight-bold">
                    Fecha de nacimiento
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="user.use_birthday"
                    placeholder="Ingrese su fecha de nacimiento"
                  />
                </div>

                <div class="form-group mb-3">
                  <label class="font-weight-bold">
                    Descripción
                    <span class="text-danger">*</span>
                  </label>
                  <textarea
                    cols="30"
                    rows="4"
                    class="form-control mt-2"
                    v-model="user.use_description"
                    placeholder="Ingrese su descripción"
                  ></textarea>
                </div>
              </div>

              <br />

              <div class="form-group mb-5">
                <div class="form-check d-flex justify-content-center">
                  <input class="form-check-input mx-2" type="checkbox" />
                  <label class="form-check-label text-muted">
                    Al seleccionar esta casilla aceptas nuestro aviso de
                    privacidad y los términos y condiciones
                  </label>
                </div>
              </div>

              <div class="d-flex">
                <button class="btn btn-primary">
                  <router-link to="/logIn" class="nav-link text-white"
                    >Volver</router-link
                  >
                </button>
                <button class="btn btn-success" type="submit">
                  Regístrate
                </button>
              </div>
            </div>
          </form>

          <small class="d-inline-block text-muted mt-5"
            >Todos los derechos reservados | © 2022 Bakiury</small
          >
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { defineComponent } from "vue";
import $ from "jquery";
import axios from "axios";

export default defineComponent({
  name: "SignUp",
  data: () => {
    return {
      user: {
        use_name: "",
        use_last_name: "",
        use_email: "",
        use_password: "",
        use_profile_image: "",
        use_birthday: "",
        use_description: "",
      },
    };
  },
  methods: {
    cleanFields() {
      this.user.use_name = "";
      this.user.use_last_name = "";
      this.user.use_email = "";
      this.user.use_password = "";
      this.user.use_profile_image = "";
      this.user.use_birthday = "";
      this.user.use_description = "";
    },
    async createUser() {
      try {
        if (
          !this.user.use_name.trim() ||
          !this.user.use_last_name.trim() ||
          !this.user.use_email.trim() ||
          !this.user.use_password.trim() ||
          !this.user.use_profile_image.trim() ||
          !this.user.use_birthday.trim() ||
          !this.user.use_description.trim()
        ) {
          this.$swal({
            icon: "warning",
            title: "Oops...",
            text: "Faltan datos por llenar",
          });
        } else {
          const user = await axios.post("http://localhost:3000/users", {
            use_name: this.user.use_name.trim(),
            use_last_name: this.user.use_last_name.trim(),
            use_email: this.user.use_email.trim(),
            use_password: this.user.use_password.trim(),
            use_profile_image: this.user.use_profile_image.trim(),
            use_birthday: this.user.use_birthday.trim(),
            use_description: this.user.use_description.trim(),
          });

          if (user.status === 201) {
            this.$swal({
              position: "top-end",
              icon: "success",
              title: "¡Usuario registrado exitosamente!",
              showConfirmButton: false,
              timer: 1500,
            });
            this.cleanFields();
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    hideNav: () => {
      let myPath = window.location.pathname.split("/")[2].toLowerCase();
      if (myPath === "signup") {
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
.contact-box {
  position: absolute;
  background-image: url("../assets/background.jpg");
  background-size: cover;
  width: 100%;
}

.myRegister {
  padding: 50px;
  background-color: rgba(255, 234, 167, 0.8) !important;
}

.text-muted {
  color: #555555 !important;
}

.myBox {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.myBox img {
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 2px 3px #ffffff;
  border-radius: 50%;
}

button {
  margin: 0 auto;
  width: 400px;
}

small {
  position: relative;
  transform: translate(-50%);
  left: 50%;
}
</style>
