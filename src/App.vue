<template>
    <div>
        <img alt="Vue logo" src="./assets/logo.png" />
        <div id="forgeViewer"></div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
export default {
    name: 'App',
    components: {},
    created() {
        console.log(window);
        console.log(process.env.VUE_APP_Access_Token);
        var viewer;
        var options = {
            env: 'AutodeskProduction',
            api: 'derivativeV2', // for models uploaded to EMEA change this option to 'derivativeV2_EU'
            getAccessToken: function (onTokenReady) {
                var token = process.env.VUE_APP_Access_Token;
                var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
                onTokenReady(token, timeInSeconds);
            },
        };

        window.Autodesk.Viewing.Initializer(options, function () {
            var htmlDiv = document.getElementById('forgeViewer');
            viewer = new window.Autodesk.Viewing.GuiViewer3D(htmlDiv);
            var startedCode = viewer.start();
            if (startedCode > 0) {
                console.error('Failed to create a Viewer: WebGL not supported.');
                return;
            }

            console.log('Initialization complete, loading a model next...');
        });
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
