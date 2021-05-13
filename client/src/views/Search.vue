<template>
    <div class="profile text-white  mx-auto ">


        <Loader
            v-if="isLoading"
        />

        <div
            v-else
            class="feeds container mx-auto row  px-3">
            <div class="col-xl-6 col-lg-7 col-md-8 col-sm-9 mx-auto">
                <Post
                    v-for="feed in feeds"
                    :key="feed.id"
                    :feed="feed"
                />
            </div>
        </div>



    </div>

</template>


<script>
    import Post from "../components/Post";
    import Loader from "../components/Loader";
    export default {
        name: "Search",
        components: {Loader, Post},
        props:['q'],
        data: () => {
            return {
                isLoading: false,

                feeds: [
                    {
                        id: 1,
                        title: 'LOREM, IPSUM DOLOR SIT AMET ELIT FOURE CONSECTETUR ADIPISICING.',
                        user: 'Agnezmo Tuginem',
                        time: new Date(),
                        likes: 26,
                        isLiked: false
                    },
                    {
                        id: 2,
                        title: 'LOREM, IPSUM DOLOR SIT AMET ELIT FOURE CONSECTETUR ADIPISICING.',
                        user: 'Agnezmo Tuginem',
                        time: new Date(),
                        likes: 26,
                        isLiked: false
                    },
                    {
                        id: 3,
                        title: 'LOREM, IPSUM DOLOR SIT AMET ELIT FOURE CONSECTETUR ADIPISICING.',
                        user: 'Agnezmo Tuginem',
                        time: new Date(),
                        likes: 26,
                        isLiked: false
                    },
                    {
                        id: 4,
                        title: 'LOREM, IPSUM DOLOR SIT AMET ELIT FOURE CONSECTETUR ADIPISICING.',
                        user: 'Agnezmo Tuginem',
                        time: new Date(),
                        likes: 26,
                        isLiked: false
                    },
                    {
                        id: 5,
                        title: 'LOREM, IPSUM DOLOR SIT AMET ELIT FOURE CONSECTETUR ADIPISICING.',
                        user: 'Agnezmo Tuginem',
                        time: new Date(),
                        likes: 26,
                        isLiked: false
                    },
                ]
            }
        },
        methods:{

        },
        mounted() {
            console.log(this.$route.query.q)
        }
    }
</script>


<style lang="scss" scoped>
.profile{
    .info{
        margin-top: -2rem;

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
