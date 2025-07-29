
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Phone, MapPin, Clock, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Paramitha Hospitals</h1>
              <p className="text-sm text-pink-600">For Woman & Children</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-pink-600" />
              <span className="text-gray-600">Emergency</span>
              <span className="font-semibold">+91 40 287 22122</span>
            </div>
            <Button 
              onClick={() => navigate('/appointments')}
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-pink-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Choose Branch</span>
            </div>
            <div className="flex gap-6 text-sm">
              <span className="text-pink-600 font-medium">Our Services</span>
              <span className="text-pink-600 font-medium">Health Information</span>
              <span className="text-pink-600 font-medium">About Us</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                A PROUD CHOICE IN YOUR
                <span className="text-pink-600"> PARENTING JOURNEY</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Experience the best at every step of care
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/appointments')}
                  className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-3"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-3 border-pink-600 text-pink-600 hover:bg-pink-50"
                >
                  Register Now
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/lovable-uploads/63fd4323-6416-456a-9184-c5af762784ce.png"
                alt="Mother and baby - Paramitha Hospitals"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How Can We Help Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-pink-600 mb-12">
            How Can We Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-pink-100">
              <CardHeader>
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-pink-600" />
                </div>
                <CardTitle className="text-gray-800">Expert Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our team of highly qualified specialists with years of experience in women and children healthcare
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-pink-100">
              <CardHeader>
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-pink-600" />
                </div>
                <CardTitle className="text-gray-800">24/7 Emergency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Round-the-clock emergency services for your urgent medical needs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-pink-100">
              <CardHeader>
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-pink-600" />
                </div>
                <CardTitle className="text-gray-800">Quality Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  State-of-the-art facilities and patient-centered approach for comprehensive care
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4 text-pink-200" />
              <h4 className="text-xl font-semibold mb-2">Call Us</h4>
              <p className="text-pink-200">+91 40 287 22122</p>
              <p className="text-pink-200">Emergency: 108</p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-4 text-pink-200" />
              <h4 className="text-xl font-semibold mb-2">Visit Us</h4>
              <p className="text-pink-200">Kompally Branch</p>
              <p className="text-pink-200">Hyderabad, Telangana</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-4 text-pink-200" />
              <h4 className="text-xl font-semibold mb-2">Hours</h4>
              <p className="text-pink-200">Mon-Sat: 9:00 AM - 8:00 PM</p>
              <p className="text-pink-200">Sunday: 10:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
