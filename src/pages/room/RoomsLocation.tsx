import { roomApi } from '@/api/roomApi'
import Card from '@/components/common/Card'
import RoomItem from '@/components/common/Room/RoomItem'
import SEO from '@/components/seo'
import RoomFilterLocation from '@/features/Room/RoomFilterLocation'
import { IParamsGetRoom } from '@/models/room'
import { ArrayFrom, getPathNameAfterSlah, randomId } from '@/utils/index'
import { decode } from '@/utils/super-function'
import { Box, Grid, Pagination } from '@mui/material'
import Typography from '@mui/material/Typography/Typography'
import { useQuery } from '@tanstack/react-query'
import { HomePageContent, ListRoom, StyledNoRoomData, WrapperBackground } from 'pages/Home/HomeStyles'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
const _page = 1
const _limit = 10

const RoomsLocation = () => {
	const location = useLocation()
	const [searchFilter, setSearchFilter] = useState<IParamsGetRoom>({
		page: _page,
		limit: _limit,
	})

	const { t } = useTranslation()
	const navigate = useNavigate()

	useEffect(() => {
		getRoomFromURL()
	}, [location])

	const getRoomFromURL = () => {
		try {
			const keySearch = decode(getPathNameAfterSlah(location.pathname))
			if (keySearch === '/all') {
			} else {
				setSearchFilter((preSearch) => ({ ...preSearch, district: keySearch }))
			}
			// const querySearch = location.search
		} catch (error) {
			navigate('/notFound')
		}
	}

	const {
		data: roomData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['getAllNewRoom', searchFilter],
		queryFn: () => roomApi.getAllRoom(searchFilter),
		staleTime: 60 * 1000,
	})

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [searchFilter])

	const handleApplySearchFilter = (dataSearchFilter: any) => {
		const search = queryString.stringify(dataSearchFilter)
		console.log('search', search)
		console.log('decode', queryString.parse(search))
	}

	return (
		<WrapperBackground style={{ minHeight: '92vh' }}>
			<SEO title="Bughouse 🤡 - Search..." />
			<HomePageContent>
				<Box style={{ paddingTop: '40px' }}>
					<Grid container spacing="32px">
						<Grid item xs={12} md={3.3}>
							<Card isPadding={false}>
								<RoomFilterLocation onApply={handleApplySearchFilter} />
							</Card>
						</Grid>
						<Grid item xs={12} md={8.7}>
							<Card>
								<Typography
									style={{
										fontSize: '24px',
										paddingBottom: '32px',
										fontWeight: '600',
										color: '#333333',
									}}
								>
									{t('Room.Results')}
								</Typography>
								<ListRoom>
									{isLoading && ArrayFrom(10).map(() => <RoomItem.Skeleton key={randomId()} />)}

									{roomData &&
										roomData.data &&
										roomData.data.items &&
										roomData.data.items.length > 0 &&
										roomData.data.items.map((room) => (
											<RoomItem
												key={room.room._id}
												to={`/room/${room.room._id}`}
												roomItem={room.room}
											></RoomItem>
										))}

									{roomData &&
										roomData.data &&
										roomData.data.items &&
										roomData.data.items.length === 0 && (
											<StyledNoRoomData>{t('Room.NoRoomFound')}</StyledNoRoomData>
										)}
								</ListRoom>
								<Box
									style={{
										paddingTop: '20px',
										width: '100%',
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									{!isLoading &&
										roomData &&
										roomData.data &&
										roomData.data.items &&
										roomData.data.items.length > 0 && (
											<Pagination
												onChange={(_, page) => setSearchFilter((pre) => ({ ...pre, page }))}
												count={roomData?.data?.totalPages || 0}
												page={searchFilter.page}
											/>
										)}
								</Box>
							</Card>
						</Grid>
					</Grid>
				</Box>
			</HomePageContent>
		</WrapperBackground>
	)
}

export default RoomsLocation
