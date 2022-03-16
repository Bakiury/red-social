<template>
  <h4>Buscar a alguien</h4>
  <input
    type="text"
    placeholder="Filtrar por el nombre de la persona"
    class="mySearch form-control"
    v-model="text"
    @keyup="procesarInput()"
  />
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Searcher",
  data: () => {
    return {
      text: "",
      allPosts: [],
      postsFiltered: [],
    };
  },
  methods: {
    async procesarInput() {
      try {
        const post = await axios.get("http://localhost:3000/posts/all", {
          withCredentials: true,
        });

        this.allPosts = post.data;

        const postsByName = this.allPosts.filter((element) =>
          (element.pos_use_id.use_name + element.pos_use_id.use_last_name)
            .replace(/ /g, "")
            .toLowerCase()
            .includes(this.text.replace(/ /g, "").toLowerCase())
        );

        this.postsFiltered = postsByName;
        this.$emit("forChild", this.postsFiltered); // Pass to father
        // console.log(this.postsFiltered);
      } catch (e) {
        console.log(e);
      }
    },
    handleKeyup() {
      this.$emit("keyup");
    },
  },
});
</script>

<style scoped>
h4 {
  position: fixed;
  right: 25px;
  top: 100px;
  color: #ffffff;
  width: 280px;
  text-align: center;
}

.mySearch {
  width: 280px;
  top: 130px;
  right: 25px;
  padding-top: 10px;
  position: fixed;
  border-radius: 25px;
  text-align: center;
  border: 1px dotted #333333;
  box-shadow: 0px 0px 5px 0px #ffffff;
}
</style>