
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Phone, MapPin, Clock, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900">Paramitha Hospitals</h1>
              <p className="text-sm text-gray-600">Excellence in Healthcare</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/appointments')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Your Health, Our Priority
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience world-class healthcare with our team of expert doctors and state-of-the-art facilities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/appointments')}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us: +91 80 2555 5555
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Why Choose Paramitha Hospitals?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900">Expert Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our team of highly qualified specialists with years of experience
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-blue-900">24/7 Emergency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Round-the-clock emergency services for your urgent medical needs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-blue-900">Quality Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  State-of-the-art facilities and patient-centered approach
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-4 text-blue-300" />
              <h4 className="text-xl font-semibold mb-2">Call Us</h4>
              <p className="text-blue-200">+91 80 2555 5555</p>
              <p className="text-blue-200">Emergency: 108</p>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-4 text-blue-300" />
              <h4 className="text-xl font-semibold mb-2">Visit Us</h4>
              <p className="text-blue-200">123 Medical Center Road</p>
              <p className="text-blue-200">Bangalore, Karnataka 560001</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-4 text-blue-300" />
              <h4 className="text-xl font-semibold mb-2">Hours</h4>
              <p className="text-blue-200">Mon-Sat: 9:00 AM - 8:00 PM</p>
              <p className="text-blue-200">Sunday: 10:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
