import React from 'react'

const useOpen = () => {
	const [open, setOpen] = React.useState<boolean>(false)

	const handleToggleOpen = () => {
		setOpen((pre) => !pre)
	}

	const handleSetOpen = () => {
		setOpen(true)
	}

	const handleSetClose = () => {
		setOpen(false)
	}

	return {
		open,
		setOpen,
		handleToggleOpen,
		handleSetOpen,
		handleSetClose,
	}
}

export default useOpen
