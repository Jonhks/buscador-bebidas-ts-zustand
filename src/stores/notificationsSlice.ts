import { StateCreator } from "zustand";
import Notification from "../components/Notification";
import { FavoritesSliceType } from "./favoriteSlice";

type Notification = {
  text: string;
  error: boolean;
  show: boolean;
};

export type NotificationsSliceType = {
  notification: Notification;
  showNotification: (payload: Pick<Notification, "text" | "error">) => void;
};

export const createNotificationsSlide: StateCreator<
  NotificationsSliceType & FavoritesSliceType,
  [],
  [],
  NotificationsSliceType
> = (set) => ({
  notification: {
    text: "Texto notificacion",
    error: false,
    show: false,
  },
  showNotification: (payload) => {
    console.log(payload);
    set({
      notification: {
        text: payload.text,
        error: payload.error,
        show: true,
      },
    });
  },
});
