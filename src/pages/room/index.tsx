import { contractApi } from '@/api/contractApi'
import { roomApi } from '@/api/roomApi'
import { userApi } from '@/api/userApi'
import { useAppSelector } from '@/app/hook'
import Card from '@/components/common/Card'
import RoomDetailInfo from '@/components/common/Room/RoomDetailInfo'
import { StyledInfoOfOwner, StyledModalReOpenContract } from '@/components/common/Room/styles/RoomItemStyles'
import SEO from '@/components/seo'
import { typeOfRoom } from '@/constants/room'
import { IpropsRoomMaster } from '@/models/room'
import { getContract, getContractTerm } from '@/utils/contract'
import { getIcon } from '@/utils/icon'
import { getLastName, randomId } from '@/utils/index'
import ShowNostis from '@/utils/show-noti'
import { formatDDMMYYYY } from '@/utils/time'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'
import DeckIcon from '@mui/icons-material/Deck'
import ErrorIcon from '@mui/icons-material/Error'
import PersonIcon from '@mui/icons-material/Person'
import { Avatar, Box, Button, CircularProgress, Fade, Grid, Modal, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HomePageContent, WrapperBackground } from 'pages/Home/HomeStyles'
import { memo, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import SignatureCanvas from 'react-signature-canvas'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
	ButtonRent,
	DetailRoom,
	HeadingCardDetail,
	HeadingRoomBlock,
	ModalContract,
	RoomDetailContent,
	RoomDetailGallary,
	RoomUtiliti,
	SignName,
	SignNameItem,
	StyledAcceptTerm,
	StyledActionButton,
	StyledButtonAcceptTerm,
	StyledCheckBox,
	StyledFeedbackRoom,
	StyledHeadingFeedback,
	StyledItemFeedback,
	StyledLabelAcceptTerm,
	StyledWrapFeedback,
} from './styles/RoomDetail'
import { IUser } from '@/models/user'

export default function RoomDetail() {
	const [isShowContract, setIsShowContract] = useState(false)
	const { user } = useAppSelector((state) => state.authSlice.userInfo)
	const [showStep, setShowStep] = useState<'Term' | 'Contract'>('Term')
	const { t } = useTranslation()
	const [isSign, setIsSign] = useState(false)
	const [showModalOTP, setShowModalOTP] = useState(false)
	const { roomid } = useParams()
	const navigation = useNavigate()
	const queryClient = useQueryClient()
	const [isAcceptTerm, setIsAcceptTerm] = useState(false)
	const [contractHash, setContractHash] = useState('')
	const [showModalReport, setshowModalReport] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	// i will add loading after
	const { data: RoomData, isLoading } = useQuery({
		queryKey: ['getDetailsRoom', roomid],
		queryFn: () => {
			if (roomid) return roomApi.getDetailRoom(roomid)
			return
		},
		staleTime: 60 * 1000,
	})

	const { mutate: mutateContract, isLoading: loadingContract } = useMutation({
		mutationFn: contractApi.createContract,
		mutationKey: ['PostNewContract'],
		onSuccess: (data) => {
			setContractHash(data.data.contractHash)
			setShowStep('Contract')
		},
		onError: (err) => {
			console.log(err)
		},
	})
	const { mutate: mutateSignContract, isLoading: loadingSignContract } = useMutation({
		mutationFn: contractApi.signContract,
		mutationKey: ['SignContractUser'],
		onSuccess: (data) => {
			setIsSign(true)
			setShowModalOTP(false)
			setIsShowContract(false)
			// setShowStep("Term")
			queryClient.invalidateQueries({ queryKey: ['getDetailsRoom'] })
			ShowNostis.success('Rent room successfully!!!')
		},
		onError: (err) => {
			console.log(err)
			setShowModalOTP(false)
		},
	})

	const handleComfirmOTP = async () => {
		try {
			trim()
			setIsSign(true)
			mutateSignContract({
				roomId: RoomData?.data._id,
				contractHash: contractHash || '',
			})
		} catch (error) {}
	}

	const handleCreateContract = () => {
		const newTrans = {
			period: RoomData?.data.period || 6,
			room: RoomData?.data._id,
			dateRent: formatDDMMYYYY(new Date()),
			payTime: formatDDMMYYYY(new Date()),
			payment: RoomData?.data.basePrice,
			payMode: 'VNPay',
		}
		mutateContract(newTrans)
	}

	const handleSignContract = () => {
		setShowModalOTP(true)
	}

	const [dataURL, setDataURL] = useState<string | null>(null)
	let padRef = useRef<SignatureCanvas>(null)

	const trim = () => {
		const url = padRef.current?.getTrimmedCanvas().toDataURL('image/png')
		if (url) setDataURL(url)
	}

	return (
		<WrapperBackground>
			<SEO title={`Bughouse 🤡 - ${RoomData?.data.name || 'Room detail'}`} />
			<HomePageContent style={{ paddingTop: '32px' }}>
				<RoomDetailGallary>
					<RoomDetail.Carousel itemData={RoomData?.data?.roomAttachment?.url || []} />
				</RoomDetailGallary>

				<HeadingRoomBlock>
					<Typography className="headingRoom">
						{RoomData?.data?.name.replace(/,/g, '') || 'tên đang cập nhập'}
					</Typography>

					<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						{RoomData?.data?.owner?.username === user.username &&
							RoomData.data.status !== 'already-rent' && (
								<ButtonRent onClick={() => navigation(`/room/addRoom/${RoomData?.data._id}`)}>
									{t('Room.edit_room')}
								</ButtonRent>
							)}

						{RoomData &&
							RoomData?.data?.owner?.username !== user.username &&
							RoomData.data.status === 'available' && (
								<div style={{ minWidth: '200px', display: 'flex', alignItems: 'center', gap: 10 }}>
									<ButtonRent onClick={() => setIsShowContract(true)}>
										{loadingContract ? <CircularProgress size={10} /> : t('Room.Rent')}
									</ButtonRent>
									<ButtonRent onClick={() => setshowModalReport(true)}>Báo cáo</ButtonRent>
								</div>
							)}
					</div>
				</HeadingRoomBlock>

				<DetailRoom container spacing="32px">
					<Grid item xs={12} md={7}>
						<Box style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
							<Card>
								<HeadingCardDetail>
									<CottageOutlinedIcon
										style={{ fontSize: '32px', color: 'rgb(247, 52, 134)', fontWeight: 'bold' }}
									/>
									{t('Room.room_info')}
								</HeadingCardDetail>
								<RoomDetailContent container spacing="20px">
									<RoomDetailInfo
										label={t('Room.status')}
										value={
											RoomData?.data?.status === 'already-rent'
												? t('Room.Status_rented')
												: t('Room.Status_Available')
										}
										xs={4}
										md={3}
										highlight={RoomData?.data?.status === 'already-rent' ? 'unactive' : 'active'}
									/>
									<RoomDetailInfo
										label={t('Room.room_rates')}
										value={RoomData?.data?.basePrice.toLocaleString() + ' đồng'}
										xs={4}
										md={3}
									/>
									<RoomDetailInfo
										label={t('Room.acreage')}
										value={RoomData?.data?.acreage + ' m^2'}
										xs={4}
										md={3}
									/>
									<RoomDetailInfo
										label={t('Room.deposit')}
										value={RoomData?.data?.deposit.toLocaleString() + ' đồng' || 'Đang cập nhập'}
										xs={4}
										md={3}
									/>
									<RoomDetailInfo
										label={t('Room.capacity')}
										value={
											RoomData?.data?.totalNbPeople +
											' ' +
											(RoomData?.data?.gender === 'All' ? ' Nam hoặc Nữ' : RoomData?.data?.gender)
										}
										xs={4}
										md={3}
									/>
									<RoomDetailInfo
										label={t('Room.electricity')}
										value={RoomData?.data.services[1].basePrice + ' đồng' || 'Free'}
										xs={4}
										md={3}
									/>
									<RoomDetailInfo
										label={t('Room.electricity')}
										value={
											typeOfRoom.find((item) => item?.value === RoomData?.data?.typeRoom)
												?.label || 'Phòng cho thuê'
										}
										xs={4}
										md={3}
									/>
									<RoomDetailInfo
										label={t('Room.address')}
										value={RoomData?.data?.address?.fullText || 'Upadating...'}
									/>
								</RoomDetailContent>
							</Card>

							<Card>
								<HeadingCardDetail>
									<DeckIcon
										style={{ fontSize: '32px', color: 'rgb(13, 191, 226)', fontWeight: 'bold' }}
									/>
									{t('Room.utilities')}
								</HeadingCardDetail>

								<RoomDetailContent
									container
									style={{ fontSize: '16px', color: '#333333', fontWeight: 'normal' }}
									spacing="24px"
								>
									{RoomData?.data?.amentilities.map((item) => (
										<RoomDetail.Utiliti key={item} label={item} icon={getIcon(item)} />
									))}
								</RoomDetailContent>
							</Card>

							<Card>
								<HeadingCardDetail>
									<ErrorIcon
										style={{ fontSize: '32px', color: 'rgb(139, 87, 42)', fontWeight: 'bold' }}
									/>
									{t('Room.More_description')}
								</HeadingCardDetail>
								<p
									style={{ paddingTop: '10px' }}
									dangerouslySetInnerHTML={{
										__html: RoomData?.data?.description || 'Không có mô tả',
									}}
								/>
							</Card>
						</Box>
					</Grid>

					<Grid item xs={12} md={5}>
						<StyledFeedbackRoom>
							<RoomDetail.InfoOfMaster
								dataOwner={RoomData?.data?.owner}
								postDate={RoomData?.data?.createdAt}
							/>

							<RoomDetail.Feedback roomId={RoomData?.data._id || ''} />
						</StyledFeedbackRoom>
					</Grid>
				</DetailRoom>
			</HomePageContent>

			<Modal
				style={{ overflow: 'hidden', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
				open={isShowContract}
				onClose={() => setIsShowContract(false)}
				closeAfterTransition
			>
				<Fade in={isShowContract}>
					<ModalContract className="parent">
						{showStep === 'Term' && (
							<>
								<div
									dangerouslySetInnerHTML={{
										__html: getContractTerm(),
									}}
									style={{ padding: '40px 20px' }}
								/>
								<StyledAcceptTerm>
									<StyledCheckBox
										type="checkbox"
										id="term"
										checked={isAcceptTerm}
										onChange={() => setIsAcceptTerm((pre) => !pre)}
									/>
									<StyledLabelAcceptTerm htmlFor="term">
										{t('Room.Accept_terms')}
									</StyledLabelAcceptTerm>

									{isAcceptTerm && (
										<StyledButtonAcceptTerm variant="contained" onClick={handleCreateContract}>
											{loadingContract ? <CircularProgress size={10} /> : t('Room.Continue')}
										</StyledButtonAcceptTerm>
									)}
								</StyledAcceptTerm>
							</>
						)}

						{showStep === 'Contract' && (
							<>
								<div
									dangerouslySetInnerHTML={{
										__html: getContract({
											dateRent: '',
											room: RoomData?.data || undefined,
											_id: RoomData?.data?._id || '',
											lessor: (RoomData?.data?.owner as IUser) || '',
											renter: user || undefined,
										}),
									}}
								/>

								<SignName container>
									<SignNameItem item xs={6}>
										<Box className="headingSign">
											<h6 style={{ fontSize: '20px' }}>BÊN CHO THUÊ</h6>
											(Ký và ghi rõ họ tên)
										</Box>
										<Box className="signContent">
											<p>{getLastName(RoomData?.data?.owner?.name!)}</p>
											<p>{RoomData?.data?.owner?.name}</p>
										</Box>
									</SignNameItem>

									<SignNameItem item xs={6}>
										<Box className="headingSign">
											<h6 style={{ fontSize: '20px' }}>BÊN THUÊ</h6>
											(Ký và ghi rõ họ tên)
										</Box>
										<Box className="signContent">
											{isSign ? (
												<>
													<img src={dataURL || ''} alt="user generated signature" />
													<p>{user.name || 'Doan ngoc quoc bao'}</p>
												</>
											) : (
												<button onClick={handleSignContract}>Bấm vào đây để ký tên</button>
											)}
										</Box>
									</SignNameItem>
								</SignName>
							</>
						)}

						<Modal open={showModalOTP} onClose={() => setShowModalOTP(false)}>
							<ModalContract
								style={{
									width: 400,
									background: 'white',
									textAlign: 'center',
									height: 'auto',
									paddingBottom: 20,
									overflow: 'hidden',
								}}
							>
								<h3>Ký tên xác thực !</h3>
								<p style={{ fontSize: 14, margin: '10px 0' }}>
									Chúng tôi cần chữ ký của bạn !!!, nếu sai bạn sẽ phải chịu mọi trách nhiệm liên quan
									tới pháp luật{' '}
								</p>
								<div style={{ border: '1px solid black', width: '350px', height: 180 }}>
									<SignatureCanvas
										canvasProps={{ width: '350px', height: 200, className: 'sigCanvas' }}
										ref={padRef}
									/>
								</div>

								<StyledActionButton>
									<Button
										variant="outlined"
										style={{ marginRight: 10 }}
										onClick={() => setShowModalOTP(false)}
									>
										Quay lại
									</Button>
									<Button
										variant="outlined"
										disabled={loadingSignContract}
										onClick={handleComfirmOTP}
									>
										{loadingSignContract ? <CircularProgress size={14} /> : 'Xác nhận'}
									</Button>
								</StyledActionButton>
							</ModalContract>
						</Modal>
					</ModalContract>
				</Fade>
			</Modal>

			<RoomDetail.ReportModal open={showModalReport} setOpen={setshowModalReport} roomId={RoomData?.data._id} />
		</WrapperBackground>
	)
}

interface IProps {
	label: string
	xs?: number
	md?: number
	icon: React.ReactNode
}

RoomDetail.Utiliti = ({ label, xs = 4, md = 3, icon }: IProps) => {
	return (
		<RoomUtiliti item xs={xs} md={md}>
			{icon}
			<span>{label}</span>
		</RoomUtiliti>
	)
}

RoomDetail.InfoOfMaster = ({ dataOwner, postDate }: IpropsRoomMaster) => {
	const { t } = useTranslation()

	return (
		<Card>
			<HeadingCardDetail>
				<PersonIcon style={{ fontSize: '32px', color: 'rgb(72, 119, 248)', fontWeight: 'bold' }} />
				{t('Room.room_owner_information')}
			</HeadingCardDetail>

			<StyledInfoOfOwner>
				<div className="img">
					<img src={`https://api.multiavatar.com/${dataOwner?._id}.png`} />
				</div>
				<div className="main-content">
					<p>{dataOwner?.name || dataOwner?.username || 'Đang cập nhập'}</p>
					<p>
						<span> {dataOwner?.phone || '+84911336236'} </span>
					</p>
				</div>
				<div
					style={{
						paddingLeft: '24px',
					}}
				>
					{t('Room.Date_post')}:<p>{new Date(postDate || '')?.toLocaleDateString() || ''}</p>
				</div>
			</StyledInfoOfOwner>
		</Card>
	)
}

RoomDetail.Feedback = ({ roomId }: { roomId: string }) => {
	const { register, handleSubmit, reset } = useForm<{ content: string }>()

	const { data, isLoading } = useQuery({
		queryFn: () => (roomId ? roomApi.getRoomFeedback(roomId) : null),
		queryKey: ['getRoomFeedback', roomId],
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	})

	const mutateFeedback = useMutation({
		mutationKey: ['postFeedback'],
		mutationFn: roomApi.addFeedback,
		onSuccess: () => {
			reset({ content: '' })
		},
		onError: (err) => {},
	})

	const handleAddFeedback = (values: { content: string }) => {
		mutateFeedback.mutate({
			roomId,
			content: values.content,
		})
	}

	if (!roomId) return <div>Nothing</div>

	return (
		<Card>
			{/* <Box>{isLoading && <StyledItemFeedback></StyledItemFeedback>}</Box> */}
			<StyledHeadingFeedback>Phản hồi từ khách hàng</StyledHeadingFeedback>
			<StyledWrapFeedback>
				{data?.data &&
					data?.data.items &&
					data.data.items.map((item) => (
						<StyledItemFeedback key={item._id}>
							<Avatar src={item.user.avatar || `https://api.multiavatar.com/${item._id}.png`} />
							<div className="item__feedback--content">
								<p>{item.user.name || item.user.username}</p>
								<p>{item.content}</p>
							</div>
						</StyledItemFeedback>
					))}
			</StyledWrapFeedback>

			{/* <StyledInputSendFeedback onSubmit={handleSubmit(handleAddFeedback)}>
				<input {...register('content')} placeholder="Typing..." disabled={isLoading} />
				<button type="submit" disabled={mutateFeedback.isLoading || isLoading}>
					{mutateFeedback.isLoading ? <CircularProgress size={14} /> : <SendIcon />}
				</button>
			</StyledInputSendFeedback> */}
		</Card>
	)
}

RoomDetail.Carousel = memo(({ itemData }: { itemData: string[] }) => {
	return (
		<Swiper
			modules={[Autoplay, Pagination, EffectCoverflow]}
			spaceBetween={50}
			effect="coverflow"
			slidesPerView={1}
			scrollbar={{ draggable: true }}
			loop
			autoplay={{
				delay: 3500,
				disableOnInteraction: false,
			}}
			pagination={{ clickable: true }}
			className="cc_swiper_wrapper"
		>
			{itemData.map((item) => (
				<SwiperSlide
					key={randomId()}
					style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					<img src={item} alt={item} />
				</SwiperSlide>
			))}
		</Swiper>
	)
})

interface IPropsModal {
	open: boolean
	setOpen: (val: boolean) => void
	roomId?: string
}

RoomDetail.ReportModal = ({ open, setOpen, roomId }: IPropsModal) => {
	const { register, handleSubmit } = useForm<{ content: string }>()

	const reportMutate = useMutation({
		mutationFn: userApi.postReport,
		onSuccess: (data) => {
			setOpen(false)
			ShowNostis.success('Report room successfully !!!!')
		},
		onError: (error) => {
			ShowNostis.error('Report room error  !!!!')
		},
	})

	const handleReport = (values: { content: string }) => {
		reportMutate.mutate({ ...values, roomId: roomId || '' })
	}

	return (
		<Modal onClose={() => setOpen(false)} open={open}>
			<StyledModalReOpenContract onSubmit={handleSubmit(handleReport)}>
				<Box className="modal-heading">Báo cáo phòng</Box>
				<Box className="modal-body">
					<div className="modal-body__textfeild">
						<span className="modal-body__textfeild--label">Content</span>
						<textarea rows={6} {...register('content')} />
					</div>
				</Box>
				<Box className="modal-footer">
					<Button variant="outlined" disabled={reportMutate.isLoading} onClick={() => setOpen(false)}>
						Đóng
					</Button>
					<Button type="submit" variant="outlined" disabled={reportMutate.isLoading}>
						{reportMutate.isLoading ? <CircularProgress size={14} /> : 'Gửi'}
					</Button>
				</Box>
			</StyledModalReOpenContract>
		</Modal>
	)
}
