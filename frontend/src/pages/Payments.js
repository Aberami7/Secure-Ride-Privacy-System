import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Payments = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Safe-ah state data-vai vaangurom
  const stateData = location.state || {};
  
  const driver = stateData.driver || { 
    name: "Driver", 
    car: "Vehicle", 
    plate: "TN 01 AB 1234", 
    phone: "9876543210" 
  };
  
  const trip = stateData.trip || { 
    pickup: "Not Selected", 
    destination: "Not Selected" 
  };
  
  const ride_id = stateData.ride_id || null;
  
  // 2. Dynamic Fare logic
  const rawFare = stateData.fare || "0"; 
  const finalAmount = parseInt(rawFare.toString().replace(/[^0-9]/g, '')) || 0;

  const theme = {
    bg: '#000000', 
    teal: '#00f2ff',
    border: 'rgba(0, 242, 255, 0.2)',
    card: 'rgba(255, 255, 255, 0.03)',
    glass: 'rgba(255, 255, 255, 0.05)',
    textMuted: '#889999'
  };

  const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY_ID;

  const paymentDetails = useMemo(() => ({
    driverName: driver.name,
    amount: finalAmount, 
    transactionId: "SR" + Math.floor(100000 + Math.random() * 900000)
  }), [driver.name, finalAmount]);

  const updateStatusInBackend = async () => {
    if (!ride_id) return;
    try {
      await fetch(`http://192.168.1.11:8000/api/update-payment/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ride_id: ride_id })
      });
    } catch (error) {
      console.error("Backend update failed:", error);
    }
  };

  const saveToHistory = (razorpayId) => {
    const newRide = {
      id: paymentDetails.transactionId,
      payment_id: razorpayId,
      driverName: paymentDetails.driverName,
      amount: paymentDetails.amount,
      status: "Completed",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const existingHistory = JSON.parse(localStorage.getItem('rideHistory')) || [];
    localStorage.setItem('rideHistory', JSON.stringify([newRide, ...existingHistory]));
  };

  const handlePayment = () => {
    if (!RAZORPAY_KEY) {
      alert("Error: Razorpay API Key missing!");
      return;
    }

    if (paymentDetails.amount <= 0) {
      alert("Invalid payment amount!");
      return;
    }

    const options = {
      key: RAZORPAY_KEY, 
      amount: paymentDetails.amount * 100, 
      currency: "INR",
      name: "SECURE.RIDE", // ✅ "SafeRide AI" mathi "SECURE.RIDE" nu pottachu
      description: `Ride with ${paymentDetails.driverName}`,
      // ✅ Intha chinna block UPI option vara help pannum
      config: {
        display: {
          blocks: {
            banks: { name: 'All Payment Methods', instruments: [{ method: 'upi' }, { method: 'card' }, { method: 'netbanking' }] }
          },
          sequence: ['block.banks']
        }
      },
      handler: async function (response) {
        await updateStatusInBackend();
        saveToHistory(response.razorpay_payment_id);
        navigate('/chat', { 
          state: { driverName: driver.name, driverPhone: driver.phone } 
        });
      },
      prefill: { name: "Abirami", contact: "9999999999" },
      theme: { color: "#00f2ff" }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', width: '100vw', padding: '20px', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
      
      <div style={{ width: '100%', maxWidth: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '30px' }}>
        <button onClick={() => navigate(-1)} style={{ position: 'absolute', left: 0, background: 'none', border: `1px solid ${theme.border}`, color: theme.teal, padding: '8px 16px', borderRadius: '12px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>❮ BACK</button>
        <h3 style={{ margin: 0, letterSpacing: '2px', fontSize: '14px', fontWeight: '600', color: theme.textMuted }}>SECURE CHECKOUT</h3>
      </div>

      <div style={{ width: '100%', maxWidth: '420px', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '32px', padding: '30px', backdropFilter: 'blur(20px)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', boxSizing: 'border-box' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px', padding: '20px', borderRadius: '24px', background: 'rgba(0, 242, 255, 0.05)' }}>
          <p style={{ color: theme.textMuted, fontSize: '11px', fontWeight: '700', marginBottom: '8px', letterSpacing: '1px' }}>FINAL FARE</p>
          <h1 style={{ fontSize: '48px', margin: 0, fontWeight: '800', color: theme.teal }}>₹{paymentDetails.amount}<span style={{ fontSize: '20px', opacity: 0.5 }}>.00</span></h1>
        </div>

        <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: theme.glass, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: `1px solid ${theme.border}` }}>👨🏻‍✈️</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>{driver.name}</h4>
              <span style={{ fontSize: '11px', color: theme.teal }}>{driver.car} • {driver.plate}</span>
            </div>
          </div>

          <div style={{ padding: '18px', background: theme.glass, borderRadius: '18px', border: `1px solid ${theme.border}`, position: 'relative' }}>
            <div style={{ marginBottom: '12px' }}>
              <p style={{ color: theme.textMuted, fontSize: '9px', margin: 0, fontWeight: 'bold' }}>PICKUP (FROM)</p>
              <p style={{ fontSize: '13px', margin: '4px 0', color: '#eee' }}>{trip.pickup}</p>
            </div>
            <div style={{ borderTop: `1px solid rgba(255,255,255,0.1)`, paddingTop: '12px' }}>
              <p style={{ color: theme.textMuted, fontSize: '9px', margin: 0, fontWeight: 'bold' }}>DESTINATION (TO)</p>
              <p style={{ fontSize: '13px', margin: '4px 0', color: '#eee' }}>{trip.destination}</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', padding: '10px 5px', borderBottom: `1px solid ${theme.glass}` }}>
            <span style={{ color: theme.textMuted, fontSize: '13px' }}>Transaction ID</span>
            <span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#fff' }}>{paymentDetails.transactionId}</span>
        </div>

        <button 
          onClick={handlePayment}
          style={{ width: '100%', padding: '20px', borderRadius: '20px', border: 'none', background: `linear-gradient(135deg, ${theme.teal}, #0099ff)`, color: '#000', fontWeight: '900', cursor: 'pointer', fontSize: '16px', transition: '0.3s', boxShadow: `0 10px 25px rgba(28, 29, 29, 0.3)` }}>
          CONFIRM & PAY NOW
        </button>

        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '10px', color: theme.textMuted }}>SECURED BY</span>
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" style={{ height: '14px', opacity: 0.8 ,filter: 'brightness(1) invert(1)' }} />
        </div>
      </div>

      <p style={{ marginTop: '15px', color: theme.textMuted, fontSize: '10px', textAlign: 'center', maxWidth: '300px' }}>
        SECURE.RIDE • End-to-End Encrypted Payments
      </p>
    </div>
  );
};

export default Payments;