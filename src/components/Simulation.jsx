import { memo } from "react";
import {
  HiOutlineVolumeUp,
  HiOutlineClock,
  HiOutlineMicrophone,
  HiOutlineEyeOff,
  HiOutlineChartBar,
  HiOutlineUserGroup,
} from "react-icons/hi";

const Simulation = () => {
  return (
    <section
      id="simulation"
      className="
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        py-14 sm:py-16 lg:py-20
      "
    >
      {/* HEADER */}
      <div className="max-w-2xl mb-10 sm:mb-12">
        <h2
          className="
            text-2xl sm:text-3xl lg:text-4xl
            font-bold tracking-tight
            text-gray-900
            mb-3
          "
        >
          What is this{" "}
          <span className="text-blue-600">simulation</span>
        </h2>

        <p
          className="
            text-sm sm:text-base
            text-gray-600
            leading-relaxed
          "
        >
          A short, controlled speaking experience designed to expose how you
          respond under real interview pressure.
        </p>
      </div>

      {/* FLOW */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4 sm:gap-5
          mb-12 sm:mb-14
        "
      >
        <FlowCard
          icon={HiOutlineVolumeUp}
          title="Listen"
          text="Hear a real interview question."
        />
        <FlowCard
          icon={HiOutlineClock}
          title="Think"
          text="15 seconds of silent processing."
        />
        <FlowCard
          icon={HiOutlineMicrophone}
          title="Speak"
          text="Answer continuously. No retries."
        />
        <FlowCard
          icon={HiOutlineChartBar}
          title="Observe"
          text="Pauses, silence, and timing are measured."
        />
      </div>

      {/* LOWER GRID */}
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6 lg:gap-8
        "
      >
        {/* INCLUDED */}
        <div
          className="
            rounded-xl
            border border-gray-200
            p-5 sm:p-6
            bg-white
          "
        >
          <h3
            className="
              flex items-center gap-2
              text-sm sm:text-base
              font-semibold
              text-gray-900
              mb-4
            "
          >
            <HiOutlineChartBar className="w-5 h-5 text-blue-600" />
            What this focuses on
          </h3>

          <ul
            className="
              space-y-2
              text-sm
              text-gray-700
            "
          >
            <li>Response timing under pressure</li>
            <li>Silence and hesitation patterns</li>
            <li>Speaking continuity</li>
            <li>Realistic interview pacing</li>
          </ul>
        </div>

        {/* EXCLUDED */}
        <div
          className="
            rounded-xl
            border border-blue-100
            bg-blue-50/40
            p-5 sm:p-6
          "
        >
          <h3
            className="
              flex items-center gap-2
              text-sm sm:text-base
              font-semibold
              text-gray-900
              mb-4
            "
          >
            <HiOutlineEyeOff className="w-5 h-5 text-blue-600" />
            What is intentionally excluded
          </h3>

          <ul
            className="
              space-y-2
              text-sm
              text-gray-700
            "
          >
            <li>Grammar correction</li>
            <li>Pronunciation or accent scoring</li>
            <li>Word choice evaluation</li>
            <li>AI language feedback</li>
          </ul>
        </div>
      </div>

      {/* WHO IT’S FOR */}
      <div
        className="
          mt-10 sm:mt-12 lg:mt-14
          rounded-xl
          border border-gray-200
          p-5 sm:p-6
        "
      >
        <h3
          className="
            flex items-center gap-2
            text-sm sm:text-base
            font-semibold
            text-gray-900
            mb-4 sm:mb-5
          "
        >
          <HiOutlineUserGroup className="w-5 h-5 text-blue-600" />
          Designed for
        </h3>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-3 sm:gap-4
            text-sm
            text-gray-700
          "
        >
          <p>Interview candidates seeking realism</p>
          <p>People who freeze or hesitate while speaking</p>
          <p>Learners focused on confidence & delivery</p>
        </div>
      </div>
    </section>
  );
};

function FlowCard({ icon: Icon, title, text }) {
  return (
    <div
      className="
        rounded-xl
        border border-gray-200
        bg-white
        p-4 sm:p-5
        text-center
      "
    >
      <div
        className="
          mx-auto mb-3
          flex h-10 w-10
          items-center justify-center
          rounded-full
          bg-blue-50
          text-blue-600
        "
      >
        <Icon className="w-5 h-5" />
      </div>

      <h4 className="font-semibold text-sm text-gray-900 mb-1">
        {title}
      </h4>

      <p className="text-xs sm:text-sm text-gray-600 leading-snug">
        {text}
      </p>
    </div>
  );
}

export default memo(Simulation);
