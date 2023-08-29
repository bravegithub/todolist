import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import logo from '../img/logo.png'

export default function Profil() {
  const [imageUrl, setImageUrl] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const router = useRouter();
  const { id: username } = router.query;

  useEffect(() => {
    const getProfil = async () => {
      const response = await fetch("/api/getProfil", {
        method: "PUT",
        body: JSON.stringify({
          username: username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const pictureData = data.results[0]?.picture;
      if (pictureData) {
        const imageArray = new Uint8Array(pictureData.data);
        const base64Image = Buffer.from(imageArray).toString("base64");
        const imageSrc = `data:image/jpeg;base64,${base64Image}`;
        setProfilePicture(imageSrc);
        setImageUrl(imageSrc);
      } else {
        // Handle case when no profile picture found for the username
        setImageUrl(logo);
      }
    };
    getProfil();
  }, [imageUrl]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const location = URL.createObjectURL(file);
    setImageUrl(location);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("username", username);

    try {
      const response = await fetch("/api/updateprofil", {
        method: "PUT",
        body: formData,
      });
    } catch (error) {}
  };

  const openFileSelection = () => {
    document.getElementById("image-input").click();
  };
  const logout = () => {
    router.push('/')
  }

  return (
    <div className="relative bg-blue-500 w-full rounded-md p-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" cursor-pointer w-7 h-7 absolute right-2 top-2" onClick={logout}>
        <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
      </svg>


      <h1 className="text-white font-bold text-[1.8rem]">
        <span className="bg-white text-blu/e-500 rounded-full px-2 py-1">
          <span className="bg-blue-600 text-white rounded-md">To</span>
        </span>
        do
      </h1>
      <div className="profil relative flex justify-center items-center">
        <div className="profil-image rounded-full border-4 boder-white  h-[100px] w-[100px] overflow-hidden">
          {imageUrl && <img src={imageUrl} alt="Profile Picture" className="w-full h-full" />}
        </div>
        <input
          type="file"
          id="image-input"
          className="hidden"
          onChange={handleImageUpload}
        />
        <button
          className="absolute p-1 text-white bg-red-600 rounded-md text-sm -bottom-2 opacity-90"
          onClick={openFileSelection}
        >
          Change
        </button>
      </div>
    </div>
  );
}