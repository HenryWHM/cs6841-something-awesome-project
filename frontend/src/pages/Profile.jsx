import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get user ID from URL if needed
    const [username, setUsername] = useState("Your Username");
    const [aboutMe, setAboutMe] = useState("");
    const [profilePic, setProfilePic] = useState(null); // For profile pic upload
    const [isAdmin, setIsAdmin] = useState(false); // Assume admin privileges
    const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
    const [modalContent, setModalContent] = useState(""); // Track edit content

    // Load profile data on component mount
    const fetchProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You are not logged in.");
            navigate("/");
            return;
        }

        fetch(`http://localhost:4000/api/user/profile/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Unauthorized");
                }
            })
            .then((data) => {
                setUsername(data.username || "Your Username");
                setProfilePic(data.profile_pic ? `http://localhost:4000${data.profile_pic}` : '');
                setAboutMe(data.about_me || '');
                setIsAdmin(data.isAdmin || false);
            })
            .catch((error) => {
                console.error("Error loading profile:", error);
                navigate("/");
            });
    };

    useEffect(() => {
        fetchProfile();
    }, [id, navigate]);

    // Function to open the modal with existing aboutMe content
    const openModal = () => {
        setModalContent(aboutMe); // Set the initial modal content to the current aboutMe
        setIsModalOpen(true); // Show modal
    };

    // Function to handle saving the About Me section
    const saveAboutMe = () => {
        console.log("saveAboutMe function called with content:", modalContent);
        const token = localStorage.getItem("token");
        console.log(token);

        fetch(`http://localhost:4000/api/user/profile/update-about/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ about_me: modalContent })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response from backend:", data); // Log backend response
            if (data.message) {
                setAboutMe(modalContent); // Update local state
                setIsModalOpen(false); // Close modal
                alert(data.message);
            } else if (data.error_message === "Token is invalid") {
                console.log("Hi");
                localStorage.removeItem("token");
                // navigate("/");
            } else {
                console.error("Error:", data.error_message);
            }
        })
        .catch(error => console.error("Error updating About Me:", error));
    };

    // Function to clear the About Me section in the database
    const clearAboutMe = () => {
        setModalContent(""); // Clear modal content
        saveAboutMe(""); // Clear the aboutMe content in the database and close modal
    };

    const handleProfilePicUpload = (e) => {
        const file = e.target.files[0];
        const token = localStorage.getItem("token");

        if (file) {
            const formData = new FormData();
            formData.append('profilePic', file);

            fetch(`http://localhost:4000/api/user/profile/upload/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.profile_pic) {
                        setProfilePic(`http://localhost:4000${data.profile_pic}`); // Update UI with new profile picture
                    } else {
                        console.error("Failed to update profile picture:", data.error_message);
                    }
                })
                .catch(error => console.error("Error uploading profile picture:", error));
        } else {
            console.error("No file selected");
        }
    };

    const clearProfilePic = () => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:4000/api/user/profile/clear/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setProfilePic(''); // Clear the profile picture in the UI
            })
            .catch(error => console.error("Error clearing profile picture:", error));
    };

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
                    <div className="flex flex-col items-center justify-center">
                        <img
                            src={profilePic || "https://via.placeholder.com/150"} // Default or uploaded image
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicUpload}
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
                        <p className="dark:text-gray-300 mb-2">{aboutMe || "No information provided."}</p>
                        <button
                            onClick={openModal}
                            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg text-sm"
                        >
                            Edit About Me
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for Editing "About Me" */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4 dark:text-white">Edit About Me</h3>
                        <textarea
                            value={modalContent}
                            onChange={(e) => setModalContent(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                            rows="4"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)} // Close modal without saving
                                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveAboutMe} // Save content and close modal
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
