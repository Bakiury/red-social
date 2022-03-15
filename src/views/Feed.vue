<template>
  <section id="myFeed">
    <h2>
      Hola <span class="myBadge">{{ userSession }}</span>
      <Searcher @forChild="postsFiltered" />
    </h2>

    <section class="myContent">
      <div v-for="post in allPosts" :key="post.pos_id">
        <Comment
          :userName="post.pos_use_id.use_name"
          :userLastName="post.pos_use_id.use_last_name"
        />
      </div>
    </section>
    <!-- <button @click="testing()" class="btn btn-primary">testing</button> -->
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
      userSession: "",
      allPosts: [],
    };
  },
  methods: {
    postsFiltered(value) {
      this.allPosts = value;
    },
    async dataUserSession() {
      try {
        const user = await axios.get("http://localhost:3000/users/auth_user", {
          withCredentials: true,
        });

        this.userSession = user.data.use_name;
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
  overflow: hidden;
  min-height: 100vh;
}

#myFeed h2 {
  color: #ffffff;
  position: relative;
  font-size: 20px;
  left: 20px;
  top: 40px;
}

#myFeed .myBadge {
  background: #fd746c;
  background: -webkit-linear-gradient(to right, #ced6e6, #99a7bb);
  background: linear-gradient(to right, #ced6e6, #99a7bb);
  color: #606e86;
  padding: 0px 10px;
  border-radius: 30px;
}

.myContent {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  width: 600px;
  margin-top: 12px;
}
</style>