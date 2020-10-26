import React, { useState, useEffect } from 'react'

import List from '../List'
import fetchTweets from '../../actions/fetchTweets'

const Tweets = () => {
  const [tweets, setTweets] = useState([])
  const [shouldFetch, setShouldFetch] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const asyncFetch = async () => {
      setIsFetching(true)
      setShouldFetch(false)
      const fetchProps = tweets.length
        ? {
            afterTime: tweets[0].timeStamp
          }
        : {}
      const newTweets = await fetchTweets(fetchProps)
      if (newTweets.length) {
        setTweets([...newTweets, ...tweets])
      }
      setIsFetching(false)
    }

    // only trigger a fetch if no other fetch is in progress.
    // If another fetch is in progress then automatically trigger
    // the next fetch as soon as the previous one has finished
    if (shouldFetch && !isFetching) {
      asyncFetch()
    }
  }, [shouldFetch, tweets, isFetching])

  useEffect(() => {
    const i = setInterval(() => setShouldFetch(true), 2000)
    return () => clearInterval(i)
  }, [])

  return <List tweets={tweets} />
}

export default Tweets
