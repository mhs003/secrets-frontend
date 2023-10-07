import { FaArrowLeft } from "react-icons/fa";

export default function BackButton() {
    return (
        <a
            href="/"
            className="py-3 text-black px-4 flex justify-center items-center gap-2 bg-white rounded-full absolute -top-14 left-0 hover:bg-gray-100 transition-transform active:scale-90"
        >
            <FaArrowLeft size={13} />
            <p className="text-sm">Back to Home</p>
        </a>
    );
}
