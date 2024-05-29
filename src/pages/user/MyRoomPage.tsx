import { roomApi } from '@/api/roomApi'
import { userApi } from '@/api/userApi'
import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import RoomItem from '@/components/common/Room/RoomItem'
import SEO from '@/components/seo'
import { ArrayFrom, randomId } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { StyledMiddle } from 'pages/auth/styles'
import { ListRoom } from 'pages/Home/HomeStyles'
import { useTranslation } from 'react-i18next'

const MyRoomPage = () => {
	const { t } = useTranslation()

	const { data: listForRent, isLoading } = useQuery({
		queryKey: ['getRoomForRent'],
		queryFn: () => roomApi.getRoomForRent(),
		refetchOnWindowFocus: false,
	})

	const { data: dataRequests, isLoading: requestsLoading } = useQuery({
		queryKey: ['getAllRequestsCancelRoom'],
		queryFn: () => userApi.getAllRequest(),
	})
	const ObjectExtendsRequest: { [x: string]: string }[] = []
	const ObjectCancelRequest = dataRequests?.data
		.map((item) => {
			const key = item.roomId
			const value = item.requestId
			if (item.type === 'CONTINUE_RENTAL') {
				ObjectExtendsRequest.push({
					[key]: value,
				})
				return null
			}
			return item.type === 'CANCEL_RENTAL'
				? {
						[key]: value,
				  }
				: null
		})
		.reduce(function (result, item) {
			if (!item || !result) return result
			var key = Object.keys(item)[0] //first property: a, b, c
			result[key] = item[key]
			return result
		}, {})

	return (
		<>
			<SEO title="Bughouse 🤡 - For rent" />

			<HeadingTitle>{t('My_room_page')}</HeadingTitle>

			<ListRoom>
				{isLoading && ArrayFrom(4).map((_) => <RoomItem.Skeleton key={randomId()} />)}
				{!isLoading &&
					listForRent &&
					listForRent?.data &&
					listForRent?.data?.items?.length > 0 &&
					listForRent?.data?.items?.map((item) => (
						<RoomItem
							to={`/room/${item.room._id}`}
							key={item.room._id}
							roomItem={item.room}
							isOwner
							ObjectCancelRequest={ObjectCancelRequest}
							ObjectExtendsRequest={ObjectExtendsRequest?.reduce(function (result, item) {
								if (!item || !result) return result
								var key = Object.keys(item)[0]
								result[key] = item[key]
								return result
							}, {})}
						/>
					))}
			</ListRoom>
			{listForRent && listForRent?.data?.items?.length === 0 && (
				<StyledMiddle>{t('Room.NoRoomForRent')}</StyledMiddle>
			)}
		</>
	)
}

export default MyRoomPage
