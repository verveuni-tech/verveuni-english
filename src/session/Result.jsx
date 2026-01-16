import FeedbackOutput from "../components/FeedbackOutput";

const Result = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="text-center text-gray-500">
        No feedback available.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">
        Session Feedback
      </h2>
      <FeedbackOutput analysis={analysis} />
    </div>
  );
};

export default Result;
