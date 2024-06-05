import { useAppSelector } from '@/app/hook'
import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import SEO from '@/components/seo'
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp'
import DoneIcon from '@mui/icons-material/Done'
import { Avatar, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next'
import {
	StyledButtonEdit,
	StyledCardVerified,
	StyledGridLayout,
	StyledWrapButtonBottom,
	StyledWrapDetailInfo,
	StyledWrapIndentity,
	StyledWrapInfoUser,
	StyledWrapStepCompleted,
} from './style'
import { formatDateToDDMMYYY, formatDateToMMDDYYYYSlash } from '@/utils/time'
import { convertGenderToValidSex } from '@/utils/index'
import { useNavigate } from 'react-router-dom'

export const ProfilePage = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { user } = useAppSelector((state) => state.authSlice.userInfo)

	return (
		<Grid container alignItems="flex-start" justifyContent="space-between">
			<SEO title={`Bughouse 🤡 - ${user.name || user.username || 'Your information'}`} />
			<StyledGridLayout item sm={12} md={4} lg={3} container>
				<StyledWrapInfoUser>
					<Avatar
						sx={{ width: 170, height: 170 }}
						srcSet={
							user.avatar ||
							'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/326706851_905071507593208_1684832252594277761_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=FVDo1ljBqpAAX9L_Ibl&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfDit6WnL3XB4EBzCoNr-HFO14fEDcUsOJJE9QxxE0D0rQ&oe=6419E0FF'
						}
					/>
					<Typography sx={{ fontSize: 26, textTransform: 'lowercase' }} fontWeight="bold">
						{user.name || user.username}
					</Typography>
					<StyledWrapIndentity>
						<DoneIcon fontSize="small" /> {t('USER.IDVerified')}
					</StyledWrapIndentity>
				</StyledWrapInfoUser>

				<StyledWrapDetailInfo>
					<Box className="DetailInfo__content">
						<Typography variant="body2" fontSize={14} color="initial" fontWeight="bold">
							{t('USER.From')}
						</Typography>

						<Typography variant="body1" fontSize={14} color="#84878B">
							{user.address.city || 'United States'}
						</Typography>
					</Box>

					<Box className="DetailInfo__content">
						<Typography variant="body2" fontSize={14} color="initial" fontWeight="bold">
							{t('USER.Member_Since')}
						</Typography>
						<Typography variant="body1" fontSize={14} color="#84878B">
							{formatDateToDDMMYYY(user.createdAt) || '07.12.1997'}
						</Typography>
					</Box>

					<StyledButtonEdit
						onClick={() => {
							navigate('/registerAuth')
						}}
					>
						{t('USER.Edit_My_Data')}
					</StyledButtonEdit>
				</StyledWrapDetailInfo>
			</StyledGridLayout>

			<Grid
				container
				item
				sm={12}
				md={8}
				lg={9}
				style={{
					padding: '0 40px',
				}}
			>
				<HeadingTitle>{t('USER.My_profile')}</HeadingTitle>

				<StyledWrapStepCompleted>
					<Typography variant="body2" color="initial" sx={{ fontSize: '22px', fontWeight: '600' }}>
						{t('USER.Complete_your_Profile')}
					</Typography>

					<Typography variant="body1" color="#3B3E44" className="heading__completed">
						{t('USER.Sub_Complete_your_Profile')}
					</Typography>

					<Grid sx={{ display: 'flex', gap: '10px' }} container>
						<ProfilePage.CardVerified contentDisplay={t('USER.Verified_Email_ID')} />
						<ProfilePage.CardVerified contentDisplay={t('USER.Verified_mobile_Number')} />
						<ProfilePage.CardVerified contentDisplay={t('USER.Complete_Basic_Info')} />
					</Grid>
				</StyledWrapStepCompleted>

				<Grid container spacing={3}>
					<ProfilePage.InputFeild name={t('USER.City')} defaultValue={user.address.city || 'United States'} />
					<ProfilePage.InputFeild
						name={t('USER.Street_address')}
						defaultValue={user.address.street || '1234 Main St'}
					/>
					<ProfilePage.InputFeild name={t('USER.Email_address')} defaultValue={user.email || ''} />
					<ProfilePage.InputFeild
						name={t('USER.Date_Of_Birth')}
						defaultValue={formatDateToMMDDYYYYSlash(user.dob) || '07/12/1997'}
					/>
					<ProfilePage.InputFeild
						name={t('USER.Gender')}
						defaultValue={convertGenderToValidSex(user.gender) || 'Khác'}
					/>
					<ProfilePage.InputFeild
						name={t('USER.ID_Number')}
						defaultValue={String(user.identity) || '123456789'}
					/>
				</Grid>

				{/* <StyledWrapButtonBottom>
					<StyledButtonEdit className="w-inline">{t('USER.Edit_My_Data')}</StyledButtonEdit>
				</StyledWrapButtonBottom> */}
			</Grid>
		</Grid>
	)
}

ProfilePage.CardVerified = ({ contentDisplay }: { contentDisplay: string }) => {
	return (
		<StyledCardVerified>
			<CheckCircleSharpIcon sx={{ color: '#145CE6' }} /> {contentDisplay}
		</StyledCardVerified>
	)
}

ProfilePage.InputFeild = ({
	name,
	defaultValue,
	disabled = true,
}: {
	name: string
	defaultValue: string
	disabled?: boolean
}) => {
	return (
		<Grid item md={6} xs={12} sx={{ width: '100%' }}>
			<Typography variant="body1" color="#84878B" fontWeight="bold">
				{name}
			</Typography>

			<div
				style={{
					width: '100%',
					border: '1px solid #DEDFE1',
					borderRadius: 10,
					overflow: 'hidden',
					marginTop: '5px',
				}}
			>
				<input
					type="text"
					style={{
						outline: 'none',
						fontSize: 14,
						border: 'none',
						padding: '15px 20px',
						width: '100%',
						flex: '1 1 0',
					}}
					defaultValue={defaultValue}
					disabled={disabled}
				/>
			</div>
		</Grid>
	)
}
