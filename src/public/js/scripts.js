$('#btn-like').click(function(e) {
  e.preventDefault();
  var imageId = $(this).data('id');
  
  // Actualizar likes
  $.post('/images/'+ imageId + '/like')
    .done(function(data) {
      $('.likes-count').text(data.likes);
    })
    .fail(function(error) {
      console.log(error);
    });
});