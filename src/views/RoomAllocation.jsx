import { useEffect, useMemo, useState, useCallback } from 'react';
import GuestRoom from './GuestRoom';
import style from './RoomAllocation.module.css';

function RoomAllocation({
	guest = 10,
	room = 3,
	onChange,
}) {
	const [guestAmount, setGuestAmount] = useState(guest);
	const [roomAmount, setRoomAmount] = useState(room);
	const [rooms, setRooms] = useState([]);
	let remainingGuestAmount = useMemo(() => {
		let assignedGuestAmount = rooms.reduce((sum, room) => sum + room.adult + room.child, 0)

		return guestAmount - assignedGuestAmount;
	}, [rooms, guestAmount])

	const updateRoom = useCallback((index, updatingRoomInfo) => {
		setRooms(prevRoom => {
			let rooms = [...prevRoom]

			rooms[index] = updatingRoomInfo

			onChange(rooms)

			return rooms
		})
	}, [onChange])
	
	useEffect(() => {
		for(let i=0; i< room; i++) {
			setRooms(prev => {
				return [
					...prev,
					{ adult: 1, child: 0 }
				]
			})
		}
	}, [room])

	return (
		<div className="w-500 py-4 px-4 border border-gray-200">
			<h2 className={`${style.title} mb-4`}>住戶人數：{guestAmount}人 / {roomAmount}房</h2>
			<div className='py-5 px-5 mb-4 border border-cyan-200 bg-cyan-50 rounded-md text-sm text-gray-400'>尚未分配人數：{remainingGuestAmount}</div>
			{
				rooms.map((roomInfo, key) => 
					<GuestRoom 
						key={key}
						index={key}
						adult={roomInfo.adult}
						child={roomInfo.child}
						guest={guest}
						room={room}
						remainingGuestAmount={remainingGuestAmount}
						updateRoom={updateRoom}
						className={key !== 0 ? 'border-t border-gray mt-4 pt-4' : null}
					/>
				)
			}
		</div>
	);
}

export default RoomAllocation;
