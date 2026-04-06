import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UltraNeonMinimalist = () => {
  const navigate = useNavigate();
  
  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Functional States
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null); 
  const [distance, setDistance] = useState(0);

  const [currentRide, setCurrentRide] = useState(null);

  const BACKEND_IP = "192.168.1.11"; 

  const theme = {
    bg: '#050505',
    card: 'rgba(255, 255, 255, 0.02)',
    teal: '#00f2ff',
    tealGlow: '0 0 15px rgba(0, 242, 255, 0.6)',
    border: 'rgba(0, 242, 255, 0.15)',
    text: '#ffffff',
    textMuted: '#6b7a7a',
    danger: '#ff4d4d'
  };

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.getItem('user');
    const savedRide = localStorage.getItem('currentRide'); 

    if (status === 'true') {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }

    if (savedRide) {
      setCurrentRide(JSON.parse(savedRide)); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); 
    setIsLoggedIn(false);
    setUser(null);
    setCurrentRide(null);
    alert("You have been signed out.");
    navigate('/signin');
  };

  const checkAuthAndRun = (action) => {
    if (!isLoggedIn) {
      alert("⚠️ Please Sign In to access this feature!");
      navigate('/signin');
    } else {
      action();
    }
  };

  const tnDistricts = ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"];

  const handleInputChange = (e, type) => {
    const val = e.target.value;
    if (type === 'pickup') setPickup(val);
    else setDestination(val);

    if (val.length > 0) {
      const filtered = tnDistricts.filter(city => city.toLowerCase().startsWith(val.toLowerCase()));
      setSuggestions(filtered);
      setActiveInput(type);
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const isPickupValid = tnDistricts.some(city => city.toLowerCase() === pickup.toLowerCase());
    const isDestValid = tnDistricts.some(city => city.toLowerCase() === destination.toLowerCase());

    if (isPickupValid && isDestValid && pickup.toLowerCase() !== destination.toLowerCase()) {
      const realDist = Math.floor(Math.random() * 400) + 100; 
      setDistance(realDist);
      const fare = 50 + (realDist * 15);
      setEstimatedFare(fare);
    } else {
      setEstimatedFare(0);
      setDistance(0);
    }
  }, [pickup, destination]);

  const handleFindRide = async () => {
    const isPickupValid = tnDistricts.some(city => city.toLowerCase() === pickup.toLowerCase());
    const isDestValid = tnDistricts.some(city => city.toLowerCase() === destination.toLowerCase());

    if (!isPickupValid || !isDestValid) {
      alert("⚠️ Please enter a correct city name!");
      return;
    }

    try {
      const availableDrivers = [
        { name: "Ramesh Kumar", phone: "9876543210", vehicle: "Tesla Model S", plate: "TN 72 AB 1234" },
        { name: "Vijay", phone: "9988776655", vehicle: "Audi e-tron", plate: "TN 01 XY 7777" },
        { name: "Arun", phone: "8877665544", vehicle: "BMW iX", plate: "TN 37 B 9999" }
      ];
      
      const selectedDriver = availableDrivers.find(d => d.name === "Ramesh Kumar");
      const fareStr = `₹${estimatedFare}`;
      
      const driverData = {
        driverName: selectedDriver.name,
        driverPhone: selectedDriver.phone,
        vehicle: selectedDriver.vehicle,
        plate: selectedDriver.plate,
        fare: estimatedFare,
        distance: distance,
        pickup: pickup,      
        destination: destination, 
        eta: "5 MINS",
        status: 'Not Paid'
      };

      const response = await fetch(`http://${BACKEND_IP}:8000/api/create-ride/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_mobile: user?.mobile,
          driver_name: driverData.driverName,
          pickup_location: pickup,      
          destination_location: destination, 
          amount: fareStr,
          status: 'Not Paid' 
        }),
      });

      if (response.ok) {
        setShowLocationModal(false);
        setCurrentRide(driverData);
        localStorage.setItem('currentRide', JSON.stringify(driverData));
        navigate('/active-rides', { state: driverData });
      } else {
        alert("Failed to initiate ride.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
    }
  };

  const icons = {
    dashboard: "M3 9L12 3L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z",
    history: "M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",
    profile: "M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z",
    safety: "M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z",
    chat: "M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z",
    support: "M9.09 9C9.3251 8.27242 9.79221 7.64969 10.4107 7.2343C11.0291 6.81891 11.7651 6.6346 12.5 6.71186C13.2349 6.78911 13.9298 7.1234 14.4719 7.66257C15.0141 8.20173 15.3735 8.9142 15.495 9.68093C15.6166 10.4477 15.4925 11.2251 15.1432 11.8856C14.7939 12.5461 14.2407 13.0504 13.57 13.315C13.0645 13.515 12.8 13.8 12.8 14.3V15M12 18H12.01",
    settings: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
  };

  const LineIcon = ({ d, size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={theme.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(${theme.tealGlow})` }}>
      <path d={d} />
    </svg>
  );

  return (
    <div style={{ display: 'flex', backgroundColor: theme.bg, height: '100vh', width: '100vw', overflow: 'hidden', color: theme.text, position: 'fixed', top: 0, left: 0 }}>
      
      {showLocationModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(10px)' }}>
          <div style={{ width: '420px', padding: '40px', background: 'linear-gradient(165deg, #0a1a1a 0%, #050505 100%)', borderRadius: '30px', border: `1px solid ${theme.border}`, boxShadow: theme.tealGlow }}>
            <h2 style={{ color: theme.teal, marginBottom: '25px', textAlign: 'center', letterSpacing: '1px' }}>ENTER TRIP DETAILS</h2>
            
            <div style={{ marginBottom: '20px', position: 'relative' }}>
              <label style={{ fontSize: '11px', color: theme.textMuted, display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>PICKUP LOCATION</label>
              <input type="text" placeholder="Where from?" value={pickup} onChange={(e) => handleInputChange(e, 'pickup')}
                style={{ width: '100%', padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${theme.border}`, color: '#fff', outline: 'none' }} 
              />
              {activeInput === 'pickup' && suggestions.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#111', border: `1px solid ${theme.border}`, borderRadius: '10px', zIndex: 10, marginTop: '5px', maxHeight: '150px', overflowY: 'auto' }}>
                  {suggestions.map(s => <div key={s} onClick={() => { setPickup(s); setSuggestions([]); }} style={{ padding: '10px', cursor: 'pointer', color: theme.teal }}>{s}</div>)}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '25px', position: 'relative' }}>
              <label style={{ fontSize: '11px', color: theme.textMuted, display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>DESTINATION</label>
              <input type="text" placeholder="Where to?" value={destination} onChange={(e) => handleInputChange(e, 'destination')}
                style={{ width: '100%', padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${theme.border}`, color: '#fff', outline: 'none' }} 
              />
              {activeInput === 'destination' && suggestions.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#111', border: `1px solid ${theme.border}`, borderRadius: '10px', zIndex: 10, marginTop: '5px', maxHeight: '150px', overflowY: 'auto' }}>
                  {suggestions.map(s => <div key={s} onClick={() => { setDestination(s); setSuggestions([]); }} style={{ padding: '10px', cursor: 'pointer', color: theme.teal }}>{s}</div>)}
                </div>
              )}
            </div>

            {estimatedFare > 0 && (
              <div style={{ background: 'rgba(0, 242, 255, 0.08)', padding: '20px', borderRadius: '18px', border: `1px dashed ${theme.teal}`, marginBottom: '30px', textAlign: 'center' }}>
                <span style={{ color: theme.textMuted, fontSize: '12px', letterSpacing: '1px' }}>DISTANCE: {distance} KM</span>
                <h2 style={{ color: theme.teal, fontSize: '32px', margin: '5px 0', textShadow: theme.tealGlow }}>₹{estimatedFare.toLocaleString()}.00</h2>
              </div>
            )}

            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={() => setShowLocationModal(false)} style={{ flex: 1, padding: '15px', borderRadius: '12px', background: 'transparent', color: '#fff', border: `1px solid ${theme.border}`, cursor: 'pointer', fontWeight: 'bold' }}>CANCEL</button>
              <button onClick={handleFindRide}
                style={{ flex: 1, padding: '15px', borderRadius: '12px', background: theme.teal, color: '#000', border: 'none', cursor: 'pointer', fontWeight: '900', boxShadow: theme.tealGlow }}>
                FIND RIDE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEFT NAVIGATION BAR */}
      <aside style={{ width: '260px', borderRight: `1px solid ${theme.border}`, padding: '40px 20px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '22px', fontWeight: '900', marginBottom: '50px', color: theme.teal }}>⚡ SECURE.RIDE</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <div onClick={() => navigate('/')} style={{ padding: '14px 20px', borderRadius: '12px', cursor: 'pointer', backgroundColor: 'rgba(0, 242, 255, 0.1)', color: theme.teal, display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '700' }}>
            <LineIcon d={icons.dashboard} size={20} /> Dashboard
          </div>
          <div onClick={() => checkAuthAndRun(() => navigate('/profile'))} style={{ padding: '14px 20px', borderRadius: '12px', cursor: 'pointer', color: theme.textMuted, display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '700' }}>
            <LineIcon d={icons.profile} size={20} /> Profile
          </div>
          {/* ✅ SETTINGS SYMBOL IN LEFT NAV */}
          <div onClick={() => checkAuthAndRun(() => navigate('/settings'))} style={{ padding: '14px 20px', borderRadius: '12px', cursor: 'pointer', color: theme.textMuted, display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '700' }}>
            <LineIcon d={icons.settings} size={20} /> Settings
          </div>
        </nav>
        <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '20px' }}>
          {isLoggedIn ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: theme.teal, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>{user?.name?.charAt(0) || 'U'}</div>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{user?.name || 'User'}</span>
              </div>
              <button onClick={handleLogout} style={{ width: '100%', padding: '12px', borderRadius: '10px', background: 'transparent', border: `1px solid ${theme.danger}`, color: theme.danger, fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>SIGN OUT</button>
            </div>
          ) : (
            <button onClick={() => navigate('/signin')} style={{ width: '100%', padding: '12px', borderRadius: '10px', background: theme.teal, border: 'none', color: '#000', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>SIGN IN</button>
          )}
        </div>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '25px 40px' }}>
        <section style={{ background: 'linear-gradient(165deg, #0a1a1a 0%, #050505 100%)', padding: '45px', borderRadius: '35px', border: `1px solid ${theme.border}`, marginBottom: '25px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '46px', fontWeight: '900', margin: '0 0 10px 0' }}>Secure Ride <span style={{ color: theme.teal }}>App</span></h1>
            <p style={{ color: theme.textMuted, marginBottom: '30px' }}>Ready for a ride? Your safety is our priority.</p>
            <button onClick={() => checkAuthAndRun(() => setShowLocationModal(true))} style={{ backgroundColor: theme.teal, color: '#000', border: 'none', padding: '16px 45px', borderRadius: '14px', fontWeight: '900', cursor: 'pointer', boxShadow: theme.tealGlow }}>BOOK YOUR RIDE ❯</button>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', flex: 1 }}>
          {[
            { t: "History", i: icons.history, d: "Past activities", path: "/history" },
            { t: "Safety", i: icons.safety, d: "Encrypted hub", path: "/safety" },
            { t: "Chat", i: icons.chat, d: "Live messenger", path: "/chat" },
            { t: "Support", i: icons.support, d: "Help center", path: "/support" }
          ].map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => checkAuthAndRun(() => {
                if(item.t === "Chat") {
                  const freshRide = JSON.parse(localStorage.getItem('currentRide'));
                  navigate(item.path, { 
                    state: { 
                      driver: freshRide ? { 
                        driverName: freshRide.driverName, 
                        driverPhone: freshRide.driverPhone 
                      } : { 
                        driverName: "No Active Ride", 
                        driverPhone: "-" 
                      } 
                    } 
                  });
                } else {
                  navigate(item.path);
                }
              })} 
              style={{ padding: '20px', borderRadius: '28px', backgroundColor: theme.card, border: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '15px', backgroundColor: 'rgba(0, 242, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', border: `1px solid ${theme.border}` }}>
                <LineIcon d={item.i} />
              </div>
              <div style={{ fontWeight: '800', fontSize: '17px' }}>{item.t}</div>
              <div style={{ color: theme.textMuted, fontSize: '12px' }}>{item.d}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UltraNeonMinimalist;