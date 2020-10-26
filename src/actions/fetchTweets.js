import qs from 'query-string'

const fetchTweets = async ({ beforeTime, afterTime } = {}) => {
  try {
    const queryString = qs.stringify({
      beforeTime,
      afterTime
    })

    const response = await fetch(
      `https://bumble-twitter-interview.herokuapp.com/elroy-antao/api?${queryString}`
    )

    if (!response.ok) {
      throw new Error('There was an error in fetching, continuing.... ')
    }

    const tweets = await response.json()
    return tweets
  } catch (e) {
    console.error(e.message)
    return []
  }
}

export default fetchTweets
