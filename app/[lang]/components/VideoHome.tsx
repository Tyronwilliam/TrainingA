"use client";
import { usePreferences } from "@/hooks/Basic/usePreferencesProvider";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";
export default function VideoHome() {
  const { setIsMute, isMute } = usePreferences();

  const handleToggleMute = () => {
    // Inversez la valeur (true -> false, false -> true)
    const newMuteValue = !isMute;

    // Mettez à jour la clé "preference" dans le sessionStorage avec la nouvelle valeur
    sessionStorage.setItem("audio", newMuteValue.toString());

    // Mettez à jour le state 'isMute' avec la nouvelle valeur
    setIsMute(newMuteValue);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full  z-0">
      {isMute ? (
        <MdVolumeOff
          className="absolute z-50 top-[1%] right-[2%] w-5 h-5 cursor-pointer"
          onClick={handleToggleMute}
        />
      ) : (
        <MdVolumeUp
          className="absolute z-50 top-[1%] right-[2%] w-5 h-5 cursor-pointer"
          onClick={handleToggleMute}
        />
      )}
      <video
        autoPlay
        loop
        muted={isMute}
        preload="auto"
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover object-top "
      >
        <source
          src="https://lula-aws-s3-bucket.s3.eu-west-3.amazonaws.com/castvideonew_1_a8vqei.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
