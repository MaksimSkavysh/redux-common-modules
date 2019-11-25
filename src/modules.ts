import * as T from 'runtypes'
import { AnyAction } from "./types"

type Validator = (data: any) => void
type ActionCreator<P = any> = {
    (payload: P, meta: object | void): AnyAction,
    type: string
}
export const commonActionCreator = (module: string) =>
    (name: string, payloadValidator?: Validator, metaValidator?: Validator): ActionCreator => {
        const type = `${module}/${name}`
        const ac: ActionCreator = (payload, meta) => {
            payloadValidator && payloadValidator(payload)
            metaValidator && metaValidator(meta)
            return { type, payload, meta }
        }
        ac.type = type
        ac.toString = () => type
        return ac
    }
