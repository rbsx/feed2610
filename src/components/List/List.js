import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'

const List = React.memo(
  React.forwardRef(function List({ tweets }, ref) {
    return (
      <div ref={ref}>
        {tweets.map((tweet) => (
          <Card key={tweet.id} tweet={tweet} />
        ))}
      </div>
    )
  }),
  // on render if the tweets length has changed to prevent wasted render
  // (An issue when we call the .map on 10000 tweets)
  ({ tweets: oldTweets }, { tweets }) => tweets.length === oldTweets.length
)

List.propTypes = {
  tweets: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string,
      text: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  )
}

export default List
