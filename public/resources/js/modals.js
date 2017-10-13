"use strict"

$('.modal-dialog').draggable();

$('#imagesModal').on('shown.bs.modal', function(e){
  $('.imageButton').one('focus', function(e){
    $(this).blur();
  });
});
