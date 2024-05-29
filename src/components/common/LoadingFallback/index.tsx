import Logo from '@/assets/images/LogoBugHouse1.png'
import { LoadingContainer } from './styles'

const LoadingFallBack = () => {
	return (
		<LoadingContainer>
			<img src={Logo} alt="Logo" />
		</LoadingContainer>
	)
}

export default LoadingFallBack
