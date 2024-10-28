import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
    const userId = localStorage.getItem("userId"); // Retrieve userId stored after login
    const [username, setUsername] = useState("Your Username");
    const [aboutMe, setAboutMe] = useState("Write something about yourself...");
    const [profilePic, setProfilePic] = useState(null); // For profile pic upload
    const [isAdmin, setIsAdmin] = useState(false); // Assume admin privileges

    // Load profile data on component mount
    useEffect(() => {
        fetch(`api/user/profile/${userId}`)
            .then(response => response.json())
            .then(data => {
                setProfilePic(data.profile_pic || '');
                setAboutMe(data.about_me || '');
            })
            .catch(error => console.error("Error loading profile:", error));
    }, [userId]);

    // Save profile data
    const saveProfile = () => {
        fetch(`/api/user/profile/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profile_pic: profilePic, about_me: aboutMe })
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error("Error saving profile:", error));
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Clear profile picture
    const clearProfilePic = () => {
        setProfilePic('');
    };

    const handleAboutMeChange = (e) => {
        setAboutMe(e.target.value);
    };

    // Clear about me
    const clearAboutMe = () => {
        setAboutMe('');
    };

    // Navigate to Forum or Productivity App
    const goToForum = () => {
        navigate("/forum"); // Replace with the actual forum route
    };

    const goToProductivityApp = () => {
        navigate("/productivity"); // Replace with actual productivity route
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 max-w-lg w-full">
                <div className="flex flex-col items-center">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center justify-center">
                        <img
                            src={profilePic || "https://via.placeholder.com/150"} // Default or uploaded image
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            className="mt-2"
                        />
                        <button
                            onClick={clearProfilePic}
                            className="mt-2 px-4 py-1 bg-red-500 text-white rounded-lg text-sm"
                        >
                            Clear Profile Picture
                        </button>
                    </div>

                    {/* Username */}
                    <h2 className="mt-4 text-2xl font-bold dark:text-white">{username}</h2>

                    {/* Admin Badge */}
                    {isAdmin && (
                        <span className="mt-2 px-4 py-1 bg-red-500 text-white rounded-lg text-sm">
                            Admin
                        </span>
                    )}

                    {/* About Me Section */}
                    <div className="w-full mt-6">
                        <h3 className="text-lg font-semibold dark:text-white">About Me</h3>
                        <textarea
                            value={aboutMe}
                            onChange={handleAboutMeChange}
                            className="w-full p-3 border rounded-lg mt-2 bg-gray-50 dark:bg-gray-700 dark:text-white"
                        />
                        <button
                            onClick={clearAboutMe}
                            className="mt-2 px-4 py-1 bg-red-500 text-white rounded-lg text-sm"
                        >
                            Clear About Me
                        </button>
                        <button
                            onClick={saveProfile}
                            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition"
                        >
                            Save Profile
                        </button>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-6 w-full flex justify-around">
                        <button
                            onClick={goToForum}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition"
                        >
                            Go to Forum
                        </button>
                        <button
                            onClick={goToProductivityApp}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition"
                        >
                            Go to Productivity App
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
