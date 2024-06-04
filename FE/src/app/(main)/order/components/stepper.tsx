import { STATUS_ORDER } from "@/+core/enums";
import React from "react";

interface Props {
  status: STATUS_ORDER;
}
const Stepper = ({ status }: Props) => {
  const statuses = Object.values(STATUS_ORDER);
  const currentStep = statuses.indexOf(status);

  return (
    <div className="flex items-center">
      {statuses.map((step, index) => (
        <div
          key={step}
          className={`relative flex-1 ${
            index < statuses.length - 1 ? "mr-2" : ""
          }`}
        >
          <div className="flex items-center">
            <div
              className={`${
                index <= currentStep
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              } w-10 h-10 rounded-full flex items-center justify-center`}
            >
              {index + 1}
            </div>
            {index < statuses.length - 1 && (
              <div
                className={`flex-1 border-t-2 ${
                  index < currentStep ? "border-blue-500" : "border-gray-300"
                }`}
              ></div>
            )}
          </div>
          <div
            className={`absolute top-12 left-0 w-full text-center text-sm ${
              index <= currentStep ? "text-blue-500" : "text-gray-600"
            }`}
          >
            {step.replace("_", " ")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
