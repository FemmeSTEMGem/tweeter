$(document).ready(function() {
  const $tweetText = $('#tweet-text');
  const $counter = $('.counter')

  $tweetText.on('keyup', function(event) {
    let inputLength = $(this).val().length
    counter = 140 - inputLength
    if (counter < 0) {
      $counter.addClass("red-class")
    }
    if (counter > 0) {
      $counter.removeClass("red-class")
    }
    $counter.text(counter)
  })
});