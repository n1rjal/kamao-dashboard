import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./popup.css";

interface PopUpProps {
  children:
    | React.ReactChild[]
    | React.ReactChild
    | React.ReactChildren[]
    | React.ReactChildren;
  open: boolean;
  onClose: () => void;
}

const Popup = ({ open, children, onClose }: PopUpProps) => {
  const mount: any = document.getElementById("portal-root");
  const el: HTMLElement = document.createElement("div");

  useEffect(() => {
    mount.appendChild(el);
    return () => {
      mount.removeChild(el);
    };
  }, [el, mount]);

  return createPortal(
    <div
      style={{
        display: `${open ? "fixed" : "none"}`,
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
      onClick={(e) => {
        onClose();
      }}
      className="popup__PopupDiv"
    >
      <div
        className="popup__innerDiv"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="popup__popUpCloseButton" onClick={(e) => onClose()}>
          ❌
        </button>
        <div className="p-3">{children}</div>
      </div>
    </div>,
    el
  );
};

export default Popup;
