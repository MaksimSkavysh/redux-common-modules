import { Reducer, ReducersMapObject, AnyAction } from "./types";
export declare const composeReducers: (...reducers: Reducer<any, AnyAction>[]) => Reducer<any, AnyAction>;
export declare const createReducer: (initialState: any, reducersMap: ReducersMapObject<any, AnyAction>) => Reducer<any, AnyAction>;
declare type Path = (string | number)[] | string;
declare type GetPathFunction = (arg: AnyAction) => Path;
export declare const reducerWithPath: (initialState: any, getPath: GetPathFunction, reducer: Reducer<any, AnyAction>) => Reducer<any, AnyAction>;
export {};
