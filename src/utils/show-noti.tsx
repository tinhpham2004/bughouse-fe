import React from 'react'
import { toast } from 'react-toastify'

function Noti({ message }: { message: string }) {
	return <span style={{ fontWeight: 500 }}>{message}</span>
}

class Notify {
	success = (message: string) => toast.success(<Noti message={message} />)
	error = (message: string) => toast.error(<Noti message={message} />)
	warning = (message: string) => toast.warning(<Noti message={message} />)
}

const ShowNostis = new Notify()
export default ShowNostis
