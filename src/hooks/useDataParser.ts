import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { polygonActions } from "../store/polygon-slice";

export const useDataParser = () => {
  const dispatch = useDispatch();

  const onStringChange = useCallback((polygonText: string) => {
    dispatch(polygonActions.renderPolygons(JSON.parse(polygonText)));
  }, []);

  return { onStringChange };
};
