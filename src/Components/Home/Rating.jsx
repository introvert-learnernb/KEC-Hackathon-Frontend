import { FaStar, FaRegStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { useState } from "react";

const Ratings = ({ onRatingSelect }) => {
  const [selectedRating, setSelectedRating] = useState(null); // Default to null (no rating selected)
  const ratings = [5, 4, 3, 2, 1];

  // Handle rating change
  const handleRatingChange = (rating) => {
    if (selectedRating === rating) {
      // Deselect the rating if clicked again
      setSelectedRating(null);
      onRatingSelect(null); // Notify parent of the removal (no rating)
    } else {
      // Select the new rating
      setSelectedRating(rating);
      onRatingSelect(rating); // Notify parent with the new rating
    }
  };

  // Handle clear filter action
  const handleClearFilter = () => {
    // Only clear the selected rating, but keep the star fill up
    setSelectedRating(null);
    onRatingSelect(null); // Notify parent of the removal (no filter)
  };

  return (
    <div className="ratings bg-white p-4 rounded-lg mt-6">
      <h3 className="text-xl font-semibold mb-4 pl-2 border-l-4 border-yellow-400">
        Ratings
      </h3>

      <ul className="space-y-3">
        {/* Rating options */}
        {ratings.map((stars) => (
          <li key={stars} className="flex items-center space-x-3">
            <input
              type="radio"
              id={`rating-${stars}`}
              name="rating"
              value={stars}
              checked={selectedRating === stars} // Control the checked state manually
              className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
              onChange={() => handleRatingChange(stars)} // Trigger the change on click
            />
            <label
              htmlFor={`rating-${stars}`}
              className="flex items-center space-x-1 text-sm font-medium text-gray-700 cursor-pointer"
            >
              {Array.from({ length: 5 }, (_, starIndex) =>
                // If rating is selected, show filled stars up to the selected rating
                starIndex < stars ? (
                  <FaStar key={starIndex} className="text-yellow-400" />
                ) : (
                  // If rating is not selected, show empty stars
                  <FaRegStar key={starIndex} className="text-gray-300" />
                )
              )}
            </label>
          </li>
        ))}
      </ul>

      {/* Clear Filter Button */}
      <button
        className="mt-4 bg-red-500 text-white p-2 rounded-lg"
        onClick={handleClearFilter}
      >
        Clear Filter
      </button>
    </div>
  );
};

Ratings.propTypes = {
  onRatingSelect: PropTypes.func,
};

Ratings.defaultProps = {
  onRatingSelect: () => {},
};

export default Ratings;
