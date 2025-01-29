import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OTPValidation() {
  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const correctOtp = '123456'; // Replace with dynamic OTP validation

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
        navigate('/welcome');
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
              color: isValid === true ? 'green' : isValid === false ? 'red' : '#333',
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

// Define styles with a modern UI look
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#eaf2ff', // Light blue background
    padding: '20px',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
    padding: '25px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '8px',
    color: '#34495e',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '18px',
    border: '2px solid #3498db',
    borderRadius: '6px',
    textAlign: 'center',
    maxWidth: '220px',
    margin: '0 auto',
    display: 'block',
    outline: 'none',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#007bff', // Blue button
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '15px',
  },
  message: {
    marginTop: '15px',
    fontSize: '16px',
    fontWeight: '500',
  },
};

// Add hover effect separately
//styles.button[':hover'] = {
//  backgroundColor: '#0056b3', // Darker blue on hover
//};

export default OTPValidation;
