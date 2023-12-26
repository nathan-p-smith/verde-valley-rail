import React, { forwardRef, ForwardedRef, InputHTMLAttributes } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

interface CreditCardNumberMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  control: UseFormReturn<FieldValues>['control'];
}

const CreditCardNumberMask: React.ForwardRefRenderFunction<IMaskInput, CreditCardNumberMaskProps> = (
  { name, label, control, ...rest },
  ref
) => {
  const { setValue, register, unregister, formState } = control;

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={name} shrink={Boolean(formState.errors[name] || label)}>
        {label}
      </InputLabel>
      <IMaskInput
        {...rest}
        {...register(name)}
        ref={ref as ForwardedRef<IMaskInput>}
        mask="0000-0000-0000-0000"
        definitions={{ '#': /[0-9]/ }}
        placeholder=""
        onAccept={(value: string) => setValue(name, value.replace(/-/g, ''))}
        onComplete={() => unregister(name)}
        onFocus={() => {
          register(name);
          setValue(name, '', { shouldValidate: false });
        }}
      >
        {(inputProps) => <Input {...inputProps} />}
      </IMaskInput>
      {formState.errors[name] && (
        <FormHelperText>{formState.errors[name].message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default forwardRef(CreditCardNumberMask);
