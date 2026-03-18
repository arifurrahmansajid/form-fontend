import { Plus, Trash2 } from 'lucide-react';
import { ApplicationFormData, EducationData, TrainingData, ProfessionalMembershipData } from './types';
import { FormField, YesNoRadio, ConditionalDetails } from './FormField';

interface Props {
  data: ApplicationFormData;
  onChange: (data: Partial<ApplicationFormData>) => void;
}

const Step4Education = ({ data, onChange }: Props) => {
  // Education helpers
  const addEducation = () => onChange({ educations: [...data.educations, { secondaryFurtherEducation: '', dateFrom: '', dateTo: '', qualifications: '' }] });
  const removeEducation = (i: number) => onChange({ educations: data.educations.filter((_, idx) => idx !== i) });
  const updateEducation = (i: number, field: keyof EducationData, value: string) => {
    const updated = [...data.educations]; updated[i] = { ...updated[i], [field]: value }; onChange({ educations: updated });
  };

  // Training helpers
  const addTraining = () => onChange({ trainings: [...data.trainings, { establishment: '', dates: '', qualifications: '' }] });
  const removeTraining = (i: number) => onChange({ trainings: data.trainings.filter((_, idx) => idx !== i) });
  const updateTraining = (i: number, field: keyof TrainingData, value: string) => {
    const updated = [...data.trainings]; updated[i] = { ...updated[i], [field]: value }; onChange({ trainings: updated });
  };

  // Membership helpers
  const addMembership = () => onChange({ memberships: [...data.memberships, { organisationName: '', registrationNo: '', registrationDate: '' }] });
  const removeMembership = (i: number) => onChange({ memberships: data.memberships.filter((_, idx) => idx !== i) });
  const updateMembership = (i: number, field: keyof ProfessionalMembershipData, value: string) => {
    const updated = [...data.memberships]; updated[i] = { ...updated[i], [field]: value }; onChange({ memberships: updated });
  };

  return (
    <div className="space-y-6">
      {/* Secondary & Further Education */}
      <div className="form-section">
        <h3 className="form-section-title">Education</h3>
        <p className="text-sm text-muted-foreground mb-4">Please state qualifications gained. Successful applicants will be required to produce evidence (as original or certified copies) of any qualifications.</p>
        {/* Placeholder kept for header, no separate wide input field */}
        {data.educations.map((edu, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1.5fr_auto] gap-3 items-end mb-3">
            <FormField label="Secondary & Further Education"><input className="form-input min-w-0" value={edu.secondaryFurtherEducation} onChange={(e) => updateEducation(i, 'secondaryFurtherEducation', e.target.value)} placeholder="e.g. High School / College name" /></FormField>
            <FormField label="From"><input type="date" className="form-input min-w-0" value={edu.dateFrom} onChange={(e) => updateEducation(i, 'dateFrom', e.target.value)} /></FormField>
            <FormField label="To"><input type="date" className="form-input min-w-0" value={edu.dateTo} onChange={(e) => updateEducation(i, 'dateTo', e.target.value)} /></FormField>
            <FormField label="Qualifications gained (subjects, grades)"><input className="form-input min-w-0" value={edu.qualifications} onChange={(e) => updateEducation(i, 'qualifications', e.target.value)} /></FormField>
            {data.educations.length > 1 && <button type="button" onClick={() => removeEducation(i)} className="text-destructive hover:text-destructive/80 mb-4 p-1"><Trash2 className="w-4 h-4" /></button>}
          </div>
        ))}
        <button type="button" onClick={addEducation} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"><Plus className="w-3 h-3" /> Add row</button>
      </div>

      {/* Relevant qualifications */}
      <div className="form-section">
        <h3 className="form-section-title">Relevant Qualifications / Certificates / Achievements</h3>
        <p className="text-sm text-muted-foreground mb-4">Include any short courses or work-based training that you have attended </p>
        {data.trainings.map((t, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_3fr_auto] gap-3 items-end mb-3">
            <FormField label="Establishment / Awarding body"><input className="form-input" value={t.establishment} onChange={(e) => updateTraining(i, 'establishment', e.target.value)} /></FormField>
            <FormField label="Date(s)"><input className="form-input" value={t.dates} onChange={(e) => updateTraining(i, 'dates', e.target.value)} /></FormField>
            <FormField label="Qualifications gained"><input className="form-input" value={t.qualifications} onChange={(e) => updateTraining(i, 'qualifications', e.target.value)} /></FormField>
            {data.trainings.length > 1 && <button type="button" onClick={() => removeTraining(i)} className="text-destructive hover:text-destructive/80 mb-4 p-1"><Trash2 className="w-4 h-4" /></button>}
          </div>
        ))}
        <button type="button" onClick={addTraining} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"><Plus className="w-3 h-3" /> Add row</button>
      </div>

      {/* Professional memberships */}
      <div className="form-section">
        <h3 className="form-section-title">Membership of professional associations or statutory body</h3>
        {data.memberships.map((m, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-3 items-end mb-3">
            <FormField label="Organisation name"><input className="form-input" value={m.organisationName} onChange={(e) => updateMembership(i, 'organisationName', e.target.value)} /></FormField>
            <FormField label="Registration No."><input className="form-input" value={m.registrationNo} onChange={(e) => updateMembership(i, 'registrationNo', e.target.value)} /></FormField>
            <FormField label="Registration date"><input type="date" className="form-input" value={m.registrationDate} onChange={(e) => updateMembership(i, 'registrationDate', e.target.value)} /></FormField>
            {data.memberships.length > 1 && <button type="button" onClick={() => removeMembership(i)} className="text-destructive hover:text-destructive/80 mb-4 p-1"><Trash2 className="w-4 h-4" /></button>}
          </div>
        ))}
        <button type="button" onClick={addMembership} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80"><Plus className="w-3 h-3" /> Add row</button>
      </div>

      {/* Statutory conditions */}
      <div className="form-section">
        <YesNoRadio label="Are you subject to any conditions or prohibitions placed on you by any statutory body in the UK?" name="statutoryConditions" value={data.statutoryConditions} required onChange={(v) => onChange({ statutoryConditions: v })} />
        <ConditionalDetails show={data.statutoryConditions === 'Yes'} required value={data.statutoryConditionsDetails} onChange={(v) => onChange({ statutoryConditionsDetails: v })} />
      </div>
    </div>
  );
};

export default Step4Education;
