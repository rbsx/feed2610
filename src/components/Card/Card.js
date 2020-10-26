import React from 'react'
import PropTypes from 'prop-types'

import styles from './Card.module.css'

const Card = React.memo(function Card({ tweet }) {
  const { username, text, image } = tweet

  return (
    <div className={styles['card']}>
      <div className={styles['card__profile']}>
        {image ? (
          <img className={styles['card__image']} src={image} alt={username} />
        ) : (
          // fallback to using char when image is not present
          <div>{username.charAt(0)}</div>
        )}
      </div>
      <div className={styles['card__details']}>
        <div className={styles['card__username']}>{username}</div>
        <div className={styles['card__tweet']}>{text}</div>
      </div>
    </div>
  )
})

Card.propTypes = {
  tweet: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string,
    text: PropTypes.string.isRequired
  })
}

export default Card
