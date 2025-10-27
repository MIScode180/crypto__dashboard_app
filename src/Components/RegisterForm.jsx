import { useState } from "react";
import { useRegisterUserMutation } from '../Api/authApi'
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser({ name, email, password });

    if (res.data) {
      dispatch(login(res.data));            // Set auth state
      navigate("/dashboard");               // Redirect
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 w-full max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <Input
        type="text"
        placeholder="Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <p className="text-red-500 text-sm">
          {error.message || "Registration failed."}
        </p>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
