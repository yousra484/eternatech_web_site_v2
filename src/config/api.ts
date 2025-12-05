// Configuration de l'API selon l'environnement
const API_CONFIG = {
    // En développement, utiliser localhost
    // En production, utiliser l'URL du backend Render
    baseUrl: import.meta.env.PROD 
        ? 'https://eternatech-web-site-v2.onrender.com'
        : 'http://localhost:3001'
};

export const API_URL = API_CONFIG.baseUrl;
export const CONTACT_ENDPOINT = `${API_URL}/api/contact`;
