import { Briefcase, Toolbox, Brain, MailIcon } from "lucide-react"
import type { ReactElement } from "react";

const icons: Record<string, ReactElement> = {
    "briefcase": <Briefcase/>,
    "tools": <Toolbox/>,
    "brain": <Brain/>,
    "mail": <MailIcon/>,

}

interface IconProps {
    name:string;
}

export function Icon(props: IconProps): ReactElement {
    return icons[props.name];
}