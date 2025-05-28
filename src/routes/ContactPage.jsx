import React, { useState } from 'react';
import { Send, MessageSquare, Mail, MapPin, Phone, Home, Clock, Shield, Award } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: 'Hello, I have an inquiry regarding the property.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // WhatsApp link and email subject for auto-fill
  const whatsappLink = `https://wa.me/+9710585495683?text=${encodeURIComponent(
    `Name: ${formData.name || '[Your name]'}\nEmail: ${formData.email || '[Your email]'}\nPhone: ${formData.phone || '[Your phone]'}\nProperty Type: ${formData.propertyType || '[Not specified]'}\n\n${formData.message}`
  )}`;
  
  const emailLink = `mailto:owner@empirekeyproperties.com?subject=Property Inquiry - ${formData.propertyType || 'New Property'}&body=${encodeURIComponent(
    `Name: ${formData.name || '[Your name]'}\nEmail: ${formData.email || '[Your email]'}\nPhone: ${formData.phone || '[Your phone]'}\nProperty Type: ${formData.propertyType || '[Not specified]'}\n\n${formData.message}`
  )}`;

  // Office address details
  const officeAddress = "Office No. 01B-203, Malik Yousuf Building, Near Yousuf Bakery, Al Murar – Dubai, UAE";
  const encodedAddress = encodeURIComponent(officeAddress);
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.4375069328356!2d55.30128731501212!3d25.26935708386633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c883%3A0xb8bad3d0ba853dd6!2sAl%20Murar%2C%20Dubai%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1649597308962!5m2!1sen!2sin`;

  return (
    <div className="bg-gradient-to-b mt-20 from-gray-50 to-gray-100 text-gray-900 min-h-screen">
      {/* Hero Banner with Image */}
      <div className="mt-20 h-[100vh] relative overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/a1.avif" 
            alt="Luxury Real Estate" 
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-blue-950/40"></div>
        </div>
      
        <div className="relative z-20 max-w-6xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Let's Connect
          </h1>
          <p className="text-xl text-white/90 max-w-2xl drop-shadow-md">
            Discover your dream property with our expert guidance and personalized service
          </p>
          <div className="mt-8 flex space-x-4">
            <a href="#contact-form" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Contact Now
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Why Choose Us Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Real Estate Services?</h2>
            <div className="h-1 w-24 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Home size={24} />,
                title: "Exclusive Properties",
                description: "Access to premium listings not available elsewhere",
                color: "bg-blue-600"
              },
              {
                icon: <Clock size={24} />,
                title: "Fast Response",
                description: "Quick replies and property viewing arrangements",
                color: "bg-yellow-500"
              },
              {
                icon: <Shield size={24} />,
                title: "Trusted Experts",
                description: "Licensed professionals with years of experience",
                color: "bg-green-600"
              },
              {
                icon: <Award size={24} />,
                title: "Top Rated",
                description: "Award-winning service with 5-star reviews",
                color: "bg-purple-600"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="p-6 flex flex-col items-center text-center">
                  <div className={`${item.color} p-3 rounded-full text-white mb-4 w-14 h-14 flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {[
            { icon: <Phone size={24} />, title: "Call Us", content: "+971 0585495683", color: "from-blue-500 to-blue-700" },
            { icon: <Mail size={24} />, title: "Email Us", content: " owner@empirekeyproperties.com", color: "from-yellow-500 to-yellow-600" },
            { icon: <MapPin size={24} />, title: "Visit Our Office", content: officeAddress, color: "from-blue-600 to-blue-800" }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
              <div className="p-6">
                <div className="inline-block p-3 rounded-full bg-gray-100 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div id="contact-form" className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-xl overflow-hidden border-t-4 border-yellow-500">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="text-blue-700" size={28} />
                <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
                    >
                      <option value="">Select Property Type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Villa">Villa</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition duration-300 shadow-md"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.436-9.884 9.896-9.884 2.645 0 5.13 1.03 7.001 2.91 1.87 1.88 2.9 4.374 2.895 7.03-.005 5.446-4.431 9.885-9.877 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.098 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.9.001-3.18-1.237-6.165-3.48-8.411" />
                    </svg>
                    WhatsApp Us
                  </a>
                  <a 
                    href={emailLink}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg transition duration-300 shadow-md"
                  >
                    <Mail className="w-5 h-5" />
                    Email Us
                  </a>
                </div>
              </form>
            </div>
          </div>

          {/* Testimonials */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden h-full">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.5 3.75a.75.75 0 0 0-.75.75v.75h16.5v-.75a.75.75 0 0 0-.75-.75H4.5ZM3 6h18v12a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 18V6Zm5.03 3.97a.75.75 0 0 1 0 1.06L6.31 12.75l1.72 1.72a.75.75 0 1 1-1.06 1.06l-2.25-2.25a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0Zm2.63-.22a.75.75 0 0 0-.2 1.48l4.5.75a.75.75 0 1 0 .25-1.48l-4.5-.75a.75.75 0 0 0-.05 0Z" />
                  </svg>
                  Client Testimonials
                </h2>
                
                <div className="space-y-8">
                  {[
                    {
                      name: "Sarah Johnson",
                      role: "Homeowner",
                      image: "/images/Z1.jpg",
                      quote: "Working with this real estate team was an absolute pleasure. They found us our dream home within our budget and made the entire process seamless.",
                      rating: 5
                    },
                    {
                      name: "Michael Rodriguez",
                      role: "Property Investor",
                      image: "/images/Z3.jpg",
                      quote: "As an investor, I needed a team that understood market trends. Their expertise helped me find properties with excellent ROI potential.",
                      rating: 5
                    },
                    {
                      name: "Priya Sharma",
                      role: "First-time Buyer",
                      image: "/images/Z2.webp", 
                      quote: "Being a first-time buyer, I had countless questions. Their patience and guidance throughout the process made buying my first home a joy rather than a stress.",
                      rating: 5
                    }
                  ].map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic mb-3">"{testimonial.quote}"</p>
                      <div className="flex">
                        {Array(testimonial.rating).fill(0).map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Map */}
        <div className="mt-16 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Our Location</h2>
            <div className="h-1 w-16 bg-yellow-500 mx-auto mt-2 rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Visit our office for a face-to-face consultation
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-lg overflow-hidden">
            {/* Google Maps Iframe Embed */}
            <div className="rounded-lg overflow-hidden">
              <iframe 
                src={googleMapsEmbedUrl}
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
                className="w-full"
              ></iframe>
            </div>
            <div className="p-6 bg-gray-50 rounded-b-lg">
              <div className="flex items-center">
                <MapPin className="text-red-500 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">{officeAddress}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="bg-white shadow-sm rounded-lg p-4 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Clock size={20} className="text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Office Hours</p>
                    <p className="font-medium">Mon-Sat: 8am-9pm</p>
                  </div>
                </div>
                <div className="bg-white shadow-sm rounded-lg p-4 flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Phone size={20} className="text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium">+971 0585495683</p>
                  </div>
                </div>
              </div>
              {/* Additional Action Buttons for Map */}
              <div className="mt-6 flex flex-wrap gap-4">
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Get Directions
                </a>
                <button
                  onClick={() => {navigator.clipboard.writeText(officeAddress)}}
                  className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Address
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="h-1 w-16 bg-yellow-500 mx-auto mt-2 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "How do I schedule a property viewing?", a: "Contact us through WhatsApp, email, or fill out the form above to schedule a viewing at your convenience." },
              { q: "What documents do I need for property purchase?", a: "Typically you'll need ID proof, address proof, PAN card, and income documents. We'll guide you through the specific requirements." },
              { q: "Do you handle rental properties?", a: "Yes, we offer a wide range of rental properties along with comprehensive rental agreement services." },
              { q: "What areas do you cover?", a: "We currently cover major metropolitan areas and surrounding suburbs. Contact us for specific location inquiries." }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative bg-blue-900 text-white py-16">
        <div className="absolute inset-0 opacity-20">
          {/* <img 
            src=`/api/placeholder/1920/600` 
            alt="Real Estate Background" 
            className="w-full h-full object-cover"
          /> */}
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto mb-8">
            Our team of experts is ready to help you find the perfect property that suits your needs and budget.
          </p>
          <div className="flex justify-center">
            <a href="#contact-form" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl">
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;