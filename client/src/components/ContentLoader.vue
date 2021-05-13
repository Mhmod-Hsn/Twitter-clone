<template>
    <div class="content-loader">
        <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ContentLoader",

        data: () => {
            return {

            }
        }
    }
</script>

<style scoped>
.content-loader{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(255,255,255,0.2);
    backdrop-filter: blur(5px);

    user-select: none;

    cursor: wait;

}
</style>
