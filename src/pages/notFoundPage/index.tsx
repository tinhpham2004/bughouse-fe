import React from 'react'
import Lottie from 'react-lottie-player'
import loadingJson from '@/common/Json/36395-lonely-404.json'
import { StyledWrapNotFound } from './styles'
import { useTranslation } from 'react-i18next'
import SEO from '@/components/seo'

const PageNotFound = () => {
	const { t } = useTranslation()
	return (
		<StyledWrapNotFound>
			<SEO title="Bughouse 🤡404" />
			<Lottie loop animationData={loadingJson} play className="pageNotFound_animation" />
			<p>
				{t('NOT_FOUND_PAGE.TOP')} <br />
				{t('NOT_FOUND_PAGE.BOTTOM')}
			</p>
		</StyledWrapNotFound>
	)
}

export default PageNotFound
