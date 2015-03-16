// Summon options localStorage demons
chrome.runtime.sendMessage({summon: 'demons'}, function(demons) {
  openHellGate(demons);
});

function openHellGate(demon) {
  if (!demon) {
    return;
  }

  var demonURL = 'https://www.google.com/search?q=david+hasselhoff&espv=2&biw=1440&bih=801&source=lnms&tbm=isch&sa=X&ei=6q8FVeiDIsi6ggTbtoOQCQ&ved=0CAYQ_AUoAQ&dpr=2';
  var $html    = $('html');
  var $body    = $('body');
  var $images  = $('img');

  // Standard Hasselhoff redirect
  if (demon.hassel_direct && window.location.href !== demonURL) {
    window.location = demonURL;
  }

  // Remove entire DOM
  if (demon.delete_dom) {
    $html.remove();
  }

  // Rotate images slightly
  if (demon.rotate_images) {
    $images.addClass('demon-rotate');
  }

  // Invert page
  if (demon.invert_page) {
    $html.addClass('demon-invert');
  }

  // Lower page contrast overtime.
  if (demon.lower_contrast) {
    $('*').addClass('demon-medium-animation demon-lower-contrast');
  }

  // Play Creed. I'm sorry.
  if (demon.play_creed) {
    $body
      .append('<iframe class="demon-creed" width="0" height="0" src="https://www.youtube.com/embed/tHgosv5e5aM?autoplay=1" frameborder="0" allowfullscreen></iframe>')
      .find('.demon-creed')
      .css('opacity', '0');
  }

  // Remove all vowels
  if (demon.remove_vowels) {
    var $p = $('p');

    var replace = $p.text().replace(/[aeiou]/ig,'');
    $p.text(replace);
  }

  // Rotate page overtime
  if (demon.rotate_overtime) {
    $body.addClass('demon-long-animation demon-rotate-major');
  }

  // Alert user of all key inputs
  if (demon.input_alerts) {
    $('body').append('<div class="demon-modal"><span class="close">Close</span><div class="content"></div></div><div class="demon-overlay"></div>');

    var $demonModal   = $('.demon-modal');
    var $demonOverlay = $('.demon-overlay');

    $('input[type="text"]').on('keyup', function() {
      var $this = $(this);

      $this.blur();
      $demonModal.find('.content').text($this.val());
      $demonModal.show();
      $demonOverlay.show();
    });

    $demonModal.find('.close').on('click', function() {
      $demonModal.hide();
      $demonOverlay.hide();
    });
  }
}