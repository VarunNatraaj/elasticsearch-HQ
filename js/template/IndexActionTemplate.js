var indexActionTemplate = {};

indexActionTemplate.createIndex = [
    '<div class="span8 center-table">',

    '<form class="form-horizontal" id="createIndexForm">',
    '<fieldset>',
    '<div id="legend">',
    '<legend class="">Create an Index</legend>',
    '</div>',
    '<div class="control-group">',
    '<label class="control-label"  for="indexId">Index ID</label>',
    '<div class="controls">',
    '<input type="text" id="indexId" name="indexId" placeholder="" class="input-xlarge"  data-error-style="inline">',
    '</div>',
    '</div>',

    '<div class="control-group">',
    '<label class="control-label" for="shards"># Shards</label>',
    '<div class="controls">',
    '<input type="text" id="shards" name="shards" placeholder="" class="input-mini"  data-error-style="inline">',
    '</div>',
    '</div>',
    '<div class="control-group">',
    '<label class="control-label" for="replicas"># Replicas</label>',
    '<div class="controls">',
    '<input type="text" id="replicas" name="replicas" placeholder="" class="input-mini"  data-error-style="inline">',
    '</div>',
    '</div>',

    '<div class="control-group">',
    '<div class="controls">',
    '<button type="submit" id="createIndexSubmit" class="btn btn-success">Create</button>',
    '<a href="#indices" class="btn">Cancel</a>',
    '</div>',
    '</div>',
    '</fieldset>',
    '</form>',

    '</div>'
].join("\n");

indexActionTemplate.defaultModal = [
    '<div class="modal hide fade" id="defaultindexmodal">',
    '<div class="modal-header">',
    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>',
    '<h3><%- title %></h3>',
    '</div>',
    '<div class="modal-body">',
    '<p>Response from Server is... </p>',
    '<pre class="prettyprint linenums language-json">',
    '<%- res %>',
    '</pre>',
    '</div>',
    '<div class="modal-footer">',
    '<a href="#" class="btn" data-dismiss="modal">Close</a>',
    '</div>',
    '</div>'
].join("\n");