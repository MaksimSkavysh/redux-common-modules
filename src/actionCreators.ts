import * as T from "runtypes"
import { ActionCreator } from "./types"

type Validator = (data: any) => void
const validate = (data: any, type: string, validator?: Validator | T.Runtype) => {
    if (validator) {
        try {
            if ((validator as T.Runtype).check) {
                (validator as T.Runtype).check(data)
            } else {
                (validator as Validator)(data)
            }
        } catch (e) {
            throw new Error(`Wrong params for action type "${type}": ${e.message}`)
        }
    }
}

export const commonActionCreator = (module: string) =>
    (
        name: string,
        payloadValidator?: Validator | T.Runtype,
        metaValidator?: Validator | T.Runtype
    ): ActionCreator => {
        const type = `${module}/${name}`
        const ac: ActionCreator = (payload, meta) => {
            validate(payload, type, payloadValidator)
            validate(meta, type, metaValidator)
            return { type, payload, meta }
        }
        ac.type = type
        ac.toString = () => type
        return ac
    }

