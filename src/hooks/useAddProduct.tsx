import { useMutation } from '@tanstack/react-query';
import { addProduct } from '@/api/addProduct';

interface ProductProps {
  firstName: string;
  lastName: string;
}

export const useAddProduct = () => {
  const { mutate: appendProduct, isPending: isMutationLoading } = useMutation({
    mutationFn: ({ firstName, lastName }: ProductProps) => addProduct({ firstName, lastName }),
  });

  return { appendProduct, isMutationLoading };
};
