import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined'
import AllInboxOutlinedIcon from '@mui/icons-material/AllInboxOutlined'
import CountertopsOutlinedIcon from '@mui/icons-material/CountertopsOutlined'
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined'
import KeyOffOutlinedIcon from '@mui/icons-material/KeyOffOutlined'
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined'
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined'
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined'
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined'
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined'
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined'
import TireRepairOutlinedIcon from '@mui/icons-material/TireRepairOutlined'
import TvOutlinedIcon from '@mui/icons-material/TvOutlined'
import WcIcon from '@mui/icons-material/Wc'
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined'
import WindowOutlinedIcon from '@mui/icons-material/WindowOutlined'
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined'

export const getIcon = (label: string) => {
	return listIcons.find((item) => item.label === label)?.icon || <PanoramaOutlinedIcon />
}
const listIcons = [
	{
		label: 'WC riêng',
		icon: <WcIcon />,
	},
	{
		label: 'Chỗ để xe',
		icon: <MopedOutlinedIcon />,
	},
	{
		label: 'Cửa sổ',
		icon: <WindowOutlinedIcon />,
	},
	{
		label: 'An ninh',
		icon: <LocalPoliceOutlinedIcon />,
	},
	{
		label: 'Wifi',
		icon: <WifiOutlinedIcon />,
	},
	{
		label: 'Tự do',
		icon: <MoreTimeOutlinedIcon />,
	},
	{
		label: 'Chủ riêng',
		icon: <KeyOffOutlinedIcon />,
	},
	{
		label: 'Máy lạnh',
		icon: <AcUnitOutlinedIcon />,
	},
	{
		label: 'Máy nước nóng ',
		icon: <TireRepairOutlinedIcon />,
	},
	{
		label: 'Nhà bếp',
		icon: <CountertopsOutlinedIcon />,
	},
	{
		label: 'Tủ lạnh',
		icon: <KitchenOutlinedIcon />,
	},
	{
		label: 'Máy giặt',
		icon: <LocalLaundryServiceOutlinedIcon />,
	},
	{
		label: 'Gác lửng',
		icon: <KitchenOutlinedIcon />,
	},

	{
		label: 'Giường',
		icon: <HotelOutlinedIcon />,
	},
	{
		label: 'Tủ đồ',
		icon: <AllInboxOutlinedIcon />,
	},
	{
		label: 'Tivi',
		icon: <TvOutlinedIcon />,
	},
	{
		label: 'Thú cưng',
		icon: <PetsOutlinedIcon />,
	},
]
