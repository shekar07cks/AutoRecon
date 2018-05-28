import * as React from 'react';
import { Cell, Column, Table } from '@blueprintjs/table';
import _ from 'lodash';

interface IDataTableState {
    loading?: boolean;
}

export interface IColumn<T> {
    name: string;
    title: string;
    width?: number;
    renderer?: (row: T) => string | JSX.Element;
}

interface IDataTableProps<T> {
    columns: Array<IColumn<T>>;
    data: Array<T>;
    rowKey?: string;
    className?: string;
    enableRowReordering?: boolean;
    TableHeight?: string;
    frozenColumns?: number;
    frozenRow?: number;
    tableMinLineHeight?: boolean;
    rowHeader?: boolean; // table row numbers
}

export class DataTable<T> extends React.Component<IDataTableProps<T>, IDataTableState> {
    constructor(props: IDataTableProps<T>) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    cellRenderer = (columnIx: number, rowIndex: number) => {
        return <Cell loading={this.state.loading} >{this.props.data[rowIndex][this.props.columns[columnIx].name]}</Cell>;
    }

    renderDelegate = (renderer: (row: T) => string | JSX.Element, rowIndex: number) => {
        return <Cell>{renderer(this.props.data[rowIndex])}</Cell>;
    }

    // loading state delay
    delayState = () => {
        setTimeout(() => { this.setState({ loading: false }); }, 2000);
    }

    componentDidMount () {
        this.delayState();
    }

    render() {
        let columns = _.map(this.props.columns, (c: IColumn<T>, ix) => {
            return (
                    <Column 
                        key={ix} 
                        name={c.title} 
                        cellRenderer={(c.renderer) ? _.partial(this.renderDelegate, c.renderer) : _.partial(this.cellRenderer, ix)} 
                    />);
        });

        return (
            <div className={this.props.className + (' dataTable customScrollBar ')} style={{ height: this.props.TableHeight }}>
                <Table
                    numRows={this.props.data.length}
                    defaultRowHeight={(this.props.tableMinLineHeight) ? 25 : 45}
                    numFrozenColumns={this.props.frozenColumns}
                    numFrozenRows={this.props.frozenRow}
                    enableRowHeader={this.props.rowHeader} // table row numbers
                >
                    {columns}
                </Table>
            </div>
        );
    }
}