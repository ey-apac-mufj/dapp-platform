import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default function CustomModal(props) {
  return (
    <div>
      {open ? (
        <Modal
          open={props.open}
          onClose={props.onCloseModal}
          classNames={{ modal: "customModal" }}
          center
        >
          <div>
            <h5 className="text-2xl font-bold text-center mx-auto my-4">
              {props.title}
            </h5>
            {props.children}
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
