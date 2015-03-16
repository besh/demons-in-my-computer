(function($) {
  var $checkbox     = $('input[type="checkbox"]');
  var $demonMessage = $('.demon-message');
  var loadCheck     = 0;

  checkStorage();

  // Saves options... errhmm demons to local storage
  function saveOptions() {
    localStorage.clear();

    $checkbox.each(function() {
      var $this = $(this);

      if ($this.is(':checked')) {
        localStorage[$this.attr('name')] = $this.val();
      }

      // TODO: Fix custom fields
      // if ($this.attr('data-id')) {
      //   var $id  = $('#' + $this.data('id'));
      //   var obj  = {};
      //   var customFields = $id.find('input').map(function() {
      //     var $input = $(this);
      //     var key    = $input.attr('name');
      //     var value  = $input.val();
      //     var ret    = {}

      //     ret[key] = value;
      //     return ret;
      //   });
      //   localStorage[$this.attr('name')] = customFields;
      // }
    });

    checkStorage();
  }

  // Get rid of dem demons
  function resetOptions() {
    localStorage.clear();
    $checkbox.removeAttr('checked');
    checkStorage();
    console.log(localStorage)
  }

  // Check local storage and display appropriate message about demons
  function checkStorage() {

    // Add checked attr to those in local storage on page load
    if (loadCheck < 1 && localStorage.length) {
      $.each(localStorage, function(name) {
        console.log(name)
        $('[name="' + name + '"]').attr('checked', true);
      });

      loadCheck++;
    }

    if (localStorage.length) {
      $demonMessage
        .text('Demons running amuck')
        .addClass('has-demons');
    } else {
      $demonMessage
        .text('No demons at the moment...')
        .removeClass('has-demons');
    }
  }

  // Show custom inputs for those that have them
  $checkbox.on('click', function() {
    var $this = $(this);
    if ($this.attr('data-id')) {
      var $id   = $('#' + $this.data('id'));
      $id.toggle();
    }
  });

  // Send localStorage to context (evil.js)
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    if (request.summon == 'demons') {
      sendResponse(localStorage);
    }
  });

  document.getElementById('save').addEventListener('click', saveOptions);
  document.getElementById('reset').addEventListener('click', resetOptions);

})(jQuery);
