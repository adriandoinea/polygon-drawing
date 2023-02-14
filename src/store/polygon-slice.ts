import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point, Polygon } from "../types";

interface Polygons {
  polygons: Polygon[];
}

const initialState: Polygons = { polygons: [] };

const polygonSlice = createSlice({
  name: "polygonSlice",
  initialState,
  reducers: {
    renderPolygons(state, action: PayloadAction<Polygon[]>) {
      state.polygons = action.payload;
    },

    addNewPolygon(state, action: PayloadAction<Point[]>) {
      state.polygons.push({
        id: state.polygons.length,
        points: action.payload,
        numPoints: action.payload.length,
      });
    },

    clear(state) {
      state.polygons = [];
    },
  },
});

export const polygonActions = polygonSlice.actions;

export default polygonSlice;
