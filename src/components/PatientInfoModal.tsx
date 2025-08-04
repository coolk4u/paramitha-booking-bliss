import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, Calendar, Clock, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface PatientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patientInfo: PatientInfo) => void;
  doctor: any;
  specialty: string;
  location: string;
  appointmentDetails?: any;
}

interface PatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const PatientInfoModal = ({ isOpen, onClose, onSubmit, doctor, specialty, location, appointmentDetails }: PatientInfoModalProps) => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (field: keyof PatientInfo, value: string) => {
    setPatientInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!patientInfo.firstName || !patientInfo.lastName || !patientInfo.email || !patientInfo.phone) {
      return;
    }

    // Show success toast with appointment details
    if (appointmentDetails) {
      toast({
        title: "Appointment Confirmed!",
        description: `Your appointment with ${doctor.name} for ${specialty} at ${location} on ${format(appointmentDetails.date, 'PPP')} at ${appointmentDetails.time} (${appointmentDetails.timeSlot}) has been scheduled successfully.`,
      });
    }

    onSubmit(patientInfo);
    
    // Reset form
    setPatientInfo({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
  };

  const handleCancel = () => {
    // Reset form
    setPatientInfo({
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <User className="w-5 h-5" />
            Patient Information
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Appointment Summary */}
          <div className="p-3 bg-gray-50 rounded-lg space-y-2">
            <p className="text-sm text-gray-600">Appointment Summary</p>
            <div className="space-y-1">
              <p className="font-medium text-gray-800">{doctor?.name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <User className="w-3 h-3" />
                {specialty}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </p>
              {appointmentDetails && (
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-2 pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(appointmentDetails.date, 'PPP')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {appointmentDetails.time} ({appointmentDetails.timeSlot})
                  </div>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                value={patientInfo.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter first name"
                required
                className="w-full"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name *
              </Label>
              <Input
                id="lastName"
                type="text"
                value={patientInfo.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter last name"
                required
                className="w-full"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={patientInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
                required
                className="w-full"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={patientInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
                required
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-pink-600 hover:bg-pink-700"
                disabled={!patientInfo.firstName || !patientInfo.lastName || !patientInfo.email || !patientInfo.phone}
              >
                Confirm Appointment
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientInfoModal;
