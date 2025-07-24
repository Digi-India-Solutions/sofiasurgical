import React, { useState } from 'react';
import './ResetPassword.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { id, token } = useParams();

  const navigate = useNavigate();

  const handleReset = async(e) => {
    e.preventDefault();
     if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
    
      try {
      const res =  await axios.post(`https://api.sofiasurgicals.com/api/reset-password/${id}/${token}`, {
          password: newPassword,
        });
        if (res.status === 200) {
          toast.success('Password reset successfully!');
          navigate('/login');
        } else {
          toast.error('Failed to reset password. Please try again.');
        }

      } catch (error) {
        console.error('Error resetting password:', error);
        toast.error(error.response.data.message || 'Failed to reset password. Please try again.');
        
      }
    
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-box">
        <h2>Reset Your Password 🔒</h2>
        <p>Please enter your new password</p>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
