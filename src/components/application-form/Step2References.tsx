import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ApplicationFormData, RefereeData } from './types';
import { FormField, YesNoRadio } from './FormField';

interface Props {
  data: ApplicationFormData;
  onChange: (data: Partial<ApplicationFormData>) => void;
}

const emptyReferee: RefereeData = { name: '', relationship: '', organisation: '', jobTitle: '', address: '', telephone: '', email: '' };

const RefereeBlock = ({ index, referee, onUpdate, isExpanded, onToggle }: { index: number; referee: RefereeData; onUpdate: (r: RefereeData) => void; isExpanded: boolean; onToggle: () => void }) => {
  const set = (field: keyof RefereeData, value: string) => onUpdate({ ...referee, [field]: value });
  return (
    <div className="form-section relative transition-all duration-300">
      <div
        className="flex items-center justify-between mb-2 pb-2 border-b cursor-pointer select-none"
        onClick={onToggle}
      >
        <h3 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--primary))' }}>
          Referee {index + 1} {referee.name ? `- ${referee.name}` : ''}
        </h3>
        <div className="flex items-center gap-2">
          <button type="button" className="text-muted-foreground p-1 transition-transform">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Name" required><input className="form-input" value={referee.name} onChange={(e) => set('name', e.target.value)} /></FormField>
            <FormField label="Relationship" required><input className="form-input" value={referee.relationship} onChange={(e) => set('relationship', e.target.value)} /></FormField>
            <FormField label="Organisation"><input className="form-input" value={referee.organisation} onChange={(e) => set('organisation', e.target.value)} /></FormField>
            <FormField label="Referee's job title"><input className="form-input" value={referee.jobTitle} onChange={(e) => set('jobTitle', e.target.value)} /></FormField>
          </div>
          <FormField label="Address"><textarea className="form-input min-h-[60px] resize-y" value={referee.address} onChange={(e) => set('address', e.target.value)} /></FormField>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Telephone"><input type="tel" className="form-input" value={referee.telephone} onChange={(e) => set('telephone', e.target.value)} /></FormField>
            <FormField label="Email address"><input type="email" className="form-input" value={referee.email} onChange={(e) => set('email', e.target.value)} /></FormField>
          </div>
        </div>
      )}
    </div>
  );
};

const Step2References = ({ data, onChange }: Props) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const referees = data.referees.slice(0, 3);
  while (referees.length < 3) {
    referees.push({ ...emptyReferee });
  }

  const updateReferee = (index: number, referee: RefereeData) => {
    const updated = [...referees];
    updated[index] = referee;
    onChange({ referees: updated });
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <p className="text-sm text-muted-foreground">
          You are required to give the details of <strong>3 people</strong> to act as referees. This must include a reference from your most recent employer (or your Head Teacher or Tutor if you are a College or University leaver). Please note that friends and relatives may not act as referees, and all offers of employment are subject to receipt of satisfactory references.
        </p>
      </div>

      {referees.map((ref, i) => (
        <RefereeBlock
          key={i}
          index={i}
          referee={ref}
          onUpdate={(r) => updateReferee(i, r)}
          canRemove={false}
          isExpanded={expandedIndex === i}
          onToggle={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
        />
      ))}

      <div className="form-section mt-6">
        <p className="text-sm text-muted-foreground mb-4">
          If you are selected for an interview, we will wish to take up references. We would prefer to contact your referees beforehand as this simplifies the process.
        </p>
        <YesNoRadio label="Can we contact your referees prior to interview?" name="contactRefereesBeforeInterview" value={data.contactRefereesBeforeInterview} required onChange={(v) => onChange({ contactRefereesBeforeInterview: v })} />
        <YesNoRadio label="Do you grant permission to your nominated referees to send us the relevant information in line with company policy?" name="grantPermissionReferees" value={data.grantPermissionReferees} required onChange={(v) => onChange({ grantPermissionReferees: v })} />
      </div>
    </div>
  );
};

export default Step2References;
