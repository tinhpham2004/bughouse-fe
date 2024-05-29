import * as yup from 'yup'

export const schemaFormCreateRoom = yup
	.object({
		name: yup.string().required('Vui lòng nhập tên phòng '),
		acreage: yup.number().min(1).max(500).required('Vui lòng nhập vào diện tích phòng'),
		basePrice: yup.number().min(10000).max(1000000000).required('Vui lòng nhập vào số tiền trọ / tháng'),
		roomElectric: yup.number().required('Vui lòng nhập vào tiền điện / tháng hoặc /kw'),
		totalNbPeople: yup
			.number()
			.min(1)
			.max(24, 'Vui lòng nhập lại số lượng người < 24')
			.required('Vui lòng nhập vào số người 1 phòng'),
		period: yup.number().required('Vui lòng chọn kì hạn'),
		addressDetail: yup.string().required('Vui lòng nhập vào số nhà cụ thể'),
	})
	.required()
