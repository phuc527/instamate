import "react-select";

declare module "react-select" {
    export type Option = {
        label: string;
        value: string;
        meta?: any;
        __isNew__?: boolean;
    };
}
