import styled from '@emotion/styled'

export const StyledWrap = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;

	& .wrapForm {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	& .form {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 44px 32px;
		gap: 8px;
		max-width: 620px;

		background: #ffffff;
		border: 1px solid #e8e8e8;
		border-radius: 4px;
	}
`

export const StyledTitle = styled.h4`
	font-size: 20px;
	margin-bottom: 0;
`

export const StyledDesc = styled.p`
	color: rgb(131, 146, 165);
	font-size: 14px;
`

export const StyledResetForm = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	position: relative;

	.button__forgot {
		height: 54px;
		margin-top: 35px;
		text-transform: none;
	}
`

export const StyledFeedback = styled.span`
	position: absolute;
	bottom: 63px;
`

export const StyledListImage = styled.div`
	border-radius: 50%;
	width: 160px;
	height: 160px;
	position: relative;
	background: #f1f6ff;
	margin-bottom: 10px;

	& .imageBox {
		position: absolute;
		top: 31px;
		left: 32px;
	}

	& .wrapSend {
		position: absolute;
		background: white;
		padding: 10px;
		top: 79px;
		left: 98px;
		border-radius: 50%;

		img {
			position: relative;
			top: 1px;
			left: -1px;
		}
	}
`

export const StyledLabelWrap = styled.div`
	margin-bottom: 10px;
	justify-content: space-between;
	display: flex;

	& .label {
		font-weight: bold;
		font-size: 14px;
		line-height: 21px;
		letter-spacing: 0.5px;
		color: #001737;
	}
`
