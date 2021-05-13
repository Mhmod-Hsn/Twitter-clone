<template>
    <div class="posts   mx-auto px-3">

        <NewPost />

        <Loader
                v-if="isLoading"
        />

        <div
                v-else
                class="posts container mx-auto row  px-3">
            <div class="col-xl-6 col-lg-7 col-md-8 col-sm-9 mx-auto">
                <div
                        v-if="posts.length "
                >
                    <Post
                        v-for="post in posts"
                        :key="post.id"
                        :post="post"
                        @deletePost="deletePost"
                    />
                </div>

                <Loader v-else/>
            </div>
        </div>

    </div>
</template>

<script>

    import Post from "../components/Post";
    import Loader from "../components/Loader";
    import {getFirstProperty} from "../utils";
    import NewPost from "../components/NewPost";

    export default {
        name: "posts",
        components: {NewPost, Loader, Post},
        data: () => {
            return {
                isLoading: false,
                posts: []
            }
        },

        mounted() {
            this.getPosts()
        },

        methods: {
            deletePost(item) {
                let index = this.posts.indexOf(item);
                alert(index)
                this.posts.splice(index, 1);
                window.toast.fire('deleted')
            },


            getPosts() {

                this.axios.get('posts/following')
                    .then(result => {
                        console.log({result})

                        this.posts = result.data
                    })
                    .catch(res => {
                        alert('catch ')
                        window.toast.fire(
                            {
                                title: getFirstProperty(res.response.data),
                                icon: 'error'
                            }
                        )

                    })
                    .finally(_ => {
                        this.isLoading = false
                    })

            }
        }
    };
</script>
