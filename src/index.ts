
type reducerType = (state: any, action: any) => any
type validatorType = (payload: any) => void

export const composeReducers = (...reducers: reducerType[]) => (state: any, action: any) =>
    reducers.reduceRight((curState, reducer) => reducer(curState, action), state)

export const commonActionCreator = (module: string) =>
    (name: string, payloadValidator?: validatorType, metaValidator?: validatorType) => {
        const type = `${module}/${name}`
        const ac = (payload: any, meta: object | void) => {
            payloadValidator && payloadValidator(payload)
            metaValidator && metaValidator(meta)
            return { type, payload, meta }
        }
        ac.type = type
        ac.toString = () => type
        return ac
    }
