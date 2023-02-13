import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point, Polygon } from "../types";

interface Polygons {
  polygons: Polygon[];
}

const initialState: Polygons = { polygons: [] };

interface UpdatePolygonAction {
  id: number;
  newPolygon: Polygon;
}

const polygonSlice = createSlice({
  name: "polygonSlice",
  initialState,
  reducers: {
    addNewPolygon(state, action: PayloadAction<Point[]>) {
      state.polygons.push({
        id: state.polygons.length,
        points: action.payload,
        numPoints: action.payload.length,
      });
    },

    updatePolygon(state, action: PayloadAction<UpdatePolygonAction>) {
      state.polygons[action.payload.id] = action.payload.newPolygon;
    },

    clear(state) {
      state.polygons = [];
    },
  },
});

export const polygonActions = polygonSlice.actions;

export default polygonSlice;
