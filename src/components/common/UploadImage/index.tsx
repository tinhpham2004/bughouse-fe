import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Control, Controller } from 'react-hook-form'

const UploadImage = ({ addFiles, content }: { addFiles: any; content: string | React.ReactNode }) => {
	const [files, setFiles] = useState([])

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': [],
		},
		onDrop: (acceptedFiles: any) => {
			addFiles(acceptedFiles)
			setFiles(
				// @ts-ignore
				acceptedFiles.map((file) => {
					return Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				})
			)
		},
	})

	const thumbs = files.map((file) => (
		<img
			style={{
				width: '500px',
				height: '300px',
				borderRadius: '20px',
				objectFit: 'cover',
				objectPosition: 'center',
			}}
			//@ts-ignore
			src={file?.preview}
			key={Date.now()}
			alt="profile"
		/>
	))

	useEffect(() => {
		// @ts-ignore
		return () => files.forEach((file) => URL.revokeObjectURL(file?.preview))
	}, [])

	return (
		<section className="container">
			<div
				{...getRootProps({ className: 'dropzone' })}
				style={{
					width: '500px',
					height: '300px',
				}}
			>
				<input {...getInputProps()} hidden />
				{Object.keys(files).length !== 0 ? (
					files.map((file) => <aside key={Date.now()}>{thumbs}</aside>)
				) : (
					<div
						style={{
							width: '100%',
							border: '1px dotted #1976d2',
							height: '100%',
							borderRadius: '20px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{content}
					</div>
				)}
			</div>
		</section>
	)
}

export default UploadImage
