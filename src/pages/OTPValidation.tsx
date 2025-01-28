import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function OTPValidation() {
  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  // The system's OTP (this would usually be generated dynamically or sent to the user)
  const correctOtp = '123456';

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = () => {
    if (otp === '') {
      setMessage('Please enter the OTP.');
      setIsValid(null);
    } else if (otp === correctOtp) {
      setMessage('OTP is valid!');
      setIsValid(true);
      setTimeout(() => {
      navigate('/welcome'); // Navigate to welcome page
      }, 1000); 
    } else {
      setMessage('Invalid OTP. Please try again.');
      setIsValid(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.header}>OTP Validation</h2>
        <div style={styles.formGroup}>
          <label htmlFor="otp" style={styles.label}>
            Enter OTP:
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
            style={styles.input}
          />
        </div>

        <button onClick={handleSubmit} style={styles.button}>
          Validate OTP
        </button>

        {message && (
          <div
            style={{
              ...styles.message,
              color: isValid === true ? 'green' : isValid === false ? 'red' : 'black',
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

// Define types for styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f7fc',
    padding: '20px',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '8px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    textAlign: 'center',
    maxWidth: '200px',
    marginBottom: '20px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  message: {
    marginTop: '15px',
    fontSize: '14px',
  },
};

export default OTPValidation;
