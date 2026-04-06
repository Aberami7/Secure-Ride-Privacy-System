import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);

  // ✅ Updated with your current WiFi IP (10.87.141.118)
  const BACKEND_IP = "192.168.1.11"; 

  const theme = {
    bg: '#050505',
    teal: '#00f2ff',
    border: 'rgba(0, 242, 255, 0.15)',
    card: 'rgba(255, 255, 255, 0.03)',
    inputBg: 'rgba(255, 255, 255, 0.06)',
  };

  const handleGetOTP = () => {
    if (username && mobile.length === 10) {
      setShowOtpField(true);
      console.log("OTP Sent to:", mobile);
    } else {
      alert("Please enter your Name and 10-digit Mobile Number!");
    }
  };

  const handleFinalLogin = async () => {
    if (otp === "123456") {
      try {
        // Correct endpoint matching your Django urls.py
        const response = await fetch(`http://${BACKEND_IP}:8000/api/signin/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, mobile, otp }),
        });

        const result = await response.json();
        if (response.ok) {
          localStorage.setItem('isLoggedIn', 'true');
          // Important for History page to work later
          localStorage.setItem('user', JSON.stringify(result.user));
          navigate('/'); 
        } else {
          alert("Login Failed: " + result.message);
        }
      } catch (error) {
        alert("Server Connection Failed! Run Django with: python manage.py runserver 0.0.0.0:8000");
      }
    } else {
      alert("Invalid OTP! Use 123456");
    }
  };

  const inputStyle = {
    width: '100%', padding: '16px', marginBottom: '15px', borderRadius: '12px',
    border: `1px solid ${theme.border}`, background: theme.inputBg,
    color: '#fff', fontSize: '16px', outline: 'none', boxSizing: 'border-box'
  };

  const btnStyle = {
    width: '100%', padding: '18px', borderRadius: '12px', border: 'none',
    background: theme.teal, color: '#000', fontWeight: '900', fontSize: '16px',
    cursor: 'pointer', marginTop: '10px', boxShadow: `0 10px 20px rgba(0, 242, 255, 0.2)`
  };

  return (
    <div style={{ backgroundColor: theme.bg, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ 
        width: '100%', maxWidth: '400px', padding: '50px 40px', 
        background: theme.card, border: `1px solid ${theme.border}`, 
        borderRadius: '32px', textAlign: 'center', backdropFilter: 'blur(20px)' 
      }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>⚡</div>
        <h1 style={{ color: '#fff', fontSize: '24px', letterSpacing: '3px', fontWeight: '900', marginBottom: '40px' }}>
          SECURE <span style={{ color: theme.teal }}>RIDE</span>
        </h1>

        <input 
          type="text" placeholder="First Name" 
          value={username} onChange={(e) => setUsername(e.target.value)} 
          style={inputStyle} disabled={showOtpField}
        />
        
        <input 
          type="tel" placeholder="Mobile Number" maxLength="10"
          value={mobile} onChange={(e) => setMobile(e.target.value)} 
          style={inputStyle} disabled={showOtpField}
        />

        {!showOtpField ? (
          <button onClick={handleGetOTP} style={btnStyle}>VERIFY & GET OTP</button>
        ) : (
          <>
            <input 
              type="text" placeholder="Enter OTP (123456)" maxLength="6"
              value={otp} onChange={(e) => setOtp(e.target.value)} 
              style={{...inputStyle, border: `1px solid ${theme.teal}`}} 
            />
            <button onClick={handleFinalLogin} style={btnStyle}>LOGIN TO DASHBOARD</button>
            <p style={{ color: theme.teal, fontSize: '12px', marginTop: '15px', cursor: 'pointer' }} onClick={() => setShowOtpField(false)}>
              Change Mobile Number?
            </p>
          </>
        )}

        <p style={{ marginTop: '30px', color: '#555', fontSize: '11px', letterSpacing: '1px' }}>🛡️ SECURE VERIFICATION SYSTEM</p>
      </div>
    </div>
  );
};

export default SignIn;