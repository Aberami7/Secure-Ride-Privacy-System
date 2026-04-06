import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Safety = () => {
  const navigate = useNavigate();
  const [coords, setCoords] = useState({ lat: 10.7870, lng: 78.1089 });

  useEffect(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      };

      const watchID = navigator.geolocation.watchPosition(
        (position) => {
          // Location update aagumbodhu state-ah mattum update pannuna podhum
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => console.error(err),
        options
      );

      return () => navigator.geolocation.clearWatch(watchID);
    }
  }, []);

  const handleSOS = () => {
    if (window.confirm("🚨 ALERT: Call Emergency (100)?")) {
      window.location.href = "tel:100";
    }
  };

  const theme = {
    bg: '#000000',
    cyan: '#00f2ff',
    sos: '#ff4d4d',
    card: 'rgba(255, 255, 255, 0.03)',
    border: 'rgba(0, 242, 255, 0.2)'
  };

  return (
    <div style={{ backgroundColor: theme.bg, height: '100vh', width: '100vw', color: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      
      {/* HEADER - Explicitly Go Back One Step */}
      <div style={{ padding: '20px', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ background: 'transparent', border: `1px solid ${theme.border}`, color: theme.cyan, padding: '8px 15px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          BACK
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 20px 40px 20px' }}>
        <div style={{ maxWidth: '450px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '18px', letterSpacing: '3px', color: theme.cyan, marginBottom: '30px', fontWeight: '900' }}>SAFETY CENTER</h2>

          <div onClick={handleSOS} style={{ padding: '30px 20px', borderRadius: '25px', background: theme.sos, color: '#fff', cursor: 'pointer', boxShadow: '0 0 30px rgba(255, 77, 77, 0.4)', marginBottom: '25px' }}>
            <div style={{ fontSize: '35px', marginBottom: '5px' }}>🚨</div>
            <div style={{ fontSize: '22px', fontWeight: '900' }}>SOS EMERGENCY</div>
            <p style={{ fontSize: '10px', opacity: 0.8, marginTop: '5px' }}>TAP TO ALERT AUTHORITIES</p>
          </div>

          <div style={{ background: theme.card, borderRadius: '30px', border: `1px solid ${theme.border}`, padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: theme.cyan }}>LIVE RADAR</span>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: theme.cyan, boxShadow: `0 0 10px ${theme.cyan}` }}></div>
            </div>

            <div style={{ borderRadius: '20px', overflow: 'hidden', border: `1px solid ${theme.border}`, height: '220px', marginBottom: '20px' }}>
              {/* IMPORTANT: Added key to prevent history stack overflow */}
              <iframe
                key="safety-map"
                title="Live Map"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8)' }} 
                src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=18&output=embed`}
              ></iframe>
            </div>

            <button 
              onClick={() => window.open(`https://www.google.com/maps?q=${coords.lat},${coords.lng}`, '_blank')}
              style={{ width: '100%', padding: '15px', borderRadius: '15px', background: 'transparent', color: theme.cyan, border: `1px solid ${theme.cyan}`, cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}
            >
              SHARE LIVE LOCATION
            </button>
          </div>
          <p style={{ marginTop: '25px', fontSize: '10px', color: '#444', letterSpacing: '1px' }}>SECURED PROTOCOL ACTIVE</p>
        </div>
      </div>
    </div>
  );
};

export default Safety;