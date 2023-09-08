import { useState, useEffect } from "react";
import { Nullable } from "@/types/common";

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, maximumAge: 3000 };

export interface IUseWatchPosition {
  position: Nullable<GeolocationPosition>;
  error: Nullable<GeolocationPositionError>;
}

export const useWatchPostion = (): IUseWatchPosition => {
  const [position, setPosition] = useState<Nullable<GeolocationPosition>>(null);
  const [error, setError] = useState<Nullable<GeolocationPositionError>>(null);

  const onUpdatePosition = (position: GeolocationPosition) =>
    setPosition(position);

  const onError = (error: GeolocationPositionError) => setError(error);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      onUpdatePosition,
      onError,
      GEOLOCATION_OPTIONS
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { position, error };
};
