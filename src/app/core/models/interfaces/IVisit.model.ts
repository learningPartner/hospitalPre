export interface IVisitModel {
  id?: number;
  visitId?: number;
  patientId: number;
  doctorId: number;
  visitDate: string;
  symptoms: string;
  diagnosis: string;
   patientName?: number;
  doctorName?: number;
}


export interface IVisitListModel {
  id?: number;
  visitId?: number;
  patientName: number;
  doctorName: number;
  visitDate: string;
  symptoms: string;
  diagnosis: string;
}


export interface IVisitList {
  visitId: number
  patientId: number
  doctorId: number
  doctorName: string
  doctorEmail: string
  doctorMobileNo: string
  doctorPassword: string
  doctorRoleId: number
  doctorRoleName: string
  doctorProjectName: string
  doctorIsActive: boolean
  doctorCreatedOn: string
  visitDate: string
  symptoms: string
  diagnosis: string
  visitStatus: string
  prescriptionItems: IPrescriptionItem[]
}

export interface IPrescriptionItem {
  prescriptionItemId: number
  visitId: number
  medicineId: number
  medicineName: string
  medicineStrength: string
  medicineForm: string
  dosage: string
  frequency: string
  durationDays: number
  instructions: string
}
