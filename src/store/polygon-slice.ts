import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Point, Polygon } from "../types/types";

const initialState: Polygon[] = [];

const polygonSlice = createSlice({
  name: "polygonSlice",
  initialState,
  reducers: {
    setPolygons(state, action: PayloadAction<Polygon[]>) {
      return action.payload;
    },

    addNewPolygon(state, action: PayloadAction<Point[]>) {
      const newPolygon = {
        id: state.length,
        points: action.payload,
        numPoints: action.payload.length,
      };
      return [...state, newPolygon];
    },

    clear() {
      return [];
    },
  },
});

export const polygonActions = polygonSlice.actions;

export default polygonSlice;
