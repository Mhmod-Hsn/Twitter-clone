<template>
    <div class="d-flex">
        <input
                v-model="text"
                class="form-control bg-transparent   me-2" type="search" placeholder="Search" aria-label="Search">
        <button
                :disabled="!text"
                @click="submitSearch"
                class="btn btn-outline-dark"
        >Search</button>
    </div>
</template>

<script>
    import {getFirstProperty} from "../utils";

    export default {
        name: "NavbarSearch",

        data: () => {
            return {
                text: ''
            }
        },
        methods:{
            submitSearch(){
                this.axios.post('users/search', {text: this.text})
                    .then(result => {
                        this.text = ''
                        this.$router.push({name: 'Profile', params:{id: result.data.userId}})
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
        }
    }
</script>

<style scoped>

</style>
