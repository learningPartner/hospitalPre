import { Component, signal } from '@angular/core';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { GlobalConstant } from '../../core/constant/GlobalConstant';

@Component({
  selector: 'app-medicines-master',
  imports: [FormField],
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

  medicineForm=  form(this.newMedcine,(schema)=>{
    required(schema.name,{message:'This is Required'}),
    required(schema.form,{message:'This is Required'}),
    required(schema.strength,{message:'This is Required'}),
    minLength(schema.name, 3,{message:'Min 3 char Needed'})
  });


  onSave() {
    const formValue  = this.medicineForm().value();
    
  }
}
