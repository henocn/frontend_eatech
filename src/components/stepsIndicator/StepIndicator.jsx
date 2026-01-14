import "./StepIndicator.css";

const StepIndicator = ({ currentStep, maxStepReached, onStepChange }) => {
  const steps = [
    { id: 1, label: "Studio" },
    { id: 2, label: "Décor" },
    { id: 3, label: "Date & heure" },
  ];

  return (
    <div className="step-indicator">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = step.id < currentStep;
        const isClickable = step.id <= maxStepReached;

        return (
          <div
            key={step.id}
            className={`step-item 
              ${isActive ? "active" : ""} 
              ${isCompleted ? "completed" : ""} 
              ${isClickable ? "clickable" : "disabled"}
            `}
            onClick={() => {
              if (isClickable) onStepChange(step.id);
            }}
          >
            <div className="step-circle">{step.id}</div>
            <span className="step-label">{step.label}</span>

            {index < steps.length - 1 && (
              <div className="step-line" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
