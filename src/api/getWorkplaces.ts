import axios from 'axios';

export const getWorkplaces = async () => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/category-list`);
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки мест работы:', error);
    return [];
  }
};
