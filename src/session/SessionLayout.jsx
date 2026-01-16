import { memo } from "react";

const SessionLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        {children}
      </div>
    </div>
  );
};

export default memo(SessionLayout);
