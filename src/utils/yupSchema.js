import * as yup from 'yup';

export const createGroupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Tên nhóm không được bỏ trống!')
    .max(70, 'Không được vượt quá 70 kí tự'),
  description: yup
    .string()
    .max(255, 'Không được vượt quá 255 kí tự'),
  maxUser: yup
    .number('Bạn phải nhập vào số')
    .integer('Bạn phải nhập vào số nguyên')
    .min(1, 'Bạn phải nhập vào số lớn hơn 0')
    .max(20, 'Tối đa một nhóm 20 người dùng'),
})