import type * as map4dType from 'typeing-map4d'

const map4dx = (window as any).map4d
map4dx.Map4d = map4dx.Map

export default map4dx as typeof map4dType
