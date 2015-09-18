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
          read: $resourceEl.find('.js--read-fields').find(':checked').map(function(index, item){ return item.value; }),
          update: $resourceEl.find('.js--update-fields').find(':checked').map(function(index, item){ return item.value; })
        });
      });

      groupData.fields.push(fieldData);
    });

    data.groups.push(groupData);
  });

  return data;
}
