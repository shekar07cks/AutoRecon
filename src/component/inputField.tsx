import * as React from 'react';
import _ from 'lodash';
import { InputGroup } from '@blueprintjs/core';

interface IInputState {
    Error?: string;
    validationFailed?: boolean;
    validationMessage?: string;
}
interface IInputProps {
    ref?: (r: InputField) => void;
    name?: string;
    value?: string;
    error?: string;
    onChange?: (value: string) => void;
    type: 'text' | 'number' | 'email' | 'password';
    placeholder?: string;
    required: boolean;
    minimum?: number;
    maximum?: number;
    errorMessage?: string;
    className?: string;
    popup?: boolean;
    popupMessage?: string;
    disabled?: boolean;

}
export class InputField extends React.PureComponent<IInputProps, IInputState> {
    constructor(props: IInputProps) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
        this.setState({ validationFailed: false });
    }
    onChange = (event) => {
        let val = event.target.value;
        if (val == null) {
            val = '';
        }
        if (this.props.type === 'text' || this.props.type === 'email' || this.props.type === 'password') { if (val === '') { val = null; } }
        if (this.props.onChange != null) {
            this.props.onChange(val);
            this.validate(val);
        }

    }
    validate = (value?: string): boolean => {
        let valueToTest = (value != null) ? value : (this.props.value != null) ? this.props.value : '';
        if (this.props.required && _.isEmpty(valueToTest)) {
            this.setState({ validationFailed: true, validationMessage: `${this.props.errorMessage}` });
            return false;
        }
        if (this.props.type === 'email') {
            let exp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            let regex = new RegExp(exp);
            let isValid = regex.test(valueToTest);
            if (!isValid) {
                this.setState({ validationFailed: true, validationMessage: `Enter a valid E-Mail Address` });
                return false;
            }
        }
        this.setState({ validationFailed: false, validationMessage: `` });
        return true;
    }

    render() {
        let Input;
        switch (this.props.type) {
            default: case 'text':
            case 'number':
                // tslint:disable-next-line:max-line-length
                Input = <InputGroup className={this.props.className + (' popOverInputField')} onChange={this.onChange} placeholder={this.props.placeholder} min={this.props.minimum} max={this.props.maximum} value={this.props.value} disabled={this.props.disabled} />;
                break;
            case 'password':
                Input = <InputGroup className={this.props.className + (' popOverInputField')} type="password" placeholder={this.props.placeholder} onChange={this.onChange} value={this.props.value} disabled={this.props.disabled} />;
                break;
            case 'email':
                Input = <InputGroup type="email" className={this.props.className + (' popOverInputField')} placeholder={this.props.placeholder} onChange={this.onChange} value={this.props.value} disabled={this.props.disabled} />;
                break;
        }
        return (
            <div >
                {Input}
                {this.props.required && this.state.validationMessage != null && this.state.validationMessage !== '' ? <span className="errorMessage">{this.state.validationMessage}</span> : null}
            </div>
        );
    }
}
