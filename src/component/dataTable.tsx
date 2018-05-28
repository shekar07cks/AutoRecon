import * as React from 'react';
import { Cell, Column, Table, EditableCell, RegionCardinality, IStyledRegionGroup } from '@blueprintjs/table';
import { Button, ButtonGroup } from '@blueprintjs/core';
import _ from 'lodash';
import { IconName } from '@blueprintjs/icons';
import ContainerDimensions from 'react-container-dimensions';
import { InputField } from '../component/inputField';
import { Checkbox } from '@blueprintjs/core';
import { ColumnHeaderCell } from '@blueprintjs/table/lib/esm/headers/columnHeaderCell';

export { SelectionModes } from '@blueprintjs/table';

interface IDataTableState {
    tableCellHeight: boolean;
    loading?: boolean;
}

export interface IColumn<T> {
    name: string;
    title: string;
    width?: number;
    renderer?: (row: T) => string | JSX.Element;
    editable?: boolean;
    validate?: boolean;
    tabLink?: boolean;
}
export interface IAction<T> {
    name: string;
    visibleCallBack?(row: T): boolean;
    icon: IconName | JSX.Element;
    askConfirm?: boolean;
    visible?: boolean;
}

interface IRow {
    rowGroup?: string | number;
}

interface IDataTableProps<T extends IRow> {
    columns: Array<IColumn<T>>;
    data: Array<T>;
    actions?: IAction<T>[];
    rowKey?: string;
    pageSize?: number;
    className?: string;
    onAction?: (action: string, row: T) => void;
    enableRowReordering?: boolean;
    handleRowsReordered?: (oldIndex: number, newIndex: number, length: number) => void;
    selectionModes?: RegionCardinality[];
    TableHeight?: string;
    frozenColumns?: number;
    frozenRow?: number;
    search?: boolean;
    exception?: boolean;
    rowAction?: () => void;
    tableMinLineHeight?: boolean;
    columnHeaderCheckbox?: boolean;
    rowHeader?: boolean;
}

export class DataTable<T> extends React.Component<IDataTableProps<T>, IDataTableState> {
    constructor(props: IDataTableProps<T>) {
        super(props);
        this.state = {
            tableCellHeight: false,
            loading: true,
        };
    }

    cellRenderer = (columnIx: number, rowIndex: number) => {
        if (rowIndex === 0) {
            return ( 
                    <Cell loading={this.state.loading}>{(this.props.search) ?
                    <InputField type="text" className={(this.props.tableMinLineHeight) ? 'tableHeaderSearch' : ''} required={false} />
                    : (this.props.data[rowIndex][this.props.columns[columnIx].name])}
                    </Cell> 
            );
        }
        if (this.props.columns[columnIx].editable) {
            return <EditableCell loading={this.state.loading}>{this.props.data[rowIndex][this.props.columns[columnIx].name]}</EditableCell>;
        } else if (this.props.columns[columnIx].validate) {
            if (this.props.data[rowIndex][this.props.columns[columnIx].name] === '105.00' ||
                this.props.data[rowIndex][this.props.columns[columnIx].name] === '104.00' ||
                this.props.data[rowIndex][this.props.columns[columnIx].name] === '07-01-2018' ||
                this.props.data[rowIndex][this.props.columns[columnIx].name] === '08-01-2018' ||
                this.props.data[rowIndex][this.props.columns[columnIx].name] === '999.00' ||
                this.props.data[rowIndex][this.props.columns[columnIx].name] === '989.00' ||
                this.props.data[rowIndex][this.props.columns[columnIx].name] === '06-05-2018' ||
                this.props.data[rowIndex][this.props.columns[columnIx].name] === '05-05-2018'
            ) {
                return <Cell loading={this.state.loading} className="cellmatch" >{this.props.data[rowIndex][this.props.columns[columnIx].name]}</Cell>;
            }
        } else if (this.props.columns[columnIx].tabLink) {
            if (this.props.data[rowIndex][this.props.columns[columnIx].name] === 'NPCI') {
                return <Cell loading={this.state.loading}><a onClick={this.props.rowAction} className="tabLink">{this.props.data[rowIndex][this.props.columns[columnIx].name]}</a></Cell>;
            }
        }
        return <Cell loading={this.state.loading} >{this.props.data[rowIndex][this.props.columns[columnIx].name]}</Cell>;
    }
    executeAction = (action: string, rowIndex: number) => {
        if (this.props.onAction != null) {
            this.props.onAction(action, this.props.data[rowIndex]);
        }
    }

    renderDelegate = (renderer: (row: T) => string | JSX.Element, rowIndex: number) => {
        if (rowIndex === 0) {
            return <Cell>{(this.props.search) ? '' : renderer(this.props.data[rowIndex])}</Cell>;
        }
        return <Cell>{renderer(this.props.data[rowIndex])}</Cell>;
    }
    handleRowsReordered = (oldIndex: number, newIndex: number, length: number) => {
        if (this.props.handleRowsReordered != null) {
            this.props.handleRowsReordered(oldIndex, newIndex, length);
        }
    }

    tableCellHeightToggle = () => {
        this.setState({ tableCellHeight: !this.state.tableCellHeight });
        console.log(this.state.tableCellHeight);
    }

