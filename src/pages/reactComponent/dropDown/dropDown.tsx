import * as React from 'react';
import gs from '../../../language/common/en';
import { Icon } from '../../../component/icon';
import { Label } from '@blueprintjs/core';
import { InputField } from '../../../component/inputField';
import { DropDown as Dropdown } from '../../../component/dropdown';

interface IDataTableState {
    dropDownValue: Array<string>;
    value: string;
}

interface IDataTableProps {}

class DropDown extends React.Component < IDataTableProps, IDataTableState > {
    constructor(props: IDataTableProps) {
        super(props);
        this.state = {
            dropDownValue: [ 'Option 1', 'Option 2', 'Option 3', 'Option 4' ],
            value: '',
    };
}

dropDownOnChange = (value) => {
    this.setState({
          value: value,
    });
}

rowDom = () => {
    return (
        <div className="row">
            <div className="col-md-3">
                <Label text={gs.InputField}>
                    <InputField
                            type="text"
                            name={gs.InputField}
                            required={false}
                    />
                </Label>
            </div>
            <div className="col-md-3">
                <Label text={gs.InputField}>
                    <InputField
                            type="text"
                            name={gs.InputField}
                            required={false}
                    />
                </Label>
            </div>
            <div className="col-md-3">
                <Label text={gs.InputField}>
                    <InputField
                            type="text"
                            name={gs.InputField}
                            required={false}
                    />
                </Label>
            </div>
        </div>
    );
}

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
                    <div className="panel">
                        <div className="panelHeading">
                            <div className="row">
                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                    <Label className="no-margin" text={gs.DataTable}/>
                                </div>
                            </div>
                        </div>
                        <div className="panelBody">
                            <Dropdown
                                optionDisplay={true}
                                option={gs.ChooseaFile}
                                label={gs.ChooseaFile}
                                content={this.state.dropDownValue}
                                value={this.state.value}
                                onChange={this.dropDownOnChange}
                            />
                            <div className="row">
                                {
                                    (this.state.value === 'Option 1' || this.state.value === 'Option 2' || this.state.value === 'Option 3' || this.state.value === 'Option 4') ?
                                    <div className="col-md-12">
                                        {
                                            (this.state.value === 'Option 1') ?
                                            <div>
                                            <Label text="Option 1" />
                                            {(this.rowDom())}
                                        </div > : ''
                                        }
                                        {
                                            (this.state.value === 'Option 2') ?
                                            <div>
                                            <Label text="Option 2" />
                                            {(this.rowDom())}
                                        </div > : ''
                                        }
                                        {
                                            (this.state.value === 'Option 3') ?
                                            <div>
                                            <Label text="Option 3" />
                                            {(this.rowDom())}
                                        </div > : ''
                                        }
                                        {
                                            (this.state.value === 'Option 4') ?
                                            <div>
                                            <Label text="Option 4" />
                                            {(this.rowDom())}
                                        </div > : ''
                                        }
                                    </div> : ''
                                }
                            </div>
                        </div>
                    </div>

                    <div className="panel m-t-20">
                        <div className="panelHeading">
                            <div className="row">
                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                    <Label className="no-margin" text="Auto Increment" />
                                </div>
                            </div>
                        </div>
                        <div className="panelBody">
                            <div className="col-md-3">
                                <Label text={gs.InputField}>
                                    <InputField
                                        type="text"
                                        name={gs.InputField}
                                        required={false}
                                    />
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}
export default DropDown;