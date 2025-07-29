
import React, { useState } from 'react';
import { Calendar, Clock, User, Stethoscope, Heart, Eye, Baby, Bone, Brain, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import AppointmentModal from '@/components/AppointmentModal';

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

const Appointments = () => {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpecialtySelect = (specialty: any) => {
    setSelectedSpecialty(specialty.id);
    setSelectedDoctor(null);
  };

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const selectedSpecialtyData = specialties.find(s => s.id === selectedSpecialty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Paramitha Hospitals</h1>
              <p className="text-sm text-pink-600">For Woman & Children</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Emergency</span>
            <span className="font-semibold">+91 40 287 22122</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Your Appointment</h1>
          <p className="text-gray-600">Schedule your visit with our expert doctors</p>
        </div>

        {/* Step 1: Select Specialty */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
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
                      selectedSpecialty === specialty.id ? 'ring-2 ring-pink-500 bg-pink-50' : 'hover:bg-gray-50'
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

        {/* Step 2: Select Doctor */}
        {selectedSpecialty && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <User className="w-5 h-5" />
                Choose Your Doctor - {selectedSpecialtyData?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors[selectedSpecialty as keyof typeof doctors]?.map((doctor) => (
                  <Card
                    key={doctor.id}
                    className="cursor-pointer transition-all duration-300 hover:shadow-md hover:bg-gray-50"
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
                        <Button 
                          className="bg-pink-600 hover:bg-pink-700 text-white"
                          size="sm"
                        >
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Appointment Modal */}
        {selectedDoctor && (
          <AppointmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            doctor={selectedDoctor}
            specialty={selectedSpecialtyData?.name || ''}
          />
        )}
      </div>
    </div>
  );
};

export default Appointments;
