import * as Yup from 'yup'
import { passwordMatches } from './constants'
import { requiredMessage, invalidPassword, matchPasswordError } from './messages'

export const createCompanyValidationSchema = Yup.object().shape({
  profileImage: Yup.string().required(requiredMessage),
  name: Yup.string().required(requiredMessage),
  // TODO: validate email
  email: Yup.string().required(requiredMessage),
  responsible: Yup.string().required(requiredMessage),
  cnpj: Yup.string().required(requiredMessage),
  phone: Yup.string().required(requiredMessage),
  state: Yup.string().required(requiredMessage),
  city: Yup.string().required(requiredMessage),
  password: Yup.string()
    .required(requiredMessage)
    .matches(passwordMatches, invalidPassword),
  marketSegment: Yup.string().required(requiredMessage),
  description: Yup.string().required(requiredMessage),
})
