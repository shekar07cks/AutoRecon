import React from 'react';
import _ from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import solid, { IconDefinition } from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';
import ascentIcon from './ascentIcon';

export let Icon = (props: {
    icon: ['fas' | 'far' | 'fab' | 'fal' | 'iv', string],
    className?: string,
    style?: React.CSSProperties,
    transform?: {},
    size?: '2x' | '3x',
    spin?: boolean
}) => {
    let iconFound: { prefix?: string , iconName?: string, icon?: IconDefinition }| null = null;
    if (props.icon as {} === 'none' || props.icon[1] === 'none') {
        return <div />;
    }
    if (props.icon[0] === 'fas') {
        let finder = _.find(_.keys(solid), i => i === props.icon[1]);
        if (finder != null) {
            iconFound = { prefix: 'fas', iconName: props.icon[1], icon: solid[finder] };
        }
    }
    if (props.icon[0] === 'far') {
        let finder = _.find(_.keys(regular), i => i === props.icon[1]);
        if (finder != null) {
            iconFound = { prefix: 'fas', iconName: props.icon[1], icon: regular[finder] };
        }
    }
    if (props.icon[0] === 'fab') {
        let finder = _.find(_.keys(brands), i => i === props.icon[1]);
        if (finder != null) {
            iconFound = { prefix: 'fas', iconName: props.icon[1], icon: brands[finder] };
        }
    }
    if (props.icon[0] === 'iv') {
        let finder = _.find(_.keys(ascentIcon), i => i === props.icon[1]);
        if (finder != null) {
            iconFound = { 
                prefix: 'fas', 
                iconName: props.icon[1], 
                icon: { prefix: 'fas', iconName: 'accessible-icon', icon:  ascentIcon[finder] } 
            };
        }
    }
    if (!iconFound) {
        return <FontAwesomeIcon icon={props.icon} className={props.className} transform={props.transform} size={props.size} />;
    }
    return <FontAwesomeIcon icon={iconFound.icon} className={props.className} transform={props.transform} size={props.size} spin={props.spin} />;
};