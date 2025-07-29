
import React, { useState } from 'react';
import { Calendar, Clock, User, Stethoscope, Heart, Eye, Baby, Bone, Brain, ArrowLeft, MapPin, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  const [doctorSearch, setDoctorSearch] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

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

  const filteredDoctors = availableDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(doctorSearch.toLowerCase());
    
    const matchesExperience = experienceFilter === 'all' || 
      (experienceFilter === '10+' && parseInt(doctor.experience) >= 10) ||
      (experienceFilter === '15+' && parseInt(doctor.experience) >= 15) ||
      (experienceFilter === '20+' && parseInt(doctor.experience) >= 20);
    
    const matchesRating = ratingFilter === 'all' ||
      (ratingFilter === '4.5+' && doctor.rating >= 4.5) ||
      (ratingFilter === '4.8+' && doctor.rating >= 4.8);
    
    return matchesSearch && matchesExperience && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Paramitha Hospitals</h1>
              <p className="text-xs text-pink-600">For Woman & Children</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 hidden sm:inline">Emergency</span>
            <span className="font-semibold">+91 40 287 22122</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Book Your Appointment</h1>
          <p className="text-gray-600 text-sm">Schedule your visit with our expert doctors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Location & Specialty */}
          <div className="lg:col-span-1 space-y-4">
            {/* Location Selection */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                  <MapPin className="w-4 h-4" />
                  Select Location
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xs text-gray-600 mb-3 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-pink-600" />
                  <span>Hyderabad, Telangana, India</span>
                </div>
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <Card
                        key={location.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedLocation === location.id ? 'ring-1 ring-pink-500 bg-pink-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedLocation(location.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start space-x-3">
                            <img
                              src={location.image}
                              alt={location.name}
                              className="w-8 h-8 rounded object-cover bg-gray-200 flex-shrink-0 mt-1"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-800 text-sm">{location.name}</h3>
                              <p className="text-xs text-gray-600 line-clamp-2">{location.address}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Specialty Selection */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                  <Stethoscope className="w-4 h-4" />
                  Speciality
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-3">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Search Speciality"
                      value={specialtySearch}
                      onChange={(e) => setSpecialtySearch(e.target.value)}
                      className="pl-9 h-8 text-sm"
                    />
                  </div>
                </div>
                <ScrollArea className="h-48">
                  <div className="space-y-1">
                    {filteredSpecialties.map((specialty) => (
                      <div
                        key={specialty.id}
                        className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-all text-sm ${
                          selectedSpecialty === specialty.id ? 'bg-pink-50 border border-pink-500' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleSpecialtySelect(specialty)}
                      >
                        <div className={`w-3 h-3 border rounded ${
                          selectedSpecialty === specialty.id ? 'border-pink-500 bg-pink-500' : 'border-gray-300'
                        }`}>
                          {selectedSpecialty === specialty.id && (
                            <div className="w-full h-full bg-pink-500 rounded-sm"></div>
                          )}
                        </div>
                        <span className="text-gray-800 text-xs leading-tight">{specialty.name}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Doctors */}
          <div className="lg:col-span-2">
            {selectedSpecialty && selectedLocation ? (
              <Card className="shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                      <User className="w-4 h-4" />
                      Doctors - {selectedSpecialtyData?.name}
                      <span className="text-xs text-pink-600">@ {selectedLocationData?.name}</span>
                    </CardTitle>
                  </div>
                  
                  {/* Filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                    <div className="relative">
                      <Search className="w-3 h-3 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Search doctors"
                        value={doctorSearch}
                        onChange={(e) => setDoctorSearch(e.target.value)}
                        className="pl-9 h-8 text-sm"
                      />
                    </div>
                    <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Experience</SelectItem>
                        <SelectItem value="10+">10+ Years</SelectItem>
                        <SelectItem value="15+">15+ Years</SelectItem>
                        <SelectItem value="20+">20+ Years</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={ratingFilter} onValueChange={setRatingFilter}>
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue placeholder="Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="4.5+">4.5+ Rating</SelectItem>
                        <SelectItem value="4.8+">4.8+ Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ScrollArea className="h-96">
                    <div className="grid grid-cols-1 gap-3">
                      {filteredDoctors.map((doctor) => (
                        <Card
                          key={doctor.id}
                          className="cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-gray-50"
                          onClick={() => handleDoctorSelect(doctor)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-12 h-12 rounded-full object-cover bg-gray-200 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-800 text-sm">{doctor.name}</h3>
                                <p className="text-xs text-gray-600">{doctor.experience} experience</p>
                                <div className="flex items-center mt-1">
                                  <span className="text-yellow-500 text-xs">★</span>
                                  <span className="text-xs text-gray-600 ml-1">{doctor.rating}/5</span>
                                </div>
                              </div>
                              <Button 
                                className="bg-pink-600 hover:bg-pink-700 text-white h-8 px-4 text-xs"
                                size="sm"
                              >
                                Book Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {filteredDoctors.length === 0 && (
                      <div className="text-center py-8 text-gray-500 text-sm">
                        {availableDoctors.length === 0 
                          ? "No doctors available for this specialty at the selected location."
                          : "No doctors match your search criteria."
                        }
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-md">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <Stethoscope className="w-12 h-12 mx-auto mb-2" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Select Location & Specialty</h3>
                  <p className="text-gray-500 text-sm">Choose a location and specialty to view available doctors</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

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
