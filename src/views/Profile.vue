<template>
  <section class="contact-box">
    <div class="myRegister">
      <div class="myBox text-center">
        <img src="../assets/user.png" alt="logo" />
      </div>

      <div>
        <div class="container align-self-center p-6">
          <h1 class="font-weight-bold mb-3 text-center">Editar perfil</h1>
          <p class="text-muted mb-2 text-center">
            Modifica los datos que sean necesarios.
          </p>

          <form v-on:submit.prevent="updateUser">
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
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    class="changePass w-100"
                    title="Cambiar tu contraseña"
                    type="button"
                  >
                    Cambiar contraseña
                  </button>
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

              <div class="d-flex mt-4">
                <button class="btn btn-primary">
                  <router-link to="/feed" class="nav-link text-white"
                    >Volver</router-link
                  >
                </button>
                <button class="btn btn-success" type="submit">Guardar</button>
              </div>
            </div>
          </form>

          <small class="d-inline-block text-muted mt-5"
            >Todos los derechos reservados | © 2022 Bakiury</small
          >
        </div>
      </div>
    </div>

    <!-- Modal Change Password -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header w-100">
            <h5 class="modal-title" id="exampleModalLabel">
              <b>Cambio de contraseña</b>
            </h5>
            <a
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></a>
          </div>
          <div class="modal-body">
            <div class="w-100">
              <div class="d-flex">
                <b class="text-center">Nueva Contraseña&nbsp;</b>
                <input
                  type="password"
                  class="form-control"
                  v-model="user.use_password"
                  placeholder="Ingrese la nueva contraseña"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-end">
            <a
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </a>
            &nbsp;
            <a class="btn btn-success" @click="savePass">Cambiar</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin Modal Change Password -->
  </section>
</template>

<script>
import { defineComponent } from "vue";
// import $ from "jquery";
import axios from "axios";

export default defineComponent({
  name: "Profile",
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
    async savePass() {
      try {
        if (!this.user.use_password.trim()) {
          this.$swal({
            icon: "warning",
            title: "Oops...",
            text: "Favor llenar los campos",
          });
        } else {
          const user = await axios.patch(
            `http://localhost:3000/users/change_password/${this.user.use_id}`,
            { use_password: this.user.use_password.trim() },
            { withCredentials: true }
          );

          if (user.status === 201 || user.status === 200) {
            this.$swal({
              position: "top-end",
              icon: "success",
              title: "¡Contraseña actualizada!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getCurrentUser() {
      try {
        const curentUser = await axios.get(
          "http://localhost:3000/users/auth_user",
          {
            withCredentials: true,
          }
        );

        this.user = curentUser.data;
      } catch (e) {
        console.log(e);
      }
    },
    async updateUser() {
      try {
        if (
          !this.user.use_name.trim() ||
          !this.user.use_last_name.trim() ||
          !this.user.use_email.trim() ||
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
          const user = await axios.patch(
            `http://localhost:3000/users/${this.user.use_id}`,
            {
              use_name: this.user.use_name.trim(),
              use_last_name: this.user.use_last_name.trim(),
              use_email: this.user.use_email.trim(),
              use_profile_image: this.user.use_profile_image.trim(),
              use_birthday: this.user.use_birthday.trim(),
              use_description: this.user.use_description.trim(),
            },
            { withCredentials: true }
          );

          if (user.status === 201 || user.status === 200) {
            this.$swal({
              position: "top-end",
              icon: "success",
              title: "¡Usuario actualizado exitosamente!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  created: function () {
    this.getCurrentUser();
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
  background-color: rgba(255, 255, 255, 0.5) !important;
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

.changePass {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 14px;
  background: #333333;
  color: #ffffff;
}

.changePass:hover {
  color: #ffffff;
  background: #444444;
}
</style>