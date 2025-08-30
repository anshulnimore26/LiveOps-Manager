import gsap from 'gsap';
import { CircleDot, MapIcon, Navigation2Icon, Route } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from './components/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/Card';
import { NavBar } from './components/NavBar';

export default function Home() {
  const mainRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const mapRef = useRef(null);
  const routesRef = useRef(null);
  const navRef = useRef(null);
  
  // Floating elements animation
  useEffect(() => {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element) => {
      // Random initial position
      const randomX = Math.random() * 100 - 50;
      const randomY = Math.random() * 100 - 50;
      
      gsap.set(element, {
        x: randomX,
        y: randomY,
      });
      
      // Create infinite floating animation
      gsap.to(element, {
        x: randomX + Math.random() * 100 - 50,
        y: randomY + Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: 10 + Math.random() * 10,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    });
    
    // Background pattern movement
    gsap.to(".background-pattern", {
      backgroundPosition: "200% 200%",
      duration: 20,
      ease: "none",
      repeat: -1,
    });
    
    return () => {
      gsap.killTweensOf(floatingElements);
      gsap.killTweensOf(".background-pattern");
    };
  }, []);

  const routes = [
    {
      id: 1,
      start: "Central Station",
      stop: "Business District",
      destination: "Tech Park",
      duration: "25 mins",
      status: "Active"
    },
    {
      id: 2,
      start: "Airport Terminal",
      stop: "Downtown",
      destination: "Convention Center",
      duration: "40 mins",
      status: "Scheduled"
    },
    {
      id: 3,
      start: "Shopping Mall",
      stop: "University",
      destination: "Sports Complex",
      duration: "35 mins",
      status: "Active"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create main timeline
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 1
        }
      });

      // Initial background fade in
      tl.from(".background-pattern", {
        opacity: 0,
        duration: 2,
      })
      .from(".floating-element", {
        opacity: 0,
        scale: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.out",
      }, "-=1.5")

      // Navbar animation with bounce
      .from(navRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=1")
      
      // Content animations
      .from(mainRef.current, {
        opacity: 0,
        duration: 0.8
      }, "-=0.4")
      .from(headingRef.current, {
        y: 50,
        opacity: 0,
        rotateX: -45,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.6")
      .from(subheadingRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      
      // Map container animation
      .from(mapRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        transformOrigin: "center center"
      }, "-=0.7")
      
      // Route elements animations
      .from(".route-card", {
        x: -50,
        opacity: 0,
        stagger: {
          each: 0.2,
          ease: "power3.out"
        },
        duration: 0.8,
      }, "-=0.9")
      .from(".route-line", {
        scaleX: 0,
        opacity: 0,
        stagger: {
          each: 0.1,
          from: "start",
          ease: "power2.inOut"
        },
        duration: 0.8,
        transformOrigin: "left center"
      }, "-=1")
      .from(".route-marker", {
        scale: 0,
        opacity: 0,
        stagger: {
          each: 0.15,
          from: "start",
          ease: "back.out(2)"
        },
        duration: 0.6,
      }, "-=0.8")
      
      // Auth buttons with bounce
      .from(".auth-button", {
        y: -20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Add continuous hover animation to route markers
      gsap.to(".route-marker", {
        y: "-=4",
        duration: 1.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.2,
          from: "random"
        }
      });

      // Add subtle pulse animation to route lines
      gsap.to(".route-line", {
        opacity: 0.7,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: "random"
        }
      });
    });

    // Cleanup
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="background-pattern absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%), linear-gradient(45deg, transparent 75%, currentColor 75%), linear-gradient(-45deg, transparent 75%, currentColor 75%)",
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px"
          }}
        />

        {/* Floating Elements */}
        <div className="floating-element absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500/5 blur-2xl" />
        <div className="floating-element absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-500/5 blur-2xl" />
        <div className="floating-element absolute bottom-1/4 left-1/3 w-36 h-36 rounded-full bg-cyan-500/5 blur-2xl" />
        <div className="floating-element absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-indigo-500/5 blur-2xl" />
        
        {/* Animated Grid Lines */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px"
          }}
        />

      </div>

      {/* Navigation */}
      <NavBar></NavBar>

      {/* Main Content */}
      <section
        ref={mainRef}
        className="min-h-screen w-full flex items-center justify-center text-white px-4 sm:px-6 lg:px-8 pt-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Header Content */}
          <div className="text-center mb-12">
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6"
            >
              Route Management System
            </h1>
            
            <p
              ref={subheadingRef}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8"
            >
              Plan, track, and optimize your routes in real-time. 
              Streamline operations with our intelligent mapping system.
            </p>
          </div>

          {/* Map and Routes Container */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Map Section */}
            <div ref={mapRef} className="lg:col-span-3 relative z-10">
              <Card className="bg-slate-800/80 border-slate-700/50 backdrop-blur-md shadow-xl">
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <MapIcon className="w-6 h-6 text-blue-400" />
                      Live Map View
                    </CardTitle>
                    <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">
                      <Navigation2Icon className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[4/3] w-full rounded-lg bg-gradient-to-tr from-slate-700/50 to-slate-600/50 p-4 backdrop-blur-sm border border-slate-600/50 shadow-xl">
                    <div className="h-full w-full rounded-md bg-gradient-to-tr from-slate-800/80 to-slate-700/80 flex items-center justify-center relative overflow-hidden">
                      {/* Map Grid Lines */}
                      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
                        {[...Array(48)].map((_, i) => (
                          <div key={i} className="border border-slate-600/20"></div>
                        ))}
                      </div>
                      
                      {/* Route Markers and Lines */}
                      <div className="absolute inset-0 p-4">
                        {/* Animated route lines will be added here */}
                        <div className="route-line absolute top-1/4 left-1/4 w-32 h-0.5 bg-blue-500/50 transform -rotate-12"></div>
                        <div className="route-line absolute top-1/2 left-1/3 w-40 h-0.5 bg-purple-500/50 transform rotate-45"></div>
                        <div className="route-line absolute bottom-1/3 right-1/4 w-36 h-0.5 bg-blue-400/50 transform -rotate-30"></div>
                        
                        {/* Route markers */}
                        <div className="route-marker absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                        <div className="route-marker absolute top-1/2 left-1/3 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                        <div className="route-marker absolute bottom-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                      </div>
                      
                      <MapIcon className="w-24 h-24 text-slate-600/20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Routes Section */}
            <div ref={routesRef} className="lg:col-span-2 space-y-4 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Active Routes</h3>
                <Button variant="gradient" size="sm" className="shadow-lg shadow-purple-500/25">
                  <Route className="w-4 h-4 mr-2" />
                  Plan Route
                </Button>
              </div>

              {routes.map((route) => (
                <Card 
                  key={route.id}
                  className="route-card bg-slate-800/80 border-slate-700/50 backdrop-blur-md shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800/90"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold flex items-center gap-2 text-white">
                        <CircleDot className="w-5 h-5 text-green-400" />
                        Route {route.id}
                      </CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                        route.status === "Active" ? "bg-green-500/30 text-green-300 shadow-green-500/20" : "bg-blue-500/30 text-blue-300 shadow-blue-500/20"
                      }`}>
                        {route.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300 font-medium min-w-[80px]">Start:</span>
                      <span className="text-white">{route.start}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300 font-medium min-w-[80px]">Stop:</span>
                      <span className="text-white">{route.stop}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300 font-medium min-w-[80px]">Destination:</span>
                      <span className="text-white">{route.destination}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-slate-300 font-medium min-w-[80px]">Duration:</span>
                      <span className="text-white font-medium">{route.duration}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3">
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/10">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}