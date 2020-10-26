import React, { useState, useEffect, useLayoutEffect } from 'react'
import useScrollPosition from '@react-hook/window-scroll'
import { useWindowHeight } from '@react-hook/window-size'

import List from '../List'
import fetchTweets from '../../actions/fetchTweets'

const TOP_FETCH_POSITION = 0

const Tweets = () => {
  const [tweets, setTweets] = useState([])
  const [shouldFetch, setShouldFetch] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [shouldFetchPrev, setShouldFetchPrev] = useState(true)
  const [shouldFetchNext, setShouldFetchNext] = useState(false)
  const scrollPos = useScrollPosition(30)
  const windowHeight = useWindowHeight()

  useEffect(() => {
    const asyncFetch = async () => {
      setIsFetching(true)
      setShouldFetch(false)
      const fetchTopProps = tweets.length
        ? { afterTime: tweets[0].timeStamp }
        : {}
      const fetchBottomProps = tweets.length
        ? { beforeTime: tweets[tweets.length - 1].timeStamp }
        : {}
      const newTweets = shouldFetchPrev
        ? await fetchTweets(fetchTopProps)
        : shouldFetchNext
        ? await fetchTweets(fetchBottomProps)
        : []
      if (newTweets.length && shouldFetchPrev) {
        setTweets([...newTweets, ...tweets])
      } else if (newTweets.length && shouldFetchNext) {
        setTweets([...tweets, ...newTweets])
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
    const i = setInterval(() => {
      setShouldFetch(true)
    }, 2000)
    return () => clearInterval(i)
  }, [])

  // scroll at top
  useEffect(() => {
    const enable = scrollPos <= TOP_FETCH_POSITION
    setShouldFetchPrev(enable)
  }, [scrollPos])

  // get container height
  useLayoutEffect(() => {
    const height = listRef.current.offsetHeight
    if (scrollPos + windowHeight === height + 20) {
      setShouldFetchNext(true)
    } else if (shouldFetchNext) {
      setShouldFetchNext(false)
    }
    console.log(scrollPos + windowHeight === height + 20)
  }, [tweets, scrollPos])

  const listRef = React.createRef()

  return (
    <div ref={listRef}>
      <List tweets={tweets} />
    </div>
  )
}

export default Tweets
