import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DriverChat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatEndRef = useRef(null);

  const [driverInfo, setDriverInfo] = useState(() => {
    const fromState = location.state?.driver;
    if (fromState && fromState.driverName && fromState.driverName !== "No Active Ride") {
      localStorage.setItem('currentRide', JSON.stringify(fromState));
      return fromState;
    }
    const savedRide = localStorage.getItem('currentRide');
    if (savedRide) return JSON.parse(savedRide);
    return null; 
  });

  const driverName = driverInfo?.driverName || "No Active Ride";
  const driverPhone = driverInfo?.driverPhone || "";

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // ✅ Reply index track panna state
  const [replyIndex, setReplyIndex] = useState(0);

  // ✅ Static Driver Replies Pool
  const driverRepliesPool = [
    "I have accepted your ride request.",
    "Confirming your pickup location now.",
    "I'm just 5 minutes away from your spot.",
    "Traffic is a bit heavy, but I'm taking a shortcut.",
    "Almost there! Please be ready.",
    "I've reached the pickup point.",
    "I'm waiting near the main gate.",
    "Please let me know once you are out.",
    "Got it! Starting the trip now.",
    "AC temperature okay for you?",
    "We are following the fastest route on GPS.",
    "Expected arrival at destination in 15 mins.",
    "Do you prefer any specific route?",
    "I'll drop you right at the entrance.",
    "Hope you had a comfortable ride!"
  ];

  const [messages, setMessages] = useState(() => {
    if (driverName === "No Active Ride") return [];
    return [
      { 
        id: 1, 
        text: `Hello! I am your driver ${driverName}. I'm on my way.`, 
        sender: 'driver', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
    ];
  });

  const theme = {
    bg: '#000000',
    cyan: '#00f2ff',
    driverBubble: '#1A1A1A',
    userBubble: '#00f2ff',
    border: 'rgba(255,255,255,0.1)'
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputText.trim() || driverName === "No Active Ride") return;

    // 1. User Message
    const userMsg = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // 2. Driver Reply Logic (User kekka kekka onna varum)
    if (replyIndex < driverRepliesPool.length) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const driverReply = {
            id: Date.now() + 1,
            text: driverRepliesPool[replyIndex],
            sender: 'driver',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, driverReply]);
          setReplyIndex(prev => prev + 1); // Next reply-ku index move aagum
        }, 1500);
      }, 800);
    }
  };

  const handleCall = () => {
    if (driverPhone && driverPhone !== "-") {
      window.location.href = `tel:${driverPhone}`;
    } else {
      alert("Driver phone number not available.");
    }
  };

  return (
    <div style={{ backgroundColor: theme.bg, height: '100vh', width: '100vw', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* HEADER */}
      <div style={{ padding: '15px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: theme.cyan, fontSize: '20px', cursor: 'pointer', padding: '5px' }}>❮</button>
          <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#222', display: 'flex', justifyContent: 'center', alignItems: 'center', border: `1px solid ${theme.cyan}`, fontSize: '22px' }}>👨🏻‍✈️</div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{driverName}</div>
            <div style={{ fontSize: '11px', color: theme.cyan }}>{driverName === "No Active Ride" ? "Offline" : "Active Trip • Online"}</div>
          </div>
        </div>
        
        {driverName !== "No Active Ride" && (
          <button onClick={handleCall} style={{ background: 'rgba(0, 242, 255, 0.1)', border: `1px solid ${theme.cyan}`, borderRadius: '50%', width: '40px', height: '40px', color: theme.cyan, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            📞
          </button>
        )}
      </div>

      {/* CHAT AREA */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {driverName === "No Active Ride" ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.6 }}>
             <div style={{ fontSize: '50px', marginBottom: '10px' }}>🚖</div>
             <h3 style={{ color: theme.cyan }}>No Active Trip Found</h3>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ background: msg.sender === 'user' ? theme.userBubble : theme.driverBubble, color: msg.sender === 'user' ? '#000' : '#fff', padding: '12px 16px', borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px', fontSize: '14px' }}>
                  {msg.text}
                </div>
                <span style={{ fontSize: '10px', color: '#555', marginTop: '4px' }}>{msg.time}</span>
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: theme.driverBubble, padding: '10px 15px', borderRadius: '15px', fontSize: '12px', color: theme.cyan }}>
                {driverName} is typing...
              </div>
            )}
            <div ref={chatEndRef} />
          </>
        )}
      </div>

      {/* INPUT BAR */}
      <div style={{ padding: '20px', borderTop: `1px solid ${theme.border}`, display: 'flex', gap: '10px', backgroundColor: '#000' }}>
        <input 
          type="text" 
          disabled={driverName === "No Active Ride"}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={`Message ${driverName}...`} 
          style={{ flex: 1, padding: '15px', borderRadius: '12px', border: '1px solid #333', background: '#111', color: '#fff', outline: 'none' }} 
        />
        <button onClick={handleSendMessage} style={{ background: theme.cyan, border: 'none', borderRadius: '12px', width: '55px', cursor: 'pointer', fontSize: '20px' }}>
          🚀
        </button>
      </div>
    </div>
  );
};

export default DriverChat;