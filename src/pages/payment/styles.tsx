import styled from '@emotion/styled'

export const StytledWrapContent = styled.div``

export const StyledPayment = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	flex-direction: column;

	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	min-width: 400px;

	min-height: 400px;
	border-radius: 4px;
	gap: 15px;

	& .heading {
		color: #232322;
		font-size: 18px;
		font-weight: bold;
	}

	& button {
		text-transform: unset;
	}

	& .icon {
		font-size: 40px;
		background: green;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		border-radius: 50%;

		svg {
			font-size: 100px;
			color: white;
		}
	}
`
