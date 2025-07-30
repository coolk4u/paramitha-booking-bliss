
import React, { useState } from 'react';
import { X, Calendar, Clock, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const timeSlots = {
  Morning: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
  Afternoon: ['12:00', '12:30', '01:00', '01:30', '02:00', '02:30'],
  Evening: ['05:00', '05:30', '06:00', '06:30', '07:00', '07:30'],
  Night: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30']
};

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduled: (appointmentData: any) => void;
  doctor: any;
  specialty: string;
  location: string;
}

const AppointmentModal = ({ isOpen, onClose, onScheduled, doctor, specialty, location }: AppointmentModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleScheduleAppointment = () => {
    if (!selectedDate || !selectedTimeSlot || !selectedTime) {
      toast({
        title: "Please complete all fields",
        description: "Select date, time slot, and specific time to proceed.",
        variant: "destructive"
      });
      return;
    }

    const appointmentData = {
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      time: selectedTime,
      doctor,
      specialty,
      location
    };

    onScheduled(appointmentData);
    
    // Reset form
    setSelectedDate(undefined);
    setSelectedTimeSlot('');
    setSelectedTime('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            Schedule Consultation Appointment
            <span className="text-pink-500 text-sm">@ {location}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Doctor Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <Avatar className="w-16 h-16">
              <AvatarImage src={doctor.image} alt={doctor.name} />
              <AvatarFallback className="bg-pink-100 text-pink-600 text-lg">
                {doctor.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <User className="w-4 h-4" />
                {specialty}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                {location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">{specialty} OP Consultation</p>
              <p className="text-sm text-blue-600 flex items-center gap-1">
                Available at <span className="text-blue-600">{location}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Date Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Select Date
              </h3>
              <div className="border rounded-lg p-4">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="w-full"
                />
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Select Slot
              </h3>
              
              {selectedDate && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Available Slots for {format(selectedDate, 'do MMMM yyyy, EEEE')}
                  </p>
                  
                  <div className="space-y-3">
                    <p className="font-medium text-gray-700">Date & Time Choice for consultation</p>
                    
                    {/* Time Slot Dropdown */}
                    <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(timeSlots).map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Specific Time Selection */}
                    {selectedTimeSlot && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Available times for {selectedTimeSlot}:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots[selectedTimeSlot as keyof typeof timeSlots].map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className="text-xs"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Schedule Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleScheduleAppointment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              disabled={!selectedDate || !selectedTimeSlot || !selectedTime}
            >
              Next
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
