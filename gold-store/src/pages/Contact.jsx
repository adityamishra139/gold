import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { axiosInstance } from "../../axios";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms";

export default function Contact() {
  const [user, setUser] = useRecoilState(userState);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  // Fetch user if not already fetched
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/user/me");
        if (res.data.success) {
          const { email, firstName, lastName } = res.data.user;
          setUser({
            email,
            fname: firstName,
            lname: lastName
          });
          setFormData((prev) => ({
            ...prev,
            name: `${firstName} ${lastName}`,
            email
          }));
        }
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
      }
    };

    if (!user?.email) fetchUser();
    else {
      setFormData((prev) => ({
        ...prev,
        name: `${user.fname} ${user.lname}`,
        email: user.email
      }));
    }
  }, [user, setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("Sending...");
  try {
    const res = await axiosInstance.post("/api/user/query", {
      name: formData.name,
      email: formData.email,
      query: formData.message,
    });

    if (res.data.success) {
      setStatus("✅ Message sent successfully!");
      setFormData({
        name: user.fname + " " + user.lname,
        email: user.email,
        message: "",
      });
    } else {
      setStatus("❌ Failed to send message.");
    }
  } catch (err) {
    console.error("Error sending query:", err);
    setStatus("⚠️ Something went wrong. Try again.");
  }
};


  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center text-amber-900 mb-12">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-amber-100">
          <h2 className="text-2xl font-semibold text-amber-800 mb-6">
            Send Us a Message
          </h2>

          {status && (
            <p className="mb-4 text-sm text-center text-amber-700 font-medium">{status}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-amber-700 block mb-1">
                Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-amber-700 block mb-1">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-amber-700 block mb-1">
                Message
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={5}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col justify-center space-y-6 text-amber-800">
          <div className="flex items-start gap-4">
            <Mail className="h-6 w-6 text-amber-600" />
            <div>
              <h4 className="text-lg font-medium">Email</h4>
              <p className="text-gray-700">support@goldenstore.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="h-6 w-6 text-amber-600" />
            <div>
              <h4 className="text-lg font-medium">Phone</h4>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-amber-600" />
            <div>
              <h4 className="text-lg font-medium">Address</h4>
              <p className="text-gray-700">
                Golden Store HQ, MG Road
                <br />
                Bengaluru, Karnataka – 560001
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h4 className="text-lg font-medium mb-2">Business Hours</h4>
            <p className="text-gray-700">Mon - Sat: 10:00 AM – 8:00 PM</p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
