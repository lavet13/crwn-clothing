import { Group, Input, Label } from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <Label className={`${otherProps.value.length ? 'shrink' : ''}`}>
          {label}
        </Label>
      )}
    </Group>
  );
};

export default FormInput;
