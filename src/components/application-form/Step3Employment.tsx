import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ApplicationFormData, EmploymentData, GapData } from './types';
import { FormField } from './FormField';

interface Props {
  data: ApplicationFormData;
  onChange: (data: Partial<ApplicationFormData>) => void;
}

const emptyEmployment: EmploymentData = { employerName: '', employerAddress: '', startDate: '', endDate: '', positionHeld: '', mainDuties: '', reasonForLeaving: '', noticePeriod: '', contactNumber: '', contactEmail: '' };
const emptyGap: GapData = { dateFrom: '', dateTo: '', reason: '' };

const EmploymentBlock = ({ index, emp, onUpdate, onRemove, canRemove, isExpanded, onToggle }: { index: number; emp: EmploymentData; onUpdate: (e: EmploymentData) => void; onRemove: () => void; canRemove: boolean; isExpanded: boolean; onToggle: () => void }) => {
  const set = (field: keyof EmploymentData, value: string) => onUpdate({ ...emp, [field]: value });
  return (
    <div className="form-section relative transition-all duration-300">
      <div
        className="flex items-center justify-between mb-2 pb-2 border-b cursor-pointer select-none"
        onClick={onToggle}
      >
        <h3 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--primary))' }}>
          Employment {index + 1} {emp.employerName ? `- ${emp.employerName}` : ''}
        </h3>
        <div className="flex items-center gap-2">
          {canRemove && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="text-destructive hover:text-destructive/80 transition-colors p-1"
              title="Remove Employment"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button type="button" className="text-muted-foreground p-1 transition-transform">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Employer's name"><input className="form-input" value={emp.employerName} onChange={(e) => set('employerName', e.target.value)} /></FormField>
            <FormField label="Position held"><input className="form-input" value={emp.positionHeld} onChange={(e) => set('positionHeld', e.target.value)} /></FormField>
            <FormField label="Start date"><input type="date" className="form-input" value={emp.startDate} onChange={(e) => set('startDate', e.target.value)} /></FormField>
            <FormField label="End date"><input type="date" className="form-input" value={emp.endDate} onChange={(e) => set('endDate', e.target.value)} /></FormField>
            <FormField label="Contact number"><input type="tel" className="form-input" value={emp.contactNumber} onChange={(e) => set('contactNumber', e.target.value)} /></FormField>
            <FormField label="Contact email"><input type="email" className="form-input" value={emp.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} /></FormField>
          </div>
          <FormField label="Employer's address"><textarea className="form-input min-h-[60px] resize-y" value={emp.employerAddress} onChange={(e) => set('employerAddress', e.target.value)} /></FormField>
          <FormField label="Main duties and responsibilities"><textarea className="form-input min-h-[80px] resize-y" value={emp.mainDuties} onChange={(e) => set('mainDuties', e.target.value)} /></FormField>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Reason for leaving"><input className="form-input" value={emp.reasonForLeaving} onChange={(e) => set('reasonForLeaving', e.target.value)} /></FormField>
            <FormField label="Contractual notice period"><input className="form-input" value={emp.noticePeriod} onChange={(e) => set('noticePeriod', e.target.value)} /></FormField>
          </div>
        </div>
      )}
    </div>
  );
};

const Step3Employment = ({ data, onChange }: Props) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const addEmployment = () => {
    onChange({ employments: [...data.employments, { ...emptyEmployment }] });
    setExpandedIndex(data.employments.length);
  };

  const removeEmployment = (i: number) => {
    onChange({ employments: data.employments.filter((_, idx) => idx !== i) });
    if (expandedIndex === i) {
      setExpandedIndex(Math.max(0, i - 1));
    } else if (expandedIndex > i) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const updateEmployment = (i: number, emp: EmploymentData) => {
    const updated = [...data.employments];
    updated[i] = emp;
    onChange({ employments: updated });
  };

  const addGap = () => onChange({ gaps: [...data.gaps, { ...emptyGap }] });
  const removeGap = (i: number) => onChange({ gaps: data.gaps.filter((_, idx) => idx !== i) });
  const updateGap = (i: number, field: keyof GapData, value: string) => {
    const updated = [...data.gaps];
    updated[i] = { ...updated[i], [field]: value };
    onChange({ gaps: updated });
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <p className="text-sm text-muted-foreground">
          Start with the most recent employment from the end of full-time education. Please attach any additional pages as necessary providing the same information outlined below. 
        </p>
      </div>

      {data.employments.map((emp, i) => (
        <EmploymentBlock
          key={i}
          index={i}
          emp={emp}
          onUpdate={(e) => updateEmployment(i, e)}
          onRemove={() => removeEmployment(i)}
          canRemove={data.employments.length > 1}
          isExpanded={expandedIndex === i}
          onToggle={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
        />
      ))}

      <button type="button" onClick={addEmployment} className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors px-4 py-2 rounded-md border border-dashed border-primary/30 hover:border-primary/60 w-full justify-center">
        <Plus className="w-4 h-4" /> Add Another Employment
      </button>

      {/* Gaps in employment */}
      <div className="form-section mt-6">
        <h3 className="form-section-title">Gaps in Employment</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Please indicate and explain any gaps in employment since first leaving secondary education. Include specific dates and be sure to account for all gaps, whatever the length. 
        </p>
        <div className="space-y-3">
          {data.gaps.map((gap, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr_auto] gap-3 items-end">
              <FormField label="Date from"><input type="date" className="form-input" value={gap.dateFrom} onChange={(e) => updateGap(i, 'dateFrom', e.target.value)} /></FormField>
              <FormField label="Date to"><input type="date" className="form-input" value={gap.dateTo} onChange={(e) => updateGap(i, 'dateTo', e.target.value)} /></FormField>
              <FormField label="Reason"><input className="form-input" value={gap.reason} onChange={(e) => updateGap(i, 'reason', e.target.value)} /></FormField>
              {data.gaps.length > 1 && (
                <button type="button" onClick={() => removeGap(i)} className="text-destructive hover:text-destructive/80 mb-4 p-1"><Trash2 className="w-4 h-4" /></button>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={addGap} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 mt-2">
          <Plus className="w-3 h-3" /> Add gap
        </button>
      </div>
    </div>
  );
};

export default Step3Employment;
