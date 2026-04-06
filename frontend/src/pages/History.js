import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BACKEND_IP = "192.168.1.11"; 

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) { navigate('/signin'); return; }
        const user = JSON.parse(userStr);

        // 1. Backend Fetch (LIFO order-la varum)
        const response = await fetch(`http://${BACKEND_IP}:8000/api/ride-history/?mobile=${user.mobile}`);
        let backendData = [];
        if (response.ok) { backendData = await response.json(); }

        // 2. Local Storage (Temporary data)
        const localData = JSON.parse(localStorage.getItem('rideHistory')) || [];

        // 3. Strict Filter & Mapping
        const combined = [...localData, ...backendData].filter(r => {
          const pickup = r.pickup || r.pickup_location;
          const destination = r.destination || r.destination_location;
          return pickup && destination && pickup !== "Not Provided" && pickup !== "Unknown Start";
        });
        
        // Duplicate records-ai (id vachu) filter panna nalladhu
        const uniqueRides = Array.from(new Map(combined.map(item => [item.id, item])).values());

        const formattedRides = uniqueRides.map((r) => ({
          displayDriver: r.driver || r.driver_name || "SafeRide Partner",
          displayPickup: r.pickup || r.pickup_location,
          displayDest: r.destination || r.destination_location,
          displayFare: r.fare || r.amount || "0",
          displayStatus: r.status || "Completed",
          displayDate: r.date || "Just now", 
        }));

        // ✅ Latest rides top-la varum (No need to reverse if backend is already sorted)
        setRides(formattedRides); 

      } catch (error) { 
        console.error("Fetch Error:", error); 
        setRides([]);
      } finally { setLoading(false); }
    };
    fetchHistory();
  }, [navigate]);

  return (
    <div style={{ backgroundColor: '#050505', height: '100vh', padding: '20px', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', flexShrink: 0 }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: '1px solid #00f2ff', color: '#00f2ff', padding: '8px 25px', borderRadius: '12px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', marginRight: '20px' }}>BACK</button>
        <h2 style={{ margin: 0, fontSize: '20px', letterSpacing: '2px', fontWeight: '900', color: '#00f2ff' }}>RIDE LOGS</h2>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px', scrollbarWidth: 'thin', scrollbarColor: '#00f2ff #050505' }}>
        {loading ? (
          <p style={{ color: '#00f2ff', textAlign: 'center', marginTop: '50px' }}>SYNCING...</p>
        ) : rides.length > 0 ? (
          <div style={{ display: 'grid', gap: '15px', paddingBottom: '30px' }}>
            {rides.map((r, index) => (
              <div key={index} style={{ background: 'rgba(255, 255, 255, 0.02)', border: `1px solid ${r.displayStatus === 'Not Paid' ? 'rgba(255, 77, 77, 0.2)' : 'rgba(0, 242, 255, 0.15)'}`, padding: '22px', borderRadius: '24px', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '800' }}>{r.displayDriver}</h4>
                    <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#00f2ff', fontSize: '13px', fontWeight: '600' }}>{r.displayPickup}</span>
                      <span style={{ color: '#444' }}>➔</span>
                      <span style={{ color: '#00f2ff', fontSize: '13px', fontWeight: '600' }}>{r.displayDest}</span>
                    </div>
                    <p style={{ margin: 0, color: '#6b7a7a', fontSize: '12px', fontWeight: 'bold' }}>{r.displayDate}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '900', fontSize: '22px' }}>{r.displayFare.toString().includes('₹') ? r.displayFare : `₹${r.displayFare}`}</div>
                    <div style={{ fontSize: '10px', marginTop: '12px', color: r.displayStatus === 'Not Paid' ? '#ff4d4d' : '#00f2ff', padding: '6px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', fontWeight: '900' }}>{r.displayStatus === 'Not Paid' ? '⚠️ NOT PAID' : '✓ COMPLETED'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#444' }}>No valid ride logs found.</p>
        )}
      </div>

      <style>{` ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #050505; } ::-webkit-scrollbar-thumb { background: #00f2ff; border-radius: 10px; } `}</style>
    </div>
  );
};

export default History;