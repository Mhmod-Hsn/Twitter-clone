<template>
</template>

<script>
    export default {
        name: "TagsInput",
        props: ['value'],

        data: () => {
            return {
                tags: [],
                currentTag: ''
            }
        },
        methods:{
        },
        watch: {
/*            tags: {
                handler(val, oldVal) {
                    console.log({val})
                    this.$emit('input', this.tags)

                },
                deep: true
            }*/
        }
    }
</script>

<style scoped>

</style>
