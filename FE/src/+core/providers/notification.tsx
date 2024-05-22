// context/NotificationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";
import Notification from "@/components/ui/notification";
import { NotificationProps } from "../types";

interface NotificationContextProps {
  addNotification: (
    notification: Omit<NotificationProps["notification"], "id">
  ) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<
    NotificationProps["notification"][]
  >([]);

  const addNotification = (
    notification: Omit<NotificationProps["notification"], "id">
  ) => {
    setNotifications((prev) => [...prev, { id: Date.now(), ...notification }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <Toast.Provider>
        <div style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              onClose={removeNotification}
            />
          ))}
        </div>
        <Toast.Viewport />
      </Toast.Provider>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
