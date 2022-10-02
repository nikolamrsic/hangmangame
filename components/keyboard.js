export default function Keyboard({ char, clickHandler, disabled }) {
    return (
      <button
        disabled={disabled}
        type="submit"
        className="h-11 disabled:bg-gray-900 disabled:text-white bg-blue-600 rounded-md border-none text-white hover:bg-blue-400 w-8 border"
        onClick={clickHandler}
      >
        {char}
      </button>
    );
  }
  