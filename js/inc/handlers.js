// Add field to group
function addGroupField() {
  var name = $.trim(prompt('Enter field name:'));
  if(!name) {
    return;
  }
  var $newBlock = $($('#groupField-block-tpl').html());
  $newBlock.find('.field-name').val(name);
  $newBlock.appendTo($('.groupFields'));
}

// Remove field from group
function removeGroupField(ev) {
  if(confirm('Are you sure?')){
    $(ev.target).parents('.group-field').remove();
  }
}

// Edit field name
function editFieldName(ev) {
  var $input = $(ev.target).parents('.group-field').find('.field-name');
  var currentName = $input.val();
  var name = $.trim(prompt('Enter new field name:', currentName));
  if(name) {
    $input.val(name);
  }
}

// Add resource to group field
function addFieldResource(ev) {
  var $fieldBlock = $(ev.target).parents('.group-field');
  $.get(CONFIG.RESOURCES_URL).then(function(resources) {
    var html = '';
    resources.sort().forEach(function(item) {
      html += '<option>' + item + '</option>\n'
    });
    var $newBlock = $($('#resource-block-tpl').html());
    $newBlock.find('.resources-list').append($(html));
    $newBlock.appendTo($fieldBlock.find('.group-resources'));
  });
}

// Update resource fields
function updateResourceFields(ev) {
  var resource = $(ev.target).val();
  var $resourceBlock = $(ev.target).parents('.resource');
  var url = CONFIG.RESOURCE_FIELDS_URL.replace('{{resource}}', resource);
  $.get(url).then(function(fields) {
    var html = '';
    fields.sort().forEach(function(item) {
      html += "<li><label><input type=\"checkbox\" value=\""+ item + "\"/>" + item + "</label></li>";
    });

    $resourceBlock
      .find('.js--read-fields, .js--update-fields').html(html)
      .parents('.input-group.hidden').removeClass('hidden');
  });
}
