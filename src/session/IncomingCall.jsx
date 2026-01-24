import { memo } from "react";
import "./styles/IncomingCall.css";

const IncomingCall = ({ onAccept }) => {
  return (
    <div className="incoming-root">
      <div className="incoming-surface">
        {/* Status */}
        <div className="incoming-status">
          <span className="status-dot" />
          <span className="status-text">Incoming call</span>
        </div>

        {/* Caller anchor */}
        <div className="caller-zone">
          <div className="caller-pulse" />
          <div className="caller-avatar">
            Alex
          </div>
          <div className="caller-waiting">Waiting for you…</div>
        </div>

        {/* Copy */}
        <h2 className="incoming-title">
          Practice Call
        </h2>

        <p className="incoming-subtitle">
          Here is a practice customer call for you.
          Speak in English and try to help the customer as best you can.
        </p>

        {/* Action */}
        <button
          className="accept-btn"
          onClick={onAccept}
        >
          Accept Call
        </button>
      </div>
    </div>
  );
};

export default memo(IncomingCall);
