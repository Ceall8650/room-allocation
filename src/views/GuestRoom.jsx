import { useState, useEffect, useCallback, useMemo } from 'react';
import CustomInputNumber from "components/CustomInputNumber";
import styles from './RoomAllocation.module.css';

function GuestRoom({
  index,
  adult = 2,
  child = 1,
  guest,
  room,
  className,
  updateRoom,
  remainingGuestAmount
}) {
  const ROOM_MAXIMUM_AMOUNT = 4
  const enabledInputNumber = useMemo(
    () => room < guest, 
    [room, guest]
  )
  const [roomUserAmount, setRoomUserAmount] = useState(0)
  const updateAdultAmount = useCallback((e) => {
    updateRoom(index, { adult: e.target.value, child: child })
  }, [index, updateRoom, child])

  const updateChildrenAmount = useCallback((e) => {
    updateRoom(index, { adult: adult, child: e.target.value })
  }, [index, updateRoom, adult])

  const adultRoomMaximumAmount = useMemo(
    () => ROOM_MAXIMUM_AMOUNT - child, 
    [child]
  )
  const childRoomMaximumAmount = useMemo(
    () => ROOM_MAXIMUM_AMOUNT - adult >= 0 ? ROOM_MAXIMUM_AMOUNT - adult : 0, 
    [adult]
  )

  return (
    <div className={`${className} flex flex-col`}>
      <div className={`${styles.title} mb-5`}>房間：{adult + child }人</div>
      <div className='flex justify-between mb-4'>
        <div className='flex flex-col'>
          <span className='text-sm'>大人</span>
          <span className='text-gray-400 text-xs'>年齡 20+</span>
        </div>
        <CustomInputNumber
          name="adultInput"
          min={1}
          max={adultRoomMaximumAmount}
          disabled={!enabledInputNumber}
          enabledPlus={ remainingGuestAmount > 0 }
          onChange={updateAdultAmount}
          onBlur={updateAdultAmount}
        />
      </div>
      <div className='flex justify-between'>
        <span className='text-sm'>小孩</span>
        <CustomInputNumber
          name="childInput"
          min={0}
          max={childRoomMaximumAmount}
          disabled={!enabledInputNumber}
          enabledPlus={ remainingGuestAmount > 0 }
          onChange={updateChildrenAmount}
          onBlur={updateChildrenAmount}
        />
      </div>
    </div>
  )
}

export default GuestRoom
