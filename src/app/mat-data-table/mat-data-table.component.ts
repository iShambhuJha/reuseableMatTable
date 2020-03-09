import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mat-data-table',
  templateUrl: './mat-data-table.component.html',
  styleUrls: ['./mat-data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatDataTableComponent implements OnInit, AfterViewInit {
  title = 'materialDatatable';
  @Input() tableData;
  @Input() tableColumn: string[];
  columnFilter = new FormControl();
  dataSource;
  filterValues:any = {};
  constructor() { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.tableColumn.map(ele=>{
      this.filterValues[ele]=''
    });
    this.columnFilter.valueChanges.subscribe((positionFilterValue) => {
      console.log(positionFilterValue);
      this.tableColumn.map(ele=>{
        this.filterValues[ele] = positionFilterValue;
      })
      this.dataSource.filter = JSON.stringify(this.filterValues);
     // this.filteredValues['topFilter'] = false;
    });

    this.dataSource.filterPredicate = this.createFilter();
  }
ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  console.log('tableColumn',this.paginator);
}

createFilter(): (data: any, filter: string) => boolean {
  let filterFunction = function(data, filter): boolean {
    let searchTerms = JSON.parse(filter);
    return  data.name.toLowerCase().indexOf(searchTerms.name) !== -1
      && data.symbol.toString().toLowerCase().indexOf(searchTerms.symbol) !== -1
      // && data.weight.toLowerCase().indexOf(searchTerms.weight) !== -1
      // && data.position.toLowerCase().indexOf(searchTerms.position) !== -1;
  }
  return filterFunction;
}
}
