import { useContext } from "react";
import { BannerDataContext } from "../../BannerDataContext";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

// コンポーネントのUI部分を定義している
type Props = {
  show: boolean;
};

export const Layout = ({ show }: Props) => {
  // ②音声ON/OFFの切り替え
  const { isMuted, setIsMuted } = useContext(BannerDataContext);
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  return (
    <div
      className={`fixed top-0 w-full h-16 p-5 z-10 flex justify-between transition-all ease-in duration-500 ${
        show ? "bg-black" : ""
      }`}
    >
      <div className="flex items-center">
        <img
          className="fixed left-5 w-20 object-contain"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
        />
        {/* // ① 音声On/Offアイコンの追加 */}
        <button onClick={toggleMute} className="ml-24 focus:outline-none ">
          {isMuted ? <FiVolumeX /> : <FiVolume2 />}
        </button>
        <img
          className="fixed right-5 w-8 object-contain"
          src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
          alt="Avatar"
        />
      </div>
    </div>
  );
};
