import styled from 'styled-components';
import useModalStore from '@/store/useModalStore';
import useFormStore from '@/store/useFormStore';

const Modal = () => {
  const { closeModal } = useModalStore();
  const { data } = useFormStore();

  return (
    <ModalOverlay onClick={() => closeModal()}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Поздравляем!</ModalTitle>
        <ModalText>
          Поздравляем, {data.personal.lastName} {data.personal.firstName}.<br />
          Вам одобрена ${data.loan.amount} на {data.loan.term} дней.
        </ModalText>
        <ModalButton onClick={() => closeModal()}>Закрыть</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  animation: slideIn 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalTitle = styled.h3`
  color: #28a745;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ModalText = styled.p`
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }
`;

export default Modal;
