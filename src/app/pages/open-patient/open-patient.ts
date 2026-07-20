import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../core/services/patient-service';
import { IPatientListModel } from '../../core/models/interfaces/IPatinet.model';

@Component({
  selector: 'app-open-patient',
  imports: [],
  templateUrl: './open-patient.html',
  styleUrl: './open-patient.css',
})
export class OpenPatient {
  activatedRoute = inject(ActivatedRoute);
  currentPatientId: number = 0;
  patientSrv = inject(PatientService);
  patientData: WritableSignal<IPatientListModel> = signal({
    address: '',
    dateOfBirth: '',
    fullName: '',
    gender: '',
    patientId: 0,
    phone: '',
  });

  constructor() {
    this.activatedRoute.params.subscribe({
      next: (param: any) => {
        debugger;
        this.currentPatientId = param.patientId;
        this.getPatientById()
      },
    });
  }

  getPatientById() {
    this.patientSrv.getPatientById(this.currentPatientId).subscribe({
      next: (patient: IPatientListModel) => {
        this.patientData.set(patient)
      },
    });
  }
}
