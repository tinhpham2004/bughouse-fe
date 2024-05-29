import HeadingTitle from '@/components/common/Heading/HeadingTitle'
import { useTranslation } from 'react-i18next'

import SEO from '@/components/seo'
import InvoiceContainer from '@/features/Invoice/InvoiceContainer'

const InvoicePage = () => {
	const { t } = useTranslation()

	return (
		<>
			<SEO title="Bughouse 🤡 - Your invoices" />

			<HeadingTitle>{t('Header.Invoices')}</HeadingTitle>
			<InvoiceContainer />
		</>
	)
}

export default InvoicePage
