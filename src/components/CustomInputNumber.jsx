import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import CustomInputNumberButton from "./CustomInputNumberButton";
import style from "./CustomInputNumber.module.css";

function CustomInputNumber({
	min = 0,
	max = Infinity,
	disabled = false,
	enabledPlus = true,
	name = "",
	step = 1,
	value = 0,
	onChange,
	onBlur,
	...props
}) {
	const NUMBER_CHANGE_INTERVAL = 200
	const numberIncrementIntervalId = useRef(null);
	const numberDecrementIntervalId = useRef(null);
	const [innerValue, setInnerValue] = useState(value);
	const [customEvent, setCustomEvent] = useState({
		target: {
			name,
			value,
		},
	});
	let event = useMemo(
		() => ({
			target: {
				name,
				value: innerValue,
			},
		}),
		[innerValue, name]
	);

	function increaseNumber() {
		setInnerValue((prev) => {
			return prev + step > max 
				? max 
				: prev + step;
		});
	}

	function handleNumberIncrement() {
		increaseNumber()
		numberIncrementIntervalId.current = setInterval(increaseNumber, NUMBER_CHANGE_INTERVAL);
	};
		
	function handleIncrementTimerClear() {
		clearInterval(numberIncrementIntervalId.current);
	}

	function decreaseNumber() {
		setInnerValue((prev) => {
			return prev - step < min 
				? min 
				: prev - step;
		});
	}

	function handleNumberDecrement() {
		decreaseNumber()
		numberDecrementIntervalId.current = setInterval(decreaseNumber, NUMBER_CHANGE_INTERVAL);
	};

	function handleDecrementTimerClear() {
		clearInterval(numberDecrementIntervalId.current);
	}

	function handleChange(e) {
		let value = parseInt(e.target.value, 10);

		if (!isNaN(value)) {
			setInnerValue(value);
		}
	}

	function handleBlur(e) {
		if (typeof onBlur === "function") {
			onBlur(event);
		}
	}

	useEffect(() => {
		if (innerValue < min) {
			setInnerValue(min);
		} else if (innerValue > max) {
			setInnerValue(max);
		}
	}, [innerValue, min, max]);

	useEffect(() => {
		if (typeof onChange === "function") {
			event.target.value = innerValue;

			if(innerValue === min) {
				handleDecrementTimerClear()
			} else if(innerValue === max) {
				handleIncrementTimerClear()
			}

			onChange(event);
		}
	}, [event, innerValue, min, max, onChange]);

	useEffect(() => {
		if(!enabledPlus) {
			handleIncrementTimerClear()
		}
	}, [enabledPlus])

	return (
		<div className="inline-flex items-center justify-center text-base">
			<CustomInputNumberButton
				label="-"
				onMouseDown={handleNumberDecrement}
				onMouseUp={handleDecrementTimerClear}
				disabled={disabled || innerValue <= min}
			/>
			<input
				type="number"
				min={min}
				step={step}
				value={innerValue}
				onChange={handleChange}
				onBlur={handleBlur}
				className={`${style.container} mx-2 border-gray-300 text-center disabled:text-gray-400`}
        disabled={disabled || !enabledPlus}
				{...props}
			/>
			<CustomInputNumberButton
				label="+"
				onMouseDown={handleNumberIncrement}
				onMouseUp={handleIncrementTimerClear}
				disabled={disabled || innerValue >= max || !enabledPlus}
			/>
		</div>
	);
}

export default CustomInputNumber;
