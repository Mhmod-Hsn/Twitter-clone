<template>
  <div v-if="activeUser" id="new-post" class="posts container mx-auto row mt-3">
    <div class="col-xl-6 col-lg-7 col-md-8 col-sm-9 mx-auto">
      <img :src="previewImage" class="img-fluid mb-4" v-if="post.postImage" />
      <textarea
        dir="auto"
        v-model="post.text"
        placeholder="Say something..."
        class="form-control"
      />

      <div class="tags-input mt-3">
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Type a tags then click enter"
          @keydown.enter="addTag"
        />

        <span
          v-for="(tag, index) in post.tags"
          :key="index"
          @click="post.tags.splice(index, 1)"
          class="badge rounded-pill bg-light text-dark"
          >{{ tag }}</span
        >
      </div>

      <input hidden ref="fileInput" type="file" @input="pickFile" />

      <div class="d-flex justify-content-between">
        <button @click="selectImage" class="btn btn-dark fw-bold px-4 my-2">
          Upload image
        </button>
        <button
          :disabled="!post.text && !post.postImage"
          @click="submitPost"
          class="btn btn-primary fw-bold px-4 my-2"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirstProperty } from "../utils";
import { mapGetters } from "vuex";

export default {
  name: "NewPost",
  data: () => {
    return {
      previewImage: null,
      post: {
        tags: ["test"],
      },
    };
  },
  computed: {
    ...mapGetters({
      activeUser: "auth/AppActiveUser",
    }),
  },
  methods: {
    addTag(e) {
      const val = e.target.value;
      if (!val || this.post.tags.indexOf(val) !== -1) return;

      this.post.tags.push(e.target.value);
      e.target.value = "";
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile(e) {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        console.log(file[0]);
        this.post.postImage = file[0];

        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },

    submitPost() {
      let data = new FormData();

      if (this.post.text) data.append("text", this.post.text);

      if (this.post.postImage) data.append("postImage", this.post.postImage);

      if (this.post.tags) data.append("tags", this.post.tags);

      this.axios
        .post("posts/add", data)
        .then((result) => {
          window.toast.fire("post added successfully");
          this.post = {
            tags: [],
          };
          this.previewImage = null;

          console.log(result.data);
          this.$emit("postAdded", result.data);
        })
        .catch((res) => {
          window.toast.fire({
            title: getFirstProperty(res.response.data),
            icon: "error",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.imagePreviewWrapper {
  width: 150px;
  height: 150px;
  cursor: pointer;
  margin: 0 auto 10px;
  background-size: cover;
  background-position: center center;
  border: 2px solid #ddd;
  border-radius: 5px;
}

.badge {
  cursor: pointer;

  &:hover {
    background-color: var(--bs-danger) !important;
    color: white !important;
  }
}
</style>
