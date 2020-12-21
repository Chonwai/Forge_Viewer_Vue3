<template>
    <div class="forge-component-main">
        <div id="forge-viewer"></div>
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
    mounted() {},
    methods: {
        init() {
            var viewer;
            var options = {
                env: 'AutodeskProduction',
                api: 'derivativeV2', // for models uploaded to EMEA change this option to 'derivativeV2_EU'
                getAccessToken: async function (onTokenReady) {
                    var token =
                        'eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIiwiZGF0YTpjcmVhdGUiLCJidWNrZXQ6Y3JlYXRlIiwiYnVja2V0OnVwZGF0ZSIsImJ1Y2tldDpyZWFkIl0sImNsaWVudF9pZCI6IjNIRzBwQWNmTXBCd0hRMjB0M29HN0RpbnhQTDB3Nm1HIiwiYXVkIjoiaHR0cHM6Ly9hdXRvZGVzay5jb20vYXVkL2p3dGV4cDYwIiwianRpIjoiY0NhWW5tQ0JkSDZmOVYwM2hHVWlFSmc0c0dYSFpLSWk1Z2p4VXhzOVN5b0hXbjl6Q1lvQVFhU3dFaUFxZXZyayIsImV4cCI6MTYwODU0MjEzNH0.DyjxolnJHLdCSPPBAfA_fer_LZWKRVOVQJ8TgLaiJ7E';
                    var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
                    await onTokenReady(token, timeInSeconds);
                },
            };

            window.Autodesk.Viewing.Initializer(options, () => {
                var htmlDiv = document.getElementById('forge-viewer');
                viewer = new window.Autodesk.Viewing.GuiViewer3D(htmlDiv);
                var documentId =
                    'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDIwLTEyLTIxLTA4LTE1LTQ3LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL1JvYm90QXJtLmR3Zng';
                window.Autodesk.Viewing.Document.load(
                    documentId,
                    viewerDocument => {
                        var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
                        viewer.loadDocumentNode(viewerDocument, defaultModel);
                    },
                    this.onDocumentLoadFailure
                );
                var startedCode = viewer.start();
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
    margin: 0;
    background-color: #f0f8ff;
}
</style>
