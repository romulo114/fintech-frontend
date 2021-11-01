type ValidatorFn = (name: string) => Promise<boolean>

export interface Validator {
  fn: ValidatorFn;
  error: string;
}

export async function validate(value: string, validators: Validator[]): Promise<string> {
  for (const validator of validators) {
    try {
      if (await validator.fn(value)) {
        return ''
      } else {
        return validator.error
      }
    } catch (e) {
      return JSON.stringify(e)
    }
  }

  return ''
}

export function validateMaxLen(length: number): ValidatorFn {
  return (name: string) => new Promise(resolve => {
    resolve(name.length <= length)
  })
}

export function validateMinLen(length: number): ValidatorFn {
  return (name: string) => new Promise(resolve => {
    resolve(name.length >= length)
  })
}

export const isValidEmail: ValidatorFn = (value: string) => new Promise(resolve => {
  // eslint-disable-next-line
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  resolve(regex.test(value));
})

export const isNumber: ValidatorFn = (value: string) => new Promise(resolve => {
  const regex = /[^0-9]/;
  resolve(!regex.test(value));
})

export function isPasswordMatched(confirm: string): ValidatorFn {
  return (password: string) => new Promise(resolve => {
    resolve(password === confirm)
  })
}

export const isRequired: ValidatorFn = (value: string) => new Promise(resolve => {
  resolve(!!value)
})
