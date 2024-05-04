interface RatingProps {
  score: number;
}

const Rating: React.FC<RatingProps> = ({ score }) => {
  const filledStars = Math.floor(score);
  const hasHalfStar = score % 1 !== 0;

  return (
    <>
      {[...Array(filledStars)].map((_, index) => (
        <svg
          key={index}
          className="h-5 w-5 fill-current text-yellow-500"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          className="h-5 w-5 fill-current text-yellow-500"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      )}
      {[...Array(5 - Math.ceil(score))].map((_, index) => (
        <svg
          key={index}
          className="h-5 w-5 fill-current text-gray-300"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ))}
    </>
  );
};

export default Rating;
