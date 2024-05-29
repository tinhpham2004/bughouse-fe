import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import { convertMoneyToVndText, convertVNDtoUSD } from '@/utils/money'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'

//@ts-ignore
import { userApi } from '@/api/userApi'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import {
	IconItemTransaction,
	ListItemTransaction,
	StyledButtonFilterWallet,
	StyledButtonWallet,
	StyledWalletCard,
	StyledWrapButtonGroupWallet,
	StyledWrapRightWallet,
} from './style'
import { ITransaction, IUserWallet } from '@/models/user'
import { convertStringToTitleCase, convertToTitleCase, randomId } from '@/utils/index'
import SEO from '@/components/seo'

const WalletPage = () => {
	const [filterTransaction, setfilterTransaction] = useState('all')

	const { t, i18n } = useTranslation()

	const handleTopUp = () => {
		Swal.fire({
			title: 'Số tiền muốn nạp vào ví',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off',
			},
			showCancelButton: true,
			confirmButtonText: 'Nạp',
			cancelButtonText: 'Huỷ',
			showLoaderOnConfirm: true,
			preConfirm: (values: number) => handleTopupWallet(values),
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result: any) => {
			console.log('🚀 ~ file: WalletPage.tsx:43 ~ handleTopUp ~ result:', result)
			// handleTopupWallet(result)
		})
	}

	const handleWithDraw = () => {
		Swal.fire({
			title: 'Số tiền muốn rút',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off',
			},
			showCancelButton: true,
			confirmButtonText: 'Rút',
			cancelButtonText: 'Huỷ',
			showLoaderOnConfirm: true,
			preConfirm: (values: number) => handleWithDrawWallet(values),
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result: any) => {
			console.log('🚀 ~ file: WalletPage.tsx:43 ~ handleWithDraw ~ result:', result)
			// handleTopupWallet(result)
		})
	}

	const { data: walletData, isLoading } = useQuery({
		queryKey: ['getWalletInfo'],
		queryFn: () => userApi.getWalletInfo(),
		staleTime: 60 * 1000 * 5,
	})

	const { data: walletTransaction, isLoading: loadingTransaction } = useQuery({
		queryKey: ['getWalletTransaction'],
		queryFn: () => userApi.getWalletTransaction(),
		staleTime: 60 * 1000 * 5,
	})

	const mutation = useMutation({
		mutationFn: ({ walletAddress, amount }: IUserWallet) => {
			return userApi.topupMoney({
				walletAddress,
				amount,
			})
		},
		onSuccess: (response: any) => {
			window.location.replace(response?.paymentUrl)
		},
		onError: (error) => {
			console.log('🚀 ~ file: WalletPage.tsx:68 ~ WalletPage ~ error:', error)
		},
	})

	const mutationWithDraw = useMutation({
		mutationFn: ({ walletAddress, amount }: IUserWallet) => {
			return userApi.withDrawMoney({
				walletAddress,
				amount,
			})
		},
		onSuccess: (response: any) => {
			console.log(' ~ file: WalletPage.tsx:68 ~ WalletPage ~ Success:', response)
			// Reload the page after successful withdrawal
			window.location.reload()
		},
		onError: (error) => {
			console.log('🚀 ~ file: WalletPage.tsx:68 ~ WalletPage ~ error:', error)
		},
	})

	const handleTopupWallet = async (moneyTopup: any) => {
		if (!walletData?.data.walletAddress) return
		try {
			const response = mutation.mutate({
				walletAddress: walletData?.data.walletAddress,
				amount: moneyTopup,
			})
			return response
		} catch (error) {
			console.log('error', error)
		}
	}

	const handleWithDrawWallet = async (moneyWithDraw: any) => {
		if (!walletData?.data.walletAddress) return
		try {
			const response = mutationWithDraw.mutate({
				walletAddress: walletData?.data.walletAddress,
				amount: moneyWithDraw,
			})
			return response
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<>
			<SEO title="Bughouse 🤡 - Manage wallet" />

			<HeadingTitle>{t('Wallet.Heading')}</HeadingTitle>

			<Grid container justifyContent="space-between" spacing={3}>
				<Grid item xs={4} style={{ paddingTop: 0 }}>
					<Box
						sx={{
							overflow: 'hidden',
						}}
					>
						<StyledWalletCard>
							{!isLoading && (
								<>
									<p className="textBlance">
										{i18n.language === 'en'
											? convertVNDtoUSD(Number(walletData?.data?.balance) || 0)
											: convertMoneyToVndText(Number(walletData?.data.balance) || 0)}
									</p>
									<Typography
										variant="body1"
										color="inherit"
										style={{ fontSize: 18, fontFamily: 'monospace' }}
									>
										{t('Wallet.Balance')}
									</Typography>
								</>
							)}

							{isLoading && <CircularProgress />}
						</StyledWalletCard>
						<StyledButtonWallet onClick={handleTopUp}>{t('Wallet.Top_up')}</StyledButtonWallet>
						<StyledButtonWallet onClick={handleWithDraw}>{t('Wallet.WithDraw')}</StyledButtonWallet>
					</Box>
				</Grid>

				<Grid item xs={8} style={{ paddingTop: 0, paddingBottom: 40 }}>
					<StyledWrapRightWallet>
						<Box style={{ height: '30%', paddingBottom: '40px', borderBottom: '1px solid #E7ECF3' }}>
							<p className="headingWallet">{t('Wallet.Transactions')}</p>

							<StyledWrapButtonGroupWallet>
								<StyledButtonFilterWallet
									className={`${filterTransaction === 'all' && 'active'}`}
									onClick={() => setfilterTransaction('all')}
								>
									{t('Wallet.All')}
								</StyledButtonFilterWallet>
								<StyledButtonFilterWallet
									className={`${filterTransaction === 'napTien' && 'active'}`}
									onClick={() => setfilterTransaction('napTien')}
								>
									{t('Wallet.Top_up')}
								</StyledButtonFilterWallet>
								<StyledButtonFilterWallet
									className={`${filterTransaction === 'rutTien' && 'active'}`}
									onClick={() => setfilterTransaction('rutTien')}
								>
									{t('Wallet.WithDraw')}
								</StyledButtonFilterWallet>
							</StyledWrapButtonGroupWallet>
						</Box>

						<ListItemTransaction>
							{loadingTransaction && <p>loading ...</p>}
							{walletTransaction?.data?.items.map((transaction) => (
								<WalletPage.ItemTransaction
									transaction={transaction}
									key={transaction._id || randomId()}
								/>
							))}
						</ListItemTransaction>
					</StyledWrapRightWallet>
				</Grid>
			</Grid>
		</>
	)
}

