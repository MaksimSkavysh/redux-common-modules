import * as T from "runtypes"
import { ActionCreator } from "./types"

type Validator = (data: any) => void
const validate = (data: any, validator?: Validator | T.Runtype) => {
    if (validator) {
        if ((validator as T.Runtype).check) {
            (validator as T.Runtype).check(data)
        } else {
            (validator as Validator)(data)
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
            validate(payload, payloadValidator)
            validate(meta, metaValidator)
            return { type, payload, meta }
        }
        ac.type = type
        ac.toString = () => type
        return ac
    }

