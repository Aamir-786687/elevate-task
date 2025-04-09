import React, { useState, useRef, useEffect } from 'react';
import './OTPInput.css';


const OTPInput = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    const countdown = timer > 0 && setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (e, i) => {
    const val = e.target.value;
    if (!/^[0-9]?$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);

    if (val && i < 5) inputRefs.current[i + 1].focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace') {
      if (otp[i]) {
        const newOtp = [...otp];
        newOtp[i] = '';
        setOtp(newOtp);
      } else if (i > 0) {
        inputRefs.current[i - 1].focus();
      }
    }
    if (e.key === 'ArrowLeft' && i > 0) {
      inputRefs.current[i - 1].focus();
    }
    if (e.key === 'ArrowRight' && i < 5) {
      inputRefs.current[i + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pasteData.every(d => /^\d$/.test(d))) {
      setOtp(pasteData);
      inputRefs.current[5].focus();
    }
    e.preventDefault();
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6 || !/^\d{6}$/.test(enteredOtp)) {
      setError('Invalid OTP');
      setSuccess('');
    } else {
      setSuccess('OTP Verified!');
      setError('');
    }
  };

  const handleResend = () => {
    setOtp(Array(6).fill(''));
    setTimer(30);
    setError('');
    setSuccess('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(otp.join(''));
  };

  return (
    <div className="otp-container">
  <h2 className="otp-title">Enter OTP</h2>
  <div className="otp-inputs">
    {otp.map((digit, i) => (
      <input
        key={i}
        ref={el => inputRefs.current[i] = el}
        type="text"
        className="otp-input"
        // ... other props
      />
    ))}
  </div>

  {error && <p className="otp-message error">{error}</p>}
  {success && <p className="otp-message success">{success}</p>}

  <button onClick={handleSubmit} className="otp-button">Submit OTP</button>

  <div className="otp-actions">
    <button onClick={handleResend} disabled={timer > 0} className="resend-btn">
      {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
    </button>
    <button onClick={handleCopy} className="copy-btn">Copy OTP</button>
  </div>
</div>

  );
};

export default OTPInput;
