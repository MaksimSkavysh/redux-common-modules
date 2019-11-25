import { AnyAction } from "./types"

export const EMPTY_OBJECT = Object.freeze({})
export const EMPTY_ARRAY = Object.freeze([])

type Validator = (data: any) => void
type ActionCreator = {
    (payload: any, meta: object | void): AnyAction,
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
