$(document).ready(function() {
  const $tweetText = $('#tweet-text');
  const $counter = $('.counter')

  $tweetText.on('input', function() {
    const inputLength = $(this).val().length
    const counter = 140 - inputLength

    $counter.text(counter)

    if (counter < 0) {
      $counter.addClass("red-class")
    }
    if (counter > 0) {
      $counter.removeClass("red-class")
    }
  })
});