import { useState } from 'react';
import { ContactInfo } from '../../types/types';
import { Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';

interface Props {
  contact: ContactInfo;
  onChange: (contact: ContactInfo) => void;
}

const countryCodes = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+81', country: 'Japan' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+39', country: 'Italy' },
  { code: '+86', country: 'China' },
  { code: '+7', country: 'Russia' },
  { code: '+971', country: 'UAE' },
  { code: '+82', country: 'South Korea' },
  { code: '+55', country: 'Brazil' },
  { code: '+34', country: 'Spain' },
  { code: '+27', country: 'South Africa' },
  { code: '+92', country: 'Pakistan' },
  { code: '+62', country: 'Indonesia' },
  { code: '+20', country: 'Egypt' },
  { code: '+52', country: 'Mexico' },
  { code: '+66', country: 'Thailand' }
];

export default function ContactCard({ contact, onChange }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState(contact);
  const [hasChanges, setHasChanges] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(contact.countryCode || '+91');

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setEditedContact((prev) => {
      const updated = { ...prev, [field]: value };
      setHasChanges(updated[field] !== contact[field]);
      setIsVerified(false); // Reset verification status on edit
      return updated;
    });
  };

  const handleVerifyNumber = () => {
    const mobileNumber = editedContact.mobileNumber.trim();

    // Check if the mobile number is exactly 10 digits, contains no non-numeric characters, and doesn't start with 0
    const mobileRegex = /^(?!0)[0-9]{10}$/;

    if (mobileRegex.test(mobileNumber)) {
      setIsVerified(true);
    } else {
      alert("Please enter a valid 10-digit mobile number starting with a non-zero digit.");
      setIsVerified(false);
    }
  };

  const handleSave = () => {
    if (hasChanges) {
      onChange({ ...editedContact, countryCode: selectedCountryCode }); // Save country code
      setIsEditing(false);
      setHasChanges(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContact(contact);
    setHasChanges(false);
    setIsVerified(false);
    setSelectedCountryCode(contact.countryCode || '+91');
  };

  return (
    <div className="p-8 relative">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
        {!isEditing && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => {
              setIsEditing(true);
              setEditedContact(contact);
              setHasChanges(false);
            }}
          >
            Edit Profile
          </button>
        )}
      </div>
  
      <div className="max-w-2xl space-y-6">
        {/* Mobile Number Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <div className="relative flex items-center">
            {/* Country Code Selector */}
            <select
              className="px-3 py-3 border border-gray-300 bg-gray-50 rounded-l-lg text-gray-700"
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
              disabled={!isEditing}
            >
              {countryCodes.map(({ code, country }) => (
                <option key={code} value={code}>
                  {code} ({country})
                </option>
              ))}
            </select>
  
            {/* Mobile Number Input */}
            <div className="relative w-full">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={editedContact.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                className={`pl-10 w-full rounded-r-lg border border-gray-300 shadow-sm py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isVerified ? 'border-green-500' : ''
                }`}
                placeholder="Enter your mobile number"
                disabled={!isEditing}
              />
              {isVerified && <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />}
            </div>
          </div>
  
          {/* Verify Button */}
          {isEditing && (
            <button
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              onClick={handleVerifyNumber}
            >
              Verify Number
            </button>
          )}
        </div>
  
        {/* Email Address Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {isEditing ? (
              <input
                type="email"
                value={editedContact.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 shadow-sm py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email address"
              />
            ) : (
              <p className="pl-10 py-3 border border-gray-300 rounded-lg bg-gray-50">
                {contact.email || 'Not provided'}
              </p>
            )}
          </div>
        </div>
  
        {/* Preferred Contact Method Section */}
        <div className="space-y-4 pt-4">
          <label className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'mobile', icon: Phone, label: 'Phone Call' },
              { value: 'email', icon: Mail, label: 'Email' },
              { value: 'text', icon: MessageSquare, label: 'Text Message' },
            ].map(({ value, icon: Icon, label }) => (
              <label
                key={value}
                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  editedContact.preferredContact === value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={value}
                  disabled={!isEditing}
                  checked={editedContact.preferredContact === value}
                  onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                  className="sr-only"
                />
                <Icon
                  className={`h-6 w-6 mb-2 ${
                    editedContact.preferredContact === value ? 'text-blue-500' : 'text-gray-400'
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    editedContact.preferredContact === value ? 'text-blue-700' : 'text-gray-700'
                  }`}
                >
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
  
        {/* Save and Cancel Buttons */}
        {isEditing && (
          <div className="flex justify-end mt-6 gap-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 rounded-md transition ${
                hasChanges ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}