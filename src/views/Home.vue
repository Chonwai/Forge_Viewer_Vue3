<template>
    <div class="home p-4">
        <div class="p-4 flex justify-center">
            <Forge class="w-3/4 h-80vh" />
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
