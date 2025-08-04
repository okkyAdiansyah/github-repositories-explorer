import {type ButtonHTMLAttributes, type ReactNode} from "react";


type TButtonProps = {
    children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = (
    {children, ...rest} : TButtonProps
) => {
    return(
        <button {...rest}>{children}</button>
    )
}

export default Button;