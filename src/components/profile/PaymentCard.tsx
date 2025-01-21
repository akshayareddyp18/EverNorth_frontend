import { useState } from 'react';
import { PaymentMethod } from '../../types/types';
import { CreditCard, Plus, Trash2, X, Save } from 'lucide-react';

interface Props {
  methods: PaymentMethod[];
  onChange: (methods: PaymentMethod[]) => void;
}

export default function PaymentMethods({ methods, onChange }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newMethod, setNewMethod] = useState<Partial<PaymentMethod>>({
    type: 'credit',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasLocalChanges, setHasLocalChanges] = useState(false);
  const [originalMethods, setOriginalMethods] = useState(methods);

  const validatePaymentMethod = () => {
    const validationErrors: Record<string, string> = {};
    
    if (newMethod.type !== 'upi') {
      if (!newMethod.cardNumber || !/^\d{16}$/.test(newMethod.cardNumber)) {
        validationErrors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!newMethod.nameOnCard || newMethod.nameOnCard.length < 3) {
        validationErrors.nameOnCard = 'Name on card is required';
      }
      if (!newMethod.expiryDate || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(newMethod.expiryDate)) {
        validationErrors.expiryDate = 'Enter a valid expiry date (MM/YY)';
      }
    } else {
      if (!newMethod.upiId || !/^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/.test(newMethod.upiId)) {
        validationErrors.upiId = 'Enter a valid UPI ID';
      }
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validatePaymentMethod()) return;
    
    if (methods.length >= 1) {
      alert('Only one payment method allowed');
      return;
    }

    const updatedMethods = [
      ...methods,
      {
        ...newMethod,
        id: Date.now().toString(),
      } as PaymentMethod,
    ];
    
    onChange(updatedMethods);
    setHasLocalChanges(true);
    setShowForm(false);
    setNewMethod({ type: 'credit' });
  };

  const handleSave = () => {
    setOriginalMethods(methods);
    setHasLocalChanges(false);
  };

  const handleCancel = () => {
    onChange(originalMethods);
    setHasLocalChanges(false);
  };

  const handleDelete = (id: string) => {
    const updatedMethods = methods.filter((method) => method.id !== id);
    onChange(updatedMethods);
    setHasLocalChanges(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Payment Method</h2>
        {!showForm && methods.length === 0 && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Payment Method
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
                Payment Type
              </label>
              <select
                value={newMethod.type}
                onChange={(e) =>
                  setNewMethod({ ...newMethod, type: e.target.value as PaymentMethod['type'] })
                }
                className="w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500"
              >
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            {newMethod.type !== 'upi' ? (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    value={newMethod.cardNumber || ''}
                    onChange={(e) =>
                      setNewMethod({ ...newMethod, cardNumber: e.target.value.replace(/\D/g, '') })
                    }
                    className={`w-full rounded-lg border ${
                      errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter 16-digit card number"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={newMethod.nameOnCard || ''}
                    onChange={(e) =>
                      setNewMethod({ ...newMethod, nameOnCard: e.target.value })
                    }
                    className={`w-full rounded-lg border ${
                      errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter name as shown on card"
                  />
                  {errors.nameOnCard && (
                    <p className="text-red-500 text-sm">{errors.nameOnCard}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={newMethod.expiryDate || ''}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        setNewMethod({ ...newMethod, expiryDate: value })
                      }}
                      className={`w-full rounded-lg border ${
                        errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                      } shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-sm">{errors.expiryDate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Card Type
                    </label>
                    <select
                      value={newMethod.cardType || ''}
                      onChange={(e) =>
                        setNewMethod({ ...newMethod, cardType: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={newMethod.upiId || ''}
                  onChange={(e) =>
                    setNewMethod({ ...newMethod, upiId: e.target.value })
                  }
                  className={`w-full rounded-lg border ${
                    errors.upiId ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
                  placeholder="username@upi"
                />
                {errors.upiId && (
                  <p className="text-red-500 text-sm">{errors.upiId}</p>
                )}
              </div>
            )}

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
                Add Payment Method
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className="p-6 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-6 w-6 text-gray-400" />
                <div>
                  {method.type === 'upi' ? (
                    <p className="font-medium">{method.upiId}</p>
                  ) : (
                    <>
                      <p className="font-medium">
                        {method.nameOnCard} - **** {method.cardNumber?.slice(-4)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Expires {method.expiryDate} • {method.cardType}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(method.id)}
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