export const LOCAL_IP = process.env.LOCAL_IP || '192.168.1.143';
export const API_PORT = parseInt(process.env.API_PORT || '3002', 10);
export const NEXT_PORT = parseInt(process.env.NEXT_PORT || '3001', 10);

export const API_URL = `http://${LOCAL_IP}:${API_PORT}/api`;
export const NEXT_URL = `http://${LOCAL_IP}:${NEXT_PORT}`;
