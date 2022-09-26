import {
  REVOLUT_PAY_ORDER_ID_URL_PARAMETER,
  REVOLUT_PAY_SUCCESS_REDIRECT_URL_PARAMETER,
  REVOLUT_PAY_FAILURE_REDIRECT_URL_PARAMETER,
} from './constants'

const getSearchParamsByName = (name: string) =>
  new URLSearchParams(window.location.search).get(name)

export const getRevolutPayOrderIdURLParam = () =>
  getSearchParamsByName(REVOLUT_PAY_ORDER_ID_URL_PARAMETER)

export const getRevolutPaySuccessURLParam = () =>
  getSearchParamsByName(REVOLUT_PAY_SUCCESS_REDIRECT_URL_PARAMETER)

export const getRevolutPayFailureURLParam = () =>
  getSearchParamsByName(REVOLUT_PAY_FAILURE_REDIRECT_URL_PARAMETER)
