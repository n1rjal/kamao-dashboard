import { toast } from "react-toastify";

toast.configure();

export function notify(level: "success" | "error", message: string) {
  toast.clearWaitingQueue();
  if (level === "success") {
    toast.success(`🦄 ${message}!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  if (level === "error") {
    toast.error(`🦄 ${message}!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
