export interface IVisitModel {
  id?: number;
  visitId?: number;
  patientId: number;
  doctorId: number;
  visitDate: string;
  symptoms: string;
  diagnosis: string;
}
