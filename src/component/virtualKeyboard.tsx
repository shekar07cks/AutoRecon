import * as React from 'react';
import Keyboard from 'react-virtual-keyboard';
import { Label } from '@blueprintjs/core';

interface IVirtualKeyboardState {}

interface IVirtualKeyboardProps {
    placeHolderValue?: string;
    label: string;
    inputType: string;
    className?: string;
}

class VirtualKeyboard extends React.Component < IVirtualKeyboardProps,
IVirtualKeyboardState > {
    constructor(props: IVirtualKeyboardProps) {
        super(props);
    }

    onInputChanged = (data) => {
        this.setState({ input: data });
      }
       
      onInputSubmitted = (data) => {
        console.log('Input submitted:', data);
      }

      keyboard = null;

    render() {
        return (
            <div className={'virtualKeyboard' + (this.props.className)}>
                <Label className="float-left" text={this.props.label}/>
                <Keyboard
                        value={this.props.placeHolderValue}
                        name="keyboard"
                        type={this.props.inputType}
                        options={{
                        type: 'input',
                        layout: 'qwerty',
                        alwaysOpen: false,
                        usePreview: false,
                        useWheel: false,
                        stickyShift: false,
                        appendLocally: true,
                        color: 'light',
                        updateOnChange: true,
                        initialFocus: true,
                        display: {
                            'accept': 'Submit'
                        }
                    }}
                        onChange={this.onInputChanged}
                        onAccepted={this.onInputSubmitted}
                        ref={k => this.keyboard = k}
                />
            </div>

        );
    }
}

export default VirtualKeyboard;