import * as yup from 'yup';

export const createGroupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Tên nhóm không được bỏ trống!'),
  description: yup
    .string()
    .max(255, 'Không được vượt quá 255 kí tự'),
  maxUser: yup
    .number('Bạn phải nhập vào số'),
})