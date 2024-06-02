import { authApi } from '@/api/authApi'
import { setUserInfo } from '@/app/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import UploadImage from '@/components/common/UploadImage'
import SEO from '@/components/seo'
import { IInfoFPT } from '@/models/auth'
import ShowNostis from '@/utils/show-noti'
import ImageIcon from '@mui/icons-material/Image'
import axios from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { StyledButtonUpdateId, StyledMiddle, StyledWrapUpdateID } from './styles'
import { convertSexToValidGender } from '@/utils/index'
type FormValues = {
	front: any
	back: any
}

const UpdateId = () => {
	const { control, handleSubmit, setValue, register } = useForm<FormValues>({
		defaultValues: {
			front: '',
			back: '',
		},
	})
	const navigate = useNavigate()
	const verifyInfo = useAppSelector((state) => state.authSlice.verifyInfo)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!verifyInfo) {
			navigate('/login')
		}
	}, [verifyInfo])

	const sendIDProfile = handleSubmit(async (values) => {
		const formData = new FormData()
		const file = values.front[0]
		formData.append('image', file)
		try {
			const { data } = await axios.post('https://api.fpt.ai/vision/idr/vnm', formData, {
				headers: {
					'api-key': import.meta.env.VITE_API_FPTAI_ID,
				},
			})
			handleUpdateInfo(data[0] || data)
		} catch (error) {
			console.log('🚀 ~ file: UpdateId.tsx:40 ~ sendIDProfile ~ error:', error)
		}
	})

	const handleUpdateInfo = async (data: { data: IInfoFPT[] }) => {
		try {
			const dataRequest = {
				...data.data[0],
				userId: verifyInfo?.userId || '',
				sex: convertSexToValidGender(data.data[0].sex),
			}
			console.log('🚀 ~ file: UpdateId.tsx:46 ~ handleUpdateInfo ~ dataRequest', dataRequest)
			const response = await authApi.verifyInfo(dataRequest)

			localStorage.setItem('dataUser', JSON.stringify(response.data.data))

			dispatch(setUserInfo(response.data.data))
			ShowNostis.success(response.data.message || 'Cập nhập thành công !!!')
			navigate('/')
		} catch (error) {
			console.log('🚀 ~ file: UpdateId.tsx:46 ~ handleUpdateInfo ~ error:', error)
			ShowNostis.error('Something went wrong, please contact an admin')
		}
	}

	const { t } = useTranslation()

	return (
		<StyledWrapUpdateID>
			<SEO title="Bughouse 🤡 - Update your ID" />

			<p className="heading">{t('Update_id.More_info')}</p>

			<p className="description_updateId">
				{t('Update_id.Description_info')} <br /> {t('Update_id.Description_info2')}
			</p>

			<form onSubmit={sendIDProfile}>
				<div style={{ display: 'flex', gap: '20px' }}>
					<UploadImage
						addFiles={(file: any) => setValue('front', file)}
						content={
							<div style={{ textAlign: 'center' }}>
								<ImageIcon style={{ fontSize: '46px' }} />
								<br />
								{t('Update_id.Front_of_ID')}
								<br />
								{t('Update_id.Drag_here')}
							</div>
						}
					/>
					<br />
					<UploadImage
						addFiles={(file: any) => setValue('back', file)}
						content={
							<div style={{ textAlign: 'center' }}>
								<ImageIcon style={{ fontSize: '46px' }} /> <br />
								{t('Update_id.Back_of_ID')} <br />
								{t('Update_id.Drag_here')}
							</div>
						}
					/>
				</div>

				<StyledMiddle>
					<StyledButtonUpdateId variant="contained" type="submit">
						{t('Continue')}
					</StyledButtonUpdateId>
				</StyledMiddle>
			</form>
		</StyledWrapUpdateID>
	)
}

export default UpdateId
