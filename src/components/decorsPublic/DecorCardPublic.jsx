import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DecorDetailModal from "./DecorDetailModal";
import "./DecorCardPublic.css";

/**
 * Carte d’un décor pour la section publique (accueil).
 * Affiche résumé, "En savoir plus" (modal détail) et "Réserver" (→ booking avec ce décor).
 */
function DecorCardPublic({ decor, compact = false }) {
  const navigate = useNavigate();
  const [detailOpen, setDetailOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const images = decor.pub_medias_details || [];
  const coverUrl = decor.cover_image_url || (images[0]?.file_url ?? null);
  const slideImages = useMemo(() => {
    const urls = images.map((img) => img?.file_url).filter(Boolean);
    if (urls.length > 0) return urls;
    return coverUrl ? [coverUrl] : [];
  }, [images, coverUrl]);

  useEffect(() => {
    setImageIndex(0);
  }, [decor?.id]);

  useEffect(() => {
    if (slideImages.length <= 1) return undefined;
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % slideImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [slideImages.length]);

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

  const activeImageUrl = slideImages[imageIndex] || coverUrl;

  const imageBlock = activeImageUrl ? (
    <div className="decor-image-single decor-card-public-cover">
      <img src={activeImageUrl} alt={decor.name} />
    </div>
  ) : (
    <div className="decor-card-public-placeholder">
      <span>{decor.name?.charAt(0) || "?"}</span>
    </div>
  );

  return (
    <>
      <article
        className={`decor-card-public ${compact ? "decor-card-public-compact" : ""}`}
        onClick={() => setDetailOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDetailOpen(true);
          }
        }}
      >
        <div className="decor-images-container">
          {imageBlock}
        </div>
        <div className="decor-card-public-content">
          <h3 className="decor-title">{decor.name}</h3>
          <p className="decor-card-public-description">{decor.short_description}</p>
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
