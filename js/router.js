/*
 Copyright 2013 Roy Russo

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 Latest Builds: https://github.com/royrusso/elasticsearch-HQ
 */

var router;


$(document).ready(
    function ($) {


        var ElasticHQRouter = Backbone.Router.extend({

            routes:{
                "cluster":"cluster",
                "refreshCluster":"refreshCluster",
                "nodes":"nodes",
                "nodes/:nodeId":"nodes",
                "nodediagnostics":"nodeDiagnostics",
                "refreshNodeDiagnostics":"refreshNodeDiagnostics",
                "showhotthreads/:nodeId":"showhotthreads",
                "indices":"indices",
                "index/:indexId":"index",
                "refreshindexpoller/:indexId":"refreshIndexPoller",
                "mappings/:indexId/:mapName":"mappings",
                "mappings":"mappings",
                "admin":"admin",
                "admin/action":"admin",
                "viewsettings":"viewSettings",
                "visualize":"visualize",
                "*actions":"defaultRoute"
            },
            cluster:function () {
                stopAllPollers();
                clusterRoute.cluster();
            },
            refreshCluster:function () {
                router.navigate('cluster', true);
            },
            nodeDiagnostics:function () {
                stopAllNodePollers();
                nodeRoute.diagnoseNodes();
            },
            refreshNodeDiagnostics:function () {
                router.navigate('nodediagnostics', true);
            },
            nodes:function (nodeId) {
                stopAllNodePollers(); // why was i stopping all pollers? changed to only stop node poller.
                nodeRoute.nodeInfo(nodeId);
            },
            showhotthreads:function (nodeId) {
                var nodeHotThreads = new NodeHotThreadsModel({nodeId:nodeId, connectionRootURL:cluster.get("connectionRootURL")});
                nodeHotThreads.fetch({
                    success:function () {
                        var nodeHotThreadsView = new NodeHotThreadView({model:nodeHotThreads});
                        nodeHotThreadsView.render();
                    }
                });
            },
            indices:function () {
                stopAllNodePollers();
                indicesRoute.viewIndices();
            },
            index:function (indexId) {
                stopAllNodePollers();
                indexRoute.indexView(indexId);
            },
            refreshIndexPoller:function (indexId) {
                router.navigate('index/' + indexId, true);
            },
            mappings:function (indexId, mapName) {
                stopAllNodePollers();
                mapRoute.viewMappings(indexId, mapName);
            },
            viewSettings:function () {
                stopAllNodePollers();
                if (this.settingsView === undefined) {
                    this.settingsView = new SettingsView({model:settingsModel});
                }
                this.settingsView.render();
            },
            visualize:function () {
                stopAllNodePollers();
                visualRoute.init();
            }
            /*,
             defaultRoute:function () {
             stopAllNodePollers();
             console.log('defaultRoute');
             }*/
        });

        Backbone.history.start();
        router = new ElasticHQRouter();
    })
;