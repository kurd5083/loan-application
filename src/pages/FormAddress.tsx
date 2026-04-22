import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useGetWorkplaces } from '@/hooks/useGetWorkplaces';

import useFormStore from '@/store/useFormStore';

interface FormData {
  workplace: string;
  address: string;
}

const FormAddress = () => {
  const navigate = useNavigate();
  const { data, updateAddress } = useFormStore();

  const [formData, setFormData] = useState<FormData>(data.address);

  const { workplaces, workplacesLoading } = useGetWorkplaces();
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.workplace) {
      newErrors.workplace = 'Выберите место работы';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Введите адрес проживания';
    } else if (formData.address.trim().length < 5) {
      newErrors.address = 'Адрес должен содержать минимум 5 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    const updateData = { ...formData, [field]: value };
    setFormData(updateData);

    updateAddress(updateData);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/loan');
    }
  };

  return (
    <>
      <Title>Адрес и место работы</Title>

      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label>Место работы *</Label>
          <Select
            value={formData.workplace}
            $isError={!!errors.workplace}
            onChange={(e) => handleChange('workplace', e.target.value)}
          >
            <option value="">Выберите место работы</option>
            {workplacesLoading ? (
              <option>загрузка...</option>
            ) : (
              workplaces?.map((place: string) => (
                <option key={place} value={place}>
                  {place}
                </option>
              ))
            )}
          </Select>
          {errors.workplace && <ErrorMessage>{errors.workplace}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Адрес проживания *</Label>
          <Input
            type="text"
            value={formData.address}
            $isError={!!errors.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Введите ваш адрес проживания"
          />
          {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
        </FormGroup>

        <ButtonGroup>
          <Button $variant="secondary" type="button" onClick={handleBack}>
            Назад
          </Button>
          <Button $variant="primary" type="button" onClick={handleNext}>
            Далее
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #555;
  font-size: 0.9rem;
`;

const Select = styled.select<{ $isError?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${(props) => (props.$isError ? '#dc3545' : '#e0e0e0')};
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$isError ? '#dc3545' : '#007bff')};
    box-shadow: 0 0 0 3px
      ${(props) => (props.$isError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 123, 255, 0.1)')};
  }

  &:hover {
    border-color: ${(props) => (props.$isError ? '#dc3545' : '#007bff')};
  }
`;

const Input = styled.input<{ $isError?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${(props) => (props.$isError ? '#dc3545' : '#e0e0e0')};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$isError ? '#dc3545' : '#007bff')};
    box-shadow: 0 0 0 3px
      ${(props) => (props.$isError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 123, 255, 0.1)')};
  }

  &:hover {
    border-color: ${(props) => (props.$isError ? '#dc3545' : '#007bff')};
  }

  &::placeholder {
    color: #999;
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.$variant === 'secondary'
      ? `
      background: #6c757d;
      color: white;
      
      &:hover {
        background: #5a6268;
        transform: translateY(-1px);
      }
    `
      : `
      background: #007bff;
      color: white;
      
      &:hover {
        background: #0056b3;
        transform: translateY(-1px);
      }
    `}

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

export default FormAddress;
