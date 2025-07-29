
import React, { useState } from 'react';
import { Calendar, Clock, User, Stethoscope, Heart, Eye, Baby, Bone, Brain, ArrowLeft, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import AppointmentModal from '@/components/AppointmentModal';

const specialties = [
  { id: 1, name: 'General paediatric specialty', icon: Baby, color: 'bg-pink-100 text-pink-600' },
  { id: 2, name: 'Neonatology', icon: Heart, color: 'bg-red-100 text-red-600' },
  { id: 3, name: 'Obstetrics and gynecology', icon: User, color: 'bg-purple-100 text-purple-600' },
  { id: 4, name: 'Pediatric surgery', icon: Bone, color: 'bg-blue-100 text-blue-600' },
  { id: 5, name: 'Neuropathology', icon: Brain, color: 'bg-green-100 text-green-600' },
  { id: 6, name: 'Pediatric pulmonology', icon: Stethoscope, color: 'bg-orange-100 text-orange-600' },
];

const locations = [
  { 
    id: 1, 
    name: 'Kompally', 
    address: '38, NCL Enclave South, Caton Residential Twp, Jeedimetla, Hyderabad',
    image: '/placeholder.svg'
  },
  { 
    id: 2, 
    name: 'Chintal', 
    address: '01, Andhra Pradesh Housing Board Colony, APHB Colony, MIG-1, Balanagar',
    image: '/placeholder.svg'
  },
  { 
    id: 3, 
    name: 'Medipally', 
    address: 'CH5X+586, beside Apex Hospital, Om Vihar Colony, Sri Sai Nagar, Canara Nagar',
    image: '/placeholder.svg'
  },
  { 
    id: 4, 
    name: 'Kothapet', 
    address: '2, polkampally, Dwarka Nagar, L. B. Nagar',
    image: '/placeholder.svg'
  },
  { 
    id: 5, 
    name: 'Chandannagar', 
    address: 'F8WC+68H, NH 65, Gouthami Nagar Colony, Jawahar Colony, Chanda Nagar',
    image: '/placeholder.svg'
  },
  { 
    id: 6, 
    name: 'Madinaguda', 
    address: 'Main Road Madinaguda, Ramakrishna Nagar, Hafeezpet, Miyapur',
    image: '/placeholder.svg'
  },
];

const doctors = {
  1: {
    1: [
      { id: 1, name: 'Dr. Rajesh Kumar', experience: '15 years', rating: 4.8, image: '/placeholder.svg' },
      { id: 2, name: 'Dr. Priya Sharma', experience: '12 years', rating: 4.9, image: '/placeholder.svg' },
    ],
    2: [
      { id: 3, name: 'Dr. Amit Singh', experience: '18 years', rating: 4.7, image: '/placeholder.svg' },
      { id: 4, name: 'Dr. Sunita Patel', experience: '10 years', rating: 4.8, image: '/placeholder.svg' },
    ],
  },
  2: {
    1: [
      { id: 5, name: 'Dr. Vikram Reddy', experience: '20 years', rating: 4.9, image: '/placeholder.svg' },
      { id: 6, name: 'Dr. Meera Joshi', experience: '14 years', rating: 4.8, image: '/placeholder.svg' },
    ],
    2: [
      { id: 7, name: 'Dr. Rohit Gupta', experience: '8 years', rating: 4.7, image: '/placeholder.svg' },
      { id: 8, name: 'Dr. Kavya Nair', experience: '11 years', rating: 4.9, image: '/placeholder.svg' },
    ],
  },
  3: {
    1: [
      { id: 9, name: 'Dr. Arjun Menon', experience: '16 years', rating: 4.8, image: '/placeholder.svg' },
      { id: 10, name: 'Dr. Shalini Das', experience: '9 years', rating: 4.6, image: '/placeholder.svg' },
    ],
    3: [
      { id: 11, name: 'Dr. Kiran Bhat', experience: '13 years', rating: 4.7, image: '/placeholder.svg' },
      { id: 12, name: 'Dr. Deepa Rao', experience: '17 years', rating: 4.9, image: '/placeholder.svg' },
    ],
  },
  4: {
    1: [
      { id: 13, name: 'Dr. Anil Kumar', experience: '22 years', rating: 4.9, image: '/placeholder.svg' },
      { id: 14, name: 'Dr. Pooja Reddy', experience: '15 years', rating: 4.8, image: '/placeholder.svg' },
    ],
    4: [
      { id: 15, name: 'Dr. Suresh Babu', experience: '19 years', rating: 4.7, image: '/placeholder.svg' },
      { id: 16, name: 'Dr. Lakshmi Devi', experience: '12 years', rating: 4.8, image: '/placeholder.svg' },
    ],
  },
  5: {
    1: [
      { id: 17, name: 'Dr. Ravi Shankar', experience: '25 years', rating: 4.9, image: '/placeholder.svg' },
      { id: 18, name: 'Dr. Madhavi Latha', experience: '18 years', rating: 4.8, image: '/placeholder.svg' },
    ],
    5: [
      { id: 19, name: 'Dr. Venkat Rao', experience: '16 years', rating: 4.7, image: '/placeholder.svg' },
      { id: 20, name: 'Dr. Sneha Reddy', experience: '13 years', rating: 4.8, image: '/placeholder.svg' },
    ],
  },
  6: {
    1: [
      { id: 21, name: 'Dr. Prasad Kumar', experience: '20 years', rating: 4.9, image: '/placeholder.svg' },
      { id: 22, name: 'Dr. Swathi Devi', experience: '14 years', rating: 4.8, image: '/placeholder.svg' },
    ],
    6: [
      { id: 23, name: 'Dr. Mohan Babu', experience: '17 years', rating: 4.7, image: '/placeholder.svg' },
      { id: 24, name: 'Dr. Ramya Sree', experience: '11 years', rating: 4.8, image: '/placeholder.svg' },
    ],
  },
};

const Appointments = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<number | null>(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specialtySearch, setSpecialtySearch] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleSpecialtySelect = (specialty: any) => {
    setSelectedSpecialty(specialty.id);
    setSelectedDoctor(null);
  };

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const selectedSpecialtyData = specialties.find(s => s.id === selectedSpecialty);
  const selectedLocationData = locations.find(l => l.id === selectedLocation);
  
  const filteredSpecialties = specialties.filter(specialty => 
    specialty.name.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  const availableDoctors = selectedSpecialty && selectedLocation 
    ? doctors[selectedSpecialty as keyof typeof doctors]?.[selectedLocation as keyof typeof doctors[1]] || []
    : [];

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

        {/* Location Selection */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <MapPin className="w-5 h-5" />
              Select Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <MapPin className="w-4 h-4 text-pink-600" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locations.map((location) => (
                <Card
                  key={location.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                    selectedLocation === location.id ? 'ring-2 ring-pink-500 bg-pink-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedLocation(location.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-12 h-12 rounded-lg object-cover bg-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{location.name}</h3>
                        <p className="text-sm text-gray-600">{location.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Specialty Selection */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Stethoscope className="w-5 h-5" />
              Speciality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search Speciality here"
                  value={specialtySearch}
                  onChange={(e) => setSpecialtySearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              {filteredSpecialties.map((specialty) => (
                <div
                  key={specialty.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedSpecialty === specialty.id ? 'bg-pink-50 border-2 border-pink-500' : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                  onClick={() => handleSpecialtySelect(specialty)}
                >
                  <div className={`w-4 h-4 border-2 rounded ${
                    selectedSpecialty === specialty.id ? 'border-pink-500 bg-pink-500' : 'border-gray-300'
                  }`}>
                    {selectedSpecialty === specialty.id && (
                      <div className="w-full h-full bg-pink-500 rounded-sm"></div>
                    )}
                  </div>
                  <span className="text-gray-800">{specialty.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Doctor Selection */}
        {selectedSpecialty && selectedLocation && (
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <User className="w-5 h-5" />
                Choose Your Doctor - {selectedSpecialtyData?.name}
                <span className="text-sm text-pink-600">@ {selectedLocationData?.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableDoctors.map((doctor) => (
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
              {availableDoctors.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No doctors available for this specialty at the selected location.
                </div>
              )}
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
            location={selectedLocationData?.name || ''}
          />
        )}
      </div>
    </div>
  );
};

export default Appointments;
