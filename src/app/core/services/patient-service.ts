import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { PatientModel } from '../models/classes/Pateint.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GlobalConstant } from '../constant/GlobalConstant';
import { IPatientListModel } from '../models/interfaces/IPatinet.model';

@Service()
export class PatientService {
  http = inject(HttpClient);

  createNewPatient(obj: PatientModel): Observable<IPatientListModel> {
    return this.http.post<IPatientListModel>(
      environment.API_URL + GlobalConstant.API_METHODS.PATIENT,
      obj,
    );
  }

  getAllPatient(): Observable<IPatientListModel[]> {
    return this.http.get<IPatientListModel[]>(
      environment.API_URL + GlobalConstant.API_METHODS.PATIENT,
    );
  }

  getPatientById(id: number): Observable<IPatientListModel> {
    return this.http.get<IPatientListModel>(
      environment.API_URL + GlobalConstant.API_METHODS.GET_PATIENT_BY_ID + id,
    );
  }
}
