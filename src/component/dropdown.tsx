import * as React from 'react';
import { Label } from '@blueprintjs/core';
import _ from 'lodash';

interface IDropDownState { }

interface IDropDownProps {
    content?: string[];
    label?: string;
    value?: string;
    onChange?(val: string): void;
    option?: string;
    labelClass?: string;
    disabled?: boolean;
    errorMessage?: string;
    mandatory?: boolean;
    optionDisplay?: boolean;
}

export class DropDown extends React.Component<IDropDownProps, IDropDownState> {
    constructor(props: IDropDownProps) {
        super(props);
    }
    render() {
        return (
            <div className="dropdown">
                <Label className={this.props.labelClass} text={this.props.label}>{this.props.mandatory ? <span className="errorMessage">*</span> : null}
                    <div className="pt-select">
                        <select  disabled={this.props.disabled} value={this.props.value} onChange={(event) => { if (this.props.onChange != null) { this.props.onChange(event.target.value); } }}>
                        {(this.props.optionDisplay) ? <option>{this.props.option}</option> : ''}
                            {_.map(this.props.content, (d: string) => {
                                return <option value={d}>{d}</option>;
                            })
                            }
                        </select>
                    </div>
                    <span className="errorMessage">{this.props.errorMessage}</span>
                </Label>
            </div>
        );
    }
}
