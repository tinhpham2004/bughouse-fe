import { useNavigate } from 'react-router-dom'

export function ClientErrorPage() {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/')
	}

	return (
		// <Result
		// 	status="500"
		// 	title="Oops..."
		// 	subTitle="Đã có lỗi xảy ra"
		// 	extra={
		// 		<Button onClick={handleClick} type="primary">
		// 			Quay lại trang chủ
		// 		</Button>
		// 	}
		// />
		<>Make something went wrong right here</>
	)
}
