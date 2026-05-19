// stand-in for a real photo. hash the label into a hue so each placeholder looks distinct
function hueFromString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % 360;
}

export default function PlaceholderImage({ label = "image", className = "", onClick }) {
  const hue = hueFromString(label);
  const style = {
    background: `linear-gradient(135deg, hsl(${hue}, 70%, 88%), hsl(${(hue + 40) % 360}, 60%, 72%))`,
  };

  return (
    <div className={`placeholder-image ${className}`} style={style} onClick={onClick}>
      <span>{label}</span>
    </div>
  );
}
