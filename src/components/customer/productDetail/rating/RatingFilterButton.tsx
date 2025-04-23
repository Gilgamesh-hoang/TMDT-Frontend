
export default function RatingFilterButton(props: RatingFilterButtonProps) {
  return (
    <button
      className={`px-3 py-1 bg-orange-300 text-sm rounded cursor-pointer hover:bg-orange-200 ${props.className || ""}`}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  )
}