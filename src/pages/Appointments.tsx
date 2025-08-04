import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Heart,
  Eye,
  Baby,
  Bone,
  Brain,
  ArrowLeft,
  MapPin,
  Search,
  Filter,
  Building2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppointmentModal from "@/components/AppointmentModal";
import PatientInfoModal from "@/components/PatientInfoModal";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns"; // Added format import

const specialties = [
  {
    id: 1,
    name: "General paediatric specialty",
    icon: Baby,
    color: "bg-pink-100 text-pink-600",
  },
  { id: 2, name: "Neonatology", icon: Heart, color: "bg-red-100 text-red-600" },
  {
    id: 3,
    name: "Obstetrics and gynecology",
    icon: User,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    name: "Pediatric surgery",
    icon: Bone,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 5,
    name: "Neuropathology",
    icon: Brain,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 6,
    name: "Pediatric pulmonology",
    icon: Stethoscope,
    color: "bg-orange-100 text-orange-600",
  },
];

const locations = [
  {
    id: 1,
    name: "Kompally",
    address:
      "38, NCL Enclave South, Caton Residential Twp, Jeedimetla, Hyderabad",
    image:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Chintal",
    address:
      "01, Andhra Pradesh Housing Board Colony, APHB Colony, MIG-1, Balanagar",
    image:
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Medipally",
    address:
      "CH5X+586, beside Apex Hospital, Om Vihar Colony, Sri Sai Nagar, Canara Nagar",
    image:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Kothapet",
    address: "2, polkampally, Dwarka Nagar, L. B. Nagar",
    image:
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Chandannagar",
    address:
      "F8WC+68H, NH 65, Gouthami Nagar Colony, Jawahar Colony, Chanda Nagar",
    image:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Madinaguda",
    address: "Main Road Madinaguda, Ramakrishna Nagar, Hafeezpet, Miyapur",
    image:
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=300&fit=crop",
  },
];

const doctors = {
  1: {
    1: [
      {
        id: 1,
        name: "Dr. Rajesh Kumar",
        experience: "15 years",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      },
      {
        id: 2,
        name: "Dr. Priya Sharma",
        experience: "12 years",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      },
    ],
    2: [
      {
        id: 3,
        name: "Dr. Amit Singh",
        experience: "18 years",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
      },
      {
        id: 4,
        name: "Dr. Sunita Patel",
        experience: "10 years",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1594824506107-46d80b5b7c70?w=400&h=400&fit=crop",
      },
    ],
  },
  2: {
    1: [
      {
        id: 5,
        name: "Dr. Vikram Reddy",
        experience: "20 years",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      },
      {
        id: 6,
        name: "Dr. Meera Joshi",
        experience: "14 years",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop",
      },
    ],
    2: [
      {
        id: 7,
        name: "Dr. Rohit Gupta",
        experience: "8 years",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      },
      {
        id: 8,
        name: "Dr. Kavya Nair",
        experience: "11 years",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      },
    ],
  },
  3: {
    1: [
      {
        id: 9,
        name: "Dr. Arjun Menon",
        experience: "16 years",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
      },
      {
        id: 10,
        name: "Dr. Shalini Das",
        experience: "9 years",
        rating: 4.6,
        image:
          "https://images.unsplash.com/photo-1594824506107-46d80b5b7c70?w=400&h=400&fit=crop",
      },
    ],
    3: [
      {
        id: 11,
        name: "Dr. Kiran Bhat",
        experience: "13 years",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      },
      {
        id: 12,
        name: "Dr. Deepa Rao",
        experience: "17 years",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop",
      },
    ],
  },
  4: {
    1: [
      {
        id: 13,
        name: "Dr. Anil Kumar",
        experience: "22 years",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      },
      {
        id: 14,
        name: "Dr. Pooja Reddy",
        experience: "15 years",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      },
    ],
    4: [
      {
        id: 15,
        name: "Dr. Suresh Babu",
        experience: "19 years",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
      },
      {
        id: 16,
        name: "Dr. Lakshmi Devi",
        experience: "12 years",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1594824506107-46d80b5b7c70?w=400&h=400&fit=crop",
      },
    ],
  },
  5: {
    1: [
      {
        id: 17,
        name: "Dr. Ravi Shankar",
        experience: "25 years",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      },
      {
        id: 18,
        name: "Dr. Madhavi Latha",
        experience: "18 years",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop",
      },
    ],
    5: [
      {
        id: 19,
        name: "Dr. Venkat Rao",
        experience: "16 years",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      },
      {
        id: 20,
        name: "Dr. Sneha Reddy",
        experience: "13 years",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      },
    ],
  },
  6: {
    1: [
      {
        id: 21,
        name: "Dr. Prasad Kumar",
        experience: "20 years",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
      },
      {
        id: 22,
        name: "Dr. Swathi Devi",
        experience: "14 years",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1594824506107-46d80b5b7c70?w=400&h=400&fit=crop",
      },
    ],
    6: [
      {
        id: 23,
        name: "Dr. Mohan Babu",
        experience: "17 years",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      },
      {
        id: 24,
        name: "Dr. Ramya Sree",
        experience: "11 years",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop",
      },
    ],
  },
};

