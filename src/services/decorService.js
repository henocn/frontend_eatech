import api from "../utils/axiosInstance";

/**
 * Récupère la liste des décors (endpoint public, sans auth).
 * @returns {Promise<Array>} Liste des décors avec studio_info, cover_image_url, etc.
 */
export async function getDecors() {
  const data = await api.get("/decos/");
  return Array.isArray(data) ? data : [];
}

/**
 * Récupère un décor par ID (détail complet avec studio_details).
 * @param {number} id - ID du décor
 * @returns {Promise<Object>} Décor avec studio_details, pub_medias_details, etc.
 */
export async function getDecorById(id) {
  return api.get(`/decos/${id}/`);
}
