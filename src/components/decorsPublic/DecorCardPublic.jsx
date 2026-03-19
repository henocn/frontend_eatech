import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, DollarSign, Info, Calendar } from "lucide-react";
import DecorDetailModal from "./DecorDetailModal";
import "../decors/DecorCard.css";
import "./DecorCardPublic.css";

/**
 * Carte d’un décor pour la section publique (accueil).
 * Affiche résumé, "En savoir plus" (modal détail) et "Réserver" (→ booking avec ce décor).
 */
function DecorCardPublic({ decor, compact = false }) {
  const navigate = useNavigate();
  const [detailOpen, setDetailOpen] = useState(false);

  const images = decor.pub_medias_details || [];
  const coverUrl = decor.cover_image_url || (images[0]?.file_url ?? null);

  const buildDecorForBooking = (d) => {
    const info = d?.studio_info || (d?.studio_details ? { id: d.studio_details.id, name: d.studio_details.name } : null) || { id: d?.studio_id, name: d?.studio_name };
    return {
      id: d?.id,
      name: d?.name,
      short_description: d?.short_description,
      full_description: d?.full_description,
      hour_price: d?.hour_price,
      max_persons: d?.max_persons,
      studio_info: info,
      pub_medias_details: d?.pub_medias_details,
    };
  };

  const handleReserve = (decorToUse = null) => {
    const d = decorToUse || decor;
    navigate("/booking", { state: { decor: buildDecorForBooking(d) } });
  };

  const imageBlock = coverUrl ? (
    <div className="decor-image-single decor-card-public-cover">
      <img src={coverUrl} alt={decor.name} />
    </div>
  ) : (
    <div className="decor-card-public-placeholder">
      <span>{decor.name?.charAt(0) || "?"}</span>
    </div>
  );

  if (compact) {
    return (
      <article className="decor-card decor-card-public decor-card-public-compact">
        <div className="decor-images-container">
          {imageBlock}
        </div>
        <div className="decor-content decor-card-public-compact-content">
          <h3 className="decor-title">{decor.name}</h3>
          <p className="decor-card-public-compact-description">
            {decor.short_description}
          </p>
        </div>
      </article>
    );
  }

  return (
    <>
      <article className="decor-card decor-card-public">
        <div className="decor-images-container" onClick={() => setDetailOpen(true)}>
          {imageBlock}
          <div className="decor-images-overlay">
            <span className="decor-view-more">Voir toutes les photos</span>
          </div>
        </div>

        <div className="decor-content">
          <h3 className="decor-title">{decor.name}</h3>
          {decor.studio_name && (
            <p className="decor-card-public-studio">{decor.studio_name}</p>
          )}
          <p className="decor-description">{decor.short_description}</p>
          <div className="decor-details">
            <span className="decor-capacity">
              <Users size={16} className="decor-icon" />
              {decor.max_persons} personnes
            </span>
            <span className="decor-price">
              <DollarSign size={16} className="decor-icon" />
              {decor.hour_price} F/h
            </span>
          </div>
          <div className="decor-card-public-actions">
            <button
              type="button"
              className="decor-card-public-btn decor-card-public-btn-secondary"
              onClick={() => setDetailOpen(true)}
            >
              <Info size={16} />
              En savoir plus
            </button>
            <button
              type="button"
              className="decor-select-btn decor-card-public-btn-primary"
              onClick={handleReserve}
            >
              <Calendar size={16} />
              Réserver
            </button>
          </div>
        </div>
      </article>

      {detailOpen && (
        <DecorDetailModal
          decorId={decor.id}
          initialDecor={decor}
          onClose={() => setDetailOpen(false)}
          onReserve={(loadedDecor) => {
            setDetailOpen(false);
            handleReserve(loadedDecor || decor);
          }}
        />
      )}
    </>
  );
}

export default DecorCardPublic;
