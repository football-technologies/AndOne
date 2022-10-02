import "./button.css";

function Button({ children, color = "default", size = "base" }) {
  return <button className={`${color} ${size}`}>{children}</button>;
}

export default Button;
