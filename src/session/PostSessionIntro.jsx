import { memo } from "react";
import "./styles/PostSessionIntro.css";

const PostSessionIntro = ({ onContinue }) => {
  return (
    <div className="post-intro">
      <h2 className="post-intro-title">
        Session completed
      </h2>

      <p className="post-intro-text">
        Thank you for attending the practice session.
        Please fill in this short form and we’ll prepare
        your speaking feedback.
      </p>

      <button
        className="post-intro-btn"
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default memo(PostSessionIntro);
