import { useQuery } from '@tanstack/react-query';
import { getWorkplaces } from '@/api/getWorkplaces';

export const useGetWorkplaces = () => {
  const { data: workplaces, isLoading: workplacesLoading } = useQuery({
    queryKey: ['workplaces'],
    queryFn: () => getWorkplaces(),
  });

  return { workplaces, workplacesLoading };
};
