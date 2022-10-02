export default function Char({ value, visible, allMatch }) {
    let styleChar = {
      opacity: visible ? "100%" : "0%",
      color: allMatch ? "green" : "black"
    };
    return (
      <div>
        <span className="text-4xl " style={styleChar}>
          {value}
        </span>
      </div>
    );
  }