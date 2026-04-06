import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: 'User Name',
    mobile: '+91 XXXXX XXXXX',
    email: 'Not Provided'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    }
  }, []);

  const theme = {
    teal: localStorage.getItem('appTheme') === 'Red' ? '#ff4d4d' : 
           localStorage.getItem('appTheme') === 'Green' ? '#39ff14' : 
           localStorage.getItem('appTheme') === 'Purple' ? '#bc13fe' : '#00f2ff',
    cardBg: 'rgba(255, 255, 255, 0.03)',
    containerBorder: 'rgba(255, 255, 255, 0.08)',
    glow: '0 0 20px rgba(0, 242, 255, 0.1)'
  };

  const handleSave = () => {
    setUser(formData);
    localStorage.setItem('user', JSON.stringify(formData));
    setIsEditing(false);
  };

  return (
    <div style={{ backgroundColor: '#050505', height: '100vh', width: '100vw', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Back Button */}
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: theme.teal, fontSize: '18px', cursor: 'pointer', marginBottom: '20px' }}>❮ Back</button>
      </div>

      {/* ✅ MAIN PROFILE CONTAINER */}
      <div style={{ 
        width: '100%', 
        maxWidth: '500px', 
        background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)', 
        borderRadius: '30px', 
        border: `1px solid ${theme.containerBorder}`, 
        padding: '40px 30px', 
        boxShadow: theme.glow,
        backdropFilter: 'blur(10px)',
        textAlign: 'center'
      }}>
        
        {/* Profile Avatar */}
        <div style={{ 
          width: '90px', height: '90px', borderRadius: '50%', background: theme.teal, color: '#000', 
          fontSize: '36px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          margin: '0 auto 20px', boxShadow: `0 0 25px ${theme.teal}44` 
        }}>
          {user.name.charAt(0).toUpperCase()}
        </div>

        {isEditing ? (
          /* EDIT MODE */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
            <h2 style={{ fontSize: '18px', color: theme.teal, marginBottom: '10px', textAlign: 'center' }}>Edit Your Profile</h2>
            <InputField label="FULL NAME" value={formData.name} onChange={(val) => setFormData({...formData, name: val})} />
            <InputField label="MOBILE NUMBER" value={formData.mobile} onChange={(val) => setFormData({...formData, mobile: val})} />
            <InputField label="EMAIL ADDRESS" value={formData.email} onChange={(val) => setFormData({...formData, email: val})} />
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button onClick={() => setIsEditing(false)} style={cancelBtn}>CANCEL</button>
              <button onClick={handleSave} style={{ ...saveBtn, background: theme.teal }}>SAVE</button>
            </div>
          </div>
        ) : (
          /* VIEW MODE */
          <>
            <h1 style={{ fontSize: '24px', margin: '0 0 5px 0' }}>{user.name}</h1>
            <p style={{ color: '#6b7a7a', fontSize: '14px', marginBottom: '30px' }}>{user.mobile}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Member Since" value="Jan 2026" />
              <InfoRow label="Status" value="Verified ✅" color={theme.teal} />
            </div>

            <button 
              onClick={() => setIsEditing(true)}
              style={{ ...editBtn, border: `1px solid ${theme.teal}`, color: theme.teal }}
            >
              EDIT PROFILE ✎
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Reusable Components inside the file
const InfoRow = ({ label, value, color = '#fff' }) => (
  <div style={{ 
    display: 'flex', justifyContent: 'space-between', padding: '15px 20px', 
    background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.03)' 
  }}>
    <span style={{ color: '#6b7a7a', fontSize: '13px' }}>{label}</span>
    <span style={{ fontSize: '14px', color: color, fontWeight: '500' }}>{value}</span>
  </div>
);

const InputField = ({ label, value, onChange }) => (
  <div>
    <label style={{ fontSize: '10px', color: '#555', marginLeft: '5px', letterSpacing: '1px' }}>{label}</label>
    <input 
      style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#0a0a0a', border: '1px solid #222', color: '#fff', outline: 'none', marginTop: '5px' }} 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
);

// Styles
const editBtn = { marginTop: '30px', width: '100%', padding: '15px', borderRadius: '12px', background: 'transparent', fontWeight: 'bold', cursor: 'pointer' };
const saveBtn = { flex: 2, padding: '14px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', color: '#000' };
const cancelBtn = { flex: 1, padding: '14px', borderRadius: '10px', background: 'transparent', border: '1px solid #333', color: '#fff', cursor: 'pointer' };

export default Profile;