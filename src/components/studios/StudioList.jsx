import { useState, useEffect } from "react";
import "./StudioList.css";
import { MapPin } from "lucide-react";
import api from "../../utils/axiosInstance";

const StudioList = ({ onSelectStudio }) => {
  const [studios, setStudios] = useState([]);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const studios = await api.get("/studios");
        setStudios(studios);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchStudios();
  }, []);

  return (
    <div className="studio-list">
      {studios.map((studio) => (
        <div
          className="studio-card"
          key={studio.id}
          onClick={() => onSelectStudio && onSelectStudio(studio)} // remonte le studio
        >
          <div className="studio-image">
            <img src={studio.image} alt={studio.name} />
          </div>

          <div className="studio-content">
            <h3 className="studio-title">{studio.name}</h3>
            <p className="studio-location">
              <MapPin
                size={16}
                style={{ marginRight: "6px", verticalAlign: "middle" }}
              />
              {studio.location}
            </p>
            <p className="studio-description">{studio.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudioList;