WalletPage.ItemTransaction = ({ transaction }: { transaction: ITransaction }) => {
	const { i18n } = useTranslation()

	return (
		<Grid container alignItems="center" spacing={2}>
			<Grid item xs={1.5} alignItems="center" container justifyContent="center">
				<IconItemTransaction>
					<AccountBalanceIcon />
				</IconItemTransaction>
			</Grid>

			<Grid item xs>
				<Typography style={{ fontSize: '18px' }} color="initial">
					{convertToTitleCase(convertStringToTitleCase(transaction?.action)) || 'Updating...'}
				</Typography>

				<Typography style={{ fontSize: '18px' }} color="#84878B">
					{convertStringToTitleCase(transaction?.action)} ID{' '}
					<span style={{ color: 'black' }}>{transaction?._id}</span>
				</Typography>

				<Typography style={{ fontSize: '14px' }} color="#84878B">
					My Cash Debited
				</Typography>
			</Grid>

			<Grid item xs={2}>
				<Typography style={{ fontSize: '18px' }} color="#222529" fontWeight="Bold">
					{i18n.language === 'en'
						? convertVNDtoUSD(transaction?.actionAmount)
						: convertMoneyToVndText(transaction?.actionAmount)}
				</Typography>
			</Grid>
		</Grid>
	)
}

export default WalletPage
