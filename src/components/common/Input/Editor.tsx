import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useRef } from 'react'
import { Controller } from 'react-hook-form'
// import { UploadFileApi } from '~/api/common/upload-image'
// import { ShowNoti } from '~/common/utils'

const quickMenu =
	'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | fontfamily fontsize blocks | forecolor backcolor | customInsertButton | link image'
const editorPlugins =
	'preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons image code'

interface IProps {
	initialValue?: any
	value?: any
	placeholder?: string
	handleChangeDataEditor?: Function
	customFieldProps?: any
	disableButton?: boolean
	height?: string | number
	disabled?: boolean
	id?: string
	control: any
	name: string
}

const EditorBase = (props: IProps) => {
	const { initialValue, control, name, placeholder, handleChangeDataEditor, customFieldProps, height, disabled } =
		props
	const editorRef = useRef<any>(null)

	const checkHandleChangeDataEditor = (content: any) => {
		if (!handleChangeDataEditor) return
		handleChangeDataEditor(content)
	}

	// integration in a Bootstrap dialog
	useEffect(() => {
		const handler = (e: any) => {
			if (e.target.closest('.tox-tinymce-aux, .moxman-window, .tam-assetmanager-root') !== null) {
				e.stopImmediatePropagation()
			}
		}
		document.addEventListener('focusin', handler)
		return () => document.removeEventListener('focusin', handler)
	}, [])

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => (
				<div style={{ width: '100%', height: 'fit-content' }}>
					<Editor
						id={!!props?.id ? props?.id : 'editor'}
						onInit={(evt, editor) => (editorRef.current = editor)}
						initialValue={initialValue}
						disabled={disabled}
						value={value}
						onEditorChange={(values) => onChange(values)}
						init={{
							images_file_types: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp',
							inline: false, // Remove iframe tag
							plugins: editorPlugins,
							placeholder: placeholder,
							toolbar: quickMenu,
							height: height || 600,
							content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
							menubar: false,
							toolbar_mode: 'floating',
							toolbar_location: 'top',
							toolbar_sticky: true,
							font_family_formats:
								'Arial=arial,helvetica,sans-serif;Comic Sans MS=comic sans ms,sans-serif; Georgia=georgia,palatino; Helvetica=helvetica;Tahoma=tahoma,arial,helvetica,sans-serif; Verdana=verdana,geneva;',

							image_title: true,
							file_picker_types: 'image',
							/* and here's our custom image picker*/
							...customFieldProps,
						}}
						apiKey={import.meta.env.VITE_TINY_API}
					/>
				</div>
			)}
		/>
	)
}

export default EditorBase
