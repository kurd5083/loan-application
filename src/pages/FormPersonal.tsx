import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useFormStore from '@/store/useFormStore';

interface FormData {
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
}

const FormPersonal = () => {
  const navigate = useNavigate();
  const { data, updatePersonal } = useFormStore();

  const [formData, setFormData] = useState<FormData>(data.personal);

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '');

    const limitedDigits = digits.slice(0, 11);

    if (limitedDigits.length === 0) {
      return '';
    } else if (limitedDigits.length <= 1) {
      return limitedDigits;
    } else if (limitedDigits.length <= 4) {
      return `${limitedDigits.slice(0, 1)} ${limitedDigits.slice(1)}`;
    } else if (limitedDigits.length <= 7) {
      return `${limitedDigits.slice(0, 1)} ${limitedDigits.slice(1, 4)} ${limitedDigits.slice(4)}`;
    } else if (limitedDigits.length <= 9) {
      return `${limitedDigits.slice(0, 1)} ${limitedDigits.slice(1, 4)} ${limitedDigits.slice(4, 7)} ${limitedDigits.slice(7)}`;
    } else {
      return `${limitedDigits.slice(0, 1)} ${limitedDigits.slice(1, 4)} ${limitedDigits.slice(4, 7)} ${limitedDigits.slice(7, 9)} ${limitedDigits.slice(9, 11)}`;
    }
  };

  const getRawPhone = (formattedPhone: string): string => {
    return formattedPhone.replace(/\s/g, '');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const digits = rawValue.replace(/\D/g, '');
    const formatted = formatPhone(digits);
    handleChange('phone', formatted);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    const rawPhone = getRawPhone(formData.phone);

    if (!formData.phone) {
      newErrors.phone = 'Введите номер телефона';
    } else if (rawPhone.length !== 11) {
      newErrors.phone = 'Введите корректный номер (формат: 7 XXX XXX XX XX)';
    } else if (!/^7\d{10}$/.test(rawPhone)) {
      newErrors.phone = 'Номер должен начинаться с 7 и содержать 11 цифр';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'Введите имя';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Имя должно содержать минимум 2 символа';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Введите фамилию';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Фамилия должна содержать минимум 2 символа';
    }

    if (!formData.gender) {
      newErrors.gender = 'Выберите пол';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    const updateData = { ...formData, [field]: value };
    setFormData(updateData);

    updatePersonal(updateData);
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/address');
    }
  };

  return (
    <>
      <Title>Личные данные</Title>

      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label>Телефон *</Label>
          <StyledInput
            type="tel"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="7 XXX XXX XX XX"
            $isError={!!errors.phone}
          />
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Имя *</Label>
          <StyledInput
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Введите ваше имя"
            $isError={!!errors.firstName}
          />
          {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Фамилия *</Label>
          <StyledInput
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Введите вашу фамилию"
            $isError={!!errors.lastName}
          />
          {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Пол *</Label>
          <StyledSelect
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            $isError={!!errors.gender}
          >
            <option value="">Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </StyledSelect>
          {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
        </FormGroup>

        <ButtonGroup>
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

const StyledInput = styled.input<{ $isError?: boolean }>`
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

const StyledSelect = styled.select<{ $isError?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${(props) => (props.$isError ? '#dc3545' : '#e0e0e0')};
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.2s ease;
  cursor: pointer;

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

export default FormPersonal;
