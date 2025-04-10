import {clsx} from "clsx";

interface LoaderProps {
    className?: string;
    color?: string; // Prop để thay đổi màu
    size?: number; // Prop để thay đổi kích thước (tùy chọn)
}

const Loader = ({ className = "", color = "#fff", size = 38 }: LoaderProps) => (
    <div className={clsx("flex-center w-full", className)}>
        <svg
            width={size}
            height={size}
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
            stroke={color} // Truyền màu vào stroke
        >
            <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                    <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="1s" // Giảm thời gian để quay nhanh hơn, tùy chỉnh nếu cần
                            repeatCount="indefinite"
                        />
                    </path>
                </g>
            </g>
        </svg>
    </div>
);

export default Loader;