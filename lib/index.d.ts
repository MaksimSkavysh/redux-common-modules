declare type reducerType = (state: any, action: any) => any;
export declare const composeReducers: (...reducers: reducerType[]) => (state: any, action: any) => any;
export declare const commonActionCreator: (module: string) => (name: string, payloadValidator?: ((data: any) => void) | undefined, metaValidator?: ((data: any) => void) | undefined) => {
    (payload: any, meta: void | object): {
        type: string;
        payload: any;
        meta: void | object;
    };
    type: string;
    toString(): string;
};
export {};
