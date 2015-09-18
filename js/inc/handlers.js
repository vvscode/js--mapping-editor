// Add field to group
function addGroup(ev) {
  var name = $.trim(prompt('Enter group name:'));
  if(!name) {
    return;
  }
  $(ev.target)
    .parents('.js--group-mapping')
    .find('.groups')
    .append(buildGroupElement({
      name: name
    }));
}

// Add field to group
function addGroupField(ev) {
  var name = $.trim(prompt('Enter field name:'));
  if(!name) {
    return;
  }

  $(ev.target)
    .parents('.group')
    .find('.groupFields')
    .append(buildFieldElement({
      name: name
    }));
}

// Remove field from group
function removeGroupField(ev) {
  if(confirm('Are you sure?')){
    $(ev.target).parents('.group-field').remove();
  }
}

// Remove field from group
function removeGroup(ev) {
  if(confirm('Are you sure?')){
    $(ev.target).parents('.group').remove();
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
  var name = $.trim(prompt('Enter field name:'));
  if(!name) {
    return;
  }

  $(ev.target)
    .parents('.group-field')
    .find('.group-resources')
    .append(buildResourceElement({
      name: name
    }));
}

// Update resource fields
function updateResourceFields(ev) {
  var resource = $(ev.target).val();
  var $resourceBlock = $(ev.target).parents('.resource');
  var url = CONFIG.RESOURCE_FIELDS_URL.replace('{{resource}}', resource);
  return getApiData(url).then(function(fields) {
    var html = '';
    fields.sort().forEach(function(item) {
      html += "<li><label><input type=\"checkbox\" value=\""+ item + "\"/>" + item + "</label></li>";
    });

    $resourceBlock
      .find('.js--read-fields,.js--update-fields').html(html);
    $resourceBlock.find('.input-group.hidden').removeClass('hidden');
  });
}

// Remove resource
function removeResource(ev) {
  if(confirm("Are you sure?")) {
    $(ev.target).parents('.resource').remove();
  }
}

// send group settings to server
function saveMapping() {
  localStorage.setItem('mapping', JSON.stringify(getFormData()));
  return;
  $.ajax({
    method: "POST",
    url: CONFIG.SAVE_MAPPING_URL,
    data: JSON.stringify(getFormData())
  }).then(function(){
    alert('Saved');
  })
}

// send group settings to server
function restoreMapping() {
  var mappingData = {};
  try {
    mappingData = JSON.parse(localStorage.getItem('mapping'));
  } catch (e) {};
  buildFormByData(mappingData);
}
