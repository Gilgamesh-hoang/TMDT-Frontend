type RatingFilterButtonProps = {
  title: string
  className?: string
  onClick?: () => void
}

type Review = {
  id: string
  user: string
  rating: number
  date: Date
  comment: string
}