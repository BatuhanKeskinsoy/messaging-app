import {MouseEventHandler} from 'react'

export type CustomButtonProps = {
    title?: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: 'button' | 'submit';
    textStyles?: string;
    rightIcon?: string;
    leftIcon?: string;
    iconAlt?: string;
    isDisabled?: boolean;
    onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
    onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
    iconWidth?: number;
    iconHeight?: number;
}