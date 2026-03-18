import { Check } from 'lucide-react';

interface StepperNavProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const StepperNav = ({ steps, currentStep, onStepClick }: StepperNavProps) => {
  return (
    <div className="mb-8">
      {/* Desktop stepper */}
      <div className="hidden md:flex items-start justify-center flex-wrap gap-y-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-start">
            <button
              onClick={() => onStepClick(index)}
              className="flex flex-col items-center gap-1.5 group w-[80px]"
              type="button"
            >
              <div
                className={`stepper-dot shrink-0 ${index === currentStep
                    ? 'stepper-dot-active'
                    : index < currentStep
                      ? 'stepper-dot-complete'
                      : 'stepper-dot-inactive'
                  }`}
              >
                {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span className="text-xs text-center leading-tight text-muted-foreground group-hover:text-foreground transition-colors mt-1">
                {step}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={`stepper-line w-8 lg:w-16 mt-4 ${index < currentStep ? 'stepper-line-complete' : 'stepper-line-inactive'
                  }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile indicator */}
      <div className="md:hidden flex items-center justify-between px-2">
        <span className="text-sm font-medium text-primary">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm text-muted-foreground">{steps[currentStep]}</span>
      </div>
      <div className="md:hidden mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
            background: `hsl(var(--primary))`,
          }}
        />
      </div>
    </div>
  );
};

export default StepperNav;
