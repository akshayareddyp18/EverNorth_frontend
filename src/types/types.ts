export interface ValidationFormData {
    memberId: string;
    dateOfBirth: string;
    mobileNumber: string;
  }
  
  export interface OTPValidationStatus {
    isValid: boolean | null;
    message: string;
  }
  export interface ContactInfo {
    mobileNumber: string;
    email: string;
    preferredContact: 'mobile' | 'email' | 'text';
    countryCode?: string;
  }
  
  export interface PaymentMethod {
    id: string;
    type: 'credit' | 'debit' | 'upi';
    cardNumber?: string;
    nameOnCard?: string;
    cardType?: string;
    expiryDate?: string;
    upiId?: string;
    createdAt: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
  }
  
  export interface Address {
    id: string;
    label: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
    landmark?: string;
    isDefault?: boolean;
  }
  
  export interface HealthInfo {
    conditions: string[];
    allergies: string[];
    descriptions: Record<string, string>;
  }
  
  export interface Dependent {
    id: string;
    name: string;
    relation: string;
    dateOfBirth: string;
    mobileNumber: string;
    email: string;
    isEmergencyContact: boolean;
  }
  
  export interface UserProfile {
    memberId: string;
    fullName?: string;
    dateOfBirth?: string;
    photoUrl?: string;
    contact: ContactInfo;
    paymentMethods: PaymentMethod[];
    addresses: Address[];
    healthInfo: HealthInfo;
    dependents: Dependent[];
  }
  
  export interface ValidationErrors {
    [key: string]: string;
  }