import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PatientService } from '../../core/services/patient-service';
import { IPatientListModel } from '../../core/models/interfaces/IPatinet.model';
import { Observable } from 'rxjs';
import { UserService } from '../../core/services/user-service';
import { LoginUserModel } from '../../core/models/interfaces/User.Model';
import { GlobalConstant } from '../../core/constant/GlobalConstant';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VisitService } from '../../core/services/visit-service';
import { IVisitModel } from '../../core/models/interfaces/IVisit.model';
import { HideShowBtn } from '../../shared/directives/hide-show-btn';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-visits',
  imports: [AsyncPipe, DatePipe, ReactiveFormsModule, HideShowBtn, RouterLink],
  templateUrl: './visits.html',
  styleUrl: './visits.css',
})
export class Visits implements OnInit {
  //serv  ice
  patinetSrv = inject(PatientService);
  userSrv = inject(UserService);
  visitSrv = inject(VisitService);

  isFormOpen: boolean = false;
  visitForm!: FormGroup;
  selectedVisitId: number = 0;
  isSubmitted: boolean = false;

  //Signals

  //voiechild

  visitList: WritableSignal<IVisitModel[]> = signal([]);

  patientList$ : Observable<IPatientListModel[]> = new Observable<IPatientListModel[]>();
  doctorList$ : Observable<LoginUserModel[]> = new Observable<LoginUserModel[]>();

  router = inject(Router)
  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }
  
  ngOnInit(): void { 
    this.patientList$ = this.patinetSrv.getAllPatient();
    this.doctorList$ =  this.userSrv.filterUsers(GlobalConstant.ROLE.DOCTOR);
    this.getAllVisits();
  }

  openPatient(id:number) {
    this.router.navigate(['/admin/open-patient',id])
  }

  initializeForm() {
    this.visitForm = this.formBuilder.group({
      patientId: [0, [Validators.required, Validators.min(1)]],
      doctorId: [0, [Validators.required, Validators.min(1)]],
      visitDate: ['', Validators.required],
      symptoms: ['', [Validators.required, Validators.minLength(3)]],
      diagnosis: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  toggleFormVisibility() {
    this.isFormOpen = !this.isFormOpen;

    if (!this.isFormOpen) {
      this.onReset();
    }
  }

  getAllVisits() {
    this.visitSrv.getAllVisits().subscribe({
      next: (res: IVisitModel[]) => {
        this.visitList.set(res);
      },
    });
  }

  onSaveVisit() {
    this.isSubmitted = true;

    if (this.visitForm.invalid) {
      this.visitForm.markAllAsTouched();
      return;
    }

    const formValue = this.visitForm.value;
    const visitObj: IVisitModel = {
      patientId: Number(formValue.patientId),
      doctorId: Number(formValue.doctorId),
      visitDate: new Date(formValue.visitDate).toISOString(),
      symptoms: formValue.symptoms,
      diagnosis: formValue.diagnosis,
    };

    if (this.selectedVisitId === 0) {
      this.visitSrv.createVisit(visitObj).subscribe({
        next: () => {
          alert('Visit Created Successfully');
          this.getAllVisits();
          this.onReset();
        },
      });
    } else {
      this.visitSrv.updateVisit(this.selectedVisitId, visitObj).subscribe({
        next: () => {
          alert('Visit Updated Successfully');
          this.getAllVisits();
          this.onReset();
        },
      });
    }
  }

  onEditVisit(visit: IVisitModel) {
    this.selectedVisitId = this.getVisitId(visit);
    this.isFormOpen = true;
    this.isSubmitted = false;

    this.visitForm.patchValue({
      patientId: visit.patientId,
      doctorId: visit.doctorId,
      visitDate: this.toDateTimeLocalValue(visit.visitDate),
      symptoms: visit.symptoms,
      diagnosis: visit.diagnosis,
    });
  }

  onDeleteVisit(visit: IVisitModel) {
    const visitId = this.getVisitId(visit);

    if (visitId === 0 || !confirm('Are you sure you want to delete this visit?')) {
      return;
    }

    this.visitSrv.deleteVisit(visitId).subscribe({
      next: () => {
        alert('Visit Deleted Successfully');
        this.getAllVisits();
      },
    });
  }

  onReset() {
    this.selectedVisitId = 0;
    this.isSubmitted = false;
    this.visitForm.reset({
      patientId: 0,
      doctorId: 0,
      visitDate: '',
      symptoms: '',
      diagnosis: '',
    });
  }

  getControlError(controlName: string): boolean {
    const control = this.visitForm.get(controlName);
    return !!control && control.invalid && (control.touched || this.isSubmitted);
  }

  getVisitId(visit: IVisitModel): number {
    return visit.visitId ?? visit.id ?? 0;
  }

  private toDateTimeLocalValue(dateValue: string): string {
    if (!dateValue) {
      return '';
    }

    const date = new Date(dateValue);
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 16);
  }
}
