<template>
  <input
    type="text"
    placeholder="Buscar publicaciones por nombre de usuario"
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
.mySearch {
  width: 350px;
  top: 40px;
  padding-top: 10px;
  position: absolute;
}
</style>