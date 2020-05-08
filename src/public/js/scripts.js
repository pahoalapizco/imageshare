$('#post-comment').hide();

$('#btn-toggle-comment').click(e => {
  e.preventDefault();
  $('#post-comment').slideToggle();
});

$('#btn-like').click(function(e) {
  e.preventDefault();
  const imageId = $(this).data('id');
  
  // Actualizar likes
  $.post(`/images/${imageId}/like`)
    .done(function(data) {
      $('.likes-count').text(data.likes);
    })
    .fail(function(error) {
      console.log(error);
    });
});

$('#btn-delete').click(function(e) {
  e.preventDefault();
  let $this = $(this);
  const response = confirm('Esta seguro que desea eliminar esta imagen?');

  if(response) {
    const imageId = $this.data('id');
    $.ajax({
      url: `/images/${imageId}`,
      type: 'DELETE'
    })
    .done(function(result) {
      if(result) {
        $(location).attr('href', 'http://localhost:3000/');
      }
    });
  }
});