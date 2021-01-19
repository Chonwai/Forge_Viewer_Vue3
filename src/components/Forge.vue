<template>
    <div class="relative">
        <div class="w-full h-full" id="forge-viewer"></div>
    </div>
</template>

<script>
export default {
    name: 'ForgeComponent',
    data() {
        return {};
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.showForge();
        },
        showForge() {
            var viewer;
            var options = {
                env: 'AutodeskProduction',
                api: 'derivativeV2', // for models uploaded to EMEA change this option to 'derivativeV2_EU'
                getAccessToken: async function (onTokenReady) {
                    var token = process.env.VUE_APP_Access_Token;
                    var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
                    await onTokenReady(token, timeInSeconds);
                },
            };

            window.Autodesk.Viewing.Initializer(options, () => {
                var htmlDiv = document.getElementById('forge-viewer');
                viewer = new window.Autodesk.Viewing.GuiViewer3D(htmlDiv);
                var documentId = process.env.VUE_APP_Document_ID;
                window.Autodesk.Viewing.Document.load(
                    documentId,
                    viewerDocument => {
                        var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
                        viewer.loadDocumentNode(viewerDocument, defaultModel);
                    },
                    this.onDocumentLoadFailure
                );
                var startedCode = viewer.start();
                const model = viewer.model;
                console.log(viewer.impl.getRenderProxy(model, 'ADN-200019'));
                if (startedCode > 0) {
                    console.error('Failed to create a Viewer: WebGL not supported.');
                    return;
                }
                console.log('Initialization complete, loading a model next...');
            });
        },
    },
};
</script>

<style scoped>
#forge-viewer {
    width: 100%;
    height: 100%;
    background-color: #f0f8ff;
}
</style>
