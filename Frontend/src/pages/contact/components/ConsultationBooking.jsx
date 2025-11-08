import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ConsultationBooking = () => {
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const advisors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Admissions Counselor",
    specialties: ["Business Programs", "Career Transitions", "Adult Learners"],
    image: "https://images.unsplash.com/photo-1734456611474-13245d164868",
    alt: "Professional woman with shoulder-length brown hair in navy blazer smiling at camera",
    rating: 4.9,
    experience: "8+ years",
    languages: ["English", "Spanish"],
    availability: "Mon-Fri: 9AM-5PM"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Technology Program Advisor",
    specialties: ["IT Programs", "Engineering", "Technical Certifications"],
    image: "https://images.unsplash.com/photo-1659128103024-e73f383e18f2",
    alt: "Asian man in glasses and dark suit jacket with friendly smile in office setting",
    rating: 4.8,
    experience: "6+ years",
    languages: ["English", "Mandarin"],
    availability: "Tue-Sat: 10AM-6PM"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "International Student Advisor",
    specialties: ["International Admissions", "Visa Support", "Cultural Integration"],
    image: "https://images.unsplash.com/photo-1727743595559-425d95dbe3c6",
    alt: "Hispanic woman with long dark hair in professional white blouse smiling warmly",
    rating: 4.9,
    experience: "10+ years",
    languages: ["English", "Spanish", "Portuguese"],
    availability: "Mon-Fri: 8AM-4PM"
  }];


  const availableDates = [
  { value: '2024-10-28', label: 'Monday, Oct 28' },
  { value: '2024-10-29', label: 'Tuesday, Oct 29' },
  { value: '2024-10-30', label: 'Wednesday, Oct 30' },
  { value: '2024-10-31', label: 'Thursday, Oct 31' },
  { value: '2024-11-01', label: 'Friday, Nov 1' }];


  const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];


  const handleBookConsultation = () => {
    if (!selectedAdvisor || !selectedDate || !selectedTime) {
      alert('Please select an advisor, date, and time for your consultation.');
      return;
    }

    const advisor = advisors?.find((a) => a?.id === selectedAdvisor);
    alert(`Consultation booked with ${advisor?.name} on ${selectedDate} at ${selectedTime}. You will receive a confirmation email shortly.`);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Icon name="Calendar" size={20} />
            <span className="text-sm font-medium uppercase tracking-wider">Personalized Guidance</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Schedule a Free Consultation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get personalized advice from our expert advisors. Discuss your goals, explore programs, and create your path to success.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Advisor Selection */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-foreground mb-6">Choose Your Advisor</h3>
            <div className="space-y-4">
              {advisors?.map((advisor) =>
              <div
                key={advisor?.id}
                className={`bg-card rounded-xl p-6 border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedAdvisor === advisor?.id ?
                'border-primary bg-primary/5 shadow-md' :
                'border-border hover:border-primary/50'}`
                }
                onClick={() => setSelectedAdvisor(advisor?.id)}>

                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Image
                      src={advisor?.image}
                      alt={advisor?.alt}
                      className="w-16 h-16 rounded-full object-cover" />

                      {selectedAdvisor === advisor?.id &&
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="Check" size={14} color="white" />
                        </div>
                    }
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-card-foreground">{advisor?.name}</h4>
                          <p className="text-sm text-primary font-medium">{advisor?.title}</p>
                        </div>
                        <div className="flex items-center space-x-1 text-amber-500">
                          <Icon name="Star" size={16} fill="currentColor" />
                          <span className="text-sm font-medium">{advisor?.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {advisor?.specialties?.map((specialty, index) =>
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-xs font-medium text-muted-foreground rounded-full">

                              {specialty}
                            </span>
                        )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={14} />
                            <span>{advisor?.experience}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Globe" size={14} />
                            <span>{advisor?.languages?.join(', ')}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Icon name="Calendar" size={14} />
                          <span>{advisor?.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Panel */}
          <div className="bg-card rounded-xl p-6 border border-border h-fit">
            <h3 className="text-xl font-semibold text-card-foreground mb-6">Book Your Session</h3>
            
            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-card-foreground mb-3">Select Date</label>
              <div className="space-y-2">
                {availableDates?.map((date) =>
                <button
                  key={date?.value}
                  onClick={() => setSelectedDate(date?.value)}
                  className={`w-full text-left px-3 py-2 rounded-lg border transition-colors duration-200 ${
                  selectedDate === date?.value ?
                  'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50 text-card-foreground'}`
                  }>

                    {date?.label}
                  </button>
                )}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-card-foreground mb-3">Select Time</label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots?.map((time) =>
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors duration-200 ${
                  selectedTime === time ?
                  'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50 text-card-foreground'}`
                  }>

                    {time}
                  </button>
                )}
              </div>
            </div>

            {/* Consultation Details */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-card-foreground mb-2">Session Details</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} />
                  <span>Duration: 30-60 minutes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Video" size={14} />
                  <span>Format: Video call or phone</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="FileText" size={14} />
                  <span>Follow-up materials included</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="DollarSign" size={14} />
                  <span>Completely free consultation</span>
                </li>
              </ul>
            </div>

            {/* Book Button */}
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={handleBookConsultation}
              className="bg-gradient-primary">

              <Icon name="Calendar" size={20} className="mr-2" />
              Book Free Consultation
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              You'll receive a confirmation email with meeting details within 15 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>);

};

export default ConsultationBooking;