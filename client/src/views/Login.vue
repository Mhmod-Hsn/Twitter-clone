<template>
    <main class="d-flex justify-content-center  ">
        <div class="card mt-5 border-0 shadow position-relative">
            <div class="card-body">
                <form class="form-signin floating-form" @submit.prevent="submit">
                    <h1 class="h3 mb-3 fw-bold text-center my-2">Log in</h1>

                    <div class="form-floating mb-3">
                        <input v-model="email" type="email" class="form-control" id="email" placeholder="hsn">
                        <label for="email">email</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="**********">
                        <label for="password">password</label>
                    </div>

                    <div class="input-group mb-3">
                        <div class="">
                            <input id="remember" class="form-check-input me-2" type="checkbox">
                            <label for="remember">Remember me</label>
                        </div>
                    </div>

                    <button class="w-100 btn btn btn-primary" type="submit">Login</button>
                </form>
            </div>

            <ContentLoader v-if="isLoading"/>
        </div>
    </main>
</template>

<script>
    import ContentLoader from "../components/ContentLoader";
    import {getFirstProperty} from "../utils";
    export default {
        name: "Login",
        components: {ContentLoader},
        data: () => {
            return {
                isLoading: false,
                email: "hsn@gmail.com",
                password: "123123",

            }
        },
        methods:{
            submit(){
                this.isLoading = true
                const formdata = {
                    email: this.email,
                    password: this.password,
                }

                this.axios.post('users/login',formdata)
                    .then(result =>{
                        if(result.data.success) {
                            window.toast.fire("Success!");

                            this.$store.commit('auth/SET_BEARER', result.data.token)
                            this.$store.commit('auth/UPDATE_USER_INFO', result.data.user)
                            this.$router.push({name: 'Home'})
                        }

                    })
                    .finally(_=>{
                        this.isLoading = false
                    })
            }
        }

    }
</script>

<style lang="scss" scoped>
.form-signin{
    width: 400px;
    max-width: 100%;
}
</style>
