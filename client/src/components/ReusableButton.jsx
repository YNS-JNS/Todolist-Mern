
const ReusableButton = ({ title, onClick, color }) => {
    return (
        <button
            className={`inline-flex items-center px-4 py-2 text-white text-sm font-medium rounded-md drop-shadow-2xl bg-${color}-600 hover:bg-${color}-700`}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default ReusableButton;
