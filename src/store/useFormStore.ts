import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FormData {
  personal: {
    phone: string;
    firstName: string;
    lastName: string;
    gender: string;
  };
  address: {
    workplace: string;
    address: string;
  };
  loan: {
    amount: number;
    term: number;
  };
}

interface FormStore {
  data: FormData;
  updatePersonal: (data: FormData['personal']) => void;
  updateAddress: (data: FormData['address']) => void;
  updateLoan: (data: FormData['loan']) => void;
}

const initialState: FormData = {
  personal: {
    phone: '',
    firstName: '',
    lastName: '',
    gender: '',
  },
  address: {
    workplace: '',
    address: '',
  },
  loan: {
    amount: 200,
    term: 10,
  },
};

const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      data: initialState,

      updatePersonal: (personal) =>
        set((state) => ({
          data: { ...state.data, personal },
        })),

      updateAddress: (address) =>
        set((state) => ({
          data: { ...state.data, address },
        })),

      updateLoan: (loan) =>
        set((state) => ({
          data: { ...state.data, loan },
        })),
    }),
    {
      name: 'application-storage',
    }
  )
);

export default useFormStore;
