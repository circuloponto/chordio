import { useState } from "react";

interface IComfirmSaveModal {
  setInputTitle: string,
  setShowModal: boolean
}

const ConfirmSaveModal = ({ setShowModal, }) => {
  const [input, setInput] = useState('')
  const closeModal = () => {
    console.log('inputFormModal', input)
    setShowModal(false);
    //setInputTitle(input)
    return;
  };

  return (
    <div className="modal">
      <p className="Label">Your song was saved</p>
      <button className="closeModal" onClick={closeModal}>
        Close
      </button>
    </div>
  );
};

export default ConfirmSaveModal;
