import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  age:number;
  gender:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', age:23,gender:'Other'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', age:13,gender:'Male'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', age:20,gender:'Female'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', age:29,gender:'Other'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', age:23,gender:'Female'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', age:55,gender:'Female'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', age:99,gender:'Other'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', age:11,gender:'Male'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', age:89,gender:'Male'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', age:76,gender:'Female'},
];
@Component({
  selector: 'app-component-three',
  templateUrl: './component-three.component.html',
  styleUrls: ['./component-three.component.css']
})
export class ComponentThreeComponent implements OnInit {
  tableData: PeriodicElement[];
  tableColumn:any=[];

  constructor() { }

  ngOnInit() {
    this.tableData = ELEMENT_DATA;
    var object = this.tableData[0];
    this.tableColumn = Object.keys(object);
  }


}
