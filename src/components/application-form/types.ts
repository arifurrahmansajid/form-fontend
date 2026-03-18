export interface RefereeData {
  name: string;
  relationship: string;
  organisation: string;
  jobTitle: string;
  address: string;
  telephone: string;
  email: string;
}

export interface EmploymentData {
  employerName: string;
  employerAddress: string;
  startDate: string;
  endDate: string;
  positionHeld: string;
  mainDuties: string;
  reasonForLeaving: string;
  noticePeriod: string;
  contactNumber: string;
  contactEmail: string;
}

export interface GapData {
  dateFrom: string;
  dateTo: string;
  reason: string;
}

export interface EducationData {
  secondaryFurtherEducation: string;
  dateFrom: string;
  dateTo: string;
  qualifications: string;
}

export interface TrainingData {
  establishment: string;
  dates: string;
  qualifications: string;
}

export interface ProfessionalMembershipData {
  organisationName: string;
  registrationNo: string;
  registrationDate: string;
}

export interface ApplicationFormData {
  // Position
  positionAppliedFor: string;
  contractType: string;
  willingOtherPosts: string;

  // Personal
  title: string;
  surname: string;
  forenames: string;
  preferredName: string;
  dateOfBirth: string;
  homeAddress: string;
  telephoneMobile: string;
  telephoneHome: string;
  emailAddress: string;
  preferredContact: string;
  nationalInsurance: string;

  // Work entitlement
  workRestrictions: string;
  workRestrictionsDetails: string;

  // References
  referees: RefereeData[];
  contactRefereesBeforeInterview: string;
  grantPermissionReferees: string;

  // Employment
  employments: EmploymentData[];

  // Gaps
  gaps: GapData[];

  // Education
  educations: EducationData[];
  trainings: TrainingData[];
  memberships: ProfessionalMembershipData[];
  statutoryConditions: string;
  statutoryConditionsDetails: string;

  // Reason for applying
  reasonForApplying: string;

  // Secondary & further education details (explicit field)
  secondaryFurtherEducation: string;

  // Additional info
  drivingLicense: string;
  drivingConvictions: string;
  drivingConvictionsDetails: string;
  manualGearbox: string;
  willingToDrive: string;
  knowStaff: string;
  knowStaffDetails: string;
  knowYoungPerson: string;
  knowYoungPersonDetails: string;
  disciplinarySanction: string;
  disciplinarySanctionDetails: string;
  previousDismissal: string;
  previousDismissalDetails: string;

  // Declaration
  declarationSignName: string;
  declarationPrintName: string;
  declarationDate: string;
  understandSignName: string;
  understandPrintName: string;
  understandDate: string;

  // DBS and Criminal Record
  hasCriminalRecord: string;
  criminalRecordDetails: string;
  hasDBSCheck: string;
  dbsDetails: string;

  // CV upload
  cvFileName: string;
  cvFileData: string;
}

export const initialFormData: ApplicationFormData = {
  positionAppliedFor: '',
  contractType: '',
  willingOtherPosts: '',
  title: '',
  surname: '',
  forenames: '',
  preferredName: '',
  dateOfBirth: '',
  homeAddress: '',
  telephoneMobile: '',
  telephoneHome: '',
  emailAddress: '',
  preferredContact: '',
  nationalInsurance: '',
  workRestrictions: '',
  workRestrictionsDetails: '',
  referees: [
    { name: '', relationship: '', organisation: '', jobTitle: '', address: '', telephone: '', email: '' },
    { name: '', relationship: '', organisation: '', jobTitle: '', address: '', telephone: '', email: '' },
    { name: '', relationship: '', organisation: '', jobTitle: '', address: '', telephone: '', email: '' },
  ],
  contactRefereesBeforeInterview: '',
  grantPermissionReferees: '',
  employments: [
    { employerName: '', employerAddress: '', startDate: '', endDate: '', positionHeld: '', mainDuties: '', reasonForLeaving: '', noticePeriod: '', contactNumber: '', contactEmail: '' },
  ],
  gaps: [{ dateFrom: '', dateTo: '', reason: '' }],
  educations: [{ secondaryFurtherEducation: '', dateFrom: '', dateTo: '', qualifications: '' }],
  trainings: [{ establishment: '', dates: '', qualifications: '' }],
  memberships: [{ organisationName: '', registrationNo: '', registrationDate: '' }],
  statutoryConditions: '',
  statutoryConditionsDetails: '',
  reasonForApplying: '',
  secondaryFurtherEducation: '',
  drivingLicense: '',
  drivingConvictions: '',
  drivingConvictionsDetails: '',
  manualGearbox: '',
  willingToDrive: '',
  knowStaff: '',
  knowStaffDetails: '',
  knowYoungPerson: '',
  knowYoungPersonDetails: '',
  disciplinarySanction: '',
  disciplinarySanctionDetails: '',
  previousDismissal: '',
  previousDismissalDetails: '',
  declarationSignName: '',
  declarationPrintName: '',
  declarationDate: '',
  understandSignName: '',
  understandPrintName: '',
  understandDate: '',

  // DBS and Criminal Record
  hasCriminalRecord: '',
  criminalRecordDetails: '',
  hasDBSCheck: '',
  dbsDetails: '',

  // CV upload
  cvFileName: '',
  cvFileData: '',
};
