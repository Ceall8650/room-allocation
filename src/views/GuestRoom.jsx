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
  const [adultAmount, setAdultAmount] = useState(adult);
  const [childrenAmount, setChildrenAmount] = useState(child);
  const [roomGuestAmount, setRoomGuestAmount] = useState(0)
  const enabledInputNumber = useMemo(() => {
    return room < guest
  }, [room, guest])

  const updateAdultAmount = useCallback((e) => {
    setAdultAmount(e.target.value);
    updateRoom(index, { adult: adultAmount, child: childrenAmount })
  }, [index, updateRoom, adultAmount, childrenAmount])

  const updateChildrenAmount = useCallback((e) => {
    setChildrenAmount(e.target.value);
    updateRoom(index, { adult: adultAmount, child: childrenAmount })
  }, [index, updateRoom, adultAmount, childrenAmount])

  useEffect(() => {
    setRoomGuestAmount(adultAmount + childrenAmount)
  }, [adultAmount, childrenAmount])

  return (
    <div className={`${className} flex flex-col`}>
      <div className={`${styles.title} mb-5`}>房間：{roomGuestAmount}人</div>
      <div className='flex justify-between mb-4'>
        <div className='flex flex-col'>
          <span className='text-sm'>大人</span>
          <span className='text-gray-400 text-xs'>年齡 20+</span>
        </div>
        <CustomInputNumber
          name="adultInput"
          min={1}
          max={10}
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
          max={10}
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
