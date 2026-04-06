import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  // Settings States
  const [activeTheme, setActiveTheme] = useState(localStorage.getItem('appTheme') || 'Cyan');
  const [language, setLanguage] = useState(localStorage.getItem('appLanguage') || 'English');
  const [notifOn, setNotifOn] = useState(true);

  const themes = {
    Cyan: { teal: '#00f2ff', glow: '0 0 15px rgba(0, 242, 255, 0.4)' },
    Red: { teal: '#ff4d4d', glow: '0 0 15px rgba(255, 77, 77, 0.4)' },
    Green: { teal: '#39ff14', glow: '0 0 15px rgba(57, 255, 20, 0.4)' },
    Purple: { teal: '#bc13fe', glow: '0 0 15px rgba(188, 19, 254, 0.4)' }
  };

  const currentTheme = themes[activeTheme];

  const handleThemeChange = (t) => {
    setActiveTheme(t);
    localStorage.setItem('appTheme', t);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div style={{ 
      backgroundColor: '#050505', height: '100vh', width: '100vw', color: '#fff', 
      fontFamily: 'Inter, sans-serif', overflow: 'hidden', display: 'flex', flexDirection: 'column' 
    }}>
      
      {/* 1. HEADER */}
      <div style={{ height: '8vh', padding: '0 25px', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: currentTheme.teal, fontSize: '20px', cursor: 'pointer' }}>❮</button>
        <h1 style={{ fontSize: '18px', fontWeight: '800', marginLeft: '15px', letterSpacing: '1px' }}>SETTINGS</h1>
      </div>

      <div style={{ flex: 1, maxWidth: '500px', margin: '0 auto', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
        
        {/* 2. ABOUT US (TOP-LA POWERFUL DESCRIPTION) */}
        <div style={{ 
          background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
          padding: '20px', borderRadius: '25px', border: `1px solid ${currentTheme.teal}22`, textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛡️</div>
          <h2 style={{ fontSize: '15px', fontWeight: '900', color: currentTheme.teal, marginBottom: '8px', letterSpacing: '1px' }}>SECURE PROTECT ENGINE</h2>
          <p style={{ fontSize: '11.5px', color: '#888', lineHeight: '1.6', margin: 0 }}>
            Our platform uses <b>End-to-End AES-256 Encryption</b> to shield your data. 
            With real-time threat monitoring and biometric verification, we ensure every ride 
            is a <b>Fortress on Wheels</b>. Your privacy is our prime protocol.
          </p>
        </div>

        {/* 3. APPEARANCE SECTION */}
        <div style={sectionBox}>
          <h3 style={{ ...titleStyle, color: currentTheme.teal }}>APPEARANCE</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '12px' }}>
            {Object.keys(themes).map((t) => (
              <div 
                key={t} onClick={() => handleThemeChange(t)}
                style={{
                  ...themeCircle,
                  border: activeTheme === t ? `2px solid ${themes[t].teal}` : '1px solid rgba(255,255,255,0.05)',
                  background: activeTheme === t ? `${themes[t].teal}15` : 'rgba(255,255,255,0.02)',
                }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: themes[t].teal, boxShadow: themes[t].glow }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. PREFERENCES (Language & Notification) */}
        <div style={sectionBox}>
          <h3 style={{ ...titleStyle, color: currentTheme.teal }}>PREFERENCES</h3>
          
          {/* Language Row */}
          <div style={row} onClick={() => setLanguage(language === 'English' ? 'Tamil' : 'English')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>🌐</span>
              <span style={{ fontSize: '14px' }}>App Language</span>
            </div>
            <span style={{ color: currentTheme.teal, fontWeight: '700', fontSize: '13px' }}>{language} ❯</span>
          </div>

          {/* Notification Toggle Row */}
          <div style={row} onClick={() => setNotifOn(!notifOn)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>🔔</span>
              <span style={{ fontSize: '14px' }}>Notifications</span>
            </div>
            <div style={{ 
              width: '40px', height: '20px', background: notifOn ? currentTheme.teal : '#222', 
              borderRadius: '20px', position: 'relative', transition: '0.3s' 
            }}>
              <div style={{ 
                width: '14px', height: '14px', background: '#fff', borderRadius: '50%', 
                position: 'absolute', top: '3px', left: notifOn ? '23px' : '3px', transition: '0.3s' 
              }}></div>
            </div>
          </div>
        </div>

        {/* 5. LOGOUT */}
        <button 
          onClick={() => { localStorage.clear(); navigate('/signin'); }}
          style={{ 
            width: '100%', padding: '16px', borderRadius: '15px', background: 'rgba(255, 77, 77, 0.05)', 
            border: '1px solid rgba(255, 77, 77, 0.2)', color: '#ff4d4d', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', letterSpacing: '1px'
          }}
        >
          LOGOUT SESSION
        </button>

      </div>
    </div>
  );
};

// Styles optimized for One-page layout
const sectionBox = { 
  background: 'rgba(255,255,255,0.01)', 
  padding: '18px', 
  borderRadius: '22px', 
  border: '1px solid rgba(255,255,255,0.03)' 
};

const titleStyle = { 
  fontSize: '10px', 
  fontWeight: '900', 
  letterSpacing: '1.5px', 
  textTransform: 'uppercase' 
};

const themeCircle = { 
  height: '45px', 
  borderRadius: '12px', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  cursor: 'pointer', 
  transition: '0.3s' 
};

const row = { 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between', 
  padding: '12px 0', 
  cursor: 'pointer', 
  borderBottom: '1px solid rgba(255,255,255,0.02)' 
};

export default Settings;