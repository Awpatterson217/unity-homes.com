"use strict"

$('.modal-dialog').draggable();

$('#imagesModal').on('shown.bs.modal', function(e){
  $('.imageButton').one('focus', function(e){
    $(this).blur();
  });
});

$('#settingsModal').on('shown.bs.modal', function(e){
  $('.settingsButton').one('focus', function(e){
    $(this).blur();
  });
});
