import { Outlet } from 'react-router';
import styled from 'styled-components';

import Modal from '@/components/Modal';
import useModalStore from '@/store/useModalStore';

const MainLayout = () => {
  const { modal } = useModalStore();

  return (
    <>
      <Container>
        <FormContainer>
          <Outlet />
        </FormContainer>
      </Container>
      {modal && <Modal />}
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default MainLayout;
