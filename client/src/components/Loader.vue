<template>
    <div class="mx-auto my-4 position-relative d-flex flex-column justify-content-center align-items-center">
        <div class="loader-dots d-block position-relative">
            <div class="position-absolute top-0 mt-1  rounded-circle bg-info"></div>
            <div class="position-absolute top-0 mt-1  rounded-circle bg-info"></div>
            <div class="position-absolute top-0 mt-1  rounded-circle bg-info"></div>
            <div class="position-absolute top-0 mt-1  rounded-circle bg-info"></div>
        </div>
        <div class="text-black-50 small fw-light mt-4 text-center">
            Please wait...
        </div>
    </div>

</template>

<script>
    export default {
        name: "Loader",

        data: () => {
            return {}
        }
    }
</script>

<style scoped>
    .loader-dots{
        transform: translateX(-50px);
    }
    .loader-dots div {
        width: 1rem;
        height: 1rem;

        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .loader-dots div:nth-child(1) {
        left: 8px;
        animation: loader-dots1 0.6s infinite;
    }
    .loader-dots div:nth-child(2) {
        left: 8px;
        animation: loader-dots2 0.6s infinite;
    }
    .loader-dots div:nth-child(3) {
        left: 32px;
        animation: loader-dots2 0.6s infinite;
    }
    .loader-dots div:nth-child(4) {
        left: 56px;
        animation: loader-dots3 0.6s infinite;
    }
    @keyframes loader-dots1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
    @keyframes loader-dots3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }
    @keyframes loader-dots2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(24px, 0);
        }
    }
</style>
