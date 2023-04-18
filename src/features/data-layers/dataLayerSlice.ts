import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dataLayerApi } from './dataLayerApi'
import { IDataLayer } from '@/database'

interface IDataLayerState {
  currentSelectedId?: string,
  nameForSearch: string,
  selectedIds: string[],
  selectedMainObjectId?: null,
}

const initialState: IDataLayerState = {
  nameForSearch: '',
  selectedIds: [],
}

const dataLayerSlice = createSlice({
  name: 'data-layers',
  initialState,
  reducers: {
    toggleSelectedDataLayer: (state, action: PayloadAction<{ dataLayerId: string, selected: boolean }>) => {
      const { dataLayerId, selected } = action.payload

      if (selected) {
        state.currentSelectedId = dataLayerId
        state.selectedIds.push(dataLayerId)
      }
      else {
        if (state.currentSelectedId === dataLayerId)
          state.currentSelectedId = undefined

        const index = state.selectedIds.indexOf(dataLayerId)
        state.selectedIds.splice(index, 1)
      }
    }
  }
})

export const dataLayerActions = dataLayerSlice.actions


const emptyDataLayers: { ids: string[], items: Record<IDataLayer['id'], IDataLayer> } = { ids: [], items: {} }

const selectDataLayersResult = dataLayerApi.endpoints.getDataLayers.select()

const selectDataLayers = createSelector(
  selectDataLayersResult,
  dataLayerResult => dataLayerResult?.data ?? emptyDataLayers,
)

const selectDataLayerList = createSelector(
  selectDataLayers,
  dataLayers => dataLayers.ids.map(id => dataLayers.items[id])
)

const selectIds = createSelector(
  selectDataLayers,
  data => data.ids.map(id => ({ id, parentId: data.items[id].parentId }))
)

export const dataLayerSelectors = {
  dataLayersResult: selectDataLayersResult,
  dataLayers: selectDataLayers,
  dataLayerList: selectDataLayerList,
}