import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RegisterPatient } from "../register-patient/register-patient";
import { IPatientListModel } from '../../../core/models/interfaces/IPatinet.model';
import { PatientService } from '../../../core/services/patient-service';

@Component({
  selector: 'app-patient-list',
  imports: [RegisterPatient],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList  implements OnInit{

  patinetList :WritableSignal<IPatientListModel[]> = signal([]);
  patinetSrv=  inject(PatientService)

  ngOnInit(): void {
    this.loadPatinets()
  }

  loadPatinets() {
    this.patinetSrv.getAllPatient().subscribe({
      next:(res:IPatientListModel[]) =>{
        this.patinetList.set(res)
      }
    })
  }
}
