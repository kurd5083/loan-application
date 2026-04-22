import { create } from 'zustand';

interface ModalType {
  modal: boolean;

  openModal: () => void;
  closeModal: () => void;
}

const useModalStore = create<ModalType>((set) => ({
  modal: false,

  openModal: () => set(() => ({ modal: true })),
  closeModal: () => set(() => ({ modal: false })),
}));

export default useModalStore;
