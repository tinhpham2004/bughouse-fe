import { roomApi } from '@/api/roomApi'
import RoomItem from '@/components/common/Room/RoomItem'
import SEO from '@/components/seo'
import { ArrayFrom, randomId } from '@/utils/index'
import { encode } from '@/utils/super-function'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import { CircularProgress, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
	ContentBanner,
	HeadingBanner,
	HomeBanner,
	HomePageContent,
	ListRoom,
	NewRoom,
	RoomItemHeading,
	RoomSection,
	SearchBanner,
	SearchFeature,
	SearchLocation,
	SearchResult,
	SearchResultItem,
	SearchResultNoData,
	StyledNoRoom,
	TrendingHeader,
	TrendingItem,
	TrendingList,
	TrendingSearch,
	VerifiAccount,
	WrapperBackground,
	WrapperBanner,
} from './HomeStyles'

const Home = () => {
	const [searchKeyWord, setSearchKeyWord] = useState('')

	const {
		data: roomData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['getAllNewRoom'],
		queryFn: () => roomApi.getAllRoom({ limit: 8, page: 1 }),
		keepPreviousData: true,
	})

	const { data: roomDataSearch, isLoading: roomDataSearchLoading } = useQuery({
		queryKey: ['getAllNewRoom', searchKeyWord],
		queryFn: () =>
			searchKeyWord.trim().length > 0 ? roomApi.getAllRoom({ key: searchKeyWord, limit: 8, page: 1 }) : null,
		staleTime: 60 * 1000,
		keepPreviousData: true,
	})

	const { t } = useTranslation()

	return (
		<>
			<SEO title="Bughouse 🤡" />

			<HomeBanner>
				<WrapperBanner>
					<ContentBanner>
						<HeadingBanner>{t('Home.solgan')}</HeadingBanner>

						<SearchBanner>
							<SearchLocation>
								<LocationOnIcon style={{ color: 'rgb(247, 52, 134)' }} />
								<span style={{ fontSize: '18px', fontWeight: '600' }}>HCM</span>
							</SearchLocation>

							<SearchFeature
								placeholder={
									t('Home.search_placeholder') || 'Tìm kiếm theo địa điểm, quận, tên đường,...'
								}
								onChange={debounce((e) => {
									setSearchKeyWord(e.target.value)
								}, 1000)}
							/>

							<SearchResult>
								{roomDataSearch?.data &&
									roomDataSearch.data.items &&
									roomDataSearch.data.items.length > 0 &&
									roomDataSearch.data.items.map((item) => (
										<SearchResultItem key={randomId()} to={`/room/${item.room._id}`}>
											{item.room.name}
										</SearchResultItem>
									))}
								{roomDataSearch &&
									roomDataSearch.data.items.length === 0 &&
									searchKeyWord.trim().length > 0 && (
										<SearchResultNoData>{t('Home.search_result')}</SearchResultNoData>
									)}

								{roomDataSearchLoading && (
									<SearchResultNoData>
										<CircularProgress />
									</SearchResultNoData>
								)}
							</SearchResult>
						</SearchBanner>
					</ContentBanner>
				</WrapperBanner>
			</HomeBanner>

			<WrapperBackground>
				<HomePageContent>
					<TrendingSearch>
						<TrendingHeader>{t('Home.search_trends')}</TrendingHeader>
						<TrendingList>
							<TrendingItem>
								<Link to={'/search/' + encode('Bình Thạnh')}>Bình Thạnh</Link>
							</TrendingItem>
							<TrendingItem>
								<Link to={'/search/' + encode('Quận 10')}>Quận 10</Link>
							</TrendingItem>
							<TrendingItem>
								<Link to={'/search/' + encode('Quận 1')}>Quận 1</Link>
							</TrendingItem>
							<TrendingItem>
								<Link to={'/search/' + encode('Quận 7')}>Quận 7</Link>
							</TrendingItem>
							<TrendingItem>
								<Link to={'/search/' + encode('Thủ Đức')}>Thủ Đức</Link>
							</TrendingItem>
							<TrendingItem>
								<Link to={'/search/' + encode('Quận 3')}>Quận 3</Link>
							</TrendingItem>
						</TrendingList>
					</TrendingSearch>

					<RoomSection container spacing="40px">
						<Grid item xs={12} md={8}>
							<NewRoom>
								<Typography className="heading">{t('Home.new_room')}</Typography>

								<ListRoom>
									{isLoading && ArrayFrom(10).map((item) => <RoomItem.Skeleton key={item} />)}

									{!isLoading &&
										roomData &&
										roomData.data.items?.map((item) => (
											<RoomItem
												key={item.room._id}
												to={`/room/${item.room._id}`}
												roomItem={item.room}
											></RoomItem>
										))}

									{!roomData?.data?.items ||
										(roomData?.data?.items?.length === 0 && (
											<StyledNoRoom>No room not founded.</StyledNoRoom>
										))}
								</ListRoom>

								<Box
									style={{
										textAlign: 'center',
										paddingTop: '24px',
									}}
								>
									<Link
										to={'/search/' + encode('/all')}
										style={{
											color: '#4877f8',
											lineHeight: '24px',
											textDecoration: 'unset',
											fontWeight: '600',
										}}
									>
										{t('Home.see_all')}
									</Link>
								</Box>
							</NewRoom>
						</Grid>

						<Grid item xs={12} md={4}>
							<VerifiAccount>
								<div className="heading">
									<VerifiedUserIcon style={{ fontSize: '32px', color: 'rgb(72, 119, 248)' }} />
									{t('Home.verified')}
								</div>

								<Box className="verifiContent">
									<img
										src="https://bayleaf.s3.ap-southeast-1.amazonaws.com/property-images/fa7d4c8e-692e-4cc7-bf85-0fcad740b16c/2b271aa2-779e-4bb3-b9dc-0a730084fc22-46325561_1975119655915194_6045991570992267264_n.jpg"
										style={{
											width: '100%',
											maxHeight: '180px',
											objectFit: 'cover',
											borderRadius: '8px',
										}}
									/>
									<RoomItemHeading>Ký túc xá quận Thủ Đức</RoomItemHeading>

									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											marginTop: '30px',
										}}
									>
										<span>Quận thủ đức</span>

										<span style={{ fontSize: '16px', color: '#F73486' }}>1,5 tr/{t('person')}</span>
									</Box>
								</Box>
							</VerifiAccount>
						</Grid>
					</RoomSection>
				</HomePageContent>
			</WrapperBackground>
		</>
	)
}

export default Home
