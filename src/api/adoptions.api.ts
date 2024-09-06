import axios from 'axios';
import { Adoption } from '../types';

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const getAdoptions = async (): Promise<Adoption[]> => {
  const response = await api.get('shelter/adoptions/');
  return response.data;
};

export const createAdoption = async (adoption: Adoption, jwt: string): Promise<Adoption> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  };

  const response = await api.post('shelter/adoptions/', adoption, config);
  return response.data;
};

export const updateAdoption = async (id: number, adoption: Adoption, jwt: string): Promise<Adoption> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  };

  const response = await api.put(`shelter/adoptions/${id}/`, adoption, config);
  return response.data;
};

export const deleteAdoption = async (id: number, jwt: string): Promise<void> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  };

  await api.delete(`shelter/adoptions/${id}/`, config);
};
