<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div class="container">


            <router-link :to="{name:'Home'}" class="navbar-brand" href="#"><i class="ri-home-4-line"></i></router-link>


            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>


            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link
                            :to="{name: 'Posts'}"
                            class="nav-link"
                            :active-class="'fw-bold'"
                        >
                            <i class="ri-book-open-line"></i> Follows
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            :to="{name: 'About'}"
                            class="nav-link"
                            :active-class="'fw-bold'"
                        >
                            <i class="ri-information-line"></i>
                            About
                        </router-link>
                    </li>

                </ul>
                <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                    <NavbarSearch/>
                </ul>
                <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                    <li
                        v-if="!user"
                        class="nav-item">
                        <router-link
                            :to="{name: 'Login'}"
                            class="nav-link"
                            :active-class="'fw-bold'"
                        >
                            <i class="ri-login-circle-line"></i> Login
                        </router-link>
                    </li>

                    <li
                        v-if="!user"
                        class="nav-item">
                        <router-link
                            :to="{name: 'Register'}"
                            class="nav-link"
                            :active-class="'fw-bold'"
                        >
                            <i class="ri-user-add-line"></i> Register
                        </router-link>
                    </li>

                    <UserDropdown v-if="user"/>
                </ul>
            </div>
        </div>
    </nav>

</template>

<script>
    import {mapGetters} from 'vuex'
    import UserDropdown from "./UserDropdown";
    import NavbarSearch from "./NavbarSearch";
    export default {
        name: "Navbar",
        components: {NavbarSearch, UserDropdown},
        data: () => {
            return {
                showNavbar: true
            }
        },
        computed:{
            ...mapGetters({
                user: 'auth/AppActiveUser'
            })
        },
        watch:{
        }
    }
</script>

<style lang="scss" scoped>
</style>