    delayState = () => {
        setTimeout(() => { this.setState({ loading: false }); }, 2000);
    }

    componentDidMount () {
        this.delayState();
    }

    render() {
        let columns = _.map(this.props.columns, (c: IColumn<T>, ix) => {
            if (ix === 0 && this.props.columnHeaderCheckbox) {
                return (
                    <Column
                        columnHeaderCellRenderer={() => { return <ColumnHeaderCell><Checkbox  className="dataTableHeaderCheckbox" /></ColumnHeaderCell>; }}
                        key={ix}
                        name={c.title}
                        cellRenderer={(c.renderer) ? _.partial(this.renderDelegate, c.renderer) : _.partial(this.cellRenderer, ix)}
                    />
                );
            }
            return <Column key={ix} name={c.title} cellRenderer={(c.renderer) ? _.partial(this.renderDelegate, c.renderer) : _.partial(this.cellRenderer, ix)} />;
        });
        if (this.props.actions != null && this.props.actions.length > 0) {
            // tslint:disable-next-line:jsx-wrap-multiline
            columns.push(<Column
                name="Actions"
                className="dataTableActions"

                cellRenderer={(rowIndex: number) =>
                    <Cell interactive={false} >
                        <ButtonGroup minimal={false} large={false}>
                            {_.map(this.props.actions, (ac: IAction<T>, ix: number) => {
                                let show = true;
                                if (ac.visibleCallBack != null) {
                                    show = ac.visibleCallBack(this.props.data[rowIndex]);
                                }
                                return show ?
                                    <Button
                                        className={'tableButton ' + ((ac.name === 'Edit' || ac.name === 'View' || ac.name === 'Download' || ac.name === 'Upload' || ac.name === 'Preview') ?
                                            'tablePrimaryButton' : (ac.name === 'Delete') ? 'tableDangerButton' : '')}
                                        key={ix}
                                        icon={ac.icon}
                                        onClick={() => { if (this.props.onAction != null) { this.props.onAction(ac.name, this.props.data[rowIndex]); } }}
                                    /> : null;
                            })}
                        </ButtonGroup>
                    </Cell>
                }
            />);
        }
        let getColumnWidths = (width: number) => {

            let columnWidths = _.map(this.props.columns, c => {
                if (c.width && c.width < 1) {
                    return (width - 30) * c.width;
                } else if (c.width && c.width > 1) {
                    return c.width;
                }
                return null;
            });

            if (this.props.actions != null && this.props.actions.length > 0) {
                if (_.sum(_.map(this.props.columns, c => c.width)) < 1 && width) {
                    columnWidths.push((1 - _.sum(_.map(this.props.columns, c => c.width))) * (width - 30));
                } else {
                    columnWidths.push(this.props.actions.length * 50);
                }
            }
            return columnWidths;
        };

        let stlyedRegionGroups: IStyledRegionGroup[] = [];
        if (this.props.data.length > 0 && (this.props.data[0] as IRow).rowGroup != null) {
            let allRowRegions: [number, number][] = [];
            let colRegion: [number, number] = [0, this.props.columns.length - 1];
            let rowRegions: [number, number] = [0, 0];
            for (let i = 0; i < this.props.data.length; i++) {
                if (i === 0) {
                    continue;
                } else if ((this.props.data[i] as IRow).rowGroup !== (this.props.data[i - 1] as IRow).rowGroup) {
                    rowRegions[0] = i;
                } else if (i === this.props.data.length - 1) {
                    rowRegions[1] = i;
                    allRowRegions.push(_.clone(rowRegions));
                } else if (i + 1 !== this.props.data.length && (this.props.data[i] as IRow).rowGroup !== (this.props.data[i + 1] as IRow).rowGroup) {
                    rowRegions[1] = i;
                    allRowRegions.push(_.clone(rowRegions));
                }
            }
            for (let i = 0; i < allRowRegions.length; i++) {
                {
                    (this.props.exception) ? stlyedRegionGroups.push({ className: `TableRowExceptionGroup${i % 2}`, regions: [{ cols: colRegion, rows: allRowRegions[i] }] }) :
                        stlyedRegionGroups.push({ className: `TableRowGroup${i % 2}`, regions: [{ cols: colRegion, rows: allRowRegions[i] }] });
                }

            }
        }

        return (
            <div className={this.props.className + (' dataTable customScrollBar ')} style={{ height: this.props.TableHeight }}>
                <ContainerDimensions>
                    {({ width }) => <Table
                        numRows={this.props.data.length}
                        defaultRowHeight={(this.props.tableMinLineHeight) ? 25 : 45}
                        enableFocusedCell={false}
                        columnWidths={getColumnWidths(width)}
                        enableRowResizing={false}
                        enableRowReordering={this.props.enableRowReordering}
                        onRowsReordered={this.handleRowsReordered}
                        selectionModes={this.props.selectionModes}
                        styledRegionGroups={stlyedRegionGroups}
                        numFrozenColumns={this.props.frozenColumns}
                        numFrozenRows={this.props.frozenRow}
                        enableRowHeader={this.props.rowHeader}
                    >
                        {columns}
                    </Table>}
                </ContainerDimensions>
            </div>
        );
    }
}