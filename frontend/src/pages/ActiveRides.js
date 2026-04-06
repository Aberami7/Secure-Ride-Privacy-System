import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ActiveRides = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const BACKEND_IP = "192.168.1.11"; 

  const tripDetails = location.state || { fare: 50, pickup: 'Not Set', destination: 'Not Set', distance: 0 };
  
  const [isCalling, setIsCalling] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null); 
  const [activeDriver, setActiveDriver] = useState(null);

  const theme = {
    bg: '#050505',
    teal: '#00f2ff',
    tealGlow: '0 0 15px rgba(0, 242, 255, 0.4)',
    border: 'rgba(0, 242, 255, 0.15)',
    card: 'rgba(255, 255, 255, 0.03)',
    textMuted: '#6b7a7a',
    danger: '#ff4d4d'
  };

  const drivers = [
    { id: 1, name: "Ramesh Kumar", car: "Toyota Prius", plate: "TN 01 AB 1234", rating: "4.8", eta: "5 MINS", dist: "1.2 KM", multiplier: 1.0, phone: "9845612345" },
    { id: 2, name: "Blessy Christus D", car: "Hyundai Ioniq", plate: "TN 05 XY 5678", rating: "4.9", eta: "8 MINS", dist: "2.5 KM", multiplier: 1.2, phone: "9876543210" },
    { id: 3, name: "Anbu Selvan", car: "Maruti Swift", plate: "TN 72 AJ 9988", rating: "4.7", eta: "3 MINS", dist: "0.8 KM", multiplier: 0.9, phone: "9123456789" },
    { id: 4, name: "Karthik Raja", car: "Tata Nexon EV", plate: "TN 02 BK 4532", rating: "4.6", eta: "10 MINS", dist: "3.1 KM", multiplier: 1.1, phone: "9988776655" },
    { id: 5, name: "Muthu Pandi", car: "Mahindra XUV400", plate: "TN 69 CP 0072", rating: "4.5", eta: "12 MINS", dist: "4.0 KM", multiplier: 1.3, phone: "9000111222" },
    { id: 6, name: "Suresh Raina", car: "Honda City", plate: "TN 09 DF 4432", rating: "4.8", eta: "4 MINS", dist: "1.5 KM", multiplier: 1.0, phone: "9445566778" },
    { id: 7, name: "Vijay Sethu", car: "Skoda Slavia", plate: "TN 11 EE 9090", rating: "4.9", eta: "7 MINS", dist: "2.1 KM", multiplier: 1.15, phone: "9223344556" },
    { id: 8, name: "Abdul Kalam", car: "Volkswagen Virtus", plate: "TN 18 AK 1931", rating: "5.0", eta: "9 MINS", dist: "2.8 KM", multiplier: 1.25, phone: "9111222333" },
    { id: 9, name: "Gopi Nath", car: "Kia Seltos", plate: "TN 22 GN 0001", rating: "4.4", eta: "15 MINS", dist: "5.2 KM", multiplier: 1.4, phone: "9555666777" },
    { id: 10, name: "Dinesh Karthik", car: "MG ZS EV", plate: "TN 01 DK 2024", rating: "4.7", eta: "6 MINS", dist: "1.9 KM", multiplier: 1.05, phone: "9666777888" },
    { id: 11, name: "Prakash Raj", car: "Toyota Innova", plate: "TN 07 PR 7777", rating: "4.6", eta: "11 MINS", dist: "3.5 KM", multiplier: 1.35, phone: "9777888999" },
    { id: 12, name: "Surya Sivakumar", car: "Ford Endeavour", plate: "TN 37 SS 0007", rating: "4.9", eta: "13 MINS", dist: "4.2 KM", multiplier: 1.5, phone: "9888999000" },
    { id: 13, name: "Vikram Kennedy", car: "Audi A4", plate: "TN 05 VK 0001", rating: "5.0", eta: "2 MINS", dist: "0.5 KM", multiplier: 1.8, phone: "9999000111" },
    { id: 14, name: "Ajith Kumar", car: "BMW 3 Series", plate: "TN 01 AK 0055", rating: "4.9", eta: "5 MINS", dist: "1.1 KM", multiplier: 1.7, phone: "9112233445" },
    { id: 15, name: "Dhanush K", car: "Renault Kiger", plate: "TN 10 DK 5566", rating: "4.5", eta: "8 MINS", dist: "2.3 KM", multiplier: 1.1, phone: "9334455667" }
  ];

  const calculateDriverFare = (multiplier) => {
    const rawFare = typeof tripDetails.fare === 'string' 
      ? tripDetails.fare.replace(/[^0-9.]/g, '') 
      : tripDetails.fare;
    const baseFare = parseFloat(rawFare) || 50; 
    return Math.floor(baseFare * multiplier);
  };

  const startBooking = async (driver) => {
    const finalFare = calculateDriverFare(driver.multiplier);
    const user = JSON.parse(localStorage.getItem('user')); 
    
    const driverSelection = { ...driver, finalPrice: finalFare };
    setActiveDriver(driverSelection);
    setBookingStatus('booking');

    try {
      const response = await fetch(`http://${BACKEND_IP}:8000/api/create-ride/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_mobile: user?.mobile, 
          driverName: driver.name,
          fare: finalFare,
          vehicle: driver.car,
          plate: driver.plate,
          dist: driver.dist,
          eta: driver.eta,
          pickup: tripDetails.pickup,
          destination: tripDetails.destination
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setActiveDriver(prev => ({ ...prev, ride_id: data.ride_id }));
      }
      setTimeout(() => setBookingStatus('confirmed'), 1500);
    } catch (error) {
      setTimeout(() => setBookingStatus('confirmed'), 1500);
    }
  };

  const proceedToPayment = () => {
    if (activeDriver) {
      navigate('/payments', { 
        state: { 
          driver: {
            name: activeDriver.name,
            car: activeDriver.car,
            plate: activeDriver.plate,
            phone: activeDriver.phone 
          }, 
          trip: tripDetails,
          fare: activeDriver.finalPrice,
          ride_id: activeDriver.ride_id
        } 
      });
    }
  };

  // ✅ Updated this function to pass data correctly as 'driver' object
  const goToChat = () => {
    if (activeDriver) {
      navigate('/chat', { 
        state: { 
          driver: {
            driverName: activeDriver.name, 
            driverPhone: activeDriver.phone 
          }
        } 
      });
    }
  };

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      
      {isCalling && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,5,0.95)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(15px)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,242,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', border: `1px solid ${theme.border}`, marginBottom: '20px' }}>👤</div>
          <h1>Calling {activeDriver?.name}...</h1>
          <p style={{ color: theme.teal, letterSpacing: '2px', fontSize: '12px' }}>🛡️ SECURE IN-APP CALL</p>
          <button onClick={() => setIsCalling(false)} style={{ marginTop: '60px', width: '70px', height: '70px', borderRadius: '50%', background: theme.danger, border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}>✖</button>
        </div>
      )}

      {bookingStatus && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
          <div style={{ background: '#0a1a1a', padding: '40px', borderRadius: '35px', border: `1px solid ${theme.border}`, textAlign: 'center', width: '380px' }}>
            {bookingStatus === 'booking' ? (
              <>
                <div className="spinner" style={{ width: '50px', height: '50px', border: `5px solid ${theme.border}`, borderTop: `5px solid ${theme.teal}`, borderRadius: '50%', margin: '0 auto 25px' }}></div>
                <h3>Finding your driver...</h3>
              </>
            ) : (
              <>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
                <h2 style={{ color: theme.teal }}>Confirmed!</h2>
                <p style={{ color: theme.textMuted }}>{activeDriver?.name} is on the way.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
                  <button onClick={goToChat} style={{ width: '100%', padding: '16px', borderRadius: '15px', border: `1px solid ${theme.teal}`, background: 'transparent', color: theme.teal, fontWeight: '900', cursor: 'pointer' }}>CHAT WITH DRIVER</button>
                  <button onClick={proceedToPayment} style={{ width: '100%', padding: '16px', borderRadius: '15px', border: 'none', background: theme.teal, color: '#000', fontWeight: '900', cursor: 'pointer' }}>PROCEED TO PAYMENT</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div style={{ padding: '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: `1px solid ${theme.border}`, color: theme.teal, padding: '10px 22px', borderRadius: '12px', cursor: 'pointer' }}>❮ BACK</button>
          <h2 style={{ textShadow: theme.tealGlow }}>CHOOSE YOUR RIDE</h2>
        </div>
        
        <div style={{ textAlign: 'right', borderLeft: `1px solid ${theme.border}`, paddingLeft: '20px' }}>
          <p style={{ color: theme.textMuted, fontSize: '11px', margin: 0 }}>TRIP DISTANCE</p>
          <span style={{ color: theme.teal, fontWeight: '900', fontSize: '18px' }}>
            {tripDetails.distance || "0"} KM
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0 100px' }}>
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <Swiper modules={[Pagination, Navigation]} spaceBetween={50} slidesPerView={1} navigation pagination={{ clickable: true }} style={{ padding: '0 60px 60px' }}>
            {drivers.map((driver) => (
              <SwiperSlide key={driver.id}>
                <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '40px', padding: '50px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '50px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '35px' }}>
                      <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'rgba(0, 242, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', border: `1px solid ${theme.border}` }}>👤</div>
                      <div>
                        <h2 style={{ fontSize: '28px', margin: 0 }}>{driver.name}</h2>
                        <span style={{ color: theme.teal, fontWeight: 'bold' }}>{driver.rating} ⭐ • {driver.dist} Away</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', marginBottom: '40px', borderTop: `1px solid ${theme.border}`, paddingTop: '25px' }}>
                      <div>
                        <p style={{ color: theme.textMuted, fontSize: '11px', letterSpacing: '1px', marginBottom: '8px' }}>VEHICLE</p>
                        <strong style={{ fontSize: '18px' }}>{driver.car}</strong>
                      </div>
                      <div>
                        <p style={{ color: theme.textMuted, fontSize: '11px', letterSpacing: '1px', marginBottom: '8px' }}>EST. FARE</p>
                        <strong style={{ color: theme.teal, fontSize: '22px' }}>₹{calculateDriverFare(driver.multiplier)}.00</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button onClick={() => startBooking(driver)} style={{ flex: 3, padding: '20px', borderRadius: '20px', border: 'none', background: theme.teal, color: '#000', fontWeight: '900', fontSize: '16px', cursor: 'pointer', boxShadow: theme.tealGlow }}>BOOK RIDE</button>
                      <button onClick={() => { setActiveDriver(driver); setIsCalling(true); }} style={{ flex: 1, padding: '20px', borderRadius: '20px', border: `1px solid ${theme.border}`, background: 'rgba(255,255,255,0.03)', color: theme.teal, fontSize: '24px', cursor: 'pointer' }}>📞</button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ background: 'rgba(0, 242, 255, 0.03)', border: `1px solid ${theme.border}`, borderRadius: '35px', padding: '40px', textAlign: 'center' }}>
                      <p style={{ color: theme.textMuted, fontSize: '12px', letterSpacing: '2px' }}>ESTIMATED ARRIVAL</p>
                      <h1 style={{ color: theme.teal, fontSize: '55px', margin: '15px 0', textShadow: theme.tealGlow }}>{driver.eta}</h1>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: theme.textMuted, fontSize: '11px' }}>
                        <span>🛡️</span> ENCRYPTED SESSION
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
        .swiper-button-next, .swiper-button-prev { color: ${theme.teal} !important; opacity: 0.4; }
        .swiper-pagination-bullet-active { background: ${theme.teal} !important; width: 30px !important; border-radius: 5px !important; }
      `}</style>
    </div>
  );
};

export default ActiveRides;