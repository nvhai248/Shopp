// components/Notification.tsx
import React, { useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";
import {
  FaTimes,
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

interface NotificationProps {
  notification: {
    id: number;
    type: "success" | "info" | "warning" | "error";
    title: string;
    message: string;
    autoClose?: boolean;
    duration?: number;
  };
  onClose: (id: number) => void;
}

const Notification: React.FC<NotificationProps> = ({
  notification,
  onClose,
}) => {
  useEffect(() => {
    if (notification.autoClose) {
      const timer = setTimeout(() => {
        onClose(notification.id);
      }, notification.duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "info":
        return <FaInfoCircle className="text-blue-500" />;
      case "warning":
        return <FaExclamationTriangle className="text-orange-500" />;
      case "error":
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Toast.Root
      style={{
        backgroundColor: "white",
        color: "black",
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 9999,
        width: "auto",
      }}
      className="flex items-center p-4 mb-4 max-w-xs rounded-lg shadow-lg"
    >
      <div className="mr-3">{getTypeIcon(notification.type)}</div>
      <div className="flex-grow text-sm font-normal">
        <Toast.Title className="mb-1 text-sm font-semibold">
          {notification.title}
        </Toast.Title>
        <Toast.Description>{notification.message}</Toast.Description>
      </div>
      <Toast.Action asChild altText="Close">
        <button
          onClick={() => onClose(notification.id)}
          className="ml-auto bg-transparent text-black hover:text-gray-600 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8"
        >
          <FaTimes />
        </button>
      </Toast.Action>
    </Toast.Root>
  );
};

export default Notification;
