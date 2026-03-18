import { useState } from 'react';
import { toast } from 'sonner';
import StepperNav from './StepperNav';
import Step1PersonalDetails from './Step1PersonalDetails';
import Step2References from './Step2References';
import Step3Employment from './Step3Employment';
import Step4Education from './Step4Education';
import Step5ReasonAndAdditional from './Step5ReasonAndAdditional';
import Step6Declaration from './Step6Declaration';
import { ApplicationFormData, initialFormData } from './types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

const STEPS = [
  'Personal Details',
  'References',
  'Employment',
  'Education',
  'Supporting Info',
  'Declaration',
];

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateData = (partial: Partial<ApplicationFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const validateStep = (step: number) => {
    const missing: string[] = [];

    if (step === 0) {
      if (!formData.positionAppliedFor.trim()) missing.push('Position applied for');
      if (!formData.surname.trim()) missing.push('Surname');
      if (!formData.forenames.trim()) missing.push('Forename(s)');
      if (!formData.dateOfBirth.trim()) missing.push('Date of birth');
      if (!formData.homeAddress.trim()) missing.push('Home address');
      if (!formData.emailAddress.trim()) missing.push('Email address');
      if (!formData.willingOtherPosts.trim()) missing.push('Willingness to be considered for other posts');
      if (!formData.workRestrictions.trim()) missing.push('Work restrictions status');
      if (formData.workRestrictions === 'Yes' && !formData.workRestrictionsDetails.trim()) missing.push('Work restrictions details');
    }

    if (step === 1) {
      const refs = formData.referees || [];
      refs.slice(0, 3).forEach((ref, idx) => {
        if (!ref.name.trim()) missing.push(`Referee ${idx + 1}: Name`);
        if (!ref.relationship.trim()) missing.push(`Referee ${idx + 1}: Relationship`);
      });
      if (!formData.contactRefereesBeforeInterview.trim()) missing.push('Contact referees before interview status');
      if (!formData.grantPermissionReferees.trim()) missing.push('Grant permission to referees status');
    }

    if (step === 3) {
      if (!formData.statutoryConditions.trim()) missing.push('Statutory conditions/prohibitions status');
      if (formData.statutoryConditions === 'Yes' && !formData.statutoryConditionsDetails.trim()) missing.push('Statutory conditions details');
    }

    if (step === 4) {
      if (!formData.reasonForApplying.trim()) missing.push('Reason for applying');
      if (!formData.drivingLicense.trim()) missing.push('Driving licence status');
      if (!formData.drivingConvictions.trim()) missing.push('Driving convictions status');
      if (formData.drivingConvictions === 'Yes' && !formData.drivingConvictionsDetails.trim()) missing.push('Driving convictions details');
      if (!formData.manualGearbox.trim()) missing.push('Manual gearbox availability');
      if (!formData.willingToDrive.trim()) missing.push('Willingness to drive young people');
      if (!formData.knowStaff.trim()) missing.push('Staff relationship status');
      if (formData.knowStaff === 'Yes' && !formData.knowStaffDetails.trim()) missing.push('Know staff details');
      if (!formData.knowYoungPerson.trim()) missing.push('Young person relationship status');
      if (formData.knowYoungPerson === 'Yes' && !formData.knowYoungPersonDetails.trim()) missing.push('Know young person details');
      if (!formData.disciplinarySanction.trim()) missing.push('Disciplinary sanction status');
      if (formData.disciplinarySanction === 'Yes' && !formData.disciplinarySanctionDetails.trim()) missing.push('Disciplinary sanction details');
      if (!formData.previousDismissal.trim()) missing.push('Previous dismissal status');
      if (formData.previousDismissal === 'Yes' && !formData.previousDismissalDetails.trim()) missing.push('Previous dismissal details');
    }

    if (step === STEPS.length - 1) {
      if (!formData.declarationSignName.trim()) missing.push('Declaration sign name');
      if (!formData.declarationPrintName.trim()) missing.push('Declaration print name');
      if (!formData.declarationDate.trim()) missing.push('Declaration date');
      if (!formData.understandSignName.trim()) missing.push('Understand sign name');
      if (!formData.understandPrintName.trim()) missing.push('Understand print name');
      if (!formData.understandDate.trim()) missing.push('Understand date');
      if (!formData.hasCriminalRecord.trim()) missing.push('Criminal record status');
      if (formData.hasCriminalRecord === 'Yes' && !formData.criminalRecordDetails.trim()) missing.push('Criminal record details');
      if (!formData.hasDBSCheck.trim()) missing.push('DBS check status');
      if (formData.hasDBSCheck === 'Yes' && !formData.dbsDetails.trim()) missing.push('DBS details');
      // CV upload check is temporarily disabled while upload feature is commented out
      // if (!formData.cvFileData.trim()) missing.push('Upload CV');
    }

    if (missing.length > 0) {
      toast.error('Please fill in all required fields before continuing.', {
        description: missing.slice(0, 3).join(', ') + (missing.length > 3 ? ` and ${missing.length - 3} more` : ''),
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const handleStepClick = (step: number) => {
    if (step > currentStep && !validateStep(currentStep)) return;
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    // CV upload is currently disabled/commented in Step6Declaration.
    // Remove the check below while the CV field is inactive.
    // if (!formData.cvFileData) {
    //   toast.error('Please upload your CV before submitting.', {
    //     description: 'CV upload is required to complete your application.',
    //   });
    //   setCurrentStep(STEPS.length - 1);
    //   return;
    // }

    setIsSubmitting(true);
    try {
      // Dynamically import to avoid loading emailjs if they never submit
      const { sendApplicationEmail } = await import('@/lib/emailService');
      const result = await sendApplicationEmail(formData);

      if (result.success) {
        toast.success('Application submitted successfully!', {
          description: 'We will review your application and get back to you.',
        });
        // Optionally reset form here
        // setFormData(initialFormData);
        // setCurrentStep(0);
      } else {
        toast.error('Failed to submit application', {
          description: 'Please try again later or contact support.',
        });
      }
    } catch (error) {
      toast.error('An error occurred', {
        description: 'Unable to send the application. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Step1PersonalDetails data={formData} onChange={updateData} />;
      case 1: return <Step2References data={formData} onChange={updateData} />;
      case 2: return <Step3Employment data={formData} onChange={updateData} />;
      case 3: return <Step4Education data={formData} onChange={updateData} />;
      case 4: return <Step5ReasonAndAdditional data={formData} onChange={updateData} />;
      case 5: return <Step6Declaration data={formData} onChange={updateData} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}


        {/* Stepper */}
        <StepperNav steps={STEPS} currentStep={currentStep} onStepClick={handleStepClick} />

        {/* Form content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center pb-12">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={handleNext}
              className="gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
              <Send className="w-4 h-4" /> {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
