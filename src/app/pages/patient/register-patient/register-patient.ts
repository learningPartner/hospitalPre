import { Component, inject, Input } from '@angular/core';
import { PatientModel } from '../../../core/models/classes/Pateint.model';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../../core/services/patient-service';
import { LoginUserModel } from '../../../core/models/interfaces/User.Model';
import { IPatientListModel } from '../../../core/models/interfaces/IPatinet.model';

@Component({
  selector: 'app-register-patient',
  imports: [FormsModule],
  templateUrl: './register-patient.html',
  styleUrl: './register-patient.css',
})
export class RegisterPatient {

  @Input() showBanner: boolean = true;
  newPatientObj: PatientModel = new PatientModel();
  pateintSrv = inject(PatientService);

  onRegister() {
    debugger;
    this.pateintSrv.createNewPatient(this.newPatientObj).subscribe({
      next:(res: IPatientListModel) =>{
        debugger;
        alert("Patient Registration Succes");
        this.newPatientObj = new PatientModel();
      },
      error:(error:any)=>{
        alert("API Error")
      }
    })
  }

}
