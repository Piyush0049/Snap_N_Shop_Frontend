import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateuser, updateuserpassword } from "../actions/useractions";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { MdEdit, MdLockReset } from "react-icons/md";

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
  const handleUpdateProfile = async(e) => {
    e.preventDefault();
    const a = await dispatch(updateuser(userName, email));
    console.log(a);
    setShowProfileModal(false);
    alert("✅ Profile updated successfully!");
    navigate("/");
  };

  const handleUpdatePassword = async(e) => {
    e.preventDefault();
    const a = await dispatch(updateuserpassword(oldPassword, newPassword, confirmPassword));
    console.log(a);
    setShowPasswordModal(false);
    alert("✅ Password updated successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex justify-center items-between py-20 px-6 sm:px-10">
      <div className="bg-white shadow-md rounded-3xl max-w-5xl w-full p-10 md:p-14 space-y-12">
        {/* Title */}
        <h1 className="text-4xl md:text-4xl font-extrabold text-center text-sky-900 tracking-wide">
          My Account
        </h1>

        {/* User Details Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className=" rounded-xl p-6 text-center hover:shadow-lg transition">
            <h3 className="text-sm font-medium text-sky-800">Full Name</h3>
            <p className="mt-2 text-lg font-semibold text-gray-800">{userdata?.username}</p>
          </div>
          <div className=" rounded-xl p-6 text-center hover:shadow-lg transition">
            <h3 className="text-sm font-medium text-sky-800">Email</h3>
            <p className="mt-2 text-lg font-semibold text-gray-800">{userdata?.email}</p>
          </div>
          <div className=" rounded-xl p-6 text-center hover:shadow-lg transition">
            <h3 className="text-sm font-medium text-sky-800">Joined On</h3>
            <p className="mt-2 text-lg font-semibold text-gray-800">
              {userdata?.createdAt?.slice(0, 10)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {isAuthenticated && (
          <div className="flex justify-center flex-wrap gap-6">
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:scale-105 hover:bg-blue-700 transition"
            >
              <MdEdit size={20} /> Edit Profile
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl shadow-md hover:scale-105 hover:bg-green-700 transition"
            >
              <MdLockReset size={20} /> Change Password
            </button>
          </div>
        )}

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-center text-sky-900">
                Update Profile
              </h2>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <input
                  type="text"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Full Name"
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
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
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
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-6">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
              <h2 className="text-2xl font-bold text-center text-sky-900 mb-6">
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

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
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
