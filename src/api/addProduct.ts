import axios from 'axios';

interface ProductProps {
  firstName: string;
  lastName: string;
}

export const addProduct = async ({ firstName, lastName }: ProductProps) => {
  try {
    const response = await axios.post(`https://dummyjson.com/products/add`, {
      title: firstName + ' ' + lastName,
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке заявки:', error);
    throw error;
  }
};
