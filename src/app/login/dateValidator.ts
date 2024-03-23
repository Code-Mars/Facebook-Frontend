import { FormControl } from "@angular/forms";

export class DateValidator{

  static checkDate(checkDate : FormControl) : { 'startDate' : true} | null {
    let value = "" + checkDate.value;
    let date: Date= new Date();
    let checkdate:Date = new Date(value);
    if(checkdate >= date)
    {
      return { 'startDate':true};
    }
    return null;
    
  }
  
}