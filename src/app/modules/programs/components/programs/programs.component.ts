import { Component,Input, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import {
  ProgramsService,
  SearchParams,
  fetchResponse
} from "./../../../../services/api/programs.service";
import { Program } from "./../../../../models/program.model";
import { SdkTableColumn } from "./../../../../sdk/features/table/table.model";
import { ProgramsState, formIdProgram, formRouteProgram } from "./../../../../state/programs/programs.state";
import { ConstantState } from "./../../../../state/constants/constants.state";
import { FetchPrograms } from "./../../../../state/programs/programs.actions";
import { country } from "./../../../../shared/constants/constantTypeCodes";
import {
  parseDate,
  parseDateTime
} from "./../../../../shared/functions/parsing.functions";
import { parseLastModified } from "./../../../../sdk/features/table/table.functions";
import { Constant } from "./../../../../models/constant.model";
import { ConstantParsingService } from "./../../../../services/constant-parsing.service";
import { Router } from "@angular/router";
import { EditButtonRenderer } from "./../../../../shared/cell-renderers/cell-renderers.component";
import { SetForm } from '../../../../sdk/features/master-form/master-form.actions';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  formId =  formIdProgram;
  formRoute = formRouteProgram;
  @Select(ConstantState.constantValues)
  constantValues$: Observable<Constant[]>;
  @Select(ProgramsState.programs)
  rows$: Observable<any[]>;
  rows: any[];
  @Select(ProgramsState.totalRecords)
  totalRecords$: Observable<number>;
  @Select(ProgramsState.isFetching)
  loading$: Observable<boolean>;
  constantValues: Constant[] = [];
  tableId = "Program Master";
  addRoute = "/programs/add-program";
  addLabel = "Add Program";
  searchParams = new SearchParams();
  searchInputExists: boolean = true;
  tableHeight: string = "80vh";
  rowHeight: number = 36;
  editColumnEnabled: boolean = true;
  onEdit = (recordId) => {
    this.store.dispatch(new SetForm(this.formId, recordId));
    this.router.navigateByUrl(this.formRoute);
  }
  editColumn: SdkTableColumn = {
    field: "edit",
    headerName: "Edit",
    width: 55,
    pinned: "left",
    cellRenderer: "editButtonRenderer",
    cellRendererParams: {
      onEdit: this.onEdit,
    },
    sortable: false
  };
  frameworkComponents: Object = {
    editButtonRenderer: EditButtonRenderer
  };
  columns: SdkTableColumn[] = [
    {
      field: "programName",
      headerName: `Program Name`,
      sortable: true,
      resizable: true
    },
    {
      field: "startDate",
      headerName: "Start Date",
      cellRenderer: params => {
        return parseDate(params.value);
      },
      sortable: true,
      resizable: true
    },
    {
      field: "endDate",
      headerName: "End Date",
      cellRenderer: params => {
        return parseDate(params.value);
      },
      sortable: true,
      resizable: true
    },
    {
      field: "venue",
      headerName: "Venue",
      sortable: true,
      resizable: true
    },
    {
      field: "city",
      headerName: "City",
      sortable: true,
      resizable: true
    },
    {
      field: "state",
      headerName: "State",
      sortable: true,
      resizable: true
    },
    {
      field: "country",
      headerName: "Country",
      cellRenderer: params => {
        return this.parseConstant(country, params.value);
      },
      sortable: true,
      resizable: true
    }
  ];
  fetchPrograms(searchParams) {
    this.store.dispatch(new FetchPrograms(searchParams));
  }
  parseConstant(constantTypeCode, constantCode): string {
    return this.constantService.parseConstant(
      this.constantValues,
      constantTypeCode,
      constantCode
    );
  }

  constructor(
    private store: Store,
    private programsService: ProgramsService,
    private constantService: ConstantParsingService,
    private router: Router
  ) {
    this.constantValues$.subscribe(value => {
      this.constantValues = value;
    });
    this.rows$.subscribe(value => {
      this.rows = value;
    });
    //Injecting the edit column if it is enabled
    if (this.editColumnEnabled) {
      this.columns = [this.editColumn].concat(this.columns);
    }
  }

  ngOnInit() {
    this.fetchPrograms(this.searchParams);
  }

}


