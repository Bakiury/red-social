<template>
  <div class="card" style="width: 18rem">
    <div
      class="cardHeader"
      @click="visitUser"
      title="Ver perfil de este usuario"
    >
      <img src="../assets/user.png" alt="Imagen del usuario" />
      <h3>{{ userData.use_name }} {{ userData.use_last_name }}</h3>
      <span class="myMsgVisit" v-html="msgVisit"></span>
    </div>
    <img
      src="../assets/background.jpg"
      class="card-img-top"
      alt="Imagen del post"
    />
    <div class="card-body">
      <h4 class="card-title">
        <u>{{ postData.pos_title }}</u>
      </h4>
      <p class="card-text">
        {{ postData.pos_description }}
      </p>
      <hr />
      <div class="d-flex justify-content-center">
        <a @click="myComment" class="btn btn-dark" v-html="msgComment"></a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import $ from "jquery";

export default defineComponent({
  name: "Comment",
  props: {
    userData: Object,
    postData: Object,
  },
  data: () => {
    return {
      msgComment: `Agregar comentario`,
      msgVisit: ``,
    };
  },
  methods: {
    myComment() {
      this.msgComment = `Próximamente <i class="fas fa-cog fa-spin"></i>`;
      setTimeout(() => {
        this.msgComment = `Agregar comentario`;
      }, 1500);
    },
    visitUser() {
      this.msgVisit = `Próximamente&nbsp;&nbsp;<i class="fas fa-cog fa-spin"></i>`;
      setTimeout(() => {
        this.msgVisit = ``;
      }, 1500);
    },
  },
  created: function () {
    $(".cardHeader").mouseenter(function () {
      $(".card").css("background", "#E5E5E5");
    });
    $(".cardHeader").mouseleave(function () {
      $(".card").css("background", "#ffffff");
    });
  },
});
</script>

<style scoped>
.cardHeader {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  cursor: pointer;
  border-radius: 15px 15px 0px 0px;
}

.cardHeader img {
  width: 50px;
}

.cardHeader h3 {
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-top: 10px;
}

.card {
  width: 100% !important;
  margin-bottom: 50px;
  box-shadow: 0px 0px 10px 0px #ffffff;
  border-radius: 15px;
}

.myMsgVisit {
  color: #198754;
  position: absolute;
  right: 10px;
  top: 5px;
}
</style>