import React, { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';
import { useFormContext } from 'react-hook-form';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

interface CreditCardNumberMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const CreditCardNumberMask: React.ForwardRefRenderFunction<HTMLInputElement, CreditCardNumberMaskProps> = (
  { name, label, ...rest },
  ref
) => {
  const { register, setValue, unregister, watch, formState } = useFormContext();
  const value = watch(name);

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={name} shrink={Boolean(value || label)}>
        {label}
      </InputLabel>
      <InputMask
        {...rest}
        mask="9999-9999-9999-9999"
        maskChar=""
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(name, e.target.value)}
        onBlur={() => unregister(name)}
        onFocus={() => {
          register(name);
          setValue(name, '', { shouldValidate: false });
        }}
      >
        {(inputProps:any) => <Input {...inputProps} ref={ref as ForwardedRef<HTMLInputElement>} />}
      </InputMask>
      {formState.errors[name] && (
        <FormHelperText>{formState.errors[name].message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default forwardRef(CreditCardNumberMask);
