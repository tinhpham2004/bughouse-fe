import styled from '@emotion/styled'

export const LoadingContainer = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	background-color: white;
	z-index: 999999999;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		width: 150px;
		animation: fallBack 1s alternate backwards infinite;
	}

	@keyframes fallBack {
		0% {
			opacity: 0.7;
		}

		50% {
			opacity: 0.8;
		}

		80% {
			opacity: 0.9;
		}

		100% {
			opacity: 1;
		}
	}
`
