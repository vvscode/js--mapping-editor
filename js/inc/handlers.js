function addGroupField() {
  var name = $.trim(prompt('Enter field name:'));
  if(!name) {
    return;
  }
  var $newBlock = $($('#groupField-block-tpl').html());
  $newBlock.find('.field-name').val(name);
  $newBlock.appendTo($('.groupFields'));
}


function removeGroupField(ev) {
  $(ev.target).parents('.group-field').remove()
}

function editFieldName(ev) {
  var $input = $(ev.target).parents('.group-field').find('.field-name');
  var currentName = $input.val();
  var name = $.trim(prompt('Enter new field name:', currentName));
  if(name) {
    $input.val(name);
  }
}
