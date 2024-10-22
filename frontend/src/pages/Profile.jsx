import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    // Assuming you fetch the logged-in user info from somewhere, like an API
    const [username, setUsername] = useState("Your Username");
    const [aboutMe, setAboutMe] = useState("Write something about yourself...");
    const [profilePic, setProfilePic] = useState(null); // For profile pic upload
    const [isAdmin, setIsAdmin] = useState(false); // Assume admin privileges

    const navigate = useNavigate();

    // Example: Simulate fetching user data (including admin status)
    useEffect(() => {
        // Simulate fetching user data
        const userData = {
            username: "YourUsername",
            aboutMe: "I'm the admin of this page.",
            isAdmin: true, // Assume this is fetched
        };
        setUsername(userData.username);
        setAboutMe(userData.aboutMe);
        setIsAdmin(userData.isAdmin);
    }, []);

    // Function to handle profile picture upload
    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file)); // Show preview
        }
    };

    // Handle saving About Me changes (could be saved to a server)
    const handleAboutMeChange = (e) => {
        setAboutMe(e.target.value);
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
                    <div className="relative">
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
