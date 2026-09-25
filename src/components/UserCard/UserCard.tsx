import type { User } from '../../types/User'
import styles from './UserCard.module.scss'

interface UserCardProps {
  user: User
  index?: number
}

export function UserCard({ user, index = 0 }: UserCardProps) {
  const name = `${user.name.first} ${user.name.last}`

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <img
        className={styles.photo}
        src={user.picture.medium}
        alt={name}
        width={72}
        height={72}
        loading="lazy"
      />

      <div className={styles.info}>
        <h2>{name}</h2>
        <p className={styles.place}>
          {user.location.city}, {user.location.country}
        </p>
        <a className={styles.mail} href={`mailto:${user.email}`}>
          {user.email}
        </a>
      </div>
    </article>
  )
}
