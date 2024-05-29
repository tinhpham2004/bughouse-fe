import { FC } from 'react'
import Helmet from 'react-helmet'
import logo from '../assets/images/logoBrowser.png'
interface IProps {
	title?: string
	description?: string
}

const SEO: FC<IProps> = ({ title, description }) => {
	return (
		<Helmet>
			<meta charSet="utf-8" />
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="description" content="Home less" />
			<meta name="robots" content="noindex" />
			<link rel="icon" href={logo} />
			<link rel="canonical" href={logo} />
		</Helmet>
	)
}

SEO.defaultProps = {
	title: 'Bughouse',
	description: 'Bughouse',
}

export default SEO
