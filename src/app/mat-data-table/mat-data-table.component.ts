import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatButtonToggle } from '@angular/material';

@Component({
  selector: 'app-mat-data-table',
  templateUrl: './mat-data-table.component.html',
  styleUrls: ['./mat-data-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatDataTableComponent implements OnInit, AfterViewInit {
  title = 'materialDatatable';
  //toppingList: string[] = ['position', 'name', 'weight', 'symbol'];
  @Input() tableData;
  @Input() tableColumn: string[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('group', { static: true }) toggle: MatButtonToggle;
  columnFilter = new FormControl();

  dataSource;
  filterValues: any = {};
  toppingList: string[];

  constructor() { }

  ngOnInit() {
    // Material Table data source
    this.dataSource = new MatTableDataSource(this.tableData);
    this.tableColumn.map(ele => {
      this.filterValues[ele] = '';
    });
    // Material dataTable column wise filter
    this.columnFilter.valueChanges.subscribe((positionFilterValue) => {
      console.log(positionFilterValue);
      this.tableColumn.map(ele => {
        this.filterValues[ele] = positionFilterValue;
      })
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.dataSource.filterPredicate = this.createFilter();
    this.toppingList = this.tableColumn;
  }
  ngAfterViewInit(): void {
    // Datatable sorting and pagination
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // function to filter data source as per the user input
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.symbol.toString().toLowerCase().indexOf(searchTerms.symbol) !== -1
      // && data.weight.toLowerCase().indexOf(searchTerms.weight) !== -1
      // && data.position.toLowerCase().indexOf(searchTerms.position) !== -1;
    }
    return filterFunction;
  }
  columnClick(colName: string) {
    const colIndex = this.tableColumn.findIndex(col => col === colName);

    if (colIndex > 0) {
      // column is currently shown in the table, so we remove it
      this.tableColumn.splice(colIndex, 1);
    } else {
      // column is not in the table, so we add it
      this.tableColumn.push(colName);
    }
  }
}
