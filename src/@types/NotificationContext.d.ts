declare module NotificationContext {
  interface NotificationObject {
    level: "INFO" | "ERROR";
    message: string;
    notify?: (arg0: NotificationObject) => void;
  }

  interface NotificationProps {
    children:
      | React.ReactChild
      | React.ReactChild[]
      | React.ReactChildren
      | React.ReactChildren[];
  }
}
