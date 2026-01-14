import { useState } from "react";
import "./DecorCard.css";
import Modal from "../modal/Modal";

const DecorCard = ({ decor, onSelect }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="decor-card">
        <div className="decor-image" onClick={() => setModalOpen(true)}>
          <img src={decor.pub_medias_details[0]?.file_url} alt={decor.name} />
        </div>

        <div className="decor-content">
          <h3 className="decor-title">{decor.name}</h3>
          <p className="decor-short">{decor.short_description}</p>
          <p className="decor-info">
            {decor.max_persons} personnes • {decor.hour_price} FCFA/h
          </p>
          <button className="decor-select-btn" onClick={onSelect}>
            Select
          </button>
        </div>
      </div>

      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <h2>{decor.name}</h2>
          <p>{decor.full_description}</p>
          <div className="decor-images-modal">
            {decor.pub_medias_details.map((img) => (
              <img key={img.id} src={img.file_url} alt={decor.name} />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default DecorCard;
