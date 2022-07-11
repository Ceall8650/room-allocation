import style from "./CustomInputNumber.module.css";

function CustomInputNumberButton({ label, ...props }) {
	return (
		<button
			{...props}
			className={`${style.container} border-blue-300 text-blue-300 disabled:border-gray-200 disabled:text-gray-400`}
		>
			{label}
		</button>
	);
}

export default CustomInputNumberButton;
