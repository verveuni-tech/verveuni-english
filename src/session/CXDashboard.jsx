import { Row, Col, Card } from "antd";
import CXIndicatorBar from "./CXIndicatorBar";
import InfoGrid from "./InfoGrid";
import QuestionPlayer from "./QuestionPlayer";
import Recorder from "./Recorder";

import "./styles/CXDashboard.css";

const CXDashboard = ({
  mode,
  audioSrc,
  questionIndex,
  totalQuestions,
  onQuestionEnd,
  onRecordingEnd,
}) => {
  return (
    <div className="cx-dashboard-root">
      {/* Global call / speaking state */}
      <CXIndicatorBar
        mode={mode}
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
      />

      <div className="cx-dashboard-body">
        <Row gutter={[20, 20]}>
          {/* Customer context */}
          <Col xs={24} lg={16}>
            <Card
              title="Customer Information"
              className="cx-card"
            >
              <InfoGrid />
            </Card>
          </Col>

          {/* Action panel */}
          <Col xs={24} lg={8}>
            <Card
              title={mode === "LISTENING" ? "Listening" : "Your Response"}
              className="cx-card action-card"
            >
              <div
                className={`cx-action-panel ${mode.toLowerCase()}`}
              >
                {mode === "LISTENING" && (
                  <QuestionPlayer
                    audioSrc={audioSrc}
                    onComplete={onQuestionEnd}
                  />
                )}

                {mode === "SPEAKING" && (
                  <Recorder
                    onComplete={onRecordingEnd}
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CXDashboard;
