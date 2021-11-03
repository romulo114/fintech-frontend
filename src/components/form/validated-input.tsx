import React, { useCallback, ChangeEventHandler, ChangeEvent } from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { ValidatedText } from 'types/validate'
import { validate, Validator } from 'utils/validators'

interface ValidatedInputProps {
  validators: Validator[];
  value: ValidatedText;
  setValue: (value: ValidatedText) => void;
}
export const ValidatedInput: React.FC<ValidatedInputProps & TextFieldProps> = (props) => {

  const { validators, setValue, value, ...others } = props

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      validate(newValue, validators).then(error => {
        setValue({ value: newValue, error })
      })
    }, [validators, setValue]
  )

  return (
    <TextField
      value={value.value}
      onChange={handleChange}
      helperText={value.error}
      error={!!value.error}
      {...others}
    />
  )
}
