<template>
    <div class="profile   mx-auto ">
        <div>
            <div class="background bg-image bg-cover"
                 style="background-image:url(https://images.unsplash.com/photo-1559509547-cebb0e1da8da?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fGJsdWUlMjBza3l8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60)">
            </div>
            <div class="info px-5 d-flex justify-content-between  align-items-center">
                <div class=" ">
                    <div class="d-flex flex-md-row flex-column align-items-center">
                        <div
                            class="profile-img bg-image bg-cover rounded-circle bg-center border-3 border-light"
                             style="background-image:url(https://images.unsplash.com/photo-1589310766623-cb9c476330f9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fHBvdHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60)">
                        </div>
                        <div class="ms-4 ">
                            <h4 class="fw-bold my-0">{{user.username}}</h4>
                            <small>{{user.email}}</small>
                        </div>
                    </div>
                </div>
                <div
                    v-if="user.username !== activeUser.username"
                >
                    <button
                        @click="toggleFollow"
                        class="btn btn-info px-4 py-2 text-white fw-bold"
                    >
                        <span>{{isFollowed?'Unfollow':'Follow'}}</span>
                    </button>
                </div>
            </div>
        </div>

        <NewPost

            v-if="user.username === activeUser.username"
            @postAdded="postAdded"/>

        <Loader
            v-if="isLoading"
        />
        <div
            v-else
            class="posts container mx-auto row  px-3">
            <div class="col-xl-6 col-lg-7 col-md-8 col-sm-9 mx-auto">
                <Post
                    v-for="post in posts"
                    :key="post.id"
                    :post="post"
                    @deletePost="deletePost"
                />
            </div>
        </div>

    </div>

</template>


<script>
    import {mapGetters} from "vuex";

    import Post from "../components/Post";
    import Loader from "../components/Loader";
    import {getFirstProperty} from "../utils";
    import NewPost from "../components/NewPost";
    export default {
        name: "Profile",
        components: {NewPost, Loader, Post},
        props:['id'],
        data: () => {
            return {
                isLoading: true,

                user: {},
                posts: []
            }
        },
        computed:{
            ...mapGetters({
                activeUser: 'auth/AppActiveUser'
            }),
            isFollowed(){
                return this.activeUser.following.indexOf(this.id)>-1
            }
        },
        methods:{
            getUser(){
                this.axios.get(`users/${this.id}`)
                    .then(result => {
                        this.user = result.data
                    })
                    .catch(res => {
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
            },

            getPosts() {
                this.isLoading = true
                this.axios.get(`posts/user/${this.id}`)
                    .then(result => {
                        this.posts = result.data
                    })
                    .catch(res => {
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
            },

            postAdded(post){
                this.posts.unshift(post)
            },

            deletePost(item){

                let index = this.posts.indexOf(item);
                this.posts.splice(index,1)
                this.axios.delete(`posts/${item._id}`)
                    .then(result => {

                        let index = this.posts.indexOf(item);
                        this.posts.splice(index,1)

                        window.toast.fire({title: 'post deleted successfully'})
                    })
                    .catch(res => {
                        window.toast.fire(
                            {
                                title: getFirstProperty(res.response.data),
                                icon: 'error'
                            }
                        )

                    })
            },

            toggleFollow(){
                this.axios.post(`users/${this.isFollowed?'unfollow':'follow'}`,{userId: this.id})
                    .then(result => {
                        window.toast.fire(`${this.isFollowed?'unfollow':'follow'}ed successfully`)

                        this.$store.commit('auth/toggleFollow', this.id)
                    })
                    .catch(res => {
                        window.toast.fire(
                            {
                                title: getFirstProperty(res.response.data),
                                icon: 'error'
                            }
                        )

                    })
            }
        },
        mounted() {
            this.getUser()
            this.getPosts()
        }
    }
</script>


<style lang="scss" scoped>
.profile{
    .info{
        margin-top: -7rem;

        .profile-img{
            width: 140px;
            height: 140px;
            border-style: solid;
        }
    }
}
.background{
    height: 400px;
}
</style>
