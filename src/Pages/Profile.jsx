import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/Auth";
import { login, logout } from "../Store/authSlice";
import AvatarPicker from "@/components/AvatarPicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.prefs?.avatar || "/avatars/Avatar1.jpg");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Update name and avatar prefs


      await authService.updateName(name);
      await authService.updateUserPrefs({ avatar });

      const updatedUser = await authService.getCurrentUser();
      dispatch(login(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to update profile.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#0f172a] p-8 rounded-2xl shadow-xl w-full max-w-sm text-center space-y-6"
      >
        <h2 className="text-2xl font-bold">Your Profile</h2>

        <div className="flex justify-center">
          <AvatarPicker selected={avatar} onSelect={setAvatar} />
        </div>

        <div className="text-left">
          <label className="block mb-1 text-sm text-gray-300">Name</label>
          <Input
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            className="text-white bg-transparent border-gray-600"
          />
        </div>

        <Button
          onClick={handleSave}
          className="w-full"
          disabled={loading || !name.trim()}
        >
          {loading ? "Saving..." : "Save & Go to Dashboard"}
        </Button>

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full"
        >
          Logout
        </Button>
      </motion.div>
    </div>
  );
}
