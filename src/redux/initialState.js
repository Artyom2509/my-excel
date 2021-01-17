/* eslint-disable operator-linebreak */
import {defaultStyles, defaultTitle} from '../constants';
import {clone} from '../core/utils';

const defaultState = {
  rowState: {},
  title: defaultTitle,
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

const normilize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export function normilizeInitialState(state) {
  return state ? normilize(state) : clone(defaultState);
}
