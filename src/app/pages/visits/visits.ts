import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { PatientService } from '../../core/services/patient-service';
import { IPatientListModel } from '../../core/models/interfaces/IPatinet.model';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../core/services/user-service';
import { LoginUserModel } from '../../core/models/interfaces/User.Model';
import { GlobalConstant } from '../../core/constant/GlobalConstant';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-visits',
  imports: [AsyncPipe],
  templateUrl: './visits.html',
  styleUrl: './visits.css',
})
export class Visits implements OnInit, OnDestroy {
  //serv  ice
  patinetSrv = inject(PatientService);
  userSrv = inject(UserService);

  sub: string = '';

  //Signals

  //voiechild

  patientList: WritableSignal<IPatientListModel[]> = signal([]);
  doctorList: WritableSignal<LoginUserModel[]> = signal([]);

  subscription: Subscription = new Subscription();

  subscriptionList: Subscription[] = [];

  patientList$ : Observable<IPatientListModel[]> = new Observable<IPatientListModel[]>();
  doctorList$ : Observable<LoginUserModel[]> = new Observable<LoginUserModel[]>();
  
  ngOnInit(): void { 
    this.patientList$ = this.patinetSrv.getAllPatient();
    this.doctorList$ =  this.userSrv.filterUsers(GlobalConstant.ROLE.DOCTOR)
  }

  // getAllPatients() {
  //   this.subscription = this.patinetSrv.getAllPatient().subscribe({
  //     next:(res:IPatientListModel[]) =>{
  //       this.patientList.set(res)
  //     }
  //   })
  // }

  // getAllPatients() {
  //   const subs = this.patinetSrv.getAllPatient().subscribe({
  //     next: (res: IPatientListModel[]) => {
  //       this.patientList.set(res);
  //     },
  //   });
  //   this.subscriptionList.push(subs);
  // }

  // getAllDoctors() {
  //   this.subscriptionList.push(
  //     this.userSrv.filterUsers(GlobalConstant.ROLE.DOCTOR).subscribe({
  //       next: (res: LoginUserModel[]) => {
  //         this.doctorList.set(res);
  //       },
  //     }),
  //   );
  // }

  ngOnDestroy(): void {
     //for Single
    this.subscription.unsubscribe(); 
   
    //for multple
    this.subscriptionList.forEach(element => {
      element.unsubscribe();
    });
  }
}
