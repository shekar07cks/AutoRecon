import * as React from 'react';
import gs from '../../../language/common/en';
import { Icon } from '../../../component/icon';
import { Label, Checkbox } from '@blueprintjs/core';
import { DataTable as Datatable, IColumn, IAction } from '../../../component/dataTableNew';
// import _ from 'lodash';

interface IDataTableState {
    dataTable1: Array<IDataTableContent>;
    dataTable2: Array<IDataTableContent>;
}

interface IDataTableContent {
    key: string;
    department: string;
    caseOpened: string;
    casePending: string;
}

interface IDataTableProps {}

class DataTable extends React.Component < IDataTableProps, IDataTableState > {
    constructor(props: IDataTableProps) {
        super(props);
        this.state = {
            dataTable1: [
                { key: '1', department: 'Department 1', caseOpened: '15', casePending: '5' },
                { key: '2', department: 'Department 2', caseOpened: '8', casePending: '3' },
                { key: '3', department: 'Department 3', caseOpened: '20', casePending: '5' },
                { key: '4', department: 'Department 4', caseOpened: '15', casePending: '10' },
                { key: '5', department: 'Department 5', caseOpened: '15', casePending: '5' },
                { key: '6', department: 'Department 6', caseOpened: '8', casePending: '3' },
                { key: '7', department: 'Department 7', caseOpened: '20', casePending: '5' },
                { key: '8', department: 'Department 8', caseOpened: '15', casePending: '10' },
                { key: '9', department: 'Department 9', caseOpened: '15', casePending: '5' },
            ],
            dataTable2: [
                { key: '1', department: 'Department 1', caseOpened: '15', casePending: '5' },
                { key: '2', department: 'Department 2', caseOpened: '8', casePending: '3' },
                { key: '3', department: 'Department 3', caseOpened: '20', casePending: '5' },
                { key: '4', department: 'Department 4', caseOpened: '15', casePending: '10' },
                { key: '5', department: 'Department 5', caseOpened: '15', casePending: '5' },
                { key: '6', department: 'Department 6', caseOpened: '8', casePending: '3' },
                { key: '7', department: 'Department 7', caseOpened: '20', casePending: '5' },
                { key: '8', department: 'Department 8', caseOpened: '15', casePending: '10' },
                { key: '9', department: 'Department 9', caseOpened: '15', casePending: '5' },
            ],    
        };
    }

    dataTable1: IColumn<IDataTableContent>[] = [
        {
            name: 'Checkbox', title: '', width: 10, renderer: (row: IDataTableContent) => {
                return <Checkbox defaultChecked={false} key={row.key} />;
            }
        },
        { name: 'department', title: 'Department', width: 100 },
        { name: 'caseOpened', title: 'Case Opened', width: 100 },
        { name: 'casePending', title: 'Case Opened', width: 100 },
        { name: 'caseOpened', title: 'Case Opened', width: 100 },
        { name: 'casePending', title: 'Case Opened', width: 100 },
        { name: 'caseOpened', title: 'Case Opened', width: 100 },
        { name: 'casePending', title: 'Case Opened', width: 100 },
    ];

    actions: IAction<IDataTableContent>[] = [
        { name: 'Edit', icon: 'edit' },
        { name: 'View', icon: 'eye-open' }
    ];

    dataTable2: IColumn<IDataTableContent>[] = [
        { name: 'department', title: 'Department', width: 100 },
        { name: 'caseOpened', title: 'Case Opened', width: 100 },
        { name: 'casePending', title: 'Case Opened', width: 100 },
        { name: 'caseOpened', title: 'Case Opened', width: 100 },
        { name: 'casePending', title: 'Case Opened', width: 100 },
        { name: 'caseOpened', title: 'Case Opened', width: 100 },
    ];

    render() {
        return (
            <React.Fragment>
                <div className="row actionBar">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <ul className="pt-breadcrumbs">
                            <span className="breadcrumbIcon">
                                <Icon className="sideBarIcons" icon={['fas', 'tachometer-alt']}/></span>
                            <li>
                                <a className="pt-breadcrumb">{gs.DataTable}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="panelContainer customScrollBar">
                    <div className="panel m-t-20">
                        <div className="panelHeading">
                            <div className="row">
                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                    <Label className="no-margin" text={gs.DataTableWithCheckBox}/>
                                </div>
                            </div>
                        </div>
                        <div className="panelBody">
                            <Datatable
                                tableMinLineHeight={true}
                                data={this.state.dataTable1}
                                columns={this.dataTable1}
                                TableHeight="255px"
                            />
                        </div>
                    </div>
                    <div className="panel m-t-20">
                        <div className="panelHeading">
                            <div className="row">
                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                    <Label className="no-margin" text={gs.DataTableWithActions}/>
                                </div>
                            </div>
                        </div>
                        <div className="panelBody">
                            <Datatable
                                tableMinLineHeight={true}
                                data={this.state.dataTable2}
                                columns={this.dataTable2}
                                actions={this.actions}
                                TableHeight="255px"
                            />
                        </div>
                    </div>

                </div>
            </React.Fragment >
        );
    }
}
export default DataTable;