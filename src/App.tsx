import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  Eye,
  Users,
  Compass,
  Play,
  Download,
  Smartphone,
  Star,
  ArrowRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Send,
  Headphones,
  MinusCircle,
  Mic,
  Linkedin,
} from "lucide-react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaAppStore } from "react-icons/fa";
import ThreeGlobe from "./components/ThreeGlobe";
import { Toaster, toast } from "sonner";
import emailjs from "@emailjs/browser";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const headsetRef = useRef<HTMLDivElement>(null);
  const [globeRotation, setGlobeRotation] = useState({ x: 0, y: 0 });
  const [isGlobeRotating, setIsGlobeRotating] = useState(false);
  const globeRef = useRef<HTMLDivElement>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsRotating(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startRotationX = rotation.x;
    const startRotationY = rotation.y;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setRotation({
        x: startRotationX - deltaY * 0.5,
        y: startRotationY + deltaX * 0.5,
      });
    };

    const handleMouseUp = () => {
      setIsRotating(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    toast.success("Thank you for reaching out! We'll get back to you soon.");
    // send email
    emailjs.send("service_dwf473d", "template_uyrdvsd", {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    }, {
      publicKey: "6oQV3Ly9fjMvKwO-J"
    });
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsRotating(true);
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    const startRotationX = rotation.x;
    const startRotationY = rotation.y;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      setRotation({
        x: startRotationX - deltaY * 0.5,
        y: startRotationY + deltaX * 0.5,
      });
    };

    const handleTouchEnd = () => {
      setIsRotating(false);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleGlobeMouseDown = (e: React.MouseEvent) => {
    setIsGlobeRotating(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startRotationX = globeRotation.x;
    const startRotationY = globeRotation.y;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setGlobeRotation({
        x: startRotationX - deltaY * 0.5,
        y: startRotationY + deltaX * 0.5,
      });
    };

    const handleMouseUp = () => {
      setIsGlobeRotating(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "360° Immersive Experience",
      description:
        "Step into breathtaking cultural sites with our cutting-edge VR technology",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Audio Guide ",
      description:
        "Narrated audio guides provide rich historical context and fascinating stories",
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Podcast Library",
      description:
        "Curated podcasts offer deeper insights into the history and culture of each location",
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Head-Tracked Motion Control",
      description:
        "Navigate the virtual environment intuitively by simply moving your head",
    },
  ];

  const destinations = [
    {
      name: "Gateway of India",
      location: "Mumbai",
      image: "https://Inclusivision.b-cdn.net/Covers/Gateway.avif",
    },
    {
      name: "Taj Mahal",
      location: "Agra",
      image: "https://Inclusivision.b-cdn.net/Covers/Taj%20Mahal.avif",
    },
    {
      name: "Statue of Unity",
      location: "Gujarat",
      image: "https://Inclusivision.b-cdn.net/Covers/statue%20cover.jpg",
    },
  ];

  const partners = [
    {
      name: "Delhi Ministry of Education",
      logoUrl:
        "https://www.voiceofsap.org/wp-content/uploads/2023/07/Delhi-Government-.png",
    },
    {
      name: "Gurugram Directorate of Education",
      logoUrl:
        "https://haryanacmoffice.gov.in/sites/default/files/styles/initiative_inner_page/public/2020-10/1_HR_LOGO_3_22_53_2.jpg?itok=xnGQ4MES",
    },
    {
      name: "MapmyIndia",
      logoUrl: "https://www.mapmyindia.com/images/mapmyindia-og.png",
    },
    {
      name: "Teach for India",
      logoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJPgcvD8opNfKKEn_V3cSaLgyLn06VXtGJzw&s",
    },
    {
      name: "Amar Jyoti Charitable Trust",
      logoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD3JLg5osk7vxsfPLPoAnjgJqM0XaTkA1naA&s",
    },
    {
      name: "Peepul Foundation",
      logoUrl:
        "https://give.do/static/img/logos/KTX/93404643-8401-48b0-a490-a299381485b5.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-900 to-amber-950 text-white overflow-hidden font-[family-name:Space_Grotesk]">
      <Toaster />
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-amber-950/20 backdrop-blur-lg border-b border-orange-300/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden transform hover:scale-110 transition-transform duration-300">
                <img
                  src="/iOS.png"
                  alt="Inclusivision Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent font-[family-name:Space_Grotesk]">
                Inclusivision
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="font-display hover:text-orange-300 transition-colors"
              >
                Features
              </a>
              <a
                href="#destinations"
                className="font-display hover:text-orange-300 transition-colors"
              >
                Destinations
              </a>
              <a
                href="#about"
                className="font-display hover:text-orange-300 transition-colors"
              >
                About
              </a>
              <button
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                onClick={() =>
                  window.open("https://android.inclusivision.org/app")
                }
              >
                Download Now
              </button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-amber-950/90 backdrop-blur-lg border-t border-orange-300/10">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#features"
                className="block font-display hover:text-orange-300 transition-colors"
              >
                Features
              </a>
              <a
                href="#destinations"
                className="block font-display hover:text-orange-300 transition-colors"
              >
                Destinations
              </a>
              <a
                href="#about"
                className="block font-display hover:text-orange-300 transition-colors"
              >
                About
              </a>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-2 rounded-full transition-all duration-300">
                Download Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/50 to-amber-950/50"></div>
          <div className="absolute inset-0 opacity-30"></div>
          <div className="absolute inset-0 opacity-30 animate-custom-pulse bg-gradient-radial"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Firework Effects */}
          <div
            className="absolute top-20 left-20 w-8 h-8 animate-firework opacity-60"
            style={{ animationDelay: "0s" }}
          >
            <div className="w-full h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
            <div
              className="absolute top-0 left-0 w-2 h-2 bg-yellow-300 rounded-full animate-sparkle"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="absolute top-2 right-0 w-1 h-1 bg-orange-300 rounded-full animate-sparkle"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div
              className="absolute bottom-0 left-2 w-1 h-1 bg-red-300 rounded-full animate-sparkle"
              style={{ animationDelay: "0.6s" }}
            ></div>
          </div>

          <div
            className="absolute top-40 right-32 w-10 h-10 animate-burst opacity-50"
            style={{ animationDelay: "1s" }}
          >
            <div className="w-full h-full bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div>
            <div
              className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full animate-sparkle"
              style={{ animationDelay: "1.2s" }}
            ></div>
            <div
              className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-sparkle"
              style={{ animationDelay: "1.4s" }}
            ></div>
            <div
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-300 rounded-full animate-sparkle"
              style={{ animationDelay: "1.6s" }}
            ></div>
            <div
              className="absolute -bottom-1 -right-1 w-1 h-1 bg-pink-300 rounded-full animate-sparkle"
              style={{ animationDelay: "1.8s" }}
            ></div>
          </div>

          <div
            className="absolute bottom-40 left-32 w-6 h-6 animate-firework opacity-70"
            style={{ animationDelay: "2s" }}
          >
            <div className="w-full h-full bg-gradient-to-r from-orange-300 to-yellow-400 rounded-full"></div>
            <div
              className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full animate-sparkle"
              style={{ animationDelay: "2.2s" }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-2 h-2 bg-orange-200 rounded-full animate-sparkle"
              style={{ animationDelay: "2.4s" }}
            ></div>
          </div>

          <div
            className="absolute top-60 left-1/2 w-4 h-4 animate-burst opacity-80"
            style={{ animationDelay: "3s" }}
          >
            <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
            <div
              className="absolute -top-1 left-1/2 w-1 h-1 bg-white rounded-full animate-sparkle"
              style={{ animationDelay: "3.2s" }}
            ></div>
          </div>

          <div
            className="absolute bottom-60 right-20 w-12 h-12 animate-firework opacity-40"
            style={{ animationDelay: "4s" }}
          >
            <div className="w-full h-full bg-gradient-to-r from-pink-400 to-red-400 rounded-full"></div>
            <div
              className="absolute top-1 left-1 w-2 h-2 bg-yellow-300 rounded-full animate-sparkle"
              style={{ animationDelay: "4.2s" }}
            ></div>
            <div
              className="absolute top-1 right-1 w-1 h-1 bg-orange-300 rounded-full animate-sparkle"
              style={{ animationDelay: "4.4s" }}
            ></div>
            <div
              className="absolute bottom-1 left-3 w-1 h-1 bg-pink-300 rounded-full animate-sparkle"
              style={{ animationDelay: "4.6s" }}
            ></div>
            <div
              className="absolute bottom-1 right-3 w-2 h-2 bg-red-300 rounded-full animate-sparkle"
              style={{ animationDelay: "4.8s" }}
            ></div>
          </div>

          {/* Additional scattered sparkles */}
          <div
            className="absolute top-32 left-1/3 w-1 h-1 bg-white rounded-full animate-sparkle opacity-90"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-48 right-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-sparkle opacity-70"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-1 h-1 bg-orange-300 rounded-full animate-sparkle opacity-80"
            style={{ animationDelay: "2.5s" }}
          ></div>
          <div
            className="absolute bottom-48 right-1/3 w-1 h-1 bg-pink-300 rounded-full animate-sparkle opacity-60"
            style={{ animationDelay: "3.5s" }}
          ></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 bg-gradient-to-r from-orange-300 via-red-300 to-orange-400 bg-clip-text text-transparent animate-pulse animate-glow transform hover:scale-105 transition-transform duration-500">
              Inclusivision
            </h1>
            <p className="text-xl md:text-2xl font-sans text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the world's most magnificent cultural sites in stunning
              360° VR. Journey through ancient temples, majestic monuments, and
              hidden gems from the comfort of your device.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:animate-glow"
              onClick={() => toast.info("iOS App Coming Soon!")}
            >
              <span className="flex items-center justify-center">
                <FaAppStore className="w-7 h-7 mr-2 group-hover:animate-bounce" />
                Download for iOS
              </span>
            </button>
            <button
              className="group bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:animate-glow"
              onClick={() =>
                window.open("https://android.inclusivision.org/app")
              }
            >
              <span className="flex items-center justify-center">
                <IoLogoGooglePlaystore className="w-7 h-7 mr-2 group-hover:animate-bounce" />
                Download for Android
              </span>
            </button>
          </div>

          {/* Interactive VR Headset */}
          <div className="relative pb-16">
            <div className="w-full max-w-4xl mx-auto aspect-video bg-gradient-to-br from-orange-800/30 to-red-800/30 rounded-3xl border border-orange-300/20 backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* VR Headset 3D Model */}
                  <div
                    ref={headsetRef}
                    className={`w-80 h-48 cursor-grab ${
                      isRotating ? "cursor-grabbing" : ""
                    } select-none touch-none`}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    style={{
                      transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Main Headset Body */}
                    <div
                      className="relative w-full h-full"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Front Face */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-3xl border-2 border-orange-400/40 shadow-2xl"
                        style={{
                          transform: "translateZ(40px)",
                          boxShadow:
                            "0 20px 40px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.1)",
                        }}
                      >
                        {/* Lenses */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-12">
                          <div
                            className="w-16 h-16 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-full border-3 border-orange-300/60 shadow-inner relative"
                            style={{
                              boxShadow:
                                "inset 0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(59, 130, 246, 0.5)",
                              transform: "translateZ(8px)",
                            }}
                          >
                            <div className="absolute inset-2 bg-gradient-to-br from-blue-300 to-blue-600 rounded-full opacity-80"></div>
                            <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 rounded-full blur-sm"></div>
                          </div>
                          <div
                            className="w-16 h-16 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-full border-3 border-orange-300/60 shadow-inner relative"
                            style={{
                              boxShadow:
                                "inset 0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(59, 130, 246, 0.5)",
                              transform: "translateZ(8px)",
                            }}
                          >
                            <div className="absolute inset-2 bg-gradient-to-br from-blue-300 to-blue-600 rounded-full opacity-80"></div>
                            <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 rounded-full blur-sm"></div>
                          </div>
                        </div>

                        {/* Nose Bridge */}
                        <div
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-full"
                          style={{
                            transform:
                              "translateX(-50%) translateY(-50%) translateZ(12px)",
                          }}
                        ></div>

                        {/* Brand Logo */}
                        <div
                          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
                          style={{
                            transform: "translateX(-50%) translateZ(4px)",
                          }}
                        >
                          <div className="w-8 h-8 rounded-xl overflow-hidden shadow-lg">
                            <img
                              src="/iOS.png"
                              alt="Inclusivision Logo"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>

                        {/* Ventilation Grilles */}
                        <div className="absolute top-4 left-8 right-8 flex justify-between">
                          <div className="w-12 h-1 bg-gray-600 rounded-full opacity-60"></div>
                          <div className="w-12 h-1 bg-gray-600 rounded-full opacity-60"></div>
                        </div>
                      </div>

                      {/* Left Side Face */}
                      <div
                        className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-700 via-gray-750 to-gray-800 rounded-l-3xl border-l-2 border-orange-400/30"
                        style={{
                          transform: "rotateY(-90deg) translateZ(40px)",
                          boxShadow: "inset 2px 0 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        {/* Side Adjustment Dial */}
                        <div
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full border border-orange-300/40"
                          style={{
                            transform:
                              "translateX(-50%) translateY(-50%) translateZ(4px)",
                          }}
                        >
                          <div className="absolute inset-1 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full"></div>
                        </div>
                      </div>

                      {/* Right Side Face */}
                      <div
                        className="absolute top-0 right-[-40px] w-20 h-full bg-gradient-to-l from-gray-700 via-gray-750 to-gray-800 border-r-2 border-orange-400/30"
                        style={{
                          transform:
                            "rotateY(90deg) translateZ(40px) translateX(-40px)",
                          transformOrigin: "left center",
                          borderTopRightRadius: "1.5rem",
                          borderBottomRightRadius: "1.5rem",
                          boxShadow: "inset -2px 0 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        {/* Side Adjustment Dial */}
                        <div
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full border border-orange-300/40"
                          style={{
                            transform:
                              "translateX(-50%) translateY(-50%) translateZ(4px)",
                          }}
                        >
                          <div className="absolute inset-1 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full"></div>
                        </div>
                      </div>

                      {/* Top Face */}
                      <div
                        className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-600 via-gray-650 to-gray-700 rounded-t-3xl border-t-2 border-orange-400/30"
                        style={{
                          transform: "rotateX(90deg) translateZ(40px)",
                          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        {/* Top Vent */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-2 bg-gray-800 rounded-full opacity-60"></div>
                      </div>

                      {/* Head Straps */}
                      <div
                        className="absolute top-1/2 -left-8 w-16 h-8 bg-gradient-to-r from-gray-600 via-gray-650 to-gray-700 rounded-full transform -translate-y-1/2 border border-orange-300/30"
                        style={{
                          transform:
                            "rotateY(-30deg) translateZ(20px) translateY(-50%)",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                      ></div>
                      <div
                        className="absolute top-1/2 -right-8 w-16 h-8 bg-gradient-to-l from-gray-600 via-gray-650 to-gray-700 rounded-full transform -translate-y-1/2 border border-orange-300/30"
                        style={{
                          transform:
                            "rotateY(30deg) translateZ(20px) translateY(-50%)",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Interaction Hint */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                    <p className="text-orange-200 text-sm animate-pulse">
                      <span className="hidden md:inline">Click and drag</span>
                      <span className="md:hidden">Touch and drag</span> to
                      rotate the VR headset
                    </p>
                  </div>
                </div>
              </div>

              {/* Play Button Overlay */}
              {/* <div className="absolute top-4 right-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div> */}

              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-orange-100 text-sm">
                  Experience our VR preview
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
              Revolutionary VR Experience
            </h2>
            <p className="text-xl font-sans text-orange-100 max-w-3xl mx-auto">
              Cutting-edge technology meets cultural heritage to create
              unforgettable virtual journeys
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-orange-950/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-300/10 hover:bg-orange-950/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-tilt hover:animate-glow"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 animate-float group-hover:animate-rotate3d">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="font-sans text-orange-200 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
              Explore Ancient Wonders
            </h2>
            <p className="text-xl font-sans text-orange-100 max-w-3xl mx-auto">
              Travel through time and space to witness humanity's greatest
              architectural achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="group relative bg-orange-950/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-orange-300/10 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-tilt hover:animate-glow"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    {destination.name}
                  </h3>
                  <p className="font-sans text-orange-200 mb-4">
                    {destination.location}
                  </p>
                  <button
                    className="flex items-center text-orange-300 hover:text-orange-200 transition-colors"
                    onClick={() =>
                      window.open("https://android.inclusivision.org/app")
                    }
                  >
                    <span className="font-sans mr-2">Explore in VR</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                The Future of Cultural Exploration
              </h2>
              <p className="text-xl font-sans text-orange-100 mb-6 leading-relaxed">
                Inclusivision breaks down barriers to cultural exploration,
                making the world's most precious heritage sites accessible to
                everyone, regardless of physical limitations or geographical
                constraints.
              </p>
              <p className="text-lg font-sans text-orange-200 mb-8 leading-relaxed">
                Inclusivision has scaled to 700 schools and 37 NGOs across
                India, delivering immersive heritage experiences to communities
                that otherwise lack access. To date, it has impacted 10,000+
                specially abled students and nearly 100,000 students overall
                through low-cost, classroom-ready VR.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-sans text-white font-semibold">
                    4.6
                  </span>
                </div>
                <span className="text-orange-300">|</span>
                <span className="font-sans text-orange-200">
                  10,000+ Downloads
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-orange-800/30 to-red-800/30 rounded-3xl border border-orange-300/20 backdrop-blur-sm overflow-hidden shadow-2xl animate-float animate-glow">
                <ThreeGlobe className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
              Trusted by Leading Organizations
            </h2>
            <p className="text-lg font-sans text-orange-100 max-w-2xl mx-auto">
              Partnering with world-renowned institutions to preserve and share
              cultural heritage
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex flex-col items-center group transform hover:scale-110 transition-all duration-300"
              >
                <div className="mb-3 w-16 h-16 rounded-lg overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm border border-orange-300/20 flex items-center justify-center p-2">
                  <img
                    src={partner.logoUrl}
                    alt={`${partner.name} logo`}
                    className="w-full h-full object-contain filter brightness-110"
                  />
                </div>
                <span className="text-sm font-sans text-orange-200 text-center">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl font-sans text-orange-100 max-w-3xl mx-auto">
              Watch our tutorial to see how easy it is to explore the world's
              cultural heritage in VR
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-orange-950/20 backdrop-blur-sm rounded-3xl p-8 border border-orange-300/10 shadow-2xl animate-tilt hover:animate-glow transition-all duration-500">
              <div className="aspect-video rounded-2xl overflow-hidden bg-black/50">
                <iframe
                  className="w-full h-full"
                  src="https://youtube.com/embed/gDSKNRfx4G8"
                  title="Inclusivision VR Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  Getting Started with Inclusivision
                </h3>
                <p className="font-sans text-orange-200">
                  Learn how to navigate, interact, and make the most of your
                  virtual cultural journeys
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder & Team Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Founder Section */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
              Meet Our Founder
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="bg-orange-950/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-orange-300/10 shadow-2xl animate-float hover:animate-glow transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                      Neil Chaudhary
                    </h3>
                    <p className="text-xl font-sans text-orange-300 mb-6 font-semibold">
                      Founder
                    </p>
                    <div className="space-y-4 text-orange-100 font-sans leading-relaxed"></div>
                    <div className="mt-8 flex items-center justify-center space-x-6">
                      <a
                        href="https://www.linkedin.com/in/neil-chaudhary1107/"
                        className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        <span className="mr-2">LinkedIn</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <a
                        href="mailto:neil.c1107@gmail.com"
                        className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="mr-2">Email</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <div className="relative">
                      <div className="w-[280px] h-[280px] mx-auto rounded-full overflow-hidden border-4 border-orange-400/40 shadow-2xl animate-glow hover:animate-rotate3d transition-all duration-500">
                        <img
                          src="/Profile Image.png"
                          alt="Neil Chaudhary"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl animate-float">
                        <img
                          src="/iOS.png"
                          alt="Inclusivision Logo"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-xl font-sans text-orange-100 max-w-2xl mx-auto">
              Ready to bring cultural heritage to your organization? Let's
              discuss how Inclusivision can help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white mb-2">
                    Email Us
                  </h3>
                  <p className="font-sans text-orange-200">
                    Inclusivision.app@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white mb-2">
                    Call Us
                  </h3>
                  <p className="font-sans text-orange-200">+91 9711449888</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-950/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-300/10">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-sans text-orange-200 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-orange-950/30 border border-orange-300/20 rounded-lg text-white placeholder-orange-300/50 focus:outline-none focus:border-orange-400 transition-colors"
                    placeholder="Your name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-sans text-orange-200 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-orange-950/30 border border-orange-300/20 rounded-lg text-white placeholder-orange-300/50 focus:outline-none focus:border-orange-400 transition-colors"
                    placeholder="your@email.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block font-sans text-orange-200 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-orange-950/30 border border-orange-300/20 rounded-lg text-white placeholder-orange-300/50 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                    placeholder="Tell us about your institution..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  onClick={e => handleContactSubmit(e)}
                >
                  <span className="mr-2">Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-orange-300/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img
                  src="/iOS.png"
                  alt="Inclusivision Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent font-[family-name:Space_Grotesk]">
                Inclusivision
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="font-sans text-orange-200 hover:text-orange-300 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="font-sans text-orange-200 hover:text-orange-300 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="font-sans text-orange-200 hover:text-orange-300 transition-colors"
              >
                Support
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-orange-300/10 text-center">
            <p className="font-sans text-orange-300">
              © 2025 Inclusivision. All rights reserved. Making cultural
              heritage accessible to everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
