import { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

export default function AuthModal({ isOpen, onClose, setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5000/api/auth/${isLogin ? "login" : "register"}`;
      const res = await axios.post(url, form);
      localStorage.setItem("token", res.data.token);
      setUser({
        ...res.data,
        stats: { applied: 0, hired: 0, interview: 0, rejected: 0 },
        image: "https://i.pravatar.cc/150?img=3",
      });
      onClose();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-80 p-6 relative animate-slide-down">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border w-full p-2 rounded mb-2"
          />
        )}

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border w-full p-2 rounded mb-2"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="border w-full p-2 rounded mb-2"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 text-white rounded-xl mb-2 hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-center text-gray-500 text-sm">
          {isLogin ? "No account?" : "Already have account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
