import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateuser, updateuserpassword } from "../actions/useractions";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const Account = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.userdetails.user);
  const { isAuthenticated } = useSelector((state) => state.userdetails);
  const navigate = useNavigate();

  // Profile states
  const [userName, setUserName] = useState(userdata?.username || "");
  const [email, setEmail] = useState(userdata?.email || "");

  // Password states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Handlers
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateuser(userName, email));
    setShowProfileModal(false);
    alert("Your profile has been successfully updated!");
    navigate("/");
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    dispatch(updateuserpassword(oldPassword, newPassword, confirmPassword));
    setShowPasswordModal(false);
    alert("Your password has been successfully updated!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex justify-center py-16 px-4">
      <div className="bg-white shadow-xl rounded-3xl max-w-4xl w-full p-10 space-y-10">
        <h1 className="text-4xl font-bold text-center text-sky-900">
          Account Details
        </h1>

        {/* Display Info */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-sky-50 rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold text-sky-800">Name</h3>
            <p className="text-gray-700">{userdata?.username}</p>
          </div>
          <div className="bg-sky-50 rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold text-sky-800">Email</h3>
            <p className="text-gray-700">{userdata?.email}</p>
          </div>
          <div className="bg-sky-50 rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold text-sky-800">Joined On</h3>
            <p className="text-gray-700">
              {userdata?.createdAt?.slice(0, 10)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {isAuthenticated && (
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => setShowProfileModal(true)}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow hover:scale-105 hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-8 py-3 bg-green-600 text-white rounded-xl shadow hover:scale-105 hover:bg-green-700 transition"
            >
              Change Password
            </button>
          </div>
        )}

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-6">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-center text-sky-900">
                Update Profile
              </h2>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <input
                  type="text"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="flex justify-between gap-4">
                  <button
                    type="submit"
                    className="flex-grow py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="flex-grow py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-6">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-center text-sky-900">
                Change Password
              </h2>
              <form onSubmit={handleUpdatePassword} className="space-y-6">
                {/* Old Password */}
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    className="w-full p-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <IconButton
                    onClick={() => setShowOldPassword((prev) => !prev)}
                    className="!absolute !right-2 !top-1/2 !-translate-y-1/2"
                    size="small"
                  >
                    {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </div>
                {/* New Password */}
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full p-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <IconButton
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="!absolute !right-2 !top-1/2 !-translate-y-1/2"
                    size="small"
                  >
                    {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </div>
                {/* Confirm Password */}
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full p-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="!absolute !right-2 !top-1/2 !-translate-y-1/2"
                    size="small"
                  >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </div>
                <div className="flex justify-between gap-4">
                  <button
                    type="submit"
                    className="flex-grow py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-grow py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
