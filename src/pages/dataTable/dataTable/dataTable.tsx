import * as React from 'react';
import gs from '../../../language/common/en';
import { Icon } from '../../../component/icon';
import { Label, Button } from '@blueprintjs/core';
import { DateRangePicker, DateRange } from '@blueprintjs/datetime';
import { MomentDateRange } from '../../../component/momentDate';
import { DataTable as Datatable, IColumn } from '../../../component/dataTableNew';
import Loader from '../../../component/Loader';
import _ from 'lodash';

interface IDataTableState {
    dateRange?: DateRange;
    displayDatePicker: boolean;
    dataTable1: Array<IDataTableContent>;
    searchValue: string;
    loading: boolean;
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
            dateRange: [undefined, undefined],
            displayDatePicker: false,
            loading: true,
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
        searchValue: '',    
        };
    }

    componentWillMount() {
      this.delayState();
    }  
    
    delayState = () => {
        setTimeout(() => {
            this.setState({
                loading: false
            });
        },         4000000);
    }

    // DataPicker start
    displayDatePicker = () => {
        this.setState({
            displayDatePicker: !this.state.displayDatePicker
        });
    }
    handleDateChange = (dateRange: DateRange) => this.setState({ dateRange });
    // DataPicker End

    searchValue = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    }

    dataTableSearch = (): IDataTableContent[] => {
        let filterData: IDataTableContent[];
        filterData = (!_.isEmpty(this.state.searchValue)) ? 
                        this.state.dataTable1.filter(f => f.department.toLowerCase().includes(this.state.searchValue.toLowerCase())) : 
                        this.state.dataTable1;
        return filterData;
    }

    dataTable1: IColumn<IDataTableContent>[] = [
        { name: 'department', title: 'Department', width: .5 },
        { name: 'caseOpened', title: 'Case Opened', width: .5 },
        { name: 'casePending', title: 'Case Opened', width: .5 },
        { name: 'caseOpened', title: 'Case Opened', width: .5 },
        { name: 'casePending', title: 'Case Opened', width: .5 },
        { name: 'caseOpened', title: 'Case Opened', width: .5 },
        { name: 'casePending', title: 'Case Opened', width: .5 },
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
                <Loader isLoading={this.state.loading}>
                <div className="panelContainer customScrollBar">
                    <div className="panel">
                        <div className="panelHeading">
                            <div className="row">
                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                    <Label className="no-margin" text={gs.DataTable}/>
                                </div>
                                <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                    <Button
                                        className="datePickerButton defaultButton primaryButton pull-right"
                                        onClick={(e) => this.displayDatePicker()}
                                    >
                                        <MomentDateRange range={this.state.dateRange as DateRange} format="YYYY-MM-DD"/>
                                    </Button>
                                    {(this.state.displayDatePicker)
                                        ? <div className="dataPicker">
                                                <DateRangePicker
                                                    onChange={this.handleDateChange}
                                                    shortcuts={false}
                                                    className="datePicker"
                                                />
                                            </div>
                                        : ''}
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
                                    <Label className="no-margin" text={gs.SearchableDataTable}/>
                                </div>
                                <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                    <input 
                                        className="pt-input tableSearch pull-right" 
                                        type="text" 
                                        placeholder={gs.Search} 
                                        dir="auto" 
                                        value={this.state.searchValue} 
                                        onChange={e => this.searchValue(e)} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="panelBody">
                            <Datatable
                                tableMinLineHeight={true}
                                data={this.dataTableSearch()}
                                columns={this.dataTable1}
                                TableHeight="255px"
                            />
                        </div>
                    </div>
                </div>
                </ Loader>
            </React.Fragment>
           
        );
    }
}
export default DataTable;