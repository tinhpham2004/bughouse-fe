import { roomApi } from '@/api/roomApi'
import { userApi } from '@/api/userApi'
import { typeGender, typeOfRoom } from '@/constants/room'
import { IResponseRented, room } from '@/models/room'
import { IServiceRes } from '@/models/services'
import { IUser } from '@/models/user'
import { getContract } from '@/utils/contract'
import { ArrayFrom } from '@/utils/index'
import { convertMoneyToVndText } from '@/utils/money'
import ShowNostis from '@/utils/show-noti'
import { getCurrentDate } from '@/utils/time'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined'
import { Button, CircularProgress, Drawer, Modal, Rating, Skeleton, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import { Fragment, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
	CardRoomItem,
	CardRoomSkeleton,
	RoomItemHeading,
	RoomPreviewItem,
	RoomPreviews,
	RoomPrice,
	StyledButtonOwner,
	StyledCloseButton,
	StyledContractDrawer,
	StyledModalReOpenContract,
	StyledOwner,
	StyledStatus,
	StyledText,
	StyledWrapInfo,
	StyledWrapMoreService,
} from './styles/RoomItemStyles'

interface IProps {
	to: string
	isRented?: boolean
	isOwner?: boolean
	roomItem: room | undefined
	rentAndLessorInfo?: IResponseRented | undefined
	ObjectCancelRequest?: any
	ObjectExtendsRequest?: any
}

const RoomItem = (props: IProps) => {
	const { to, isRented, isOwner, roomItem, rentAndLessorInfo, ObjectCancelRequest, ObjectExtendsRequest } = props
	const { t } = useTranslation()
	const navigation = useNavigate()
	const [isOpenContract, setIsOpenContract] = useState(false)
	const [open, setOpen] = useState(false)
	const [openExtend, setOpenExtend] = useState(false)
	const [openFeedback, setOpenFeedback] = useState(false)
	const queryClient = useQueryClient()
	const [idRoomSelected, setIdRoomSelected] = useState('')

	const { data: dataContract, isLoading: loadingContract } = useQuery({
		queryKey: ['getDetailContract', idRoomSelected, isOwner, isRented, isOpenContract],
		queryFn: () => {
			if (roomItem?._id || idRoomSelected) return userApi.getDetailContract(idRoomSelected || roomItem?._id || '')
			return null
		},
		keepPreviousData: true,
		staleTime: Infinity,
	})

	const handleWatchContract = (e: any) => {
		e.preventDefault()
		setIsOpenContract(true)
		setIdRoomSelected(roomItem?._id || '')
	}

	const handleOpenService = (e: any) => {
		e.preventDefault()
		navigation('/room/myRooms/' + roomItem?._id)
	}

	const { mutate: mutateCancelContract, isLoading } = useMutation({
		mutationFn: isOwner ? userApi.doCancelContractByLesser : userApi.doCancelContract,
		mutationKey: ['handleCancelContract'],
		onSuccess: () => {
			if (isRented) {
				setOpenFeedback(true)
				ShowNostis.success('Gửi huỷ hợp đồng thành công')
				queryClient.invalidateQueries(['getRoomRented'])
			} else {
				ShowNostis.success('Huỷ hợp đồng thành công')
				queryClient.invalidateQueries(['getRoomForRent'])
			}
		},
		onError: (error) => {
			console.log('🚀 ~ file: RoomItem.tsx:108 ~ RoomItem ~ error:', error)
		},
	})

	const { mutate: mutateAcceptCancel, isLoading: loadingAcceptCancel } = useMutation({
		mutationFn: userApi.doAcceptCancelRent,
		mutationKey: ['handleAcceptContract'],
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['getRoomForRent'] })
			ShowNostis.success('Thành công')
		},
	})

	const { mutate: mutateExtendRoom, isLoading: loadingExtendRoom } = useMutation({
		mutationFn: userApi.doExtendRoomContact,
		mutationKey: ['handleExtendRoom'],
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['getRoomForRent'] })
			await queryClient.invalidateQueries({ queryKey: ['getAllRequestsCancelRoom'] })
			ShowNostis.success('Thành công')
		},
	})

	const handleCancelContract = () => {
		setIsOpenContract(false)

		Swal.fire({
			title: t('Room.cancel_contract') || 'Huỷ hợp đồng',
			icon: 'error',
			showCancelButton: true,
			confirmButtonColor: '#f73486',
			cancelButtonColor: '#ef5a5a',
			confirmButtonText: isLoading ? 'canceling...' : t('Room.confirm') || 'Huỷ hợp đồng',
			cancelButtonText: t('Room.cancel') || 'Huỷ hợp đồng',
			html: `<div><p>Bạn có muốn chấm dứt hợp đông này không ?</p><p style="color: red; font-size: 14px; font-style: italic">Hợp đồng chưa hết kỳ hạn. nếu huỷ bạn sẽ ${
				isOwner ? 'phải chịu 1 khoản phạt ' : 'mất tiền cọc . <br/>'
			}. Hợp đồng của bạn kết thúc vào ngày : ${moment().format('DD/MM/YYYY')}</p> </div>`,
		}).then((result) => {
			if (result.isConfirmed && dataContract?.data) mutateCancelContract(dataContract?.data.contract._id)
		})
	}

	const handleAcceptCancel = (e: any) => {
		e.preventDefault()
		if (roomItem) mutateAcceptCancel(ObjectCancelRequest[roomItem._id])
		else ShowNostis.error('Có 1 lỗi nào đó vui lòng liên hệ quản trị viên')
	}

	const handleAcceptExtend = (e: any) => {
		e.preventDefault()
		if (roomItem && ObjectExtendsRequest[roomItem._id]) mutateExtendRoom(ObjectExtendsRequest[roomItem._id])
		else ShowNostis.error('Không thể gia hạn phòng')
	}

	return (
		<>
			<Fragment>
				<CardRoomItem to={to}>
					<Box className="roomItemImage">
						<img
							src={
								roomItem?.roomAttachment?.url[0] ||
								'https://bayleaf.s3.ap-southeast-1.amazonaws.com/property-images/fa7d4c8e-692e-4cc7-bf85-0fcad740b16c/2b271aa2-779e-4bb3-b9dc-0a730084fc22-46325561_1975119655915194_6045991570992267264_n.jpg'
							}
							alt="banner image room"
						/>
					</Box>

					<Box className="roomItemContent">
						<RoomItemHeading>{roomItem?.name?.replace(/,/g, '') || 'Updating...'}</RoomItemHeading>

						<RoomPreviews>
							<RoomPreviewItem>
								<CottageOutlinedIcon style={{ fontSize: '24px' }} />
								{typeOfRoom.find((type) => type.value === roomItem?.typeRoom)?.label ||
									'Phòng cho thuê'}
							</RoomPreviewItem>
							<RoomPreviewItem>
								<PersonOutlineOutlinedIcon style={{ fontSize: '24px' }} />
								<div>
									{roomItem?.gender === 'All' ? t('Room.gender') : t(`Room.${roomItem?.gender}`)}
								</div>
								<StraightenOutlinedIcon style={{ fontSize: '24px' }} />
								{roomItem?.acreage}m2
							</RoomPreviewItem>
							<RoomPreviewItem>
								<FmdGoodOutlinedIcon style={{ fontSize: '24px' }} />
								{roomItem?.address?.fullText || 'Updating...'}
							</RoomPreviewItem>
						</RoomPreviews>
					</Box>
					{(isRented || isOwner) && (
						<StyledOwner>
							{isOwner && (
								<>
									{roomItem?.status === 'already-rent' && (
										<>
											{ObjectExtendsRequest?.[roomItem?._id] ||
											ObjectCancelRequest?.[roomItem?._id] ? (
												<StyledStatus className="request">
													{t('Room.request_extension')}
												</StyledStatus>
											) : (
												<StyledStatus className="green">
													{t('Room.currently_being_rented')}
												</StyledStatus>
											)}
											{(roomItem.demandAt === 0 ||
												roomItem.demandAt === getCurrentDate().month) && (
												<StyledButtonOwner onClick={handleOpenService}>
													{t('Room.service_declaration')}
												</StyledButtonOwner>
											)}
											{ObjectCancelRequest?.[roomItem?._id] && (
												<StyledButtonOwner
													className="cancel_contract"
													onClick={handleAcceptCancel}
												>
													{loadingAcceptCancel ? (
														<CircularProgress size={12} />
													) : (
														t('Room.Accept_cancel')
													)}
												</StyledButtonOwner>
											)}
											{ObjectExtendsRequest?.[roomItem?._id] && (
												<StyledButtonOwner
													className="cancel_contract"
													onClick={handleAcceptExtend}
												>
													{loadingExtendRoom ? (
														<CircularProgress size={12} />
													) : (
														t('Room.Accept_extends')
													)}
												</StyledButtonOwner>
											)}
										</>
									)}

									{roomItem?.status === 'available' && (
										<StyledStatus className="info">{t('Room.not_yet_hired')}</StyledStatus>
									)}

									{roomItem?.status === 'not-available' && (
										<>
											<StyledStatus className="red">{t('Room.unsuitable')}</StyledStatus>
											<StyledButtonOwner
												onClick={(e) => {
													e.preventDefault()
													e.stopPropagation()
													setOpen(true)
												}}
											>
												{t('Room.Re_open')}
											</StyledButtonOwner>
										</>
									)}
								</>
							)}

							{roomItem?.status !== 'already-rent' && isRented && (
								<StyledStatus className="rented">{t('Room.rented')}</StyledStatus>
							)}

							{roomItem?.status === 'already-rent' && (
								<StyledButtonOwner onClick={handleWatchContract}>
									{isLoading ? <CircularProgress size={14} /> : t('Room.view_contract')}
								</StyledButtonOwner>
							)}

							{isRented &&
								roomItem &&
								roomItem?.status === 'already-rent' &&
								// getCurrentDate().month - (moment(roomItem?.createdAt).month() + roomItem.period) >= 0 &&
								getCurrentDate().month - (moment(roomItem?.createdAt).month() + roomItem.period) <=
									2 && (
									<StyledButtonOwner
										onClick={(e) => {
											e.preventDefault()
											setOpenExtend(true)
										}}
									>
										{t('Room.contract_extension')}
									</StyledButtonOwner>
								)}
						</StyledOwner>
					)}

					<RoomPrice>
						<span> {convertMoneyToVndText(roomItem?.basePrice)}</span>
						vnđ / {t('Room.person')}
					</RoomPrice>
				</CardRoomItem>

				{(isOwner || isRented) && (
					<Drawer anchor={'left'} open={isOpenContract} onClose={() => setIsOpenContract(false)}>
						<StyledContractDrawer>
							<StyledCloseButton onClick={() => setIsOpenContract(false)}>X</StyledCloseButton>
							<div
								dangerouslySetInnerHTML={{
									__html: getContract({
										lessor:
											rentAndLessorInfo?.lessor ||
											(dataContract?.data?.contract?.lessor as IUser) ||
											undefined,
										renter:
											rentAndLessorInfo?.renter ||
											(dataContract?.data?.contract?.renter as IUser) ||
											undefined,
										room:
											rentAndLessorInfo?.room || dataContract?.data?.contract?.room || undefined,
										_id: dataContract?.data?.contract?._id || undefined,
										dateRent: undefined,
									}),
								}}
							/>

							<Button onClick={handleCancelContract}>{t('Room.cancel_contract')}</Button>
						</StyledContractDrawer>
					</Drawer>
				)}
			</Fragment>
			{isOwner && <RoomItem.ModalReOpen open={open} setOpen={setOpen} roomItem={roomItem} />}
			<RoomItem.ModalFeedback open={openFeedback} setOpen={setOpenFeedback} roomItem={roomItem} />
			{isRented && dataContract && (
				<RoomItem.ModalExtend
					open={openExtend}
					setOpen={setOpenExtend}
					contractId={dataContract?.data?.contract?._id}
				/>
			)}
		</>
	)
}

RoomItem.Service = ({
	setValue,
	serviceData,
	loading,
	register,
}: {
	setValue?: any
	serviceData?: IServiceRes
	loading?: boolean
	register: any
}) => {
	const { t } = useTranslation()

	const services = [
		{
			label: t('Room.electricity_bill'),
			value: 'electricity cost',
		},
		{
			label: t('Room.water_money'),
			value: 'water cost',
		},
		{
			label: t('Room.wifi_money'),
			value: 'internet cost',
		},
		{
			label: t('Room.money_management'),
			value: 4,
		},
		{
			label: t('Room.garbage_money'),
			value: 5,
		},
	]

	const [newIndicator, setnewIndicator] = useState(0)

	const serviceName = services.find((item) => item.value === serviceData?.service.name)?.label

	return (
		<StyledWrapMoreService>
			<StyledWrapInfo>
				<TextField className="text" variant="filled" disabled={true} value={serviceName} />
				<TextField className="text" variant="filled" disabled={true} value={serviceData?.service.description} />
				<TextField
					className="text"
					variant="outlined"
					label={serviceData?.type === 1 ? t('Room.New_indicator') : t('Room.Amount_of_people')}
					onChange={(e) => {
						if (e && e.target.value && +e.target.value > (serviceData?.oldIndicator || 0))
							setnewIndicator(Number(e.target.value))
					}}
					{...register(serviceData?.service.name.trim().replace(/ /g, '_') || 'name')}
				/>
			</StyledWrapInfo>

			<StyledWrapInfo>
				<div>
					{t('Room.Unit_price_for')} {serviceName}{' '}
				</div>

				{serviceData?.type === 1 ? (
					<div className="right">
						<StyledText>
							{t('Room.Old_indicator')}: {serviceData?.oldIndicator}
						</StyledText>
						<StyledText>
							{t('Room.New_indicator')} : {newIndicator}
						</StyledText>
					</div>
				) : (
					<div className="right">
						<StyledText>
							{t('Room.Service_fee')} {serviceData?.service?.basePrice}
						</StyledText>
					</div>
				)}
			</StyledWrapInfo>
		</StyledWrapMoreService>
	)
}

RoomItem.Skeleton = () => {
	return (
		<CardRoomSkeleton>
			<Box className="roomItemImage">
				<Skeleton variant="rectangular" width="100%" height="100%" />
			</Box>

			<Box className="roomItemContent">
				<Skeleton variant="text" sx={{ fontSize: '1rem', width: '60%' }} />

				<RoomPreviews>
					<Skeleton variant="rectangular" sx={{ width: '100%' }} />
					<Skeleton variant="rectangular" sx={{ width: '100%' }} />
					<Skeleton variant="rectangular" sx={{ width: '100%' }} />
				</RoomPreviews>
			</Box>

			<RoomPrice>
				<Skeleton variant="rectangular" width={80} height={60} />
				<Skeleton variant="text" sx={{ fontSize: '12px', width: '100%' }} />
			</RoomPrice>
		</CardRoomSkeleton>
	)
}

export interface IFromValues {
	basePrice: number | string
	totalNbPeople: number | string
	gender: string
	typeRoom: string
	deposit: string | number
}

interface IPropsModal {
	open: boolean
	setOpen: (val: boolean) => void
	roomItem?: room
	contractId?: string
}

RoomItem.ModalReOpen = ({ open, setOpen, roomItem }: IPropsModal) => {
	const { handleSubmit, register } = useForm<IFromValues>({
		defaultValues: roomItem,
	})
	const queryClient = useQueryClient()
	const reopenMutate = useMutation({
		mutationFn: roomApi.doReOpenRoom,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['getRoomRented'] })
			ShowNostis.success('Re-open room successfully !!!!')
		},
		onError: (error) => {
			ShowNostis.error('Re-open room error  !!!!')
		},
	})

	const handleReopenRoom = (values: IFromValues) => {
		const { basePrice, gender, totalNbPeople, typeRoom } = values
		const newValuesReopen = {
			basePrice,
			gender,
			totalNbPeople,
			typeRoom,
			deposit: values.basePrice,
			roomId: roomItem?._id,
		}

		reopenMutate.mutate(newValuesReopen)
	}

	return (
		<Modal onClose={() => setOpen(false)} open={open}>
			<StyledModalReOpenContract onSubmit={handleSubmit(handleReopenRoom)}>
				<Box className="modal-heading">Edit information to reopen the room</Box>
				<Box className="modal-body">
					<div className="modal-body__textfeild">
						<span className="modal-body__textfeild--label">Room price</span>
						<input {...register('basePrice')} placeholder="Enter new room price" />
					</div>
					<div className="modal-body__textfeild">
						<span className="modal-body__textfeild--label">TotalNbPeople</span>
						<select {...register('totalNbPeople')}>
							{ArrayFrom(10).map((item) => (
								<option key={item} value={item + 1}>
									{item + 1}
								</option>
							))}
						</select>
					</div>
					<div className="modal-body__textfeild">
						<span className="modal-body__textfeild--label">Room price</span>
						<input {...register('deposit')} placeholder="Enter new room deposit price" />
					</div>
					<div className="modal-body__textfeild">
						<span className="modal-body__textfeild--label">Room Type</span>
						<select {...register('typeRoom')}>
							{typeOfRoom.map((item) => (
								<option key={item.value} value={item.value}>
									{item.label}
								</option>
							))}
						</select>
					</div>
					<div className="modal-body__textfeild">
						<span className="modal-body__textfeild--label">Gender</span>
						<select {...register('gender')}>
							{typeGender.map((item) => (
								<option key={item.value} value={item.value}>
									{item.value}
								</option>
							))}
						</select>
					</div>
				</Box>
				<Box className="modal-footer">
					<Button variant="outlined" disabled={reopenMutate.isLoading} onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button type="submit" variant="outlined" disabled={reopenMutate.isLoading}>
						{reopenMutate.isLoading ? <CircularProgress size={14} /> : 'Confirm'}
					</Button>
				</Box>
			</StyledModalReOpenContract>
		</Modal>
	)
}

RoomItem.ModalFeedback = ({ open, setOpen, roomItem }: IPropsModal) => {
	const { handleSubmit, register, control } = useForm<{ content: string; rating: number }>({
		defaultValues: {
			content: '',
			rating: 5,
		},
	})

	const feedbackMutate = useMutation({
		mutationKey: ['handleAddFeedback'],
		mutationFn: userApi.postFeedback,
		onSuccess: () => {
			setOpen(false)
			ShowNostis.success('Đánh giá phòng thành công!')
		},
		onError: () => {},
	})

	const onPostFeedback = (values: any) => {
		feedbackMutate.mutate({ ...values, roomId: roomItem?._id })
	}

	return (
		<Modal onClose={() => setOpen(false)} open={open}>
			<StyledModalReOpenContract onSubmit={handleSubmit(onPostFeedback)}>
				<Box className="modal-heading">Feedback room</Box>
				<Box className="modal-body">
					<div className="modal-body__textfeild">
						<span className="modal-body__textfeild--label">Content</span>
						<textarea rows={7} {...register('content')} />
					</div>

					<div className="modal-body__textfeild">
						<span className="modal-body__textfeild--label">Rating</span>
						<Controller
							name="rating"
							control={control}
							render={({ field }) => <Rating {...field} value={+field.value} />}
						/>
					</div>
				</Box>
				<Box className="modal-footer">
					<Button variant="outlined" disabled={feedbackMutate.isLoading} onClick={() => setOpen(false)}>
						Đóng
					</Button>
					<Button type="submit" variant="outlined" disabled={feedbackMutate.isLoading}>
						{feedbackMutate.isLoading ? <CircularProgress size={14} /> : 'Đánh giá'}
					</Button>
				</Box>
			</StyledModalReOpenContract>
		</Modal>
	)
}

RoomItem.ModalExtend = ({ open, setOpen, contractId }: IPropsModal) => {
	const { mutate: mutateExtendContract, isLoading: isLoadingExtendContract } = useMutation({
		mutationFn: userApi.doRequestExtendContract,
		mutationKey: ['handleDoRequestExtendContract'],
		onSuccess: () => {
			ShowNostis.success('Gửi yêu cầu gia hạn thành công')
			setOpen(false)
		},
		onError: (error) => {
			console.log('🚀 ~ file: RoomItem.tsx:108 ~ RoomItem ~ error:', error)
		},
	})

	const { handleSubmit, register, control } = useForm<{ newPeriod: number | string }>({
		defaultValues: {
			newPeriod: 6,
		},
	})

	const handleExtend = ({ newPeriod }: { newPeriod: number | string }) => {
		mutateExtendContract({ contractId: contractId || '', newPeriod })
	}

	return (
		<Modal onClose={() => setOpen(false)} open={open}>
			<StyledModalReOpenContract onSubmit={handleSubmit(handleExtend)}>
				<Box className="modal-heading">Gia hạn phòng </Box>
				<Box className="modal-body">
					<div className="modal-body__textfeild">
						<span className="modal-body__textfeild--label">Số tháng gia hạn</span>
						<input {...register('newPeriod')} placeholder="Enter new period" />
					</div>
				</Box>
				<Box className="modal-footer">
					<Button variant="outlined" disabled={isLoadingExtendContract} onClick={() => setOpen(false)}>
						Đóng
					</Button>
					<Button type="submit" variant="outlined" disabled={isLoadingExtendContract}>
						{isLoadingExtendContract ? <CircularProgress size={14} /> : 'Gia hạn'}
					</Button>
				</Box>
			</StyledModalReOpenContract>
		</Modal>
	)
}

export default RoomItem
