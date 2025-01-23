import { useState, useEffect } from 'react';
import { UserProfile, ValidationErrors } from '../types/types';
import ProfileHeader from '../components/profile/ProfileHeader';
import ContactCard from '../components/profile/ContactCard';
import PaymentMethods from '../components/profile/PaymentCard';
import AddressSection from '../components/profile/AddressCard';
import HealthSection from '../components/profile/HealthCard';
import DependentSection from '../components/profile/DependentCard';
import { Phone, CreditCard, MapPin, Heart, Users } from 'lucide-react';
import { validateProfile } from '../utils/validation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('contact');
  const [profile, setProfile] = useState<UserProfile>({
    memberId: 'MEM123456',
    fullName: '',
    dateOfBirth: '',
    contact: {
      mobileNumber: '',
      email: '',
      preferredContact: 'mobile',
    },
    paymentMethods: [],
    addresses: [],
    healthInfo: {
      conditions: [],
      allergies: [],
      descriptions: {},
    },
    dependents: [],
  });

  const [originalProfile, setOriginalProfile] = useState<UserProfile>(profile);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Compare the current profile with the original profile to track changes
  useEffect(() => {
    JSON.stringify(profile) !== JSON.stringify(originalProfile);
  }, [profile, originalProfile]);

  // Calculate profile completion progress
  const calculateProgress = () => {
    const fields = [
      !!profile.fullName,
      !!profile.dateOfBirth,
      !!profile.contact.email,
      !!profile.contact.mobileNumber,
      profile.paymentMethods.length > 0,
      profile.addresses.length > 0,
      profile.healthInfo.conditions.length > 0 || profile.healthInfo.allergies.length > 0,
    ];

    const completedFields = fields.filter(Boolean).length;
    return (completedFields / fields.length) * 100;
  };

  // Render active tab content based on the current state
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'contact':
        return <ContactCard contact={profile.contact} onChange={(contact) => setProfile({ ...profile, contact })} />;
      case 'payment':
        return <PaymentMethods methods={profile.paymentMethods} onChange={(paymentMethods) => setProfile({ ...profile, paymentMethods })} />;
      case 'address':
        return <AddressSection addresses={profile.addresses} onChange={(addresses) => setProfile({ ...profile, addresses })} />;
      case 'health':
        return <HealthSection healthInfo={profile.healthInfo} onChange={(healthInfo) => setProfile({ ...profile, healthInfo })} />;
      case 'dependents':
        return <DependentSection dependents={profile.dependents} onChange={(dependents) => setProfile({ ...profile, dependents })} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <ProfileHeader profile={profile} progress={calculateProgress()} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Object.keys(validationErrors).length > 0 && (
          <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-md">
            <ul>
              {Object.values(validationErrors).map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="w-56 flex-shrink-0">
            <div className="bg-white shadow rounded-lg overflow-hidden sticky top-8">
              <nav className="flex flex-col">
                {[
                  { id: 'contact', icon: Phone, label: 'Contact' },
                  { id: 'payment', icon: CreditCard, label: 'Payment' },
                  { id: 'address', icon: MapPin, label: 'Address' },
                  { id: 'health', icon: Heart, label: 'Health' },
                  { id: 'dependents', icon: Users, label: 'Dependents' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center px-4 py-3 text-sm font-medium w-full transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            <div className="bg-white shadow rounded-lg">{renderActiveTab()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
