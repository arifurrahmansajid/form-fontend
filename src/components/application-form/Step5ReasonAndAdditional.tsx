import { ApplicationFormData } from './types';
import { FormField, YesNoRadio, ConditionalDetails } from './FormField';

interface Props {
  data: ApplicationFormData;
  onChange: (data: Partial<ApplicationFormData>) => void;
}

const Step5ReasonAndAdditional = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-6">
      <div className="form-section">
        <h3 className="form-section-title">Reason for Applying</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Please provide as much evidence as possible to show how your skills, abilities, knowledge, and experience meet the selection criteria in the job description and person specification relevant to the role you are applying for.
        </p>
        <FormField label="Reason for applying" required>
          <textarea
            className="form-input min-h-[200px] resize-y"
            value={data.reasonForApplying}
            onChange={(e) => onChange({ reasonForApplying: e.target.value })}
          />
        </FormField>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Additional Information</h3>

        <YesNoRadio label="Do you hold a current UK or EU driving licence?" name="drivingLicense" value={data.drivingLicense} required onChange={(v) => onChange({ drivingLicense: v })} />

        <YesNoRadio label="Do you have any driving convictions?" name="drivingConvictions" value={data.drivingConvictions} required onChange={(v) => onChange({ drivingConvictions: v })} />
        <ConditionalDetails show={data.drivingConvictions === 'Yes'} required label="If yes, please give details including dates:" value={data.drivingConvictionsDetails} onChange={(v) => onChange({ drivingConvictionsDetails: v })} />

        <YesNoRadio label="Can you drive cars with a manual gearbox?" name="manualGearbox" value={data.manualGearbox} required onChange={(v) => onChange({ manualGearbox: v })} />

        <YesNoRadio label="Are you willing to drive young people on off-site activities and appointments?" name="willingToDrive" value={data.willingToDrive} required onChange={(v) => onChange({ willingToDrive: v })} />

        <YesNoRadio label="Do you know any member of staff who works for the company?" name="knowStaff" value={data.knowStaff} required onChange={(v) => onChange({ knowStaff: v })} />
        <ConditionalDetails show={data.knowStaff === 'Yes'} required value={data.knowStaffDetails} onChange={(v) => onChange({ knowStaffDetails: v })} />

        <YesNoRadio label="Do you know any young person in our care?" name="knowYoungPerson" value={data.knowYoungPerson} required onChange={(v) => onChange({ knowYoungPerson: v })} />
        <ConditionalDetails show={data.knowYoungPerson === 'Yes'} required label="If yes, please provide details:" value={data.knowYoungPersonDetails} onChange={(v) => onChange({ knowYoungPersonDetails: v })} />

        <YesNoRadio label="Have you ever been the subject of a formal disciplinary sanction or are you in the process of ongoing disciplinary proceedings?" name="disciplinarySanction" value={data.disciplinarySanction} required onChange={(v) => onChange({ disciplinarySanction: v })} />
        <ConditionalDetails show={data.disciplinarySanction === 'Yes'} required label="If yes, please provide details:" value={data.disciplinarySanctionDetails} onChange={(v) => onChange({ disciplinarySanctionDetails: v })} />

        <YesNoRadio label="Have you ever been dismissed from any previous employment?" name="previousDismissal" value={data.previousDismissal} required onChange={(v) => onChange({ previousDismissal: v })} />
        <ConditionalDetails show={data.previousDismissal === 'Yes'} required label="If yes, please indicate which employment and specify the reasons:" value={data.previousDismissalDetails} onChange={(v) => onChange({ previousDismissalDetails: v })} />
      </div>
    </div>
  );
};

export default Step5ReasonAndAdditional;
