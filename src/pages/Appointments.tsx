
import React, { useState } from 'react';
import { Calendar, Clock, User, Stethoscope, Heart, Eye, Baby, Bone, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const specialties = [
  { id: 1, name: 'Cardiology', icon: Heart, color: 'bg-red-100 text-red-600' },
  { id: 2, name: 'Orthopedics', icon: Bone, color: 'bg-blue-100 text-blue-600' },
  { id: 3, name: 'Neurology', icon: Brain, color: 'bg-purple-100 text-purple-600' },
  { id: 4, name: 'Pediatrics', icon: Baby, color: 'bg-pink-100 text-pink-600' },
  { id: 5, name: 'Ophthalmology', icon: Eye, color: 'bg-green-100 text-green-600' },
  { id: 6, name: 'General Medicine', icon: Stethoscope, color: 'bg-orange-100 text-orange-600' },
];

const doctors = {
  1: [
    { id: 1, name: 'Dr. Rajesh Kumar', experience: '15 years', rating: 4.8, image: '/placeholder.svg' },
    { id: 2, name: 'Dr. Priya Sharma', experience: '12 years', rating: 4.9, image: '/placeholder.svg' },
  ],
  2: [
    { id: 3, name: 'Dr. Amit Singh', experience: '18 years', rating: 4.7, image: '/placeholder.svg' },
    { id: 4, name: 'Dr. Sunita Patel', experience: '10 years', rating: 4.8, image: '/placeholder.svg' },
  ],
  3: [
    { id: 5, name: 'Dr. Vikram Reddy', experience: '20 years', rating: 4.9, image: '/placeholder.svg' },
    { id: 6, name: 'Dr. Meera Joshi', experience: '14 years', rating: 4.8, image: '/placeholder.svg' },
  ],
  4: [
    { id: 7, name: 'Dr. Rohit Gupta', experience: '8 years', rating: 4.7, image: '/placeholder.svg' },
    { id: 8, name: 'Dr. Kavya Nair', experience: '11 years', rating: 4.9, image: '/placeholder.svg' },
  ],
  5: [
    { id: 9, name: 'Dr. Arjun Menon', experience: '16 years', rating: 4.8, image: '/placeholder.svg' },
    { id: 10, name: 'Dr. Shalini Das', experience: '9 years', rating: 4.6, image: '/placeholder.svg' },
  ],
  6: [
    { id: 11, name: 'Dr. Kiran Bhat', experience: '13 years', rating: 4.7, image: '/placeholder.svg' },
    { id: 12, name: 'Dr. Deepa Rao', experience: '17 years', rating: 4.9, image: '/placeholder.svg' },
  ],
};

const timeSlots = {
  morning: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45'],
  afternoon: ['12:00', '12:15', '12:30', '12:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45'],
  evening: ['05:00', '05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45'],
};

const Appointments = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleSpecialtySelect = (specialty: any) => {
    setSelectedSpecialty(specialty.id);
    setSelectedDoctor(null);
    setCurrentStep(2);
  };

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setCurrentStep(3);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime('');
    setCurrentStep(4);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleScheduleAppointment = () => {
    const specialty = specialties.find(s => s.id === selectedSpecialty);
    toast({
      title: "Appointment Confirmed!",
      description: `Your appointment with ${selectedDoctor.name} for ${specialty?.name} on ${format(selectedDate!, 'PPP')} at ${selectedTime} has been scheduled successfully.`,
    });
    
    // Reset form
    setSelectedSpecialty(null);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime('');
    setCurrentStep(1);
  };

  const renderTimeSlots = (period: 'morning' | 'afternoon' | 'evening', title: string) => (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4" />
        {title}
      </h4>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {timeSlots[period].map((time) => (
          <Button
            key={time}
            variant={selectedTime === time ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeSelect(time)}
            className="text-xs hover:bg-blue-50 transition-colors"
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Book Your Appointment</h1>
          <p className="text-gray-600">Schedule your visit with our expert doctors</p>
          
          {/* Progress Steps */}
          <div className="flex items-center mt-6 space-x-4 overflow-x-auto">
            {[
              { step: 1, title: 'Select Specialty', icon: Stethoscope },
              { step: 2, title: 'Choose Doctor', icon: User },
              { step: 3, title: 'Pick Date', icon: Calendar },
              { step: 4, title: 'Select Time', icon: Clock },
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center space-x-2 whitespace-nowrap">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? '✓' : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-sm font-medium ${
                  currentStep >= step ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Step 1: Select Specialty */}
        {currentStep >= 1 && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Stethoscope className="w-5 h-5" />
                Select Medical Specialty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {specialties.map((specialty) => {
                  const IconComponent = specialty.icon;
                  return (
                    <Card
                      key={specialty.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                        selectedSpecialty === specialty.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleSpecialtySelect(specialty)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${specialty.color}`}>
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <h3 className="font-semibold text-gray-800">{specialty.name}</h3>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Doctor */}
        {currentStep >= 2 && selectedSpecialty && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <User className="w-5 h-5" />
                Choose Your Doctor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors[selectedSpecialty as keyof typeof doctors]?.map((doctor) => (
                  <Card
                    key={doctor.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedDoctor?.id === doctor.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover bg-gray-200"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.experience} experience</p>
                          <div className="flex items-center mt-2">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600 ml-1">{doctor.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Select Date */}
        {currentStep >= 3 && selectedDoctor && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Calendar className="w-5 h-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  const isToday = new Date().toDateString() === date.toDateString();
                  
                  return (
                    <Button
                      key={i}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleDateSelect(date)}
                      className={`h-10 ${isToday ? 'ring-1 ring-blue-300' : ''} hover:bg-blue-50 transition-colors`}
                    >
                      {date.getDate()}
                    </Button>
                  );
                })}
              </div>
              {selectedDate && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 font-medium">Selected Date: {format(selectedDate, 'PPP')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 4: Select Time */}
        {currentStep >= 4 && selectedDate && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Clock className="w-5 h-5" />
                Select Time Slot
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderTimeSlots('morning', 'Morning (9:00 AM - 12:00 PM)')}
              {renderTimeSlots('afternoon', 'Afternoon (12:00 PM - 3:00 PM)')}
              {renderTimeSlots('evening', 'Evening (5:00 PM - 8:00 PM)')}
              
              {selectedTime && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">Appointment Summary</h3>
                  <div className="space-y-2 text-sm text-green-700">
                    <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
                    <p><strong>Specialty:</strong> {specialties.find(s => s.id === selectedSpecialty)?.name}</p>
                    <p><strong>Date:</strong> {format(selectedDate, 'PPP')}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                  </div>
                  <Button 
                    onClick={handleScheduleAppointment}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    Schedule Appointment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Appointments;
