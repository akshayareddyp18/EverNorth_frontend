import { useState } from 'react';
import { Address } from '../../types/types';
import { MapPin, Plus, Trash2, X, Save } from 'lucide-react';

interface Props {
  addresses: Address[];
  onChange: (addresses: Address[]) => void;
}

export default function AddressSection({ addresses, onChange }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasLocalChanges, setHasLocalChanges] = useState(false);
  const [originalAddresses, setOriginalAddresses] = useState(addresses);

  const validateAddress = () => {
    const validationErrors: Record<string, string> = {};
    
    if (!newAddress.line1 || newAddress.line1.length < 5) {
      validationErrors.line1 = 'Address line 1 must be at least 5 characters';
    }
    if (!newAddress.city || newAddress.city.length < 2) {
      validationErrors.city = 'City is required';
    }
    if (!newAddress.state || newAddress.state.length < 2) {
      validationErrors.state = 'State is required';
    }
    if (!newAddress.zipCode || !/^\d{5,6}$/.test(newAddress.zipCode)) {
      validationErrors.zipCode = 'Enter a valid ZIP code';
    }
    if (!newAddress.label) {
      validationErrors.label = 'Address label is required';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validateAddress()) return;
    
    if (addresses.length >= 3) {
      alert('Maximum 3 addresses allowed');
      return;
    }

    const updatedAddresses = [
      ...addresses,
      {
        ...newAddress,
        id: Date.now().toString(),
      } as Address,
    ];
    
    onChange(updatedAddresses);
    setHasLocalChanges(true);
    setShowForm(false);
    setNewAddress({});
  };

  const handleSave = () => {
    setOriginalAddresses(addresses);
    setHasLocalChanges(false);
  };

  const handleCancel = () => {
    onChange(originalAddresses);
    setHasLocalChanges(false);
  };

  const handleDelete = (id: string) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    onChange(updatedAddresses);
    setHasLocalChanges(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Delivery Addresses</h2>
        {!showForm && addresses.length < 3 && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Address
          </button>
        )}
      </div>

      {hasLocalChanges && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-amber-600 text-sm">You have unsaved changes</p>
        </div>
      )}

      {showForm && (
        <div className="mb-6 p-6 border rounded-lg bg-gray-50">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Address Label
              </label>
              <input
                type="text"
                value={newAddress.label || ''}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, label: e.target.value })
                }
                className={`w-full rounded-lg border ${
                  errors.label ? 'border-red-500' : 'border-gray-300'
                } shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g., Home, Office, etc."
              />
              {errors.label && (
                <p className="text-red-500 text-sm">{errors.label}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Address Line 1
              </label>
              <input
                type="text"
                value={newAddress.line1 || ''}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, line1: e.target.value })
                }
                className={`w-full rounded-lg border ${
                  errors.line1 ? 'border-red-500' : 'border-gray-300'
                } shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
                placeholder="Street address"
              />
              {errors.line1 && (
                <p className="text-red-500 text-sm">{errors.line1}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                value={newAddress.line2 || ''}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, line2: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500"
                placeholder="Apartment, suite, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={newAddress.city || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  className={`w-full rounded-lg border ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  value={newAddress.state || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  className={`w-full rounded-lg border ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={newAddress.zipCode || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zipCode: e.target.value.replace(/\D/g, '') })
                  }
                  className={`w-full rounded-lg border ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
                  maxLength={6}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm">{errors.zipCode}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={newAddress.landmark || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, landmark: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowForm(false);
                  setErrors({});
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="p-6 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-gray-400" />
                <div>
                  <div className="flex items-center">
                    <p className="font-medium">{address.label}</p>
                  </div>
                  <p className="text-gray-600">
                    {address.line1}
                    {address.line2 && `, ${address.line2}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  {address.landmark && (
                    <p className="text-sm text-gray-500">
                      Landmark: {address.landmark}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(address.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {hasLocalChanges && (
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <X className="h-4 w-4 mr-2 inline" />
            Cancel Changes
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2 inline" />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}