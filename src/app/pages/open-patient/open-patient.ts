import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../core/services/patient-service';
import { IPatientListModel } from '../../core/models/interfaces/IPatinet.model';
import { VisitService } from '../../core/services/visit-service';
import { IVisitList } from '../../core/models/interfaces/IVisit.model';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MedicineService } from '../../core/services/medicine-service';

@Component({
  selector: 'app-open-patient',
  imports: [NgClass, DatePipe, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './open-patient.html',
  styleUrl: './open-patient.css',
})
export class OpenPatient implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  currentPatientId: number = 0;
  visitSrv = inject(VisitService);
  patientSrv = inject(PatientService);
  medicineSr = inject(MedicineService);
  patientData: WritableSignal<IPatientListModel> = signal({
    address: '',
    dateOfBirth: '',
    fullName: '',
    gender: '',
    patientId: 0,
    phone: '',
  });
  visitList: WritableSignal<IVisitList[]> = signal([]);
  medicineList: WritableSignal<any[]> = signal([]);
  selectedVisit!: IVisitList;

  newPrescriptionForm!: FormGroup;

  constructor() {
    this.initializeForm();
    this.activatedRoute.params.subscribe({
      next: (param: any) => {
        debugger;
        this.currentPatientId = param.patientId;
        this.getPatientById();
        this.getVisitsByPatientId();
      },
    });
  }

  ngOnInit(): void {
    this.getAllMedicine();
  }

  initializeForm() {
    this.newPrescriptionForm = new FormGroup({
      visitId: new FormControl(''),
      medicineId: new FormControl(''),
      dosage: new FormControl(''),
      frequency: new FormControl(''),
      durationDays: new FormControl(''),
      instructions: new FormControl(''),
    });
  }

  getPatientById() {
    this.patientSrv.getPatientById(this.currentPatientId).subscribe({
      next: (patient: IPatientListModel) => {
        this.patientData.set(patient);
      },
    });
  }

  getAllMedicine() {
    this.medicineSr.getAllMedicine().subscribe({
      next: (patient: any) => {
        this.medicineList.set(patient);
      },
    });
  }

  getVisitsByPatientId() {
    this.visitSrv.getPatientVisitById(this.currentPatientId).subscribe({
      next: (res: IVisitList[]) => {
        this.visitList.set(res);
        const notClosedVisit =  res.filter(m=> m.visitStatus !="Closed");
        debugger;
        if(notClosedVisit.length ==0) {
           this.selectedVisit = res[0];
        } else {
           this.selectedVisit = notClosedVisit[0];
        }
       
      },
    });
  }

  onSelectVisit(visitData: IVisitList) {
    this.selectedVisit = visitData;
  }

  onSave() {
    const formValue = this.newPrescriptionForm.value;
    formValue.visitId = this.selectedVisit.visitId;
    this.visitSrv.addPrescription(formValue).subscribe({
      next: (result: any) => {
        alert('Prescription Added Success');
        this.getVisitsByPatientId();
      },
    });
  }

  onStatusChange(event: any) {
    const obj = {
      visitStatus: event.target.value,
    };
    this.visitSrv.chnageStatus(obj,this.selectedVisit.visitId).subscribe({
      next:(res:any)=>{
        alert("Visit Status Updated Success");
        this.getVisitsByPatientId();
      }
    })
  }
}
