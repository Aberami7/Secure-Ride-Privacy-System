import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();
  const chatEndRef = useRef(null); // Auto scroll-ku
  const [selected, setSelected] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatTopic, setChatTopic] = useState('');
  const [inputText, setInputText] = useState('');
  
  // Static Chat History
  const [messages, setMessages] = useState([]);

  const theme = {
    bg: '#000000',
    cyan: '#00f2ff',
    card: 'rgba(255, 255, 255, 0.03)',
    border: 'rgba(0, 242, 255, 0.12)',
    activeBorder: '#00f2ff',
    chatBg: '#0a0a0a',
    msgUser: '#00f2ff',
    msgBot: '#1a1a1a'
  };

  const faqData = [
    { id: 1, title: 'Report a safety issue', icon: '🛡️', desc: 'If you felt unsafe during a ride, please let us know. Our safety team is available 24/7.', linkText: 'Connect with agent →' },
    { id: 2, title: 'Payment & Promo', icon: '💳', desc: 'Issues with your last transaction or promo code not applying? Check your wallet history.', linkText: 'Connect with agent →' },
    { id: 3, title: 'Lost an item', icon: '🎒', desc: 'Left something in the car? We will help you get in touch with the driver safely.', linkText: 'Connect with agent →' },
    { id: 4, title: 'Account & Settings', icon: '⚙️', desc: 'Update your profile or manage your data here.', linkText: 'View details →' }
  ];

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openChat = (topic) => {
    setChatTopic(topic);
    setIsChatOpen(true);
    setMessages([
      { id: 1, text: `Hello! I'm your support assistant. I see you have a query about "${topic}". How can I help?`, sender: 'bot' }
    ]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // 1. User message-ah add panradhu
    const userMsg = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // 2. Fake Reply Logic (After 1 second)
    setTimeout(() => {
      const botReply = { 
        id: Date.now() + 1, 
        text: "Thanks for the details. Our team is looking into this. We'll get back to you in 5-10 mins.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: theme.bg, height: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* HEADER */}
      <div style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 100, padding: '20px 0', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '90%', maxWidth: '900px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'rgba(0, 242, 255, 0.08)', border: `1px solid ${theme.cyan}`, color: theme.cyan, padding: '8px 18px', borderRadius: '10px', cursor: 'pointer' }}>❮ BACK</button>
        </div>
      </div>

      {/* FAQ LIST */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '90%', maxWidth: '900px' }}>
          <h1 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '30px' }}>Help & Support</h1>
          <div style={{ display: 'grid', gap: '15px', paddingBottom: '100px' }}>
            {faqData.map((item) => (
              <div key={item.id} onClick={() => setSelected(selected === item.id ? null : item.id)} style={{ padding: '22px 30px', background: theme.card, border: selected === item.id ? `1px solid ${theme.activeBorder}` : `1px solid ${theme.border}`, borderRadius: '18px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '600' }}>{item.icon} {item.title}</span>
                  <span>{selected === item.id ? '⌃' : '❯'}</span>
                </div>
                {selected === item.id && (
                  <div style={{ marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                    <p style={{ color: '#ccc', fontSize: '14px' }}>{item.desc}</p>
                    <div onClick={(e) => { e.stopPropagation(); if(item.id !== 4) openChat(item.title); }} style={{ marginTop: '10px', color: theme.cyan, fontWeight: 'bold' }}>{item.linkText}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FLOATING CHAT WINDOW */}
      {isChatOpen && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '340px', height: '480px', backgroundColor: theme.chatBg, border: `1px solid ${theme.cyan}`, borderRadius: '20px', display: 'flex', flexDirection: 'column', zIndex: 2000, boxShadow: '0 0 30px rgba(0,242,255,0.2)' }}>
          {/* Chat Header */}
          <div style={{ padding: '15px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Support Agent</div>
              <div style={{ fontSize: '11px', color: theme.cyan }}>Online • {chatTopic}</div>
            </div>
            <button onClick={() => setIsChatOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>×</button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ 
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: '15px',
                fontSize: '13px',
                lineHeight: '1.4',
                backgroundColor: msg.sender === 'user' ? theme.cyan : theme.msgBot,
                color: msg.sender === 'user' ? '#000' : '#fff'
              }}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '15px', borderTop: '1px solid #222', display: 'flex', gap: '8px' }}>
            <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type message..." 
              style={{ flex: 1, background: '#1a1a1a', border: 'none', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '13px' }} 
            />
            <button onClick={handleSendMessage} style={{ background: theme.cyan, border: 'none', borderRadius: '8px', padding: '0 15px', cursor: 'pointer', fontWeight: 'bold' }}>🚀</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;