var mappingTemplate = {};


mappingTemplate.mappingList = [
    '<div class="text-center"><h2>Type Mappings</h2></div>',
    '<div class="span11 center-table">',

    '<table class="table table-bordered table-striped table-hover" id="indicesTable">',
    '<thead>',
    '<tr><th>Type</th><th>Index</th></tr>',
    '</thead>',
    '<tbody>',
    '<% _.each(maps, function(map) { %>',
    '<tr><td>',
    '<a href="#mappings/<%- map.indexId %>/<%- map.mappingName %>"  rel="tipRight" data-placement="bottom" data-title="Mapping Information"><%- map.mappingName %></a>',
    '</td><td><%- map.indexId %></td></tr>',
    '<% }); %>',
    '</tbody>',
    '</table>',
    '<div class="alert alert-info"><i class="icon-info-sign"></i> Only the basic mapping actions are available here. Power-users are advised to use the <a href="http://www.elasticsearch.org/guide/reference/api/admin-indices-put-mapping/" target="_blank">Mapping API</a> directly and read the <a href="http://www.elasticsearch.org/guide/reference/mapping/" target="_blank">Documentation</a>. </div>',
    '</div>'

].join("\n");

mappingTemplate.mapView = [
    '<div class="text-center"><h2>Index: <%- mapType.indexId %>, Type: <%- mapType.mappingName %></h2></div>',
    '<div class="span11 center-table">',

    '<table class="table table-bordered table-striped table-hover" id="indicesTable">',
    '<thead>',
    '<tr><th>Name</th><th>Type</th><th>Format</th><th>Store?</th></tr>',
    '</thead>',
    '<tbody>',
    '<% _.each(props, function(item, key, list) { %>',
    '<tr><td><%- key %></td>',
    '<td><%- item.type %></td>',
    '<td><%- item.format %></td>',
    '<td><%- item.store %></td></tr>',
    '<% }); %>',
    '</tbody>',
    '</table>'

].join("\n");