import { commonApi } from '@/api/index'
import ShowNostis from '@/utils/show-noti'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { StyledPayment } from './styles'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
const PaymentPageHandle = () => {
	const location = useLocation()
	console.log('🚀 ~ file: index.tsx:9 ~ PaymentPageHandle ~ location:', location)
	const navigate = useNavigate()

	const [isSuccess, setisSuccess] = useState(false)

	const postTopupWallet = async () => {
		try {
			if (location.search) {
				const response = await commonApi.confirmWallet(location.search)
				// navigate('/mywallet')
				ShowNostis.success('Nap tien thanh cong!!!')
				setisSuccess(true)
			}
		} catch (error) {
			ShowNostis.error('Nap tien that bai, loi giao dich')
			console.log('🚀 ~ file: index.tsx:17 ~ postTopupWal ~ error:', error)
			setisSuccess(false)
		}
	}

	useEffect(() => {
		postTopupWallet()
	}, [])

	return (
		<StyledPayment>
			<div className="icon">
				<CheckOutlinedIcon />
			</div>

			<p className="heading">Nạp tiền thành công</p>

			<p>Bạn đã nạp thành công vào ví BugHouse </p>

			<Button variant="contained" onClick={() => navigate('/mywallet')}>
				Chuyển về ví của tôi
			</Button>
		</StyledPayment>
	)
}

export default PaymentPageHandle
