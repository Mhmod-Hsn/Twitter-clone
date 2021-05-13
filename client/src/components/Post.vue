<template>
  <div class="card my-5 shadow">
    <img
      @click="() => showImg(imgURL)"
      v-if="imgURL"
      class="card-img-top"
      :src="imgURL"
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 dir="auto" class="fw-bold">{{ post.text }}</h5>

      <router-link
        :to="{ name: 'Profile', params: { id: post.user.id } }"
        tag="span"
        class="small fw-bold text-decoration-none me-2"
        >{{ post.user.username }}</router-link
      >
      <i class="ri-checkbox-circle-fill text-primary" />

      <div v-if="post.tags">
        <span
          v-for="(tag, index) in post.tags"
          :key="index"
          class="badge rounded-pill bg-light text-dark"
          >{{ tag }}</span
        >
      </div>
    </div>
    <div class="card-footer">
      <div class="d-flex flex-row justify-content-between">
        <div class="d-flex flex-row">
          <span
            @click="like"
            class="like-btn"
            :class="isLiked ? 'text-primary' : ''"
          >
            <i :class="isLiked ? 'ri-heart-fill' : 'ri-heart-line'" />
            <span class="small ms-1 antialiased">{{
              item.likes.length || 0
            }}</span>
          </span>
        </div>
        <div class="w-max">
          <span class="">
            <i class="ri-time-line me-2"></i>
            <span class="text-xs ml-1 antialiased">{{
              getDateTime(item.createdAt)
            }}</span>
          </span>

          <span
            v-if="post.user.username === activeUser.username"
            @click="deletePost"
            class="text-danger delete-post"
          >
            <i class="ri-delete-bin-line"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Post",
  props: {
    post: {
      required: false,
    },
  },
  data() {
    return {
      item: this.post,
    };
  },
  computed: {
    ...mapGetters({
      activeUser: "auth/AppActiveUser",
    }),
    imgURL() {
      let img = this.post.postImage;
      if (img) {
        img = img.replaceAll(String.fromCharCode(92), "/");
        return `http://localhost:5000/${img}`;
      }
      return null;
    },
    isLiked() {
      return this.item.likes.indexOf(this.activeUser._id) > -1;
    },
  },
  methods: {
    getDateTime(dateTime) {
      // return 'xx'
      return (
        new Date(dateTime).toLocaleDateString() +
        " " +
        new Date(dateTime).toLocaleTimeString()
      );
    },
    like() {
      let usrIndex = this.item.likes.indexOf(this.activeUser._id);
      if (usrIndex != -1) {
        this.axios
          .put("posts/unlike", {
            postId: this.item._id,
          })
          .then((result) => {
            window.toast.fire("post unliked successfully");

            this.item.likes.splice(usrIndex, 1);
          })
          .catch((res) => {
            window.toast.fire({
              title: res.response.data,
              icon: "error",
            });
          });
      } else {
        this.axios
          .put("posts/like", {
            postId: this.item._id,
          })
          .then((result) => {
            window.toast.fire("post liked successfully");

            this.item.likes.push(this.activeUser._id);
          })
          .catch((res) => {
            window.toast.fire({
              title: res.response.data,
              icon: "error",
            });
          });
      }
    },

    deletePost() {
      window.swal
        .fire({
          title: "Are you sure",
        })
        .then((result) => {
          if (result.value) {
            this.$emit("deletePost", this.item);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.delete-post,
.like-btn {
  cursor: pointer;
}

.card-img-top {
  max-height: 300px;
  object-fit: cover;
}
</style>
