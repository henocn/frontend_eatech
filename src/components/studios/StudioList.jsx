import { useState, useEffect } from "react";
import "./StudioList.css";
import api from "../../utils/axiosInstance";

const StudioList = () => {
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
        <div className="studio-card" key={studio.id}>
          <div className="studio-image">
            <img src={studio.image} alt={studio.name} />
          </div>

          <div className="studio-content">
            <h3 className="studio-title">{studio.name}</h3>
            <p className="studio-location">{studio.location}</p>
            <p className="studio-description">{studio.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudioList;
