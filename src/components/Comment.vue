<template>
  <div class="card" style="width: 18rem">
    <div class="cardHeader">
      <img src="../assets/user.png" alt="Imagen del usuario" />
      <h3>{{ userData.use_name }} {{ userData.use_last_name }}</h3>
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
        <a href="#" class="btn btn-dark">Agregar comentario</a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Comment",
  props: {
    userData: Object,
    postData: Object,
  },
  data: () => {
    return {};
  },
});
</script>

<style scoped>
.cardHeader {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
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
</style>