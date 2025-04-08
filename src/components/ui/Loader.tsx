import {clsx} from "clsx";

const Loader = ({className=""}) => (
    <div className={clsx("flex-center w-full",className)}>
        <img
            src="src/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
        />
    </div>
);

export default Loader;