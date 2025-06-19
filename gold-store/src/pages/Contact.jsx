import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Button } from "../components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center text-amber-900 mb-12">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-amber-100">
          <h2 className="text-2xl font-semibold text-amber-800 mb-6">Send Us a Message</h2>
          <form className="space-y-5">
            <div>
              <label className="text-sm font-medium text-amber-700 block mb-1">Name</label>
              <Input type="text" placeholder="Your Name" required />
            </div>
            <div>
              <label className="text-sm font-medium text-amber-700 block mb-1">Email</label>
              <Input type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="text-sm font-medium text-amber-700 block mb-1">Message</label>
              <Textarea placeholder="How can we help you?" rows={5} required />
            </div>
            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
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
                Golden Store HQ, MG Road<br />
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
  )
}
