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

  // Standard Hasselhoff Redirect
  if (demon.hassel_direct && window.location.href !== demonURL) {
    window.location = demonURL;
  }

  // Remove Entire DOM
  if (demon.delete_dom) {
    $html.remove();
  }

  // Rotate Images Slightly
  if (demon.rotate_images) {
    $images.addClass('demon-rotate');
  }

  // Invert Page
  if (demon.invert_page) {
    $html.addClass('demon-invert');
  }

  // Play Creed. I'm sorry.
  if (demon.play_creed) {
    $body.html('<iframe width="420" height="315" src="https://www.youtube.com/embed/tHgosv5e5aM?autoplay=1" frameborder="0" allowfullscreen></iframe>')
  }

  // Remove All Vowels
  if (demon.remove_vowels) {
    var $p = $('p');

    var replace = $p.text().replace(/[aeiou]/ig,'');
    $p.text(replace);
  }

  // Rotate Page Overtime
  if (demon.rotate_overtime) {
    $body.addClass('demon-long-animation demon-rotate-major');
  }

  // Alert User of Key Inputs
  if (demon.input_alerts) {
    $('body').append('<div class="demon-modal"><span class="close">Close</span><div class="content"></div></div><div class="demon-overlay"></div>');

    var $demonModal   = $('.demon-modal');
    var $demonOverlay = $('.demon-overlay');

    $('input[type="text"]').on('keyup', function() {
      $demonModal.find('.content').text($(this).val());
      $demonModal.show();
      $demonOverlay.show();
    });

    $demonModal.find('.close').on('click', function() {
      $demonModal.hide();
      $demonOverlay.hide();
    });
  }
}