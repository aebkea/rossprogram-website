import { useId } from 'react'

export function HeroBackground(props) {
  let id = useId()

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1069 668"
      width={1069}
      height={668}
      fill="none"
      {...props}
    >
      <style>
        {
          ".st0,.st1{fill:#8b5cf6;stroke:#334155;stroke-width:5;stroke-miterlimit:10}.st0{stroke-opacity:0.5}.st1{stroke:#8b5cf6;stroke-width:8;fill-opacity:0.8;stroke-opacity:.4}"
        }
      </style>
      <g id="Layer_2">
        <path
          d="M877.7 483.7c-45.8-88.2-91.6-176.4-137.3-264.7M740.3 219c78.7-18.2 157.3-36.4 236-54.7M534.5 369l205.8-150M327 193c69.2 58.7 138.3 117.3 207.5 176M278.3 422.3c16.2-76.4 32.4-152.9 48.7-229.3M534.5 369c-85.4 17.8-170.8 35.6-256.2 53.3M877.7 483.7C763.3 445.4 648.9 407.2 534.5 369"
          className="st0"
        />
        <path
          d="M740.3 219c-137.8-8.7-275.6-17.3-413.3-26M976.3 164.3c-32.9 106.4-65.8 212.9-98.7 319.3M534.5 369c-18.9 99.7-37.9 199.3-56.8 299M278.3 422.3l84 245.7M877.7 483.7c3.3 61.4 6.7 122.9 10 184.3M740.3 219 755 0M327 193C387 128.7 447 64.3 507 0M976.3 164.3C967.7 109.6 959 54.8 950.3 0M976.3 164.3 1069 668"
          className="st0"
        />
      </g>
      <g id="Layer_1">
        <circle cx={534.5} cy={369} r={10} className="st1" />
        <circle cx={740.3} cy={219} r={10} className="st1" />
        <circle cx={877.7} cy={483.7} r={10} className="st1" />
        <circle cx={976.3} cy={164.3} r={10} className="st1" />
        <circle cx={327} cy={193} r={10} className="st1" />
        <circle cx={278.3} cy={422.3} r={10} className="st1" />
      </g>
    </svg>
  )
}
