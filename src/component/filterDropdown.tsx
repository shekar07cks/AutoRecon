import * as React from 'react';
import { Label } from '@blueprintjs/core';
import _ from 'lodash';

interface IFilterDropDownState { }

interface IFilterDropDownProps {
    content: string[];
    label: string;
}

class FilterDropDown extends React.Component<IFilterDropDownProps, IFilterDropDownState> {
    constructor(props: IFilterDropDownProps) {
        super(props);
    }

    render() {
        return (
            <div className="">
                <Label className="m-b-5" text={this.props.label} />
                <div className="pt-control-group">
                    <div className="pt-select">
                        <select className="width-170">
                            <option>Filter...</option>
                            {_.map(this.props.content, (d: string) => {
                                return <option value="1">{d}</option>;
                            })
                            }
                        </select>
                    </div>
                    <div className="pt-input-group">
                        <span className="pt-icon pt-icon-search" />
                        <input type="text" className="pt-input" value="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterDropDown;