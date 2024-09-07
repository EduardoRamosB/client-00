import axios from "axios";

const kpisApi = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const getKpis = async (jwt: string) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  };
  const response = await kpisApi.get(`/kpis/data/`, config);
  console.log('response.data:', response.data)
  return response.data;
};