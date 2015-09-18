function getApiData(url) {
  return getApiData[url] || (getApiData[url] = $.get(url));
}

function getFormData() {
  var data = {
    groups: []
  };
  var $form = $('.js--group-mapping');

  $form.find('.group').each(function(groupIndex, groupEl) {
    var $groupEl = $(groupEl);
    var groupData = {
      name: $groupEl.find('.group-name').val(),
      fields: []
    };

    $groupEl.find('.group-field').each(function(fieldIndex, fieldEl){
      var $fieldEl = $(fieldEl);
      var fieldData = {
        name: $fieldEl.find('.field-name').val(),
        resources: []
      };

      $fieldEl.find('.resource').each(function(resourceIndex, resourceEl) {
        var $resourceEl = $(resourceEl);
        fieldData.resources.push({
          name: $resourceEl.find('.js--resource').val(),
          read: $resourceEl.find('.js--read-fields').find(':checked').map(function(index, item){ return item.value; }).toArray(),
          update: $resourceEl.find('.js--update-fields').find(':checked').map(function(index, item){ return item.value; }).toArray()
        });
      });

      groupData.fields.push(fieldData);
    });

    data.groups.push(groupData);
  });

  return data;
}

function buildFormByData(data) {
  data =  data || {};
  var groups = data.groups || [];
  groups.forEach(function(item) {
    var $groupElement = buildGroupElement(item);
    $('.js--group-mapping .groups').append($groupElement);
  })
}

function buildGroupElement(data) {
  data = data || {};
  var fields = data.fields || [];
  var name = data.name + '';
  var $newBlock = $($('#group-block-tpl').html());
  $newBlock.find('.group-name').val(name);
  fields.forEach(function(item) {
    var $fieldElement = buildFieldElement(item);
    $newBlock.find('.groupFields').append($fieldElement);
  });
  return $newBlock;
}

function buildFieldElement(data) {
  data = data || {};
  var name = data.name + '';
  var resouces = data.resources || [];

  var $newBlock = $($('#groupField-block-tpl').html());
  $newBlock.find('.field-name').val(name);
  resouces.forEach(function(item) {
    var $resourceElement = buildResourceElement(item);
    $newBlock.find('.group-resources').append($resourceElement);
  });
  return $newBlock;
}

function buildResourceElement(data) {
  data = data || {};
  var resourceName = data.name;
  var readFields = data.read || [];
  var updateFields = data.update || [];
  var $newBlock = $($('#resource-block-tpl').html());
  getApiData(CONFIG.RESOURCES_URL).then(function(resources) {
    var html = '';
    resources.sort().forEach(function(item) {
      html += '<option>' + item + '</option>\n'
    });
    $newBlock.find('.resources-list').append($(html));
    if(resourceName) {
      var $resourceSelect = $newBlock.find('.js--resource');
      $resourceSelect.val(resourceName);
      updateResourceFields({target: $resourceSelect})
        .then(function(){
          var $readBlock = $newBlock.find('.js--read-fields');
          var $updateBlock = $newBlock.find('.js--update-fields');
          readFields.forEach(function(item) {
            $readBlock.find('[value="' + item + '"]').attr('checked', true);
          });
          updateFields.forEach(function(item) {
            $updateBlock.find('[value="' + item + '"]').attr('checked', true);
          });
        });
    }
  });
  return $newBlock;
}
