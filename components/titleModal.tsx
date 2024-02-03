import { useState } from "react";
interface ITitleModal {
  handleSave: () => void
  setInputTitle: React.Dispatch<React.SetStateAction<string>>
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const TitleModal = (handleSave, setInputTitle, setShowModal) => {
  const [input, setInput] = useState('')
  const closeModal = () => {
    console.log('inputFormModal', input)
    setShowModal(false);
    setInputTitle(input)
    handleSave()
    return;
  };
  return (
    <div className="modal">
      <input type="text" className="inputTitle" value={input} onChange={(e) => setInput(e.target.value)} />

      <button className="closeModal" onClick={closeModal}>
        Close
      </button>
    </div>
  );
}

export default TitleModal;