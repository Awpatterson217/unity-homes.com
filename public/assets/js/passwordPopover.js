let pwTemplate = '';
pwTemplate += '8-20 characters<br />';
pwTemplate += '1 uppercase <br />';
pwTemplate += '1 lowercase <br />';
pwTemplate += '1 number <br />';

const options = {
    container: 'body',
    placement: 'left',
    content: pwTemplate,
    animation: true,
    trigger: 'focus',
    html: true
  };

$(window).on('load', function() {
    $('#password').popover(options);
});
