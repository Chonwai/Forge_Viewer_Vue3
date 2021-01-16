<template>
    <div class="relative">
        <div class="p-2">
            <input class="m-2 p-1 border" type="text" placeholder="Width" />
            <input class="m-2 p-1 border" type="text" placeholder="Height" />
            <button class="m-2 p-1 border" type="submit">Update!</button>
        </div>
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
                    var token =
                        'eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJzY29wZSI6WyJjb2RlOmFsbCIsImRhdGE6d3JpdGUiLCJkYXRhOnJlYWQiLCJidWNrZXQ6Y3JlYXRlIiwiYnVja2V0OmRlbGV0ZSIsImJ1Y2tldDpyZWFkIl0sImNsaWVudF9pZCI6IjNIRzBwQWNmTXBCd0hRMjB0M29HN0RpbnhQTDB3Nm1HIiwiYXVkIjoiaHR0cHM6Ly9hdXRvZGVzay5jb20vYXVkL2p3dGV4cDYwIiwianRpIjoid0dpOU5iN2hqazdtY1BsV3llUXhmSXZ0Um42Z0tpMkZtbVNRZFc1WmZ1QXZMZzdrNDBmQUM0TE5nWWdrWTE3byIsImV4cCI6MTYxMDYxODA3MH0.4eQpGMub0b_YgdGXYB9zM6T5kP0Fh0AHx5VQ026gKro';
                    var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
                    await onTokenReady(token, timeInSeconds);
                },
            };

            window.Autodesk.Viewing.Initializer(options, () => {
                var htmlDiv = document.getElementById('forge-viewer');
                viewer = new window.Autodesk.Viewing.GuiViewer3D(htmlDiv);
                var documentId =
                    'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZWRpc29uX2J1Y2tldC91cGRhdGVfYm94LmlwdA';
                window.Autodesk.Viewing.Document.load(
                    documentId,
                    viewerDocument => {
                        var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
                        viewer.loadDocumentNode(viewerDocument, defaultModel);
                    },
                    this.onDocumentLoadFailure
                );
                var startedCode = viewer.start();
                // const model = viewer.model;
                // console.log(viewer.impl.getRenderProxy(model, 'ADN-200019'));
                if (startedCode > 0) {
                    console.error('Failed to create a Viewer: WebGL not supported.');
                    return;
                }
                // console.log('Initialization complete, loading a model next...');
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
