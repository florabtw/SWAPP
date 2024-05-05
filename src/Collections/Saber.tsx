const blue = "#44a2f0";
const green = "#28c741";
const purple = "#9e71dd";
const red = "#B32837";
const white = "white";

const blues = [
  "Obi-Wan Kenobi",
  "Anakin Skywalker",
  "Rey Skywalker",
  "Cal Kestis",
  "Kanan Jarrus",
];

const reds = [
  "Darth Vader",
  "Darth Sidious",
  "Dooku",
  "Darth Maul",
  "Kylo Ren",
];

const greens = [
  "Qui-Gon Jinn",
  "Yoda",
  "Luke Skywalker",
  "Sabine Wren",
  "Ezra Bridger",
  "Ahsoka Tano",
];

const colors: Record<string, string> = {
  ...Object.fromEntries(reds.map((key) => [key, red])),
  ...Object.fromEntries(blues.map((key) => [key, blue])),
  ...Object.fromEntries(greens.map((key) => [key, green])),
  "Mace Windu": purple,
};

export default function Saber({ name }: { name?: string }) {
  const saberColor = (name && colors[name]) || white;

  return (
    <svg
      width="40"
      height="49"
      viewBox="0 0 40 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_7_29)">
        <path
          d="M18 1.5H22C22.8284 1.5 23.5 2.17157 23.5 3V30.5H16.5V3C16.5 2.17157 17.1716 1.5 18 1.5Z"
          fill="#FFFFFF"
          stroke={saberColor}
        />
        <path
          d="M18 29.5H22C22.8284 29.5 23.5 30.1716 23.5 31V48.5H16.5V31C16.5 30.1716 17.1716 29.5 18 29.5Z"
          fill="#222222"
          stroke="#222222"
        />
        <circle cx="20" cy="35" r="2" fill={saberColor} />
        <rect x="30" y="15" width="10" height="2" rx="1" fill={saberColor} />
        <rect
          x="30"
          y="25"
          width="10"
          height="2"
          rx="1"
          transform="rotate(30 30 25)"
          fill={saberColor}
        />
        <rect
          x="29"
          y="5"
          width="10"
          height="2"
          rx="1"
          transform="rotate(-30 29 5)"
          fill={saberColor}
        />
        <rect
          x="10"
          y="16.7321"
          width="10"
          height="2"
          rx="1"
          transform="rotate(180 10 16.7321)"
          fill={saberColor}
        />
        <rect
          x="10"
          y="6.73206"
          width="10"
          height="2"
          rx="1"
          transform="rotate(-150 10 6.73206)"
          fill={saberColor}
        />
        <rect
          x="11"
          y="26.7321"
          width="10"
          height="2"
          rx="1"
          transform="rotate(150 11 26.7321)"
          fill={saberColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_7_29">
          <rect width="40" height="49" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
