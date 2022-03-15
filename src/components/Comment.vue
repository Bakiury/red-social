<template>
  <div class="card" style="width: 18rem">
    <div class="cardHeader">
      <img src="../assets/user.png" alt="Imagen del usuario" />
      <h4>{{ userName }}  {{ userLastName }}</h4>
    </div>
    <img
      src="../assets/background.jpg"
      class="card-img-top"
      alt="Imagen del post"
    />
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Comment",
  props: {
    userName: String,
    userLastName: String,
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

.cardHeader h4 {
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