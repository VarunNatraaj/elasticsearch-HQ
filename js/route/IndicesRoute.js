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

var indicesRoute = {};

indicesRoute.viewIndices = function () {

    // reset the index tab to default
    activeTab = 'indexTab';

    var indexStatusModel = new IndicesStatusModel();
    indexStatusModel.setConnectionRootURL(cluster.get("connectionRootURL"));
    var clusterStateModel = new ClusterState({connectionRootURL:cluster.get("connectionRootURL")});

    indexStatusModel.fetch({
        success:function (model, response) {

            var polloptions = {delay:settingsModel.get('settings').poller.indices};
            indicesPoller = Backbone.Poller.get(indexStatusModel, polloptions);
            indicesPoller.start();
            indicesPoller.on('success', function (indexStatusModel) {
                ajaxloading.show();
                $.when(clusterStateModel.fetch())
                    .done(function () {
                        //cluster.set("clusterState", clusterStateModel);
                        var indexListView = new IndexStatusListView({model:indexStatusModel, clusterStateModel: clusterStateModel});
                        indexListView.render();
                    });
                ajaxloading.hide();
            });
        }
    });

};