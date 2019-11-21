declare type reducerType = (state: any, action: any) => any;
declare type validatorType = (payload: any) => void;
export declare const composeReducers: (...reducers: reducerType[]) => (state: any, action: any) => any;
export declare const commonActionCreator: (module: string) => (name: string, payloadValidator?: validatorType | undefined, metaValidator?: validatorType | undefined) => {
    (payload: any, meta: void | object): {
        type: string;
        payload: any;
        meta: void | object;
    };
    type: string;
    toString(): string;
};
export {};
