import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Checkbox, FormControlLabel, Icon, Slider, Typography } from '@mui/material'
import { pink } from '@mui/material/colors'
import { options } from 'pages/room/AddRoom'
import React, { memo, MouseEventHandler, PropsWithChildren } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ButtonFilter, FilterItem, ListFilters, StyledHeadingFilter } from './styles/RoomFilterLocationStyle'

interface IProps {
	onApply: (dataSearchFilter: any) => void
}

const optionTypeRoom = [
	{
		label: 'Phòng cho thuê',
		value: 'Phòng cho thuê',
	},
	{
		label: 'Phòng ở ghép',
		value: 'Phòng ở ghép',
	},
	{
		label: 'Kí túc xá',
		value: 'Kí túc xá',
	},
	{
		label: 'Nhà nguyên căn',
		value: 'Nhà nguyên căn',
	},
	{
		label: 'Căn hộ',
		value: 'Căn hộ',
	},
]

const optionSex = [
	{
		label: 'Nam',
		value: 'Nam',
	},
	{
		label: 'Nữ',
		value: 'Nữ',
	},
]

type FormValues = {
	prices: number[]
	utilities: string[]
	typeRoom: string[]
	gender: string[]
}

const RoomFilterLocation = ({ onApply }: IProps) => {
	const [expanded, setExpanded] = React.useState<string | null>(null)

	const { t } = useTranslation()

	const { handleSubmit, control, setValue, register, getValues } = useForm<FormValues>({
		defaultValues: {
			prices: [0, 9000000],
			utilities: [],
			typeRoom: [],
			gender: [],
		},
	})

	const handleChange = (panel: string) => setExpanded(panel === expanded ? null : panel)

	return (
		<Box>
			<StyledHeadingFilter>{t('Room.Filters')}</StyledHeadingFilter>

			<ListFilters onSubmit={handleSubmit(onApply)}>
				<RoomFilterLocation.FilterItem
					panel="panel1"
					activeTab={expanded}
					label={t('Room.Prices')}
					onClick={() => handleChange('panel1')}
				>
					<Controller
						control={control}
						name="prices"
						render={({ field }) => (
							<Slider
								{...field}
								// @ts-ignore
								onChange={(_, values) => setValue('prices', values)}
								min={0}
								step={10000}
								max={9000000}
								valueLabelFormat={(number) => number.toLocaleString()}
								disableSwap
								valueLabelDisplay="on"
							/>
						)}
					/>
				</RoomFilterLocation.FilterItem>

				<RoomFilterLocation.FilterItem
					panel="panel2"
					activeTab={expanded}
					label={t('Room.utilities')}
					onClick={() => handleChange('panel2')}
				>
					{options.map((item) => (
						<FormControlLabel
							style={{ width: '100%', paddingLeft: '20px' }}
							control={
								<Checkbox
									sx={{
										color: pink[300],
										'&.Mui-checked': {
											color: pink[600],
										},
									}}
									value={item}
									{...register('utilities')}
									defaultChecked={
										getValues('utilities').findIndex((itemCheck) => itemCheck === item) !== -1
									}
								/>
							}
							key={Date.now() + Math.random() * 10000}
							label={item}
						/>
					))}
				</RoomFilterLocation.FilterItem>

				<RoomFilterLocation.FilterItem
					panel="panel3"
					activeTab={expanded}
					label={t('Room.TypeRoom')}
					onClick={() => handleChange('panel3')}
				>
					{optionTypeRoom.map((item: any) => (
						<FormControlLabel
							style={{ width: '100%', paddingLeft: '20px' }}
							control={
								<Checkbox
									sx={{
										color: pink[300],
										'&.Mui-checked': {
											color: pink[600],
										},
									}}
									value={item.value}
									{...register('typeRoom')}
									defaultChecked={
										getValues('typeRoom').findIndex((itemCheck) => itemCheck === item.value) !== -1
									}
								/>
							}
							key={Date.now() + Math.random() * 10000}
							label={item.label}
						/>
					))}
				</RoomFilterLocation.FilterItem>

				<RoomFilterLocation.FilterItem
					panel="panel4"
					activeTab={expanded}
					label={t('Room.Sex')}
					onClick={() => handleChange('panel4')}
				>
					{optionSex.map((item) => (
						<FormControlLabel
							style={{ width: '100%', paddingLeft: '20px' }}
							control={
								<Checkbox
									sx={{
										color: pink[300],
										'&.Mui-checked': {
											color: pink[600],
										},
									}}
									value={item.value}
									{...register('gender')}
									defaultChecked={
										getValues('gender').findIndex((itemCheck) => itemCheck === item.value) !== -1
									}
								/>
							}
							key={Date.now() + Math.random() * 10000}
							label={item.label}
						/>
					))}
				</RoomFilterLocation.FilterItem>
				<ButtonFilter type="submit">{t('Room.Apply')}</ButtonFilter>
			</ListFilters>
		</Box>
	)
}

export default memo(RoomFilterLocation)

interface IPropLocation extends PropsWithChildren {
	onClick: MouseEventHandler
	activeTab: string | null
	label: string
	panel: string
}
RoomFilterLocation.FilterItem = (props: IPropLocation) => {
	const { onClick, activeTab, label, children, panel } = props

	return (
		<FilterItem>
			<Box className="cc_title_item" onClick={onClick}>
				{label}
				<Icon className={`cc_icon ${activeTab === panel && 'active'}`}>
					<ExpandMoreIcon />
				</Icon>
			</Box>
			{activeTab === panel && <div style={{ padding: '16px 32px', transition: 'height 0.5s' }}>{children}</div>}
		</FilterItem>
	)
}