const Appointments = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<number | null>(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(
    null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);
  const [specialtySearch, setSpecialtySearch] = useState("");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSpecialtySelect = (specialty: any) => {
    setSelectedSpecialty(specialty.id);
    setSelectedDoctor(null);
  };

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsAppointmentModalOpen(true);
  };

  const handleAppointmentScheduled = (appointmentData: any) => {
    setAppointmentDetails(appointmentData);
    setIsAppointmentModalOpen(false);
    setIsPatientModalOpen(true);
  };

  const selectedSpecialtyData = specialties.find(
    (s) => s.id === selectedSpecialty
  );
  const selectedLocationData = locations.find((l) => l.id === selectedLocation);

  const filteredSpecialties = specialties.filter((specialty) =>
    specialty.name.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  const availableDoctors =
    selectedSpecialty && selectedLocation
      ? doctors[selectedSpecialty as keyof typeof doctors]?.[
          selectedLocation as keyof (typeof doctors)[1]
        ] || []
      : [];

  const filteredDoctors = availableDoctors.filter((doctor) => {
    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(doctorSearch.toLowerCase());

    const matchesExperience =
      experienceFilter === "all" ||
      (experienceFilter === "10+" && parseInt(doctor.experience) >= 10) ||
      (experienceFilter === "15+" && parseInt(doctor.experience) >= 15) ||
      (experienceFilter === "20+" && parseInt(doctor.experience) >= 20);

    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "4.5+" && doctor.rating >= 4.5) ||
      (ratingFilter === "4.8+" && doctor.rating >= 4.8);

    return matchesSearch && matchesExperience && matchesRating;
  });

  const handlePatientInfoSubmit = async (patientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    setIsLoading(true);

    try {
      console.log("[1/4] Starting authentication with Salesforce...");

      // 1. Get access token from Salesforce
      const tokenResponse = await axios
        .post(
          "https://pdedemoorg1-dev-ed.develop.my.salesforce.com/services/oauth2/token",
          new URLSearchParams({
            grant_type: "client_credentials",
            client_id:
              "3MVG9jSKmPAPVo2KVphgDZS.NyHqjFAtyXLxTtX95NuAAqeSCjVKtNc7BoQw3V0JrK21p0nBnEgo3Fm_mk.hO",
            client_secret:
              "A2180540ADA4EB9BBDCF0D8920D7C306A60708E1097519289A3F5F82A18DA684",
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            timeout: 10000, // 10 second timeout
          }
        )
        .catch((error) => {
          console.error(
            "Authentication failed:",
            error.response?.data || error.message
          );
          throw new Error(
            "Failed to connect to Salesforce. Please try again later."
          );
        });

      console.log(
        "[2/4] Authentication successful. Preparing appointment data..."
      );

      // 2. Validate and format appointment date and time
      if (!appointmentDetails?.date || !appointmentDetails?.time) {
        throw new Error(
          "Please select both date and time for your appointment"
        );
      }

      // Format date as YYYY-MM-DD
      const formattedDate = format(
        new Date(appointmentDetails.date),
        "yyyy-MM-dd"
      );

      // Validate time format (HH:MM 24-hour)
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(appointmentDetails.time)) {
        throw new Error(
          "Invalid time format. Please use HH:MM format (24-hour clock)"
        );
      }

      // Create date/time string in format "YYYY-MM-DD HH:MM"
      const dateTimeString = `${formattedDate} ${appointmentDetails.time}`;
      console.log("Formatted DateTime for Salesforce:", dateTimeString);

      // 3. Prepare appointment payload with null checks
      const appointmentData = {
        Location_c: selectedLocationData?.name || "",
        Speciality_c: selectedSpecialtyData?.name || "",
        Doctor_Name: selectedDoctor?.name || "", // Full doctor name
        Appointment_Date_and_Time_c: dateTimeString,
        Patient_First_Name_c: patientInfo.firstName.trim(),
        Patient_Last_Name_c: patientInfo.lastName.trim(),
        Patient_Email_c: patientInfo.email.trim(),
        Patient_Phone_Number_c: patientInfo.phone.trim(),
      };

      console.log(
        "[3/4] Sending appointment data:",
        JSON.stringify(appointmentData, null, 2)
      );

      // 4. Create appointment via Apex REST API
      const response = await axios
        .post(
          "https://pdedemoorg1-dev-ed.develop.my.salesforce.com/services/apexrest/AppointmentService",
          appointmentData,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.data.access_token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            timeout: 15000, // 15 second timeout
          }
        )
        .catch((error) => {
          console.error("API Request Failed:", {
            status: error.response?.status,
            data: error.response?.data,
            config: error.config,
          });

          if (error.response?.data) {
            // Try to extract Salesforce error message
            try {
              const errorData =
                typeof error.response.data === "string"
                  ? JSON.parse(error.response.data)
                  : error.response.data;
              throw new Error(
                errorData.error ||
                  errorData.message ||
                  "Appointment creation failed"
              );
            } catch (e) {
              throw new Error(
                error.response.data || "Appointment creation failed"
              );
            }
          } else {
            throw new Error(
              error.message || "Network error. Please check your connection."
            );
          }
        });

      // Parse response (handling both string and object responses)
      const responseData =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      console.log("[4/4] Salesforce Response:", responseData);

      if (!responseData.success) {
        throw new Error(responseData.message || "Appointment creation failed");
      }

      // SUCCESS CASE
      setIsSuccess(true);
      setIsPatientModalOpen(false);

      // In your success handler where you display the toast message:
      toast({
        title: "Appointment Confirmed!",
        description: `Your appointment with ${selectedDoctor?.name} on ${format(
          new Date(appointmentDetails.date),
          "PPPP"
        )} at ${appointmentDetails.time} (${
          responseData.timeSlot
        }) has been scheduled.`,
      });

      // Reset all form selections
      setSelectedLocation(null);
      setSelectedSpecialty(null);
      setSelectedDoctor(null);
      setAppointmentDetails(null);

      // Optional: Redirect to confirmation page or show ticket
      console.log("Appointment ID:", responseData.appointmentId);
    } catch (error: any) {
      console.error("Full Error Details:", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });

      toast({
        title: "Appointment Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                Paramitha Hospitals
              </h1>
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
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Book Your Appointment
          </h1>
          <p className="text-gray-600 text-sm">
            Schedule your visit with our expert doctors
          </p>
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
                          selectedLocation === location.id
                            ? "ring-1 ring-pink-500 bg-pink-50"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedLocation(location.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start space-x-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <img
                                src={location.image}
                                alt={location.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-pink-500/10 flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-pink-600" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-800 text-sm">
                                {location.name}
                              </h3>
                              <p className="text-xs text-gray-600 line-clamp-2">
                                {location.address}
                              </p>
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
                    {filteredSpecialties.map((specialty) => {
                      const IconComponent = specialty.icon;
                      return (
                        <div
                          key={specialty.id}
                          className={`flex items-center space-x-3 p-2 rounded cursor-pointer transition-all text-sm ${
                            selectedSpecialty === specialty.id
                              ? "bg-pink-50 border border-pink-500"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => handleSpecialtySelect(specialty)}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${specialty.color}`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span className="text-gray-800 text-xs leading-tight">
                              {specialty.name}
                            </span>
                          </div>
                          <div
                            className={`w-3 h-3 border rounded-full ${
                              selectedSpecialty === specialty.id
                                ? "border-pink-500 bg-pink-500"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedSpecialty === specialty.id && (
                              <div className="w-full h-full bg-pink-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
                      <Users className="w-4 h-4" />
                      Doctors - {selectedSpecialtyData?.name}
                      <span className="text-xs text-pink-600">
                        @ {selectedLocationData?.name}
                      </span>
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
                    <Select
                      value={experienceFilter}
                      onValueChange={setExperienceFilter}
                    >
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
                    <Select
                      value={ratingFilter}
                      onValueChange={setRatingFilter}
                    >
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
                              <Avatar className="w-12 h-12">
                                <AvatarImage
                                  src={doctor.image}
                                  alt={doctor.name}
                                />
                                <AvatarFallback className="bg-pink-100 text-pink-600">
                                  {doctor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-800 text-sm">
                                  {doctor.name}
                                </h3>
                                <p className="text-xs text-gray-600">
                                  {doctor.experience} experience
                                </p>
                                <div className="flex items-center mt-1">
                                  <span className="text-yellow-500 text-xs">
                                    ★
                                  </span>
                                  <span className="text-xs text-gray-600 ml-1">
                                    {doctor.rating}/5
                                  </span>
                                </div>
                              </div>
                              <Button
                                className="bg-pink-600 hover:bg-pink-700 text-white h-8 px-4 text-xs"
                                size="sm"
                              >
                                Next
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
                          : "No doctors match your search criteria."}
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
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    Select Location & Specialty
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Choose a location and specialty to view available doctors
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Appointment Scheduling Modal */}
        {selectedDoctor && (
          <AppointmentModal
            isOpen={isAppointmentModalOpen}
            onClose={() => setIsAppointmentModalOpen(false)}
            onScheduled={handleAppointmentScheduled}
            doctor={selectedDoctor}
            specialty={selectedSpecialtyData?.name || ""}
            location={selectedLocationData?.name || ""}
          />
        )}

        {/* Patient Information Modal */}
        {selectedDoctor && appointmentDetails && (
          <PatientInfoModal
            isOpen={isPatientModalOpen}
            onClose={() => setIsPatientModalOpen(false)}
            onSubmit={handlePatientInfoSubmit}
            doctor={selectedDoctor}
            specialty={selectedSpecialtyData?.name || ""}
            location={selectedLocationData?.name || ""}
            appointmentDetails={appointmentDetails}
          />
        )}
      </div>
    </div>
  );
};

export default Appointments;
