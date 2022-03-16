<template>
  <section id="myFeed">
    <h2>
      <span
        ><u>Bienvenid@</u>
        <p>{{ userSession.name }}</p>
      </span>
    </h2>

    <Searcher @forChild="postsFiltered" />

    <i
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="cleanFields"
      class="fas fa-plus-circle"
      title="Nueva publicación"
    ></i>

    <section class="myContent">
      <div v-for="post in allPosts" :key="post.pos_id">
        <Comment :userData="post.pos_use_id" :postData="post" />
      </div>
    </section>

    <!-- Modal Create -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <b>Agregar una publicación</b>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex justify-content-center">
            <div class="w-75">
              <div
                class="d-flex justify-content-center align-items-center mb-3"
              >
                <b>Título:&nbsp;</b>
                <input
                  class="form-control"
                  type="text"
                  v-model="this.pos_title"
                  placeholder="Ingrese un título"
                />
              </div>
              <div class="d-flex justify-content-center align-items-center">
                <b>Imagen:&nbsp;</b>
                <input
                  class="form-control"
                  type="text"
                  v-model="pos_image"
                  placeholder="Ingrese la imagen"
                />
              </div>
              <br />
              <div class="d-flex justify-content-center align-items-center">
                <b>Descripción:&nbsp;</b>
                <textarea
                  rows="4"
                  class="form-control"
                  v-model="pos_description"
                  placeholder="Ingrese una descripción"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button class="btn btn-success" @click="createPost">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin Modal Create -->
  </section>
</template>

<script>
import { defineComponent } from "vue";
import Comment from "@/components/Comment.vue";
import Searcher from "@/components/Searcher.vue";
import $ from "jquery";
import axios from "axios";

export default defineComponent({
  name: "Feed",
  components: {
    Comment,
    Searcher,
  },
  data: () => {
    return {
      userSession: {},
      allPosts: [],
      pos_title: "",
      pos_image: "",
      pos_description: "",
    };
  },
  methods: {
    postsFiltered(value) {
      this.allPosts = value;
    },
    cleanFields() {
      this.pos_title = "";
      this.pos_image = "";
      this.pos_description = "";
    },
    async dataUserSession() {
      try {
        const user = await axios.get("http://localhost:3000/users/auth_user", {
          withCredentials: true,
        });

        this.userSession = { name: user.data.use_name, id: user.data.use_id };
      } catch (e) {
        console.log(e);
      }
    },
    async createPost() {
      try {
        if (
          !this.pos_title.trim() ||
          !this.pos_image.trim() ||
          !this.pos_description.trim()
        ) {
          this.$swal({
            icon: "warning",
            title: "Oops...",
            text: "Faltan datos por llenar",
          });
        } else {
          const post = await axios.post(
            "http://localhost:3000/posts",
            {
              pos_use_id: this.userSession.id,
              pos_title: this.pos_title.trim(),
              pos_image: this.pos_image.trim(),
              pos_description: this.pos_description.trim(),
            },
            {
              withCredentials: true,
            }
          );

          if (post.status === 201) {
            this.$swal({
              position: "top-end",
              icon: "success",
              title: "¡Publicación realizada exitosamente!",
              showConfirmButton: false,
              timer: 1500,
            });
            this.cleanFields();
            this.getAllPosts();
            $("#exampleModal").modal("hide");
            $(".mySearch").val("");
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getAllPosts() {
      try {
        const post = await axios.get("http://localhost:3000/posts/all", {
          withCredentials: true,
        });

        this.allPosts = post.data;
      } catch (e) {
        console.log(e);
      }
    },
    showNav: () => {
      let myPath = window.location.pathname.split("/")[1].toLowerCase();
      if (myPath === "feed") {
        $("#nav").show();
      }
    },
  },
  created: function () {
    this.showNav();
    this.dataUserSession();
    this.getAllPosts();
  },
});
</script>

<style scoped>
#myFeed {
  overflow: auto;
  min-height: 100vh;
}

#myFeed p {
  margin-top: 10px;
}

#myFeed h2 {
  color: #ffffff;
  position: fixed;
  display: flex;
  text-align: center;
  align-items: center;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 30px;
  border-radius: 15px;
  padding-top: 15px;
  border: 2px dotted #ffffff;
  box-shadow: 0px 0px 5px 0px #ffffff;
}

.myContent {
  display: flex;
  margin: 0 auto;
  padding-top: 20px;
  justify-content: center;
  flex-direction: column;
  width: 600px;
  margin-top: 12px;
}

.fa-plus-circle {
  color: #333333;
  font-size: 50px;
  position: fixed;
  cursor: pointer;
  transform: translate(-50%);
  left: 50%;
  top: 10px;
  background-color: rgba(255, 234, 167, 1);
  border-radius: 50%;
  border: 2px solid #333333;
  z-index: 2;
}

.fa-plus-circle:hover {
  background-color: #333333;
  color: rgba(255, 234, 167, 1);
  border: 2px solid #333333;
  transition: all 0.5s ease;
}

.modal-content {
  width: 99%;
}

.modal-header, .modal-footer {
  background: rgba(255, 234, 167, 1) !important;
}

.modal-body {
  background: #444444!important;
  color: #ffffff;
}
</style>