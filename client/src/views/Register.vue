<template>
    <main class="d-flex justify-content-center  ">
        <div class="card mt-5 border-0 shadow position-relative">
            <div class="card-body">
                <form class="form-signin floating-form" @submit.prevent="submit">
                    <h1 class="h3 mb-3 fw-bold text-center my-2">Register</h1>

                    <div class="form-floating mb-3">
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="hsn">
                        <label for="username">Username</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="**********">
                        <label for="password">password</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="confirmPassword" type="password" class="form-control" id="confirmPassword" placeholder="**********">
                        <label for="confirmPassword">confirmPassword</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="email" type="email" class="form-control" id="email" placeholder="email@email.com">
                        <label for="email">email</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="firstname" type="text" class="form-control" id="firstname" placeholder="first name">
                        <label for="firstname">first name</label>
                    </div>

                    <div class="form-floating mb-3">
                        <input v-model="lastname" type="text" class="form-control" id="lastname" placeholder="last name">
                        <label for="lastname">last name</label>
                    </div>

                    <button class="w-100 btn btn btn-primary" type="submit">Register</button>
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
        name: "Register",
        components: {ContentLoader},
        data: () => {
            return {
                isLoading: false,
                username: "hsn1",
                email: "hsn1@gmail.com",
                password: "123123",
                confirmPassword: "123123",
                firstname: 'Mahmoud',
                lastname: 'Hassan',

            }
        },
        methods:{
            submit(){
                this.isLoading = true
                const formdata = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                    firstname: this.firstname,
                    lastname: this.lastname,
                }

                this.axios.post('users/register',formdata)
                    .then(result =>{
                        window.toast.fire("User registered successfully!")
                        this.$router.push({name: 'Login'})

                    })
                    .catch(res => {
                        window.toast.fire(
                            {
                                title: getFirstProperty(res.response.data),
                                icon: 'error'
                            }
                        )

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
