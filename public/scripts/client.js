/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {


const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = function(tweet) {
  const $tweet = `
  <article class="tweet-post">
  <section class="user-info">
    <div class="avatar-and-name">
      <div class="avatar-alone">
        <img src='${tweet.user.avatars}'>
      </div>
      <div class="name-alone">
        ${tweet.user.name}
      </div>
    </div>
    <div class="handle">${tweet.user.handle}</div>
  </section>
  <p class="entry">
      ${escape(tweet.content.text)}
  </p>
  <footer>
  <div class="created-at">${timeago.format(tweet.created_at)}</div>
  <div class="icons">
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </div>
  </footer>
  </article>
  `
  return $tweet
}


const renderTweets = function(tweets) {
  const $tweetsContainer = $('.tweets-container');
  $tweetsContainer.empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet)
  }
}


$('form').on('submit', function (event) {
  event.preventDefault()
  const serializedData = $(this).serialize()
  $('.error').slideUp(400)
  if (serializedData.length - 5 > 140) {
    return $('.character').slideDown(400)

  }
  if (serializedData.length - 5 == 0) {
    return $('.blank').slideDown(400)
  }


  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: $('form').serialize(),
    success: () => {
    loadTweets()
    this.reset()
  },

  error: (err) => {
    console.log(`error: ${err}`)
  }
})
})


const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: (tweets) => {
      console.log("data", tweets);
      renderTweets(tweets)
    },
    error: (err) => {
      console.log(`error: ${err}`)
    }
  })
}


loadTweets()

})