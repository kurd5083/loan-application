import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAddProduct } from '@/hooks/useAddProduct';

import useFormStore from '@/store/useFormStore';
import useModalStore from '@/store/useModalStore';

interface FormData {
  amount: number;
  term: number;
}

const FormLoan = () => {
  const navigate = useNavigate();
  const { data, updateLoan } = useFormStore();

  const [formData, setFormData] = useState<FormData>(data.loan);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { openModal } = useModalStore();
  const { appendProduct, isMutationLoading } = useAddProduct();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value, 10);
    const newData = { ...formData, amount };
    setFormData(newData);
    updateLoan(newData);
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = parseInt(e.target.value, 10);
    const newData = { ...formData, term };
    setFormData(newData);
    updateLoan(newData);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (isSubmitting || isMutationLoading) return;
    setIsSubmitting(true);
    setError(null);

    appendProduct(
      {
        firstName: data.personal.firstName,
        lastName: data.personal.lastName,
      },
      {
        onSuccess: () => openModal(),
        onError: (error) => setError(error.message || 'Ошибка при отправке заявки'),
        onSettled: () => setIsSubmitting(false),
      }
    );
  };

  return (
    <>
      <Title>Параметры займа</Title>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label>Сумма займа: ${formData.amount}</Label>
          <RangeInput
            type="range"
            min={200}
            max={1000}
            step={100}
            value={formData.amount}
            onChange={handleAmountChange}
          />
          <RangeMarks>
            <span>$200</span>
            <span>$400</span>
            <span>$600</span>
            <span>$800</span>
            <span>$1000</span>
          </RangeMarks>
        </FormGroup>

        <FormGroup>
          <Label>Срок займа: {formData.term} дней</Label>
          <RangeInput
            type="range"
            min={10}
            max={30}
            step={1}
            value={formData.term}
            onChange={handleTermChange}
          />
          <RangeMarks>
            <span>10 дней</span>
            <span>15 дней</span>
            <span>20 дней</span>
            <span>25 дней</span>
            <span>30 дней</span>
          </RangeMarks>
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <Button $variant="secondary" type="button" onClick={handleBack}>
            Назад
          </Button>
          <Button $variant="primary" type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Подать заявку'}
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
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #555;
  font-size: 1rem;
  text-align: center;
`;

const RangeInput = styled.input`
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  background: #e0e0e0;
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    background: #007bff;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    background: #0056b3;
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: #007bff;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

const RangeMarks = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
  font-size: 0.75rem;
  color: #888;
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

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  text-align: center;
`;

export default FormLoan;
