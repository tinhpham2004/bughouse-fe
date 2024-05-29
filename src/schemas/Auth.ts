import * as yup from 'yup'

export const schema = yup
	.object({
		username: yup.string().required('Vui lòng nhập Email'),
		password: yup
			.string()
			.required('Vui lòng nhập mật khẩu')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
				'Password Must Contain 8 Characters, Have Uppercase, Lowercase, Number '
			),
	})
	.required()

const phoneRegExp = /^(84|\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-4])[0-9]{7}$/

export const signUp = yup
	.object({
		username: yup.string().required(),
		email: yup.string().email('Nhập sai định dạng email').required('Vui lòng nhập Email'),
		contactInfo: yup.string().matches(phoneRegExp, 'Vui lòng nhập đúng số điện thoại'),
		password: yup
			.string()
			.required('Vui lòng nhập mật khẩu')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
				'Password Must Contain 8 Characters, Have Uppercase, Lowercase, Number '
			),
		confirmPass: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
	})
	.required()

export const ResetPassSchema = yup.object({
	currentPass: yup
		.string()
		.required('Vui lòng nhập mật khẩu')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
			'Mật khẩu phải chứa từ 8 ký tự và chứa chữ hoa thường và số'
		),
	newPass: yup
		.string()
		.required('Vui lòng nhập mật khẩu mới')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
			'Mật khẩu mới phải chứa từ 8 ký tự và chứa chữ hoa thường và số'
		),
	confirmPass: yup
		.string()
		.oneOf([yup.ref('newPass'), null], 'Mật khẩu phải giống nhau')
		.required('Vui lòng xác nhận mật khẩu giống mật khẩu mới'),
})
