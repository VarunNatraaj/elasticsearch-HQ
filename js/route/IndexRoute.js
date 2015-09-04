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

var indexRoute = {};

/***
 * Abandon all hope, ye who enters here.
 *
 * @param indexId
 */
indexRoute.indexView = function (indexId) {
    var indexStatsModel = new IndexStatsModel({connectionRootURL:cluster.get("connectionRootURL"), indexId:indexId});
    var indexStatusModel = new IndexStatusModel({connectionRootURL:cluster.get("connectionRootURL"), indexId:indexId});
    var indexHealthModel = new IndexHealthModel({connectionRootURL:cluster.get("connectionRootURL"), indexId:indexId});
    var indexAliasModel = new IndexAliasModel({connectionRootURL:cluster.get("connectionRootURL"), indexId:indexId});

    indexStatusModel.fetch({
        success:function (model, response) {

            var polloptions = {delay:settingsModel.get('settings').poller.index};
            indexPoller = Backbone.Poller.get(indexStatusModel, polloptions);
            indexPoller.start();
            indexPoller.on('success', function (indexStatusModel) {
                ajaxloading.show();
                $.when(indexStatsModel.fetch(), indexHealthModel.fetch(), indexAliasModel.fetch())
                    .done(function () {
                        var indexView = new IndexView({indexId:indexId, model:indexStatsModel, statusModel:indexStatusModel, healthModel:indexHealthModel, aliasModel:indexAliasModel});
                        indexView.render();
                    });
                ajaxloading.hide();
            });
        }
    });
};