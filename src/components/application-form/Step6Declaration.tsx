
import { ChangeEvent } from 'react';
import { ApplicationFormData } from './types';
import { FormField, YesNoRadio, ConditionalDetails } from './FormField';

interface Props {
  data: ApplicationFormData;
  onChange: (data: Partial<ApplicationFormData>) => void;
}

const Step6Declaration = ({ data, onChange }: Props) => {
  const handleCvUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      onChange({ cvFileName: '', cvFileData: '' });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onChange({ cvFileName: file.name, cvFileData: result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <h3 className="form-section-title">Data Protection</h3>
        <p className="text-sm text-muted-foreground">
          In accordance with the Data Protection Act 2018, this organisation will only use the information given on this application form to determine your suitability for this post. We will keep application forms of unsuccessful candidates for six months before being destroyed.
        </p>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Declaration</h3>
        <div className="p-4 rounded-md mb-6 text-sm" style={{ background: 'hsl(var(--accent))' }}>
          <p className="mb-3">
            Disqualification from being involved in the management of or being employed by a children's home arises when a person is disqualified from privately fostering a child. The circumstances that give rise to disqualification from privately fostering a child are set out in section 27 of the Children Act and the regulations made under it.
          </p>
          <p>
            A full list of the circumstances that bring about disqualification from privately fostering a child can be found in Schedule 1 of the Disqualification from Caring for Children (England) Regulations 2002.
          </p>
        </div>

        <div className="p-4 rounded-md border-l-4 mb-6" style={{ borderLeftColor: 'hsl(var(--primary))' }}>
          <p className="text-sm font-medium mb-4">
            I declare that the information I have given on this form is complete and accurate and that:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside mb-4">
            <li>I am not barred or disqualified from privately fostering a child, or from working with vulnerable groups, children, and young people.</li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
            <FormField label="Sign name" required>
              <input className="form-input" value={data.declarationSignName} onChange={(e) => onChange({ declarationSignName: e.target.value })} />
            </FormField>
            <FormField label="Print name" required>
              <input className="form-input" value={data.declarationPrintName} onChange={(e) => onChange({ declarationPrintName: e.target.value })} />
            </FormField>
            <FormField label="Date" required>
              <input type="date" className="form-input" value={data.declarationDate} onChange={(e) => onChange({ declarationDate: e.target.value })} />
            </FormField>
          </div>
        </div>

        <div className="p-4 rounded-md border-l-4 mb-6" style={{ borderLeftColor: 'hsl(var(--primary))' }}>
          <p className="text-sm font-medium mb-4">
            I understand that to knowingly give false information or to leave out any relevant information could result in:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside mb-4">
            <li>The withdrawal of any offer of appointment, or</li>
            <li>My dismissal at any time in the future, and possible criminal prosecution</li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
            <FormField label="Sign name" required>
              <input className="form-input" value={data.understandSignName} onChange={(e) => onChange({ understandSignName: e.target.value })} />
            </FormField>
            <FormField label="Print name" required>
              <input className="form-input" value={data.understandPrintName} onChange={(e) => onChange({ understandPrintName: e.target.value })} />
            </FormField>
            <FormField label="Date" required>
              <input type="date" className="form-input" value={data.understandDate} onChange={(e) => onChange({ understandDate: e.target.value })} />
            </FormField>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">DBS and Criminal Record</h3>
          <YesNoRadio
            label="Have you ever had a criminal conviction, caution, reprimand or warning?"
            name="hasCriminalRecord"
            value={data.hasCriminalRecord}
            required
            onChange={(v) => onChange({ hasCriminalRecord: v })}
          />
          <ConditionalDetails
            show={data.hasCriminalRecord === 'Yes'}
            required
            label="If yes, please provide details (including dates and outcomes):"
            value={data.criminalRecordDetails}
            onChange={(v) => onChange({ criminalRecordDetails: v })}
          />

          <YesNoRadio
            label="Do you have a current DBS check?"
            name="hasDBSCheck"
            value={data.hasDBSCheck}
            required
            onChange={(v) => onChange({ hasDBSCheck: v })}
          />
          <ConditionalDetails
            show={data.hasDBSCheck === 'Yes'}
            required
            label="If yes, please provide DBS type and reference details:"
            value={data.dbsDetails}
            onChange={(v) => onChange({ dbsDetails: v })}
          />
        </div>

        {/* CV upload section disabled per request */}
        {/*
        <div className="form-section">
          <h3 className="form-section-title">CV Upload</h3>
          <FormField label="Upload CV" required>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="form-input"
              onChange={handleCvUpload}
            />
          </FormField>
          {data.cvFileName && (
            <p className="text-sm text-muted-foreground">Selected file: {data.cvFileName}</p>
          )}
        </div>
        */}
      </div>
    </div>
  );
};

export default Step6Declaration;
