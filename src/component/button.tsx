import * as React from 'react';
import { Button as BlueprintButton } from '@blueprintjs/core';

interface IButtonState {}

interface IButtonProps {
    className?: string;
    onClick?(): void;
}

class Button extends React.Component < IButtonProps,
IButtonState > {
    constructor(props: IButtonProps) {
        super(props);
    }

    render() {
        return (
            <BlueprintButton className={'pt-button ' + (this.props.className)} onClick={this.props.onClick}>{this.props.children}</BlueprintButton>
        );
    }
}

export default Button;