import React, { forwardRef, Ref, InputHTMLAttributes } from 'react';
import MaskedInput from 'react-text-mask';

interface PhoneNumberMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: Ref<HTMLInputElement>;
}

const PhoneNumberMask: React.ForwardRefRenderFunction<HTMLInputElement, PhoneNumberMaskProps> = (
  props,
  ref
) => {

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        // Set the caret position to the beginning of the input
        event.target.setSelectionRange(0, 0);
      };

  return (
    <MaskedInput
      {...props}
      ref={(inputRef:any) => {
        if (ref) {
          // @ts-ignore
          ref(inputRef ? inputRef.inputElement : null);
        }
      }}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      onFocus={handleFocus}      
    />
  );
};

export default forwardRef(PhoneNumberMask);
