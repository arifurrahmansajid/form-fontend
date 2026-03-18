import { ApplicationFormData } from './types';
import { FormField, YesNoRadio, ConditionalDetails } from './FormField';

interface Props {
  data: ApplicationFormData;
  onChange: (data: Partial<ApplicationFormData>) => void;
}

const Step1PersonalDetails = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-6">
      {/* Position */}
      <div className="form-section">
        <h3 className="form-section-title">Position Applied For</h3>
        <FormField label="Position applied for" required>
          <input className="form-input" value={data.positionAppliedFor} onChange={(e) => onChange({ positionAppliedFor: e.target.value })} />
        </FormField>
        <div className="mb-4">
          <span className="form-label">Contract type</span>
          <div className="grid grid-cols-2 sm:flex sm:gap-6 gap-y-3 gap-x-2 mt-2">
            {['Full-Time', 'Part-Time', 'Sessional'].map((opt) => (
              <label key={opt} className="flex items-center gap-1.5 sm:gap-2 cursor-pointer text-[13px] sm:text-sm whitespace-nowrap">
                <input type="radio" name="contractType" value={opt} checked={data.contractType === opt} onChange={() => onChange({ contractType: opt })} className="w-3.5 h-3.5 sm:w-4 sm:h-4 accent-primary shrink-0" />
                {opt}
              </label>
            ))}
          </div>
        </div>
        <YesNoRadio label="Are you willing to be considered for other posts?" name="willingOtherPosts" value={data.willingOtherPosts} required onChange={(v) => onChange({ willingOtherPosts: v })} />
      </div>

      {/* Personal Details */}
      <div className="form-section">
        <h3 className="form-section-title">Personal Details & Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <FormField label="Title">
            <select className="form-input" value={data.title} onChange={(e) => onChange({ title: e.target.value })}>
              <option value="">Select...</option>
              {['Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Other'].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </FormField>
          <FormField label="Surname" required>
            <input className="form-input" value={data.surname} onChange={(e) => onChange({ surname: e.target.value })} />
          </FormField>
          <FormField label="Forename(s)" required>
            <input className="form-input" value={data.forenames} onChange={(e) => onChange({ forenames: e.target.value })} />
          </FormField>
          <FormField label="Preferred name">
            <input className="form-input" value={data.preferredName} onChange={(e) => onChange({ preferredName: e.target.value })} />
          </FormField>
          <FormField label="Date of birth" required>
            <input type="date" className="form-input" value={data.dateOfBirth} onChange={(e) => onChange({ dateOfBirth: e.target.value })} />
          </FormField>
          <FormField label="National Insurance number">
            <input className="form-input" value={data.nationalInsurance} onChange={(e) => onChange({ nationalInsurance: e.target.value })} placeholder="e.g. QQ 12 34 56 C" />
          </FormField>
        </div>
        <FormField label="Home address" required>
          <textarea className="form-input min-h-[80px] resize-y" value={data.homeAddress} onChange={(e) => onChange({ homeAddress: e.target.value })} />
        </FormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <FormField label="Telephone (Mobile)">
            <input type="tel" className="form-input" value={data.telephoneMobile} onChange={(e) => onChange({ telephoneMobile: e.target.value })} />
          </FormField>
          <FormField label="Telephone (Home)">
            <input type="tel" className="form-input" value={data.telephoneHome} onChange={(e) => onChange({ telephoneHome: e.target.value })} />
          </FormField>
          <FormField label="Email address" required>
            <input type="email" className="form-input" value={data.emailAddress} onChange={(e) => onChange({ emailAddress: e.target.value })} />
          </FormField>
          <FormField label="Preferred method of contact">
            <select className="form-input" value={data.preferredContact} onChange={(e) => onChange({ preferredContact: e.target.value })}>
              <option value="">Select...</option>
              {['Email', 'Mobile', 'Home Phone'].map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </FormField>
        </div>
      </div>

      {/* Entitlement to work */}
      <div className="form-section">
        <h3 className="form-section-title">Entitlement to Work in the UK</h3>
        <p className="text-sm text-muted-foreground mb-4">
          All applicants will be asked at interview to provide documentary evidence of their right to work in the UK.
        </p>
        <YesNoRadio label="Do you have any restrictions that apply to you?" name="workRestrictions" value={data.workRestrictions} required onChange={(v) => onChange({ workRestrictions: v })} />
        <ConditionalDetails show={data.workRestrictions === 'Yes'} required value={data.workRestrictionsDetails} onChange={(v) => onChange({ workRestrictionsDetails: v })} />
      </div>
    </div>
  );
};

export default Step1PersonalDetails;
