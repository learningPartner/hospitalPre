import { Component, inject, signal, WritableSignal } from '@angular/core';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { GlobalConstant } from '../../core/constant/GlobalConstant';
import { MasterService } from '../../core/services/master-service';
import { MedicineService } from '../../core/services/medicine-service';
import { CustomTable } from "../../shared/components/custom-table/custom-table";

@Component({
  selector: 'app-medicines-master',
  imports: [FormField, CustomTable],
  templateUrl: './medicines-master.html',
  styleUrl: './medicines-master.css',
})
export class MedicinesMaster {

  newMedcine = signal({
    name: '',
    strength: '',
    form: '',
  });
  medicineFormList : string[] = GlobalConstant.MEDICINE_FORM_LIST;
  masterSrv  = inject(MasterService);
  medicineSrv  = inject(MedicineService);

  medicineForm=  form(this.newMedcine,(schema)=>{
    required(schema.name,{message:'This is Required'}),
    required(schema.form,{message:'This is Required'}),
    required(schema.strength,{message:'This is Required'}),
    minLength(schema.name, 3,{message:'Min 3 char Needed'})
  });
  medicineList:WritableSignal<any> =  signal([]);

  constructor() {
    this.masterSrv.omSearchChnages$.subscribe({
      next:(searchText:string)=>{
        debugger;
        this.searchMedine(searchText)
      }
    })
  }


  searchMedine(seach:string) {
    this.medicineSrv.getSearchMedicine(seach).subscribe({
      next:(res:any)=>{
        this.medicineList.set(res)
      }
    })
  }
  onSave() {
    const formValue  = this.medicineForm().value();
    
  }
}
