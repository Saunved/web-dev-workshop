import React from "react";
import PropTypes from "prop-types";

export default function ProfilePicture({ handle }) {
  return (
    <div
      style={{
        backgroundImage: `url(https://api.dicebear.com/5.x/thumbs/svg?seed=${handle}})`,
      }}
      className="w-12 h-12 rounded-full object-cover border"
    ></div>
  );
}

ProfilePicture.propTypes = {
  /** User's unique handle to generate a DiceBear profile picture */
  handle: PropTypes.string.isRequired,
};
