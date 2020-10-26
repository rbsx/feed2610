Note for reviewer:

- I have used React.memo on the list and card to prevent wasted renders when it loads ~10000 tweets.
- On fetch failure gracefully fails and tries again after the 2sec interval
- if image is missing then show a fallback component with initials
- On slow network does not allow multiple fetch calls in progress, waits for the previous fetch to finish and then immediately calls the next fetch
