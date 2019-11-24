import * as T from 'runtypes';
import { Reducer, ReducersMapObject, AnyAction } from "./types";
export declare const composeReducers: (...reducers: Reducer<any, AnyAction>[]) => Reducer<any, AnyAction>;
export declare const createReducer: (initialState: any, reducersMap: ReducersMapObject<any, AnyAction>) => Reducer<any, AnyAction>;
declare type Path = (string | number)[] | string;
declare type GetPathFunction = (arg: AnyAction) => Path;
export declare const reducerPathGuard: T.Union2<T.Constraint<T.String, string, unknown>, T.Constraint<T.Array<T.Union2<T.Constraint<T.String, string, unknown>, T.Number>, false>, (string | number)[], unknown>>;
export declare const reducerWithPath: (initialState: any, getPath: GetPathFunction, reducer: Reducer<any, AnyAction>) => Reducer<any, AnyAction>;
export {};
