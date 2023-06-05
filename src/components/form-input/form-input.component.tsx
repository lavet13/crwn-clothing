import { FC, InputHTMLAttributes } from 'react';
import { Group, Input, Label } from './form-input.styles';

type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <Label
          shrink={
            !!(
              otherProps.value &&
              typeof otherProps.value === 'string' &&
              otherProps.value.length
            )
          }
        >
          {label}
        </Label>
      )}
    </Group>
  );
};

export default FormInput;
