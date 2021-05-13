<template>

    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="fw-bold small me-3">{{user.username}}</span>
            <img class="user-img img-fluid rounded-circle" src="https://images.unsplash.com/photo-1589310766623-cb9c476330f9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />

        </a>

        <ul
            aria-labelledby="navbarDropdown"
            class="dropdown-menu">
            <li>
                <router-link :to="{name: 'Profile', params:{id: user._id}}" class="dropdown-item">
                    <i class="ri-map-pin-user-line"></i>
                    Profile</router-link>
            </li>
            <li>
                <a href="#" class="dropdown-item">
                    <i class="ri-tools-line"></i>
                    Settings</a>
            </li>

            <li><hr class="dropdown-divider"></li>

            <li>
                <a
                    @click="logout"
                    href="#" class="dropdown-item">
                    <i class="ri-logout-circle-line"></i>
                    Log out</a>
            </li>
        </ul>

    </li>

</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "UserDropdown",

        data(){
            return{

            }
        },
        computed:{
            ...mapGetters({
                user: 'auth/AppActiveUser'
            })
        },
        methods:{
            logout(){
                this.$store.commit('auth/LOGOUT')
                this.$router.push({name: 'Login'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user-img{
        width: 26px;
        height: 26px;
    }
</style>
