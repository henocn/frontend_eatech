import { useState, useEffect } from "react";
import "./DecorList.css";
import DecorCard from "./DecorCard";
import api from "../../utils/axiosInstance";

const DecorList = ({ studioId, onSelectDecor }) => {
  const [decors, setDecors] = useState([]);

  useEffect(() => {
    if (!studioId) return;
    const fetchDecors = async () => {
      try {
        const data = await api.get(`/studios/${studioId}/decos/`);
        setDecors(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchDecors();
  }, [studioId]);

  return (
    <div className="decor-section">
      <div className="decor-intro">
        <h3 className="decor-intro-title">Nos Décors Vidéo</h3>
        <p className="decor-intro-text">
          Découvrez notre collection de décors professionnels que vous pouvez réserver pour vos tournages et productions vidéo.
        </p>
      </div>
      <div className="decor-list">
        {decors.map((decor) => (
          <DecorCard
            key={decor.id}
            decor={decor}
            onSelect={() => onSelectDecor && onSelectDecor(decor)}
          />
        ))}
      </div>
    </div>
  );
};

export default DecorList;
