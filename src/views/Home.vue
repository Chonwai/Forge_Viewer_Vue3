<template>
    <div class="home p-4">
        <img alt="Vue logo" src="../assets/logo.png" />
        <div class="">
            <button class="p-4">A</button>
            <button class="p-4">B</button>
            <Forge />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Forge from '../components/Forge';

export default {
    name: 'Home',
    components: {
        Forge,
    },
};
</script>
