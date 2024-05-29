import { invoiceApi } from '@/api/invoiceApi'
import { userApi } from '@/api/userApi'
import { DATE_FORMAT_DEFAULT_EN, DATE_FORMAT_DEFAULT_VI } from '@/constants/time'
import { ArrayFrom } from '@/utils/index'
import { convertMoneyToVndText, convertVNDtoUSD } from '@/utils/money'
import ShowNostis from '@/utils/show-noti'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { Button, CircularProgress, Skeleton, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { StyledInvoiceItem, StyledNothing, StyledWrapBottom, StyledWrapTop, StytledWrapContent } from './styles'

const InvoiceContainer = () => {
	const { data, isLoading } = useQuery({
		queryFn: userApi.getInvoices,
		queryKey: ['getInvoices'],
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	})

	const queryClient = useQueryClient()

	const payInvoiceMutate = useMutation({
		mutationFn: invoiceApi.payInvoice,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getInvoices'] })
			queryClient.invalidateQueries({ queryKey: ['getAllNotifications'] })
			ShowNostis.success('Thanh toan thanh cong')
		},
		onError: () => ShowNostis.error('Something went wrong please call admin '),
	})

	const extendInvoiceMutate = useMutation({
		mutationFn: invoiceApi.extendInvoice,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getInvoices'] })
			queryClient.invalidateQueries({ queryKey: ['getAllNotifications'] })
			ShowNostis.success('Gia han thanh cong')
		},
		onError: () => ShowNostis.error('Something went wrong please call admin '),
	})

	const ruleRender = data && data?.data && data.data.items && data.data.items.length > 0 && !isLoading

	const { i18n, t } = useTranslation()

	const handleOpenBlankTransaction = (transactionHash: string | null) => {
		if (!transactionHash) return
		window.open(`https://sepolia.etherscan.io/tx/${transactionHash}`, '_blank', 'noopener,noreferrer')
	}

	return (
		<>
			{!ruleRender && !isLoading && <StyledNothing>{t('Invoices.NoInvoices')}</StyledNothing>}
			<StytledWrapContent>
				{isLoading && ArrayFrom(6).map((item) => <InvoiceContainer.InvoiceSkeleton key={item} />)}

				{ruleRender &&
					data.data.items.map((invoiceItem) => {
						const startDate = moment(invoiceItem.startDate).unix()
						const endDate = moment(invoiceItem.endDate).unix()
						const dayLeft = moment.duration(endDate - startDate, 'seconds').asDays()
						return (
							<StyledInvoiceItem
								key={invoiceItem._id}
								onClick={() => handleOpenBlankTransaction(invoiceItem.txhash)}
								className={classNames({
									active: invoiceItem.payStatus === 'Complete',
								})}
							>
								<StyledWrapTop>
									<div className="invoice-icon">
										<ReceiptIcon />
									</div>
									<Box className="invoice-content">
										<p className="invoice-content__heading">{t('Invoices.bill_payment')}</p>
										{invoiceItem.txhash && (
											<Tooltip title={invoiceItem.txhash}>
												<p className="invoice-content__idTrans">
													{t('Invoices.Transaction_hash')} :{' '}
													{invoiceItem.txhash.slice(0, 15) + '...'}
												</p>
											</Tooltip>
										)}
										<p className="invoice-content__sub">
											{t('Invoices.Amount_of_payment')} :{' '}
											{i18n.language === 'en'
												? convertVNDtoUSD(invoiceItem.amount)
												: convertMoneyToVndText(invoiceItem.amount)}
										</p>

										<p className="invoice-content__time">
											{t('Invoices.Invoice_creation_time')} :
											{moment(invoiceItem.createdAt).format(
												i18n.language === 'en' ? DATE_FORMAT_DEFAULT_EN : DATE_FORMAT_DEFAULT_VI
											)}
										</p>
									</Box>
									{invoiceItem.payStatus !== 'Complete' && (
										<Box className="invoice-estimate">Con lai {dayLeft} ngay</Box>
									)}
									{invoiceItem.payStatus === 'Complete' && (
										<Box className="invoice-estimate paid">{t('Invoices.paid')}</Box>
									)}
								</StyledWrapTop>
								{invoiceItem.payStatus !== 'Complete' && (
									<StyledWrapBottom>
										{!invoiceItem.isExtends && (
											<Button
												variant="outlined"
												disabled={payInvoiceMutate.isLoading || extendInvoiceMutate.isLoading}
												onClick={() => extendInvoiceMutate.mutate(invoiceItem._id)}
											>
												{extendInvoiceMutate.isLoading ? (
													<CircularProgress size={14} />
												) : (
													t('Invoices.payment_extension')
												)}
											</Button>
										)}
										<Button
											variant="outlined"
											disabled={payInvoiceMutate.isLoading || extendInvoiceMutate.isLoading}
											onClick={() => payInvoiceMutate.mutate(invoiceItem._id)}
										>
											{payInvoiceMutate.isLoading ? (
												<CircularProgress size={14} />
											) : (
												t('Invoices.Pay')
											)}
										</Button>
									</StyledWrapBottom>
								)}
							</StyledInvoiceItem>
						)
					})}
			</StytledWrapContent>
		</>
	)
}

InvoiceContainer.InvoiceSkeleton = () => (
	<StyledInvoiceItem>
		<StyledWrapTop>
			<div className="invoice-icon">
				<Skeleton variant="circular" width={40} height={40} />
			</div>
			<Box className="invoice-content">
				<p className="invoice-content__heading">
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				</p>
				<p className="invoice-content__sub">
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				</p>

				<p className="invoice-content__time">
					<Skeleton variant="rounded" width={150} height={15} />
				</p>
			</Box>

			<Box className="invoice-estimate">
				<Skeleton variant="rounded" width={100} height={15} />
			</Box>
		</StyledWrapTop>
		<StyledWrapBottom>
			<Skeleton variant="rectangular" width={85} height={35} />
			<Skeleton variant="rectangular" width={85} height={35} />
		</StyledWrapBottom>
	</StyledInvoiceItem>
)

export default InvoiceContainer
