const FeedbackOutput = ({ analysis }) => {
  const { raw_metrics, signals } = analysis;

  return (
    <div className="space-y-6 text-left">
      <section>
        <h3 className="font-semibold mb-2">Summary</h3>
        <p className="text-gray-700">
          You spoke for{" "}
          <strong>{raw_metrics.speaking_ratio * 100}%</strong> of the session.
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Detected Signals</h3>
        <ul className="list-disc pl-5 text-gray-700">
          {signals.length === 0 && <li>No major issues detected</li>}
          {signals.map((s) => (
            <li key={s}>{s.replaceAll("_", " ")}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Coaching Tip</h3>
        <p className="text-gray-700">
          Try reducing long pauses and maintain a steady speaking rhythm.
        </p>
      </section>
    </div>
  );
};

export default FeedbackOutput;
