// // import React, { useState } from 'react';
// // import { Save, Plus, Trash2, Edit, Phone, Mail, MapPin, Clock, Globe, Users, Building } from 'lucide-react';
// // import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// // import { Button } from '../components/ui/Button';
// // import { Input, Textarea } from '../components/ui/Input';
// // import { Modal } from '../components/ui/Modal';
// // import { useAdmin } from '../context/AdminContext';
// // import { toast } from '../utils/toast';

// // export const Contact = () => {
// //   const { contact, setContact } = useAdmin();
// //   const [activeTab, setActiveTab] = useState('methods');
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editingItem, setEditingItem] = useState(null);

// //   const tabs = [
// //     { id: 'methods', label: 'Contact Methods', icon: Phone, color: 'text-blue-600' },
// //     { id: 'social', label: 'Social Channels', icon: Globe, color: 'text-purple-600' },
// //     { id: 'locations', label: 'Campus Locations', icon: MapPin, color: 'text-green-600' },
// //   ];

// //   const handleSave = () => {
// //     toast.success('Contact settings saved successfully!');
// //   };

// //   // Contact Methods handlers
// //   const updateMethod = (id, field, value) => {
// //     setContact(prev => ({
// //       ...prev,
// //       methods: prev.methods.map(m => m.id === id ? { ...m, [field]: value } : m)
// //     }));
// //   };

// //   // Social Channels handlers
// //   const updateSocial = (id, field, value) => {
// //     setContact(prev => ({
// //       ...prev,
// //       socialChannels: prev.socialChannels.map(s => s.id === id ? { ...s, [field]: value } : s)
// //     }));
// //   };

// //   // Campus Location handlers
// //   const addLocation = () => {
// //     const newLocation = {
// //       id: Date.now(),
// //       name: '',
// //       address: '',
// //       phone: '',
// //       email: '',
// //       hours: { weekdays: '', saturday: '', sunday: '' },
// //       services: [],
// //       mapEmbedUrl: '',
// //       isPrimary: false
// //     };
// //     setContact(prev => ({
// //       ...prev,
// //       campusLocations: [...prev.campusLocations, newLocation]
// //     }));
// //     toast.success('Location added successfully!');
// //   };

// //   const deleteLocation = (id) => {
// //     if (confirm('Are you sure you want to delete this campus location?')) {
// //       setContact(prev => ({
// //         ...prev,
// //         campusLocations: prev.campusLocations.filter(l => l.id !== id)
// //       }));
// //       toast.success('Location deleted successfully!');
// //     }
// //   };

// //   const updateLocation = (id, field, value) => {
// //     setContact(prev => ({
// //       ...prev,
// //       campusLocations: prev.campusLocations.map(l =>
// //         l.id === id ? { ...l, [field]: value } : l
// //       )
// //     }));
// //   };

// //   const updateLocationHours = (id, period, value) => {
// //     setContact(prev => ({
// //       ...prev,
// //       campusLocations: prev.campusLocations.map(l =>
// //         l.id === id ? { ...l, hours: { ...l.hours, [period]: value } } : l
// //       )
// //     }));
// //   };

// //   const addService = (locationId) => {
// //     const service = prompt('Enter service name:');
// //     if (service) {
// //       setContact(prev => ({
// //         ...prev,
// //         campusLocations: prev.campusLocations.map(l =>
// //           l.id === locationId ? { ...l, services: [...l.services, service] } : l
// //         )
// //       }));
// //       toast.success('Service added!');
// //     }
// //   };

// //   const removeService = (locationId, serviceIndex) => {
// //     setContact(prev => ({
// //       ...prev,
// //       campusLocations: prev.campusLocations.map(l =>
// //         l.id === locationId
// //           ? { ...l, services: l.services.filter((_, i) => i !== serviceIndex) }
// //           : l
// //       )
// //     }));
// //     toast.success('Service removed!');
// //   };

// //   const getTabColor = (tabId) => {
// //     switch (tabId) {
// //       case 'methods': return 'bg-blue-50 border-blue-200 text-blue-700';
// //       case 'social': return 'bg-purple-50 border-purple-200 text-purple-700';
// //       case 'locations': return 'bg-green-50 border-green-200 text-green-700';
// //       default: return 'bg-gray-50 border-gray-200 text-gray-700';
// //     }
// //   };

// //   const getMethodIcon = (methodType) => {
// //     switch (methodType) {
// //       case 'phone': return Phone;
// //       case 'email': return Mail;
// //       case 'visit': return MapPin;
// //       default: return Phone;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
// //       <div className="max-w-7xl mx-auto space-y-8">
// //         {/* Header Section */}
// //         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
// //           <div>
// //             <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
// //               Contact Management
// //             </h1>
// //             <p className="text-gray-600 mt-2 text-lg">Manage contact methods, social media, and campus locations</p>
// //           </div>
// //           <Button 
// //             onClick={handleSave}
// //             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
// //           >
// //             <Save size={20} className="mr-2" />
// //             Save All Changes
// //           </Button>
// //         </div>

// //         <div className="flex flex-col lg:flex-row gap-8">
// //           {/* Sidebar Navigation */}
// //           <div className="lg:w-80 space-y-3">
// //             {tabs.map(tab => {
// //               const IconComponent = tab.icon;
// //               return (
// //                 <button
// //                   key={tab.id}
// //                   onClick={() => setActiveTab(tab.id)}
// //                   className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group hover:shadow-lg ${
// //                     activeTab === tab.id
// //                       ? `${getTabColor(tab.id)} border-current shadow-lg transform scale-105`
// //                       : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
// //                   }`}
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <div className={`p-2 rounded-lg transition-colors ${
// //                       activeTab === tab.id ? 'bg-white' : 'bg-gray-100 group-hover:bg-gray-200'
// //                     }`}>
// //                       <IconComponent size={20} className={activeTab === tab.id ? tab.color : 'text-gray-500'} />
// //                     </div>
// //                     <div>
// //                       <span className="font-semibold block">{tab.label}</span>
// //                       <span className="text-sm opacity-75">
// //                         {tab.id === 'methods' && 'Phone, email, and visit'}
// //                         {tab.id === 'social' && 'Social media channels'}
// //                         {tab.id === 'locations' && 'Campus locations & hours'}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </button>
// //               );
// //             })}
// //           </div>

// //           {/* Main Content */}
// //           <div className="flex-1">
// //             {/* Contact Methods Tab */}
// //             {activeTab === 'methods' && (
// //               <div className="space-y-6">
// //                 <div className="flex items-center justify-between">
// //                   <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
// //                     <Phone className="text-blue-600" size={24} />
// //                     Contact Methods
// //                   </h2>
// //                   <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
// //                     {contact.methods.length} methods
// //                   </span>
// //                 </div>
                
// //                 {contact.methods.map(method => {
// //                   const MethodIcon = getMethodIcon(method.type);
// //                   return (
// //                     <Card key={method.id} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
// //                       <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
// //                         <div className="flex items-center gap-3">
// //                           <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
// //                             <MethodIcon className="text-blue-600" size={24} />
// //                           </div>
// //                           <CardTitle className="text-xl font-bold text-gray-900">{method.title}</CardTitle>
// //                         </div>
// //                       </CardHeader>
// //                       <CardContent className="p-6 space-y-6">
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                           <div className="space-y-4">
// //                             <Input
// //                               label="Title"
// //                               value={method.title}
// //                               onChange={(e) => updateMethod(method.id, 'title', e.target.value)}
// //                               placeholder="Contact Method Title"
// //                               className="bg-white border-2 border-gray-300 focus:border-blue-500"
// //                             />
// //                             <Textarea
// //                               label="Description"
// //                               value={method.description}
// //                               onChange={(e) => updateMethod(method.id, 'description', e.target.value)}
// //                               placeholder="Describe this contact method..."
// //                               rows={3}
// //                               className="bg-white border-2 border-gray-300 focus:border-blue-500"
// //                             />
// //                             <Input
// //                               label="Hours"
// //                               value={method.hours}
// //                               onChange={(e) => updateMethod(method.id, 'hours', e.target.value)}
// //                               placeholder="e.g., Monday - Friday: 9 AM - 5 PM"
// //                               className="bg-white border-2 border-gray-300 focus:border-blue-500"
// //                             />
// //                           </div>
// //                           <div className="space-y-4">
// //                             <Input
// //                               label="Primary Contact"
// //                               value={method.primary}
// //                               onChange={(e) => updateMethod(method.id, 'primary', e.target.value)}
// //                               placeholder="Main contact information"
// //                               className="bg-white border-2 border-gray-300 focus:border-blue-500"
// //                             />
// //                             {method.secondary !== undefined && (
// //                               <Input
// //                                 label="Secondary Contact"
// //                                 value={method.secondary}
// //                                 onChange={(e) => updateMethod(method.id, 'secondary', e.target.value)}
// //                                 placeholder="Backup contact information"
// //                                 className="bg-white border-2 border-gray-300 focus:border-blue-500"
// //                               />
// //                             )}
// //                             <Input
// //                               label="Action Button Text"
// //                               value={method.action}
// //                               onChange={(e) => updateMethod(method.id, 'action', e.target.value)}
// //                               placeholder="e.g., Call Now, Send Email"
// //                               className="bg-white border-2 border-gray-300 focus:border-blue-500"
// //                             />
// //                           </div>
// //                         </div>
// //                       </CardContent>
// //                     </Card>
// //                   );
// //                 })}
// //               </div>
// //             )}

// //             {/* Social Channels Tab */}
// //             {activeTab === 'social' && (
// //               <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
// //                 <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200">
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
// //                         <Globe className="text-purple-600" size={24} />
// //                       </div>
// //                       <div>
// //                         <CardTitle className="text-2xl font-bold text-gray-900">Social Media Channels</CardTitle>
// //                         <p className="text-gray-600 mt-1">Manage your social media presence</p>
// //                       </div>
// //                     </div>
// //                     <span className="bg-purple-100 text-purple-800 font-semibold px-4 py-2 rounded-full">
// //                       {contact.socialChannels.length} channels
// //                     </span>
// //                   </div>
// //                 </CardHeader>
// //                 <CardContent className="p-6">
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     {contact.socialChannels.map(social => (
// //                       <div key={social.id} className="group bg-gradient-to-br from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
// //                         <div className="flex items-center gap-3 mb-4">
// //                           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
// //                             <Globe className="text-purple-600" size={18} />
// //                           </div>
// //                           <h4 className="font-bold text-lg text-gray-900">{social.name}</h4>
// //                         </div>
// //                         <div className="space-y-3">
// //                           <Input
// //                             label="Handle"
// //                             value={social.handle}
// //                             onChange={(e) => updateSocial(social.id, 'handle', e.target.value)}
// //                             placeholder="@username"
// //                             className="bg-white border-2 border-gray-300 focus:border-purple-500"
// //                           />
// //                           <Input
// //                             label="Profile URL"
// //                             value={social.url}
// //                             onChange={(e) => updateSocial(social.id, 'url', e.target.value)}
// //                             placeholder="https://..."
// //                             className="bg-white border-2 border-gray-300 focus:border-purple-500"
// //                           />
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             )}

// //             {/* Campus Locations Tab */}
// //             {activeTab === 'locations' && (
// //               <div className="space-y-6">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-3">
// //                     <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
// //                       <MapPin className="text-green-600" size={24} />
// //                     </div>
// //                     <div>
// //                       <h2 className="text-2xl font-bold text-gray-900">Campus Locations</h2>
// //                       <p className="text-gray-600">Manage multiple campus locations and their details</p>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-4">
// //                     <span className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full">
// //                       {contact.campusLocations.length} locations
// //                     </span>
// //                     <Button 
// //                       onClick={addLocation}
// //                       className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
// //                     >
// //                       <Plus size={20} className="mr-2" />
// //                       Add Location
// //                     </Button>
// //                   </div>
// //                 </div>

// //                 {contact.campusLocations.length === 0 ? (
// //                   <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
// //                     <CardContent className="text-center py-16">
// //                       <Building size={64} className="mx-auto text-gray-400 mb-4" />
// //                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No Campus Locations</h3>
// //                       <p className="text-gray-600 mb-6 max-w-md mx-auto">
// //                         Add your first campus location to provide students with contact information and visiting details.
// //                       </p>
// //                       <Button onClick={addLocation} size="lg">
// //                         <Plus size={20} className="mr-2" />
// //                         Add First Location
// //                       </Button>
// //                     </CardContent>
// //                   </Card>
// //                 ) : (
// //                   <div className="space-y-6">
// //                     {contact.campusLocations.map(location => (
// //                       <Card key={location.id} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
// //                         <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-200">
// //                           <div className="flex items-center justify-between">
// //                             <div className="flex items-center gap-3">
// //                               <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
// //                                 <Building className="text-green-600" size={24} />
// //                               </div>
// //                               <div>
// //                                 <CardTitle className="text-xl font-bold text-gray-900">
// //                                   {location.name || 'New Location'}
// //                                 </CardTitle>
// //                                 {location.isPrimary && (
// //                                   <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
// //                                     PRIMARY CAMPUS
// //                                   </span>
// //                                 )}
// //                               </div>
// //                             </div>
// //                             <Button
// //                               variant="danger"
// //                               size="sm"
// //                               onClick={() => deleteLocation(location.id)}
// //                               className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
// //                             >
// //                               <Trash2 size={16} />
// //                             </Button>
// //                           </div>
// //                         </CardHeader>
// //                         <CardContent className="p-6 space-y-6">
// //                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                             <div className="space-y-6">
// //                               <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
// //                                 <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
// //                                   <Building size={18} className="text-blue-600" />
// //                                   Basic Information
// //                                 </h4>
// //                                 <div className="space-y-4">
// //                                   <Input
// //                                     label="Campus Name"
// //                                     value={location.name}
// //                                     onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
// //                                     placeholder="Main Campus, Downtown Campus, etc."
// //                                     className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500"
// //                                   />
// //                                   <Textarea
// //                                     label="Address"
// //                                     value={location.address}
// //                                     onChange={(e) => updateLocation(location.id, 'address', e.target.value)}
// //                                     rows={3}
// //                                     placeholder="Full campus address"
// //                                     className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500"
// //                                   />
// //                                 </div>
// //                               </div>

// //                               <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
// //                                 <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
// //                                   <Clock size={18} className="text-orange-600" />
// //                                   Operating Hours
// //                                 </h4>
// //                                 <div className="space-y-3">
// //                                   <Input
// //                                     label="Weekdays"
// //                                     value={location.hours.weekdays}
// //                                     onChange={(e) => updateLocationHours(location.id, 'weekdays', e.target.value)}
// //                                     placeholder="Monday - Friday: 9.00 A.M to 5.00 P.M"
// //                                     className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500"
// //                                   />
// //                                   <Input
// //                                     label="Saturday"
// //                                     value={location.hours.saturday}
// //                                     onChange={(e) => updateLocationHours(location.id, 'saturday', e.target.value)}
// //                                     placeholder="Saturday: 9.00 A.M to 1.00 P.M"
// //                                     className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500"
// //                                   />
// //                                   <Input
// //                                     label="Sunday"
// //                                     value={location.hours.sunday}
// //                                     onChange={(e) => updateLocationHours(location.id, 'sunday', e.target.value)}
// //                                     placeholder="Sunday: Closed"
// //                                     className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500"
// //                                   />
// //                                 </div>
// //                               </div>
// //                             </div>

// //                             <div className="space-y-6">
// //                               <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
// //                                 <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
// //                                   <Phone size={18} className="text-green-600" />
// //                                   Contact Details
// //                                 </h4>
// //                                 <div className="space-y-4">
// //                                   <Input
// //                                     label="Phone Number"
// //                                     value={location.phone}
// //                                     onChange={(e) => updateLocation(location.id, 'phone', e.target.value)}
// //                                     placeholder="+1 (555) 123-4567"
// //                                     className="bg-gray-50 border-2 border-gray-300 focus:border-green-500"
// //                                   />
// //                                   <Input
// //                                     label="Email Address"
// //                                     value={location.email}
// //                                     onChange={(e) => updateLocation(location.id, 'email', e.target.value)}
// //                                     placeholder="campus@college.edu"
// //                                     className="bg-gray-50 border-2 border-gray-300 focus:border-green-500"
// //                                   />
// //                                 </div>
// //                               </div>

// //                               <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
// //                                 <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
// //                                   <Users size={18} className="text-purple-600" />
// //                                   Services & Facilities
// //                                 </h4>
// //                                 <div className="space-y-3">
// //                                   <div className="flex flex-wrap gap-2 mb-3">
// //                                     {location.services.map((service, index) => (
// //                                       <span
// //                                         key={index}
// //                                         className="inline-flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200"
// //                                       >
// //                                         {service}
// //                                         <button
// //                                           onClick={() => removeService(location.id, index)}
// //                                           className="hover:text-purple-900 text-purple-600"
// //                                         >
// //                                           ×
// //                                         </button>
// //                                       </span>
// //                                     ))}
// //                                   </div>
// //                                   <Button 
// //                                     size="sm" 
// //                                     onClick={() => addService(location.id)}
// //                                     className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200"
// //                                   >
// //                                     <Plus size={16} className="mr-1" />
// //                                     Add Service
// //                                   </Button>
// //                                 </div>
// //                               </div>

// //                               <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
// //                                 <Textarea
// //                                   label="Google Maps Embed URL"
// //                                   value={location.mapEmbedUrl}
// //                                   onChange={(e) => updateLocation(location.id, 'mapEmbedUrl', e.target.value)}
// //                                   rows={2}
// //                                   placeholder="https://www.google.com/maps/embed?pb=..."
// //                                   className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500"
// //                                 />
// //                               </div>

// //                               <div className="flex items-center gap-2 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
// //                                 <input
// //                                   type="checkbox"
// //                                   id={`primary-${location.id}`}
// //                                   checked={location.isPrimary}
// //                                   onChange={(e) => updateLocation(location.id, 'isPrimary', e.target.checked)}
// //                                   className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
// //                                 />
// //                                 <label htmlFor={`primary-${location.id}`} className="text-sm font-medium text-gray-700">
// //                                   Mark as Primary Campus Location
// //                                 </label>
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </CardContent>
// //                       </Card>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// import React, { useState } from 'react';
// import { 
//   Save, 
//   Plus, 
//   Trash2, 
//   Edit, 
//   Phone, 
//   Mail, 
//   MapPin, 
//   Clock, 
//   Globe, 
//   Users, 
//   Building,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Youtube,
//   MessageCircle,
//   MessageSquare
// } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';
// import { Input, Textarea } from '../components/ui/Input';
// import { Modal } from '../components/ui/Modal';
// import { useAdmin } from '../context/AdminContext';
// import { toast } from '../utils/toast';

// export const Contact = () => {
//   const { contact, setContact, saveAllToFirebase } = useAdmin();
//   const [activeTab, setActiveTab] = useState('methods');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);

//   // Default contact data structure
//   const defaultContact = {
//     methods: [
//       {
//         id: 1,
//         type: 'phone',
//         title: 'Phone Support',
//         description: 'Get immediate assistance from our support team',
//         primary: '+1 (555) 123-4567',
//         secondary: '+1 (555) 123-4568',
//         hours: 'Monday - Friday: 9 AM - 5 PM EST',
//         action: 'Call Now'
//       },
//       {
//         id: 2,
//         type: 'email',
//         title: 'Email Support',
//         description: 'Send us your queries and we\'ll respond within 24 hours',
//         primary: 'admissions@college.edu',
//         secondary: 'support@college.edu',
//         hours: '24/7 Email Support',
//         action: 'Send Email'
//       },
//       {
//         id: 3,
//         type: 'visit',
//         title: 'Campus Visit',
//         description: 'Schedule a campus tour and meet our faculty',
//         primary: 'Admissions Office, Main Campus',
//         hours: 'Monday - Saturday: 10 AM - 4 PM',
//         action: 'Schedule Visit'
//       }
//     ],
//     socialChannels: [
//       {
//         id: 1,
//         name: 'Facebook',
//         platform: 'facebook',
//         handle: '@CollegeOfficial',
//         url: 'https://facebook.com/collegeofficial',
//         icon: 'facebook',
//         isActive: true
//       },
//       {
//         id: 2,
//         name: 'Twitter',
//         platform: 'twitter',
//         handle: '@CollegeNews',
//         url: 'https://twitter.com/collegenews',
//         icon: 'twitter',
//         isActive: true
//       },
//       {
//         id: 3,
//         name: 'Instagram',
//         platform: 'instagram',
//         handle: '@CollegeLife',
//         url: 'https://instagram.com/collegelife',
//         icon: 'instagram',
//         isActive: true
//       },
//       {
//         id: 4,
//         name: 'LinkedIn',
//         platform: 'linkedin',
//         handle: 'College University',
//         url: 'https://linkedin.com/school/college-university',
//         icon: 'linkedin',
//         isActive: true
//       },
//       {
//         id: 5,
//         name: 'YouTube',
//         platform: 'youtube',
//         handle: 'College Channel',
//         url: 'https://youtube.com/c/collegechannel',
//         icon: 'youtube',
//         isActive: true
//       },
//       {
//         id: 6,
//         name: 'WhatsApp',
//         platform: 'whatsapp',
//         handle: '+1 (555) 123-4567',
//         url: 'https://wa.me/15551234567',
//         icon: 'message-circle',
//         isActive: true
//       }
//     ],
//     campusLocations: [
//       {
//         id: 1,
//         name: 'Main Campus',
//         address: '123 Education Boulevard, City, State 12345',
//         phone: '+1 (555) 123-4567',
//         email: 'maincampus@college.edu',
//         hours: {
//           weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
//           saturday: 'Saturday: 9:00 AM - 2:00 PM',
//           sunday: 'Sunday: Closed'
//         },
//         services: [
//           'Admissions Office',
//           'Library',
//           'Student Center',
//           'Cafeteria',
//           'Sports Complex'
//         ],
//         mapEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
//         isPrimary: true
//       }
//     ]
//   };

//   // Initialize contact data if empty
//   React.useEffect(() => {
//     if (!contact || Object.keys(contact).length === 0) {
//       setContact(defaultContact);
//     }
//   }, [contact, setContact]);

//   const tabs = [
//     { id: 'methods', label: 'Contact Methods', icon: Phone, color: 'text-blue-600' },
//     { id: 'social', label: 'Social Channels', icon: Globe, color: 'text-purple-600' },
//     { id: 'locations', label: 'Campus Locations', icon: MapPin, color: 'text-green-600' },
//   ];

//   const socialPlatforms = [
//     {
//       name: 'Facebook',
//       platform: 'Facebook',
//       icon: Facebook,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50',
//       borderColor: 'border-blue-200',
//       placeholder: '@CollegeOfficial'
//     },
//     {
//       name: 'Twitter',
//       platform: 'Twitter',
//       icon: Twitter,
//       color: 'text-sky-500',
//       bgColor: 'bg-sky-50',
//       borderColor: 'border-sky-200',
//       placeholder: '@CollegeNews'
//     },
//     {
//       name: 'Instagram',
//       platform: 'Instagram',
//       icon: Instagram,
//       color: 'text-pink-600',
//       bgColor: 'bg-pink-50',
//       borderColor: 'border-pink-200',
//       placeholder: '@CollegeLife'
//     },
//     {
//       name: 'LinkedIn',
//       platform: 'Linkedin',
//       icon: Linkedin,
//       color: 'text-blue-700',
//       bgColor: 'bg-blue-50',
//       borderColor: 'border-blue-200',
//       placeholder: 'College University'
//     },
//     {
//       name: 'YouTube',
//       platform: 'Youtube',
//       icon: Youtube,
//       color: 'text-red-600',
//       bgColor: 'bg-red-50',
//       borderColor: 'border-red-200',
//       placeholder: 'College Channel'
//     },
//     {
//       name: 'WhatsApp',
//       platform: 'Whatsapp',
//       icon: MessageCircle,
//       color: 'text-green-600',
//       bgColor: 'bg-green-50',
//       borderColor: 'border-green-200',
//       placeholder: '+1 (555) 123-4567'
//     },
//     {
//       name: 'WeChat',
//       platform: 'Wechat',
//       icon: MessageSquare,
//       color: 'text-green-500',
//       bgColor: 'bg-green-50',
//       borderColor: 'border-green-200',
//       placeholder: 'CollegeOfficial'
//     },
//     {
//       name: 'TikTok',
//       platform: 'Tiktok',
//       icon: MessageSquare, // Using MessageSquare as placeholder
//       color: 'text-gray-900',
//       bgColor: 'bg-gray-50',
//       borderColor: 'border-gray-200',
//       placeholder: '@CollegeCampus'
//     }
//   ];

//   const handleSave = async () => {
//     const success = await saveAllToFirebase();
//     if (success) {
//       toast.success('Contact settings saved successfully to Firebase!');
//     } else {
//       toast.error('Failed to save contact settings');
//     }
//   };

//   // Contact Methods handlers
//   const updateMethod = (id, field, value) => {
//     setContact(prev => ({
//       ...prev,
//       methods: prev.methods.map(m => m.id === id ? { ...m, [field]: value } : m)
//     }));
//   };

//   // Social Channels handlers
//   const updateSocial = (id, field, value) => {
//     setContact(prev => ({
//       ...prev,
//       socialChannels: prev.socialChannels.map(s => s.id === id ? { ...s, [field]: value } : s)
//     }));
//   };

//   const toggleSocialActive = (id) => {
//     setContact(prev => ({
//       ...prev,
//       socialChannels: prev.socialChannels.map(s => 
//         s.id === id ? { ...s, isActive: !s.isActive } : s
//       )
//     }));
//   };

//   const addSocialChannel = (platform) => {
//     const existing = contact.socialChannels.find(s => s.platform === platform.platform);
//     if (existing) {
//       toast.error(`${platform.name} is already added`);
//       return;
//     }

//     const newChannel = {
//       id: Date.now(),
//       name: platform.name,
//       platform: platform.platform,
//       handle: '',
//       url: '',
//       icon: platform.platform,
//       isActive: true
//     };

//     setContact(prev => ({
//       ...prev,
//       socialChannels: [...prev.socialChannels, newChannel]
//     }));
//     toast.success(`${platform.name} added successfully!`);
//   };

//   const removeSocialChannel = (id) => {
//     if (confirm('Are you sure you want to remove this social channel?')) {
//       setContact(prev => ({
//         ...prev,
//         socialChannels: prev.socialChannels.filter(s => s.id !== id)
//       }));
//       toast.success('Social channel removed!');
//     }
//   };

//   // Campus Location handlers
//   const addLocation = () => {
//     const newLocation = {
//       id: Date.now(),
//       name: '',
//       address: '',
//       phone: '',
//       email: '',
//       hours: { weekdays: '', saturday: '', sunday: '' },
//       services: [],
//       mapEmbedUrl: '',
//       isPrimary: contact.campusLocations.length === 0 // Set as primary if first location
//     };
//     setContact(prev => ({
//       ...prev,
//       campusLocations: [...prev.campusLocations, newLocation]
//     }));
//     toast.success('Location added successfully!');
//   };

//   const deleteLocation = (id) => {
//     if (confirm('Are you sure you want to delete this campus location?')) {
//       setContact(prev => ({
//         ...prev,
//         campusLocations: prev.campusLocations.filter(l => l.id !== id)
//       }));
//       toast.success('Location deleted successfully!');
//     }
//   };

//   const updateLocation = (id, field, value) => {
//     setContact(prev => ({
//       ...prev,
//       campusLocations: prev.campusLocations.map(l =>
//         l.id === id ? { ...l, [field]: value } : l
//       )
//     }));
//   };

//   const updateLocationHours = (id, period, value) => {
//     setContact(prev => ({
//       ...prev,
//       campusLocations: prev.campusLocations.map(l =>
//         l.id === id ? { ...l, hours: { ...l.hours, [period]: value } } : l
//       )
//     }));
//   };

//   const addService = (locationId) => {
//     const service = prompt('Enter service name:');
//     if (service && service.trim()) {
//       setContact(prev => ({
//         ...prev,
//         campusLocations: prev.campusLocations.map(l =>
//           l.id === locationId ? { ...l, services: [...l.services, service.trim()] } : l
//         )
//       }));
//       toast.success('Service added!');
//     }
//   };

//   const removeService = (locationId, serviceIndex) => {
//     setContact(prev => ({
//       ...prev,
//       campusLocations: prev.campusLocations.map(l =>
//         l.id === locationId
//           ? { ...l, services: l.services.filter((_, i) => i !== serviceIndex) }
//           : l
//       )
//     }));
//     toast.success('Service removed!');
//   };

//   const setPrimaryLocation = (locationId) => {
//     setContact(prev => ({
//       ...prev,
//       campusLocations: prev.campusLocations.map(l => ({
//         ...l,
//         isPrimary: l.id === locationId
//       }))
//     }));
//     toast.success('Primary location updated!');
//   };

//   const getTabColor = (tabId) => {
//     switch (tabId) {
//       case 'methods': return 'bg-blue-50 border-blue-200 text-blue-700';
//       case 'social': return 'bg-purple-50 border-purple-200 text-purple-700';
//       case 'locations': return 'bg-green-50 border-green-200 text-green-700';
//       default: return 'bg-gray-50 border-gray-200 text-gray-700';
//     }
//   };

//   const getMethodIcon = (methodType) => {
//     switch (methodType) {
//       case 'phone': return Phone;
//       case 'email': return Mail;
//       case 'visit': return MapPin;
//       default: return Phone;
//     }
//   };

//   const getSocialIcon = (platform) => {
//     const platformConfig = socialPlatforms.find(p => p.platform === platform);
//     return platformConfig ? platformConfig.icon : Globe;
//   };

//   const getSocialColor = (platform) => {
//     const platformConfig = socialPlatforms.find(p => p.platform === platform);
//     return platformConfig ? platformConfig.color : 'text-gray-600';
//   };

//   const getSocialBgColor = (platform) => {
//     const platformConfig = socialPlatforms.find(p => p.platform === platform);
//     return platformConfig ? platformConfig.bgColor : 'bg-gray-50';
//   };

//   const getSocialBorderColor = (platform) => {
//     const platformConfig = socialPlatforms.find(p => p.platform === platform);
//     return platformConfig ? platformConfig.borderColor : 'border-gray-200';
//   };

//   if (!contact) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading contact data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
//               Contact Management
//             </h1>
//             <p className="text-gray-600 mt-2 text-lg">Manage contact methods, social media, and campus locations</p>
//           </div>
//           <Button 
//             onClick={handleSave}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
//           >
//             <Save size={20} className="mr-2" />
//             Save All Changes to Firebase
//           </Button>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar Navigation */}
//           <div className="lg:w-80 space-y-3">
//             {tabs.map(tab => {
//               const IconComponent = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group hover:shadow-lg ${
//                     activeTab === tab.id
//                       ? `${getTabColor(tab.id)} border-current shadow-lg transform scale-105`
//                       : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className={`p-2 rounded-lg transition-colors ${
//                       activeTab === tab.id ? 'bg-white' : 'bg-gray-100 group-hover:bg-gray-200'
//                     }`}>
//                       <IconComponent size={20} className={activeTab === tab.id ? tab.color : 'text-gray-500'} />
//                     </div>
//                     <div>
//                       <span className="font-semibold block">{tab.label}</span>
//                       <span className="text-sm opacity-75">
//                         {tab.id === 'methods' && 'Phone, email, and visit'}
//                         {tab.id === 'social' && 'Social media channels'}
//                         {tab.id === 'locations' && 'Campus locations & hours'}
//                       </span>
//                     </div>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Contact Methods Tab */}
//             {activeTab === 'methods' && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//                     <Phone className="text-blue-600" size={24} />
//                     Contact Methods
//                   </h2>
//                   <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                     {contact.methods?.length || 0} methods
//                   </span>
//                 </div>
                
//                 {(contact.methods || []).map(method => {
//                   const MethodIcon = getMethodIcon(method.type);
//                   return (
//                     <Card key={method.id} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
//                       <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
//                         <div className="flex items-center gap-3">
//                           <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                             <MethodIcon className="text-blue-600" size={24} />
//                           </div>
//                           <CardTitle className="text-xl font-bold text-gray-900">{method.title}</CardTitle>
//                         </div>
//                       </CardHeader>
//                       <CardContent className="p-6 space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div className="space-y-4">
//                             <Input
//                               label="Title"
//                               value={method.title}
//                               onChange={(e) => updateMethod(method.id, 'title', e.target.value)}
//                               placeholder="Contact Method Title"
//                               className="bg-white border-2 border-gray-300 focus:border-blue-500"
//                             />
//                             <Textarea
//                               label="Description"
//                               value={method.description}
//                               onChange={(e) => updateMethod(method.id, 'description', e.target.value)}
//                               placeholder="Describe this contact method..."
//                               rows={3}
//                               className="bg-white border-2 border-gray-300 focus:border-blue-500"
//                             />
//                             <Input
//                               label="Hours"
//                               value={method.hours}
//                               onChange={(e) => updateMethod(method.id, 'hours', e.target.value)}
//                               placeholder="e.g., Monday - Friday: 9 AM - 5 PM"
//                               className="bg-white border-2 border-gray-300 focus:border-blue-500"
//                             />
//                           </div>
//                           <div className="space-y-4">
//                             <Input
//                               label="Primary Contact"
//                               value={method.primary}
//                               onChange={(e) => updateMethod(method.id, 'primary', e.target.value)}
//                               placeholder="Main contact information"
//                               className="bg-white border-2 border-gray-300 focus:border-blue-500"
//                             />
//                             {method.secondary !== undefined && (
//                               <Input
//                                 label="Secondary Contact"
//                                 value={method.secondary}
//                                 onChange={(e) => updateMethod(method.id, 'secondary', e.target.value)}
//                                 placeholder="Backup contact information"
//                                 className="bg-white border-2 border-gray-300 focus:border-blue-500"
//                               />
//                             )}
//                             <Input
//                               label="Action Button Text"
//                               value={method.action}
//                               onChange={(e) => updateMethod(method.id, 'action', e.target.value)}
//                               placeholder="e.g., Call Now, Send Email"
//                               className="bg-white border-2 border-gray-300 focus:border-blue-500"
//                             />
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Social Channels Tab */}
//             {activeTab === 'social' && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
//                       <Globe className="text-purple-600" size={24} />
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">Social Media Channels</h2>
//                       <p className="text-gray-600">Manage your social media presence and engagement</p>
//                     </div>
//                   </div>
//                   <span className="bg-purple-100 text-purple-800 font-semibold px-4 py-2 rounded-full">
//                     {contact.socialChannels?.filter(s => s.isActive).length || 0} active channels
//                   </span>
//                 </div>

//                 {/* Available Social Platforms */}
//                 <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
//                   <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200">
//                     <CardTitle className="text-xl font-bold text-gray-900">Add Social Platforms</CardTitle>
//                     <p className="text-gray-600 mt-1">Click on a platform to add it to your active channels</p>
//                   </CardHeader>
//                   <CardContent className="p-6">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       {socialPlatforms.map(platform => {
//                         const IconComponent = platform.icon;
//                         const isAdded = contact.socialChannels?.some(s => s.platform === platform.platform);
                        
//                         return (
//                           <button
//                             key={platform.platform}
//                             onClick={() => !isAdded && addSocialChannel(platform)}
//                             disabled={isAdded}
//                             className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
//                               isAdded
//                                 ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
//                                 : `bg-white border-gray-200 hover:shadow-lg hover:border-${platform.color.split('-')[1]}-300 hover:scale-105 cursor-pointer`
//                             }`}
//                           >
//                             <div className="flex items-center gap-3">
//                               <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.bgColor}`}>
//                                 <IconComponent size={20} className={platform.color} />
//                               </div>
//                               <div>
//                                 <span className="font-semibold text-gray-900 block">{platform.name}</span>
//                                 <span className="text-sm text-gray-500">
//                                   {isAdded ? 'Added' : 'Click to add'}
//                                 </span>
//                               </div>
//                             </div>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Active Social Channels */}
//                 <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
//                   <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200">
//                     <CardTitle className="text-xl font-bold text-gray-900">Active Social Channels</CardTitle>
//                     <p className="text-gray-600 mt-1">Manage your connected social media accounts</p>
//                   </CardHeader>
//                   <CardContent className="p-6">
//                     {contact.socialChannels?.length === 0 ? (
//                       <div className="text-center py-12">
//                         <Globe size={48} className="mx-auto text-gray-400 mb-4" />
//                         <h3 className="text-lg font-semibold text-gray-900 mb-2">No Social Channels Added</h3>
//                         <p className="text-gray-600 mb-4">Add social media platforms from the options above</p>
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {contact.socialChannels?.map(social => {
//                           const SocialIcon = getSocialIcon(social.platform);
//                           return (
//                             <div 
//                               key={social.id} 
//                               className={`group border-2 rounded-xl p-6 transition-all duration-300 ${
//                                 social.isActive 
//                                   ? `${getSocialBgColor(social.platform)} ${getSocialBorderColor(social.platform)} hover:shadow-lg`
//                                   : 'bg-gray-100 border-gray-300 opacity-60'
//                               }`}
//                             >
//                               <div className="flex items-center justify-between mb-4">
//                                 <div className="flex items-center gap-3">
//                                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getSocialBgColor(social.platform)}`}>
//                                     <SocialIcon size={24} className={getSocialColor(social.platform)} />
//                                   </div>
//                                   <div>
//                                     <h4 className="font-bold text-lg text-gray-900">{social.name}</h4>
//                                     <div className="flex items-center gap-2 mt-1">
//                                       <div className={`w-2 h-2 rounded-full ${social.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//                                       <span className={`text-sm ${social.isActive ? 'text-green-600' : 'text-gray-500'}`}>
//                                         {social.isActive ? 'Active' : 'Inactive'}
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex gap-2">
//                                   <Button
//                                     size="sm"
//                                     variant={social.isActive ? "secondary" : "primary"}
//                                     onClick={() => toggleSocialActive(social.id)}
//                                     className={social.isActive ? 
//                                       "bg-green-50 text-green-600 hover:bg-green-100 border-green-200" : 
//                                       "bg-gray-200 text-gray-600 hover:bg-gray-300"
//                                     }
//                                   >
//                                     {social.isActive ? 'Active' : 'Inactive'}
//                                   </Button>
//                                   <Button
//                                     size="sm"
//                                     variant="danger"
//                                     onClick={() => removeSocialChannel(social.id)}
//                                     className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
//                                   >
//                                     <Trash2 size={16} />
//                                   </Button>
//                                 </div>
//                               </div>
                              
//                               <div className="space-y-3">
//                                 <Input
//                                   label="Handle/Username"
//                                   value={social.handle}
//                                   onChange={(e) => updateSocial(social.id, 'handle', e.target.value)}
//                                   placeholder={socialPlatforms.find(p => p.platform === social.platform)?.placeholder}
//                                   className="bg-white border-2 border-gray-300"
//                                 />
//                                 <Input
//                                   label="Profile URL"
//                                   value={social.url}
//                                   onChange={(e) => updateSocial(social.id, 'url', e.target.value)}
//                                   placeholder="https://..."
//                                   className="bg-white border-2 border-gray-300"
//                                 />
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </div>
//             )}

//             {/* Campus Locations Tab */}
//             {activeTab === 'locations' && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                       <MapPin className="text-green-600" size={24} />
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">Campus Locations</h2>
//                       <p className="text-gray-600">Manage multiple campus locations and their details</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <span className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full">
//                       {contact.campusLocations?.length || 0} locations
//                     </span>
//                     <Button 
//                       onClick={addLocation}
//                       className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
//                     >
//                       <Plus size={20} className="mr-2" />
//                       Add Location
//                     </Button>
//                   </div>
//                 </div>

//                 {(!contact.campusLocations || contact.campusLocations.length === 0) ? (
//                   <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
//                     <CardContent className="text-center py-16">
//                       <Building size={64} className="mx-auto text-gray-400 mb-4" />
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No Campus Locations</h3>
//                       <p className="text-gray-600 mb-6 max-w-md mx-auto">
//                         Add your first campus location to provide students with contact information and visiting details.
//                       </p>
//                       <Button onClick={addLocation} size="lg">
//                         <Plus size={20} className="mr-2" />
//                         Add First Location
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ) : (
//                   <div className="space-y-6">
//                     {contact.campusLocations.map(location => (
//                       <Card key={location.id} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
//                         <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-200">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                               <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                                 <Building className="text-green-600" size={24} />
//                               </div>
//                               <div>
//                                 <CardTitle className="text-xl font-bold text-gray-900">
//                                   {location.name || 'New Location'}
//                                 </CardTitle>
//                                 {location.isPrimary && (
//                                   <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
//                                     PRIMARY CAMPUS
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                             <Button
//                               variant="danger"
//                               size="sm"
//                               onClick={() => deleteLocation(location.id)}
//                               className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
//                             >
//                               <Trash2 size={16} />
//                             </Button>
//                           </div>
//                         </CardHeader>
//                         <CardContent className="p-6 space-y-6">
//                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                             <div className="space-y-6">
//                               <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
//                                 <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
//                                   <Building size={18} className="text-blue-600" />
//                                   Basic Information
//                                 </h4>
//                                 <div className="space-y-4">
//                                   <Input
//                                     label="Campus Name"
//                                     value={location.name}
//                                     onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
//                                     placeholder="Main Campus, Downtown Campus, etc."
//                                     className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500"
//                                   />
//                                   <Textarea
//                                     label="Address"
//                                     value={location.address}
//                                     onChange={(e) => updateLocation(location.id, 'address', e.target.value)}
//                                     rows={3}
//                                     placeholder="Full campus address"
//                                     className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500"
//                                   />
//                                 </div>
//                               </div>

//                               <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
//                                 <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
//                                   <Clock size={18} className="text-orange-600" />
//                                   Operating Hours
//                                 </h4>
//                                 <div className="space-y-3">
//                                   <Input
//                                     label="Weekdays"
//                                     value={location.hours.weekdays}
//                                     onChange={(e) => updateLocationHours(location.id, 'weekdays', e.target.value)}
//                                     placeholder="Monday - Friday: 9.00 A.M to 5.00 P.M"
//                                     className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500"
//                                   />
//                                   <Input
//                                     label="Saturday"
//                                     value={location.hours.saturday}
//                                     onChange={(e) => updateLocationHours(location.id, 'saturday', e.target.value)}
//                                     placeholder="Saturday: 9.00 A.M to 1.00 P.M"
//                                     className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500"
//                                   />
//                                   <Input
//                                     label="Sunday"
//                                     value={location.hours.sunday}
//                                     onChange={(e) => updateLocationHours(location.id, 'sunday', e.target.value)}
//                                     placeholder="Sunday: Closed"
//                                     className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500"
//                                   />
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="space-y-6">
//                               <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
//                                 <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
//                                   <Phone size={18} className="text-green-600" />
//                                   Contact Details
//                                 </h4>
//                                 <div className="space-y-4">
//                                   <Input
//                                     label="Phone Number"
//                                     value={location.phone}
//                                     onChange={(e) => updateLocation(location.id, 'phone', e.target.value)}
//                                     placeholder="+1 (555) 123-4567"
//                                     className="bg-gray-50 border-2 border-gray-300 focus:border-green-500"
//                                   />
//                                   <Input
//                                     label="Email Address"
//                                     value={location.email}
//                                     onChange={(e) => updateLocation(location.id, 'email', e.target.value)}
//                                     placeholder="campus@college.edu"
//                                     className="bg-gray-50 border-2 border-gray-300 focus:border-green-500"
//                                   />
//                                 </div>
//                               </div>

//                               <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
//                                 <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
//                                   <Users size={18} className="text-purple-600" />
//                                   Services & Facilities
//                                 </h4>
//                                 <div className="space-y-3">
//                                   <div className="flex flex-wrap gap-2 mb-3">
//                                     {location.services.map((service, index) => (
//                                       <span
//                                         key={index}
//                                         className="inline-flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200"
//                                       >
//                                         {service}
//                                         <button
//                                           onClick={() => removeService(location.id, index)}
//                                           className="hover:text-purple-900 text-purple-600"
//                                         >
//                                           ×
//                                         </button>
//                                       </span>
//                                     ))}
//                                   </div>
//                                   <Button 
//                                     size="sm" 
//                                     onClick={() => addService(location.id)}
//                                     className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200"
//                                   >
//                                     <Plus size={16} className="mr-1" />
//                                     Add Service
//                                   </Button>
//                                 </div>
//                               </div>

//                               <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
//                                 <Textarea
//                                   label="Google Maps Embed URL"
//                                   value={location.mapEmbedUrl}
//                                   onChange={(e) => updateLocation(location.id, 'mapEmbedUrl', e.target.value)}
//                                   rows={2}
//                                   placeholder="https://www.google.com/maps/embed?pb=..."
//                                   className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500"
//                                 />
//                               </div>

//                               <div className="flex items-center justify-between p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
//                                 <div className="flex items-center gap-3">
//                                   <input
//                                     type="radio"
//                                     id={`primary-${location.id}`}
//                                     name="primary-campus"
//                                     checked={location.isPrimary}
//                                     onChange={() => setPrimaryLocation(location.id)}
//                                     className="w-4 h-4 text-yellow-600 border-gray-300 focus:ring-yellow-500"
//                                   />
//                                   <label htmlFor={`primary-${location.id}`} className="text-sm font-medium text-gray-700">
//                                     Set as Primary Campus Location
//                                   </label>
//                                 </div>
//                                 {location.isPrimary && (
//                                   <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
//                                     CURRENTLY PRIMARY
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };













import React, { useState } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  Edit, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Globe, 
  Users, 
  Building,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  MessageSquare,
  FileText,
  Send,
  Shield,
  X
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useAdmin } from '../context/AdminContext';
import { toast } from '../utils/toast';

export const Contact = () => {
  const { contact, setContact, saveAllToFirebase } = useAdmin();
  const [activeTab, setActiveTab] = useState('methods');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'inquiry' or 'program'
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    label: '',
    value: ''
  });

  // Default contact data structure
  const defaultContact = {
    methods: [
      {
        id: 1,
        type: 'phone',
        title: 'Phone Support',
        description: 'Get immediate assistance from our support team',
        primary: '+1 (555) 123-4567',
        secondary: '+1 (555) 123-4568',
        hours: 'Monday - Friday: 9 AM - 5 PM EST',
        action: 'Call Now'
      },
      {
        id: 2,
        type: 'email',
        title: 'Email Support',
        description: 'Send us your queries and we\'ll respond within 24 hours',
        primary: 'admissions@college.edu',
        secondary: 'support@college.edu',
        hours: '24/7 Email Support',
        action: 'Send Email'
      },
      {
        id: 3,
        type: 'visit',
        title: 'Campus Visit',
        description: 'Schedule a campus tour and meet our faculty',
        primary: 'Admissions Office, Main Campus',
        hours: 'Monday - Saturday: 10 AM - 4 PM',
        action: 'Schedule Visit'
      }
    ],
    socialChannels: [
      {
        id: 1,
        name: 'Facebook',
        platform: 'facebook',
        handle: '@CollegeOfficial',
        url: 'https://facebook.com/collegeofficial',
        icon: 'facebook',
        isActive: true
      },
      {
        id: 2,
        name: 'Twitter',
        platform: 'twitter',
        handle: '@CollegeNews',
        url: 'https://twitter.com/collegenews',
        icon: 'twitter',
        isActive: true
      },
      {
        id: 3,
        name: 'Instagram',
        platform: 'instagram',
        handle: '@CollegeLife',
        url: 'https://instagram.com/collegelife',
        icon: 'instagram',
        isActive: true
      },
      {
        id: 4,
        name: 'LinkedIn',
        platform: 'linkedin',
        handle: 'College University',
        url: 'https://linkedin.com/school/college-university',
        icon: 'linkedin',
        isActive: true
      },
      {
        id: 5,
        name: 'YouTube',
        platform: 'youtube',
        handle: 'College Channel',
        url: 'https://youtube.com/c/collegechannel',
        icon: 'youtube',
        isActive: true
      },
      {
        id: 6,
        name: 'WhatsApp',
        platform: 'whatsapp',
        handle: '+1 (555) 123-4567',
        url: 'https://wa.me/15551234567',
        icon: 'message-circle',
        isActive: true
      }
    ],
    campusLocations: [
      {
        id: 1,
        name: 'Main Campus',
        address: '123 Education Boulevard, City, State 12345',
        phone: '+1 (555) 123-4567',
        email: 'maincampus@college.edu',
        hours: {
          weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
          saturday: 'Saturday: 9:00 AM - 2:00 PM',
          sunday: 'Sunday: Closed'
        },
        services: [
          'Admissions Office',
          'Library',
          'Student Center',
          'Cafeteria',
          'Sports Complex'
        ],
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
        isPrimary: true
      }
    ],
    contactForm: {
      enabled: true,
      inquiryTypes: [
        { value: 'admission', label: 'Admission Information' },
        { value: 'program', label: 'Program Details' },
        { value: 'financial', label: 'Financial Aid & Scholarships' },
        { value: 'transfer', label: 'Transfer Credits' },
        { value: 'international', label: 'International Students' },
        { value: 'corporate', label: 'Corporate Training' },
        { value: 'support', label: 'Student Support Services' },
        { value: 'other', label: 'Other Inquiry' }
      ],
      programs: [
        { value: 'business', label: 'Business Administration' },
        { value: 'technology', label: 'Information Technology' },
        { value: 'healthcare', label: 'Healthcare Management' },
        { value: 'education', label: 'Education & Teaching' },
        { value: 'engineering', label: 'Engineering' },
        { value: 'arts', label: 'Liberal Arts' },
        { value: 'science', label: 'Applied Sciences' },
        { value: 'undecided', label: 'Undecided / Exploring Options' }
      ],
      successMessage: 'Thank you for your inquiry! We will contact you within 24 hours.',
      submitButtonText: 'Send Inquiry',
      showNewsletter: true,
      requireTerms: true
    }
  };

  // Initialize contact data if empty
  React.useEffect(() => {
    if (!contact || Object.keys(contact).length === 0) {
      setContact(defaultContact);
    }
  }, [contact, setContact]);

  const tabs = [
    { id: 'methods', label: 'Contact Methods', icon: Phone, color: 'text-blue-600' },
    { id: 'social', label: 'Social Channels', icon: Globe, color: 'text-purple-600' },
    { id: 'locations', label: 'Campus Locations', icon: MapPin, color: 'text-green-600' },
    { id: 'form', label: 'Contact Form', icon: FileText, color: 'text-orange-600' },
  ];

  const socialPlatforms = [
    {
      name: 'Facebook',
      platform: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      placeholder: '@CollegeOfficial'
    },
    {
      name: 'Twitter',
      platform: 'Twitter',
      icon: Twitter,
      color: 'text-sky-500',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      placeholder: '@CollegeNews'
    },
    {
      name: 'Instagram',
      platform: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      placeholder: '@CollegeLife'
    },
    {
      name: 'LinkedIn',
      platform: 'Linkedin',
      icon: Linkedin,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      placeholder: 'College University'
    },
    {
      name: 'YouTube',
      platform: 'Youtube',
      icon: Youtube,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      placeholder: 'College Channel'
    },
    {
      name: 'WhatsApp',
      platform: 'Whatsapp',
      icon: MessageCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      placeholder: '+1 (555) 123-4567'
    },
    {
      name: 'WeChat',
      platform: 'Wechat',
      icon: MessageSquare,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      placeholder: 'CollegeOfficial'
    },
    {
      name: 'TikTok',
      platform: 'Tiktok',
      icon: MessageSquare,
      color: 'text-gray-900',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      placeholder: '@CollegeCampus'
    }
  ];

  const handleSave = async () => {
    const success = await saveAllToFirebase();
    if (success) {
      toast.success('Contact settings saved successfully to Firebase!');
    } else {
      toast.error('Failed to save contact settings');
    }
  };

  // Contact Methods handlers
  const updateMethod = (id, field, value) => {
    setContact(prev => ({
      ...prev,
      methods: prev.methods.map(m => m.id === id ? { ...m, [field]: value } : m)
    }));
  };

  // Social Channels handlers
  const updateSocial = (id, field, value) => {
    setContact(prev => ({
      ...prev,
      socialChannels: prev.socialChannels.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const toggleSocialActive = (id) => {
    setContact(prev => ({
      ...prev,
      socialChannels: prev.socialChannels.map(s => 
        s.id === id ? { ...s, isActive: !s.isActive } : s
      )
    }));
  };

  const addSocialChannel = (platform) => {
    const existing = contact.socialChannels.find(s => s.platform === platform.platform);
    if (existing) {
      toast.error(`${platform.name} is already added`);
      return;
    }

    const newChannel = {
      id: Date.now(),
      name: platform.name,
      platform: platform.platform,
      handle: '',
      url: '',
      icon: platform.platform,
      isActive: true
    };

    setContact(prev => ({
      ...prev,
      socialChannels: [...prev.socialChannels, newChannel]
    }));
    toast.success(`${platform.name} added successfully!`);
  };

  const removeSocialChannel = (id) => {
    if (confirm('Are you sure you want to remove this social channel?')) {
      setContact(prev => ({
        ...prev,
        socialChannels: prev.socialChannels.filter(s => s.id !== id)
      }));
      toast.success('Social channel removed!');
    }
  };

  // Campus Location handlers
  const addLocation = () => {
    const newLocation = {
      id: Date.now(),
      name: '',
      address: '',
      phone: '',
      email: '',
      hours: { weekdays: '', saturday: '', sunday: '' },
      services: [],
      mapEmbedUrl: '',
      isPrimary: contact.campusLocations.length === 0
    };
    setContact(prev => ({
      ...prev,
      campusLocations: [...prev.campusLocations, newLocation]
    }));
    toast.success('Location added successfully!');
  };

  const deleteLocation = (id) => {
    if (confirm('Are you sure you want to delete this campus location?')) {
      setContact(prev => ({
        ...prev,
        campusLocations: prev.campusLocations.filter(l => l.id !== id)
      }));
      toast.success('Location deleted successfully!');
    }
  };

  const updateLocation = (id, field, value) => {
    setContact(prev => ({
      ...prev,
      campusLocations: prev.campusLocations.map(l =>
        l.id === id ? { ...l, [field]: value } : l
      )
    }));
  };

  const updateLocationHours = (id, period, value) => {
    setContact(prev => ({
      ...prev,
      campusLocations: prev.campusLocations.map(l =>
        l.id === id ? { ...l, hours: { ...l.hours, [period]: value } } : l
      )
    }));
  };

  const addService = (locationId) => {
    const service = prompt('Enter service name:');
    if (service && service.trim()) {
      setContact(prev => ({
        ...prev,
        campusLocations: prev.campusLocations.map(l =>
          l.id === locationId ? { ...l, services: [...l.services, service.trim()] } : l
        )
      }));
      toast.success('Service added!');
    }
  };

  const removeService = (locationId, serviceIndex) => {
    setContact(prev => ({
      ...prev,
      campusLocations: prev.campusLocations.map(l =>
        l.id === locationId
          ? { ...l, services: l.services.filter((_, i) => i !== serviceIndex) }
          : l
      )
    }));
    toast.success('Service removed!');
  };

  const setPrimaryLocation = (locationId) => {
    setContact(prev => ({
      ...prev,
      campusLocations: prev.campusLocations.map(l => ({
        ...l,
        isPrimary: l.id === locationId
      }))
    }));
    toast.success('Primary location updated!');
  };

  // Contact Form handlers
  const updateContactForm = (field, value) => {
    setContact(prev => ({
      ...prev,
      contactForm: {
        ...prev.contactForm,
        [field]: value
      }
    }));
  };

  // Fixed Inquiry Types and Programs handlers
  const updateInquiryTypes = (newInquiryTypes) => {
    setContact(prev => ({
      ...prev,
      contactForm: {
        ...prev.contactForm,
        inquiryTypes: newInquiryTypes
      }
    }));
  };

  const updatePrograms = (newPrograms) => {
    setContact(prev => ({
      ...prev,
      contactForm: {
        ...prev.contactForm,
        programs: newPrograms
      }
    }));
  };

  // Modal handlers for inquiry types and programs
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      setFormData({
        label: item.label,
        value: item.value
      });
    } else {
      setFormData({
        label: '',
        value: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      label: '',
      value: ''
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.label.trim() || !formData.value.trim()) {
      toast.error('Please fill in both label and value fields');
      return;
    }

    if (modalType === 'inquiry') {
      const currentInquiryTypes = contact.contactForm?.inquiryTypes || [];
      let newInquiryTypes;
      
      if (editingItem) {
        // Update existing item
        newInquiryTypes = currentInquiryTypes.map(item => 
          item.value === editingItem.value 
            ? { label: formData.label.trim(), value: formData.value.trim() }
            : item
        );
      } else {
        // Add new item
        newInquiryTypes = [
          ...currentInquiryTypes,
          { label: formData.label.trim(), value: formData.value.trim() }
        ];
      }
      
      updateInquiryTypes(newInquiryTypes);
      toast.success(editingItem ? 'Inquiry type updated!' : 'Inquiry type added!');
    } else if (modalType === 'program') {
      const currentPrograms = contact.contactForm?.programs || [];
      let newPrograms;
      
      if (editingItem) {
        // Update existing item
        newPrograms = currentPrograms.map(item => 
          item.value === editingItem.value 
            ? { label: formData.label.trim(), value: formData.value.trim() }
            : item
        );
      } else {
        // Add new item
        newPrograms = [
          ...currentPrograms,
          { label: formData.label.trim(), value: formData.value.trim() }
        ];
      }
      
      updatePrograms(newPrograms);
      toast.success(editingItem ? 'Program updated!' : 'Program added!');
    }

    closeModal();
  };

  const removeInquiryType = (index) => {
    if (confirm('Are you sure you want to remove this inquiry type?')) {
      const currentInquiryTypes = contact.contactForm?.inquiryTypes || [];
      const newInquiryTypes = currentInquiryTypes.filter((_, i) => i !== index);
      updateInquiryTypes(newInquiryTypes);
      toast.success('Inquiry type removed!');
    }
  };

  const removeProgram = (index) => {
    if (confirm('Are you sure you want to remove this program?')) {
      const currentPrograms = contact.contactForm?.programs || [];
      const newPrograms = currentPrograms.filter((_, i) => i !== index);
      updatePrograms(newPrograms);
      toast.success('Program removed!');
    }
  };

  const getTabColor = (tabId) => {
    switch (tabId) {
      case 'methods': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'social': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'locations': return 'bg-green-50 border-green-200 text-green-700';
      case 'form': return 'bg-orange-50 border-orange-200 text-orange-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getMethodIcon = (methodType) => {
    switch (methodType) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'visit': return MapPin;
      default: return Phone;
    }
  };

  const getSocialIcon = (platform) => {
    const platformConfig = socialPlatforms.find(p => p.platform === platform);
    return platformConfig ? platformConfig.icon : Globe;
  };

  const getSocialColor = (platform) => {
    const platformConfig = socialPlatforms.find(p => p.platform === platform);
    return platformConfig ? platformConfig.color : 'text-gray-600';
  };

  const getSocialBgColor = (platform) => {
    const platformConfig = socialPlatforms.find(p => p.platform === platform);
    return platformConfig ? platformConfig.bgColor : 'bg-gray-50';
  };

  const getSocialBorderColor = (platform) => {
    const platformConfig = socialPlatforms.find(p => p.platform === platform);
    return platformConfig ? platformConfig.borderColor : 'border-gray-200';
  };

  if (!contact) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contact data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              Contact Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage contact methods, social media, and campus locations</p>
          </div>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Save size={20} className="mr-2" />
            Save All Changes to Firebase
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80 space-y-3">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group hover:shadow-lg ${
                    activeTab === tab.id
                      ? `${getTabColor(tab.id)} border-current shadow-lg transform scale-105`
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      activeTab === tab.id ? 'bg-white' : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
                      <IconComponent size={20} className={activeTab === tab.id ? tab.color : 'text-gray-500'} />
                    </div>
                    <div>
                      <span className="font-semibold block">{tab.label}</span>
                      <span className="text-sm opacity-75">
                        {tab.id === 'methods' && 'Phone, email, and visit'}
                        {tab.id === 'social' && 'Social media channels'}
                        {tab.id === 'locations' && 'Campus locations & hours'}
                        {tab.id === 'form' && 'Contact form settings'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Contact Methods Tab */}
            {activeTab === 'methods' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Phone className="text-blue-600" size={24} />
                    Contact Methods
                  </h2>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {contact.methods?.length || 0} methods
                  </span>
                </div>
                
                {(contact.methods || []).map(method => {
                  const MethodIcon = getMethodIcon(method.type);
                  return (
                    <Card key={method.id} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <MethodIcon className="text-blue-600" size={24} />
                          </div>
                          <CardTitle className="text-xl font-bold text-gray-900">{method.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <Input
                              label="Title"
                              value={method.title}
                              onChange={(e) => updateMethod(method.id, 'title', e.target.value)}
                              placeholder="Contact Method Title"
                              className="bg-white border-2 border-gray-300 focus:border-blue-500"
                            />
                            <Textarea
                              label="Description"
                              value={method.description}
                              onChange={(e) => updateMethod(method.id, 'description', e.target.value)}
                              placeholder="Describe this contact method..."
                              rows={3}
                              className="bg-white border-2 border-gray-300 focus:border-blue-500"
                            />
                            <Input
                              label="Hours"
                              value={method.hours}
                              onChange={(e) => updateMethod(method.id, 'hours', e.target.value)}
                              placeholder="e.g., Monday - Friday: 9 AM - 5 PM"
                              className="bg-white border-2 border-gray-300 focus:border-blue-500"
                            />
                          </div>
                          <div className="space-y-4">
                            <Input
                              label="Primary Contact"
                              value={method.primary}
                              onChange={(e) => updateMethod(method.id, 'primary', e.target.value)}
                              placeholder="Main contact information"
                              className="bg-white border-2 border-gray-300 focus:border-blue-500"
                            />
                            {method.secondary !== undefined && (
                              <Input
                                label="Secondary Contact"
                                value={method.secondary}
                                onChange={(e) => updateMethod(method.id, 'secondary', e.target.value)}
                                placeholder="Backup contact information"
                                className="bg-white border-2 border-gray-300 focus:border-blue-500"
                              />
                            )}
                            <Input
                              label="Action Button Text"
                              value={method.action}
                              onChange={(e) => updateMethod(method.id, 'action', e.target.value)}
                              placeholder="e.g., Call Now, Send Email"
                              className="bg-white border-2 border-gray-300 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Social Channels Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Globe className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Social Media Channels</h2>
                      <p className="text-gray-600">Manage your social media presence and engagement</p>
                    </div>
                  </div>
                  <span className="bg-purple-100 text-purple-800 font-semibold px-4 py-2 rounded-full">
                    {contact.socialChannels?.filter(s => s.isActive).length || 0} active channels
                  </span>
                </div>

                {/* Available Social Platforms */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200">
                    <CardTitle className="text-xl font-bold text-gray-900">Add Social Platforms</CardTitle>
                    <p className="text-gray-600 mt-1">Click on a platform to add it to your active channels</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {socialPlatforms.map(platform => {
                        const IconComponent = platform.icon;
                        const isAdded = contact.socialChannels?.some(s => s.platform === platform.platform);
                        
                        return (
                          <button
                            key={platform.platform}
                            onClick={() => !isAdded && addSocialChannel(platform)}
                            disabled={isAdded}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                              isAdded
                                ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
                                : `bg-white border-gray-200 hover:shadow-lg hover:border-${platform.color.split('-')[1]}-300 hover:scale-105 cursor-pointer`
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.bgColor}`}>
                                <IconComponent size={20} className={platform.color} />
                              </div>
                              <div>
                                <span className="font-semibold text-gray-900 block">{platform.name}</span>
                                <span className="text-sm text-gray-500">
                                  {isAdded ? 'Added' : 'Click to add'}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Active Social Channels */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200">
                    <CardTitle className="text-xl font-bold text-gray-900">Active Social Channels</CardTitle>
                    <p className="text-gray-600 mt-1">Manage your connected social media accounts</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    {contact.socialChannels?.length === 0 ? (
                      <div className="text-center py-12">
                        <Globe size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Social Channels Added</h3>
                        <p className="text-gray-600 mb-4">Add social media platforms from the options above</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {contact.socialChannels?.map(social => {
                          const SocialIcon = getSocialIcon(social.platform);
                          return (
                            <div 
                              key={social.id} 
                              className={`group border-2 rounded-xl p-6 transition-all duration-300 ${
                                social.isActive 
                                  ? `${getSocialBgColor(social.platform)} ${getSocialBorderColor(social.platform)} hover:shadow-lg`
                                  : 'bg-gray-100 border-gray-300 opacity-60'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getSocialBgColor(social.platform)}`}>
                                    <SocialIcon size={24} className={getSocialColor(social.platform)} />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-lg text-gray-900">{social.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className={`w-2 h-2 rounded-full ${social.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                      <span className={`text-sm ${social.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                                        {social.isActive ? 'Active' : 'Inactive'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant={social.isActive ? "secondary" : "primary"}
                                    onClick={() => toggleSocialActive(social.id)}
                                    className={social.isActive ? 
                                      "bg-green-50 text-green-600 hover:bg-green-100 border-green-200" : 
                                      "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                    }
                                  >
                                    {social.isActive ? 'Active' : 'Inactive'}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => removeSocialChannel(social.id)}
                                    className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <Input
                                  label="Handle/Username"
                                  value={social.handle}
                                  onChange={(e) => updateSocial(social.id, 'handle', e.target.value)}
                                  placeholder={socialPlatforms.find(p => p.platform === social.platform)?.placeholder}
                                  className="bg-white border-2 border-gray-300"
                                />
                                <Input
                                  label="Profile URL"
                                  value={social.url}
                                  onChange={(e) => updateSocial(social.id, 'url', e.target.value)}
                                  placeholder="https://..."
                                  className="bg-white border-2 border-gray-300"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Campus Locations Tab */}
            {activeTab === 'locations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <MapPin className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Campus Locations</h2>
                      <p className="text-gray-600">Manage multiple campus locations and their details</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full">
                      {contact.campusLocations?.length || 0} locations
                    </span>
                    <Button 
                      onClick={addLocation}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                    >
                      <Plus size={20} className="mr-2" />
                      Add Location
                    </Button>
                  </div>
                </div>

                {(!contact.campusLocations || contact.campusLocations.length === 0) ? (
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardContent className="text-center py-16">
                      <Building size={64} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Campus Locations</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Add your first campus location to provide students with contact information and visiting details.
                      </p>
                      <Button onClick={addLocation} size="lg">
                        <Plus size={20} className="mr-2" />
                        Add First Location
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {contact.campusLocations.map(location => (
                      <Card key={location.id} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Building className="text-green-600" size={24} />
                              </div>
                              <div>
                                <CardTitle className="text-xl font-bold text-gray-900">
                                  {location.name || 'New Location'}
                                </CardTitle>
                                {location.isPrimary && (
                                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                                    PRIMARY CAMPUS
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => deleteLocation(location.id)}
                              className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-6">
                              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <Building size={18} className="text-blue-600" />
                                  Basic Information
                                </h4>
                                <div className="space-y-4">
                                  <Input
                                    label="Campus Name"
                                    value={location.name}
                                    onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                                    placeholder="Main Campus, Downtown Campus, etc."
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500"
                                  />
                                  <Textarea
                                    label="Address"
                                    value={location.address}
                                    onChange={(e) => updateLocation(location.id, 'address', e.target.value)}
                                    rows={3}
                                    placeholder="Full campus address"
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500"
                                  />
                                </div>
                              </div>

                              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <Clock size={18} className="text-orange-600" />
                                  Operating Hours
                                </h4>
                                <div className="space-y-3">
                                  <Input
                                    label="Weekdays"
                                    value={location.hours.weekdays}
                                    onChange={(e) => updateLocationHours(location.id, 'weekdays', e.target.value)}
                                    placeholder="Monday - Friday: 9.00 A.M to 5.00 P.M"
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500"
                                  />
                                  <Input
                                    label="Saturday"
                                    value={location.hours.saturday}
                                    onChange={(e) => updateLocationHours(location.id, 'saturday', e.target.value)}
                                    placeholder="Saturday: 9.00 A.M to 1.00 P.M"
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500"
                                  />
                                  <Input
                                    label="Sunday"
                                    value={location.hours.sunday}
                                    onChange={(e) => updateLocationHours(location.id, 'sunday', e.target.value)}
                                    placeholder="Sunday: Closed"
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <Phone size={18} className="text-green-600" />
                                  Contact Details
                                </h4>
                                <div className="space-y-4">
                                  <Input
                                    label="Phone Number"
                                    value={location.phone}
                                    onChange={(e) => updateLocation(location.id, 'phone', e.target.value)}
                                    placeholder="+1 (555) 123-4567"
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-green-500"
                                  />
                                  <Input
                                    label="Email Address"
                                    value={location.email}
                                    onChange={(e) => updateLocation(location.id, 'email', e.target.value)}
                                    placeholder="campus@college.edu"
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-green-500"
                                  />
                                </div>
                              </div>

                              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <Users size={18} className="text-purple-600" />
                                  Services & Facilities
                                </h4>
                                <div className="space-y-3">
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {location.services.map((service, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200"
                                      >
                                        {service}
                                        <button
                                          onClick={() => removeService(location.id, index)}
                                          className="hover:text-purple-900 text-purple-600"
                                        >
                                          ×
                                        </button>
                                      </span>
                                    ))}
                                  </div>
                                  <Button 
                                    size="sm" 
                                    onClick={() => addService(location.id)}
                                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200"
                                  >
                                    <Plus size={16} className="mr-1" />
                                    Add Service
                                  </Button>
                                </div>
                              </div>

                              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                                <Textarea
                                  label="Google Maps Embed URL"
                                  value={location.mapEmbedUrl}
                                  onChange={(e) => updateLocation(location.id, 'mapEmbedUrl', e.target.value)}
                                  rows={2}
                                  placeholder="https://www.google.com/maps/embed?pb=..."
                                  className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500"
                                />
                              </div>

                              <div className="flex items-center justify-between p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <input
                                    type="radio"
                                    id={`primary-${location.id}`}
                                    name="primary-campus"
                                    checked={location.isPrimary}
                                    onChange={() => setPrimaryLocation(location.id)}
                                    className="w-4 h-4 text-yellow-600 border-gray-300 focus:ring-yellow-500"
                                  />
                                  <label htmlFor={`primary-${location.id}`} className="text-sm font-medium text-gray-700">
                                    Set as Primary Campus Location
                                  </label>
                                </div>
                                {location.isPrimary && (
                                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                                    CURRENTLY PRIMARY
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contact Form Tab */}
            {activeTab === 'form' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <FileText className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Contact Form Settings</h2>
                      <p className="text-gray-600">Configure the inquiry form fields and behavior</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="form-enabled"
                        checked={contact.contactForm?.enabled}
                        onChange={(e) => updateContactForm('enabled', e.target.checked)}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <label htmlFor="form-enabled" className="text-sm font-medium text-gray-700">
                        Form Enabled
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Configuration */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b border-orange-200">
                    <CardTitle className="text-xl font-bold text-gray-900">Form Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Textarea
                          label="Success Message"
                          value={contact.contactForm?.successMessage}
                          onChange={(e) => updateContactForm('successMessage', e.target.value)}
                          placeholder="Thank you for your inquiry! We will contact you within 24 hours."
                          rows={3}
                          className="bg-white border-2 border-gray-300 focus:border-orange-500"
                        />
                        <Input
                          label="Submit Button Text"
                          value={contact.contactForm?.submitButtonText}
                          onChange={(e) => updateContactForm('submitButtonText', e.target.value)}
                          placeholder="Send Inquiry"
                          className="bg-white border-2 border-gray-300 focus:border-orange-500"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                          <input
                            type="checkbox"
                            id="show-newsletter"
                            checked={contact.contactForm?.showNewsletter}
                            onChange={(e) => updateContactForm('showNewsletter', e.target.checked)}
                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <label htmlFor="show-newsletter" className="text-sm font-medium text-gray-700">
                            Show Newsletter Subscription Option
                          </label>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                          <input
                            type="checkbox"
                            id="require-terms"
                            checked={contact.contactForm?.requireTerms}
                            onChange={(e) => updateContactForm('requireTerms', e.target.checked)}
                            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <label htmlFor="require-terms" className="text-sm font-medium text-gray-700">
                            Require Terms & Conditions Acceptance
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Inquiry Types */}
                <Card className="border-0 shadow-xl bg-white/80 ">
  <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b border-orange-200">
    <div className="flex items-center justify-between">
      <CardTitle className="text-xl font-bold text-gray-900">Inquiry Types</CardTitle>
      <Button 
        onClick={() => openModal('inquiry')}
        className="bg-white text-red-700 border-2 border-red-600 hover:bg-red-50 hover:text-red-800 transition-colors duration-200"
      >
        <Plus size={16} className="mr-2" />
        Add Inquiry Type
      </Button>
    </div>
  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {contact.contactForm?.inquiryTypes?.map((type, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                          <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                                <div className="text-sm text-gray-900 bg-white px-3 py-2 rounded border border-gray-300">
                                  {type.value}
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                                <div className="text-sm text-gray-900 bg-white px-3 py-2 rounded border border-gray-300">
                                  {type.label}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
<Button
  size="sm"
  onClick={() => openModal('inquiry', type)}
  className="bg-blue-300 text-blue-1000 hover:bg-blue-200 border-blue-400"
>
  <Edit size={16} />
</Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => removeInquiryType(index)}
                              className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {(!contact.contactForm?.inquiryTypes || contact.contactForm.inquiryTypes.length === 0) && (
                        <div className="text-center py-8 text-gray-500">
                          No inquiry types configured. Add some to let users select their inquiry type.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Programs */}
<Card className="border-0 shadow-xl bg-white/80">
  <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b border-orange-200">
    <div className="flex items-center justify-between">
      <CardTitle className="text-xl font-bold text-gray-900">Programs of Interest</CardTitle>
      <Button 
        onClick={() => openModal('program')}
        className="bg-white text-red-700 border-2 border-red-600 hover:bg-red-50 hover:text-red-800 transition-colors duration-200"
      >
        <Plus size={16} className="mr-2" />
        Add Program
      </Button>
    </div>
  </CardHeader>
        <CardContent className="p-6">
                    <div className="space-y-4">
                      {contact.contactForm?.programs?.map((program, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                          <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                                <div className="text-sm text-gray-900 bg-white px-3 py-2 rounded border border-gray-300">
                                  {program.value}
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                                <div className="text-sm text-gray-900 bg-white px-3 py-2 rounded border border-gray-300">
                                  {program.label}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              onClick={() => openModal('program', program)}
                             className="bg-blue-300 text-blue-1000 hover:bg-blue-200 border-blue-400"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => removeProgram(index)}
                              className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {(!contact.contactForm?.programs || contact.contactForm.programs.length === 0) && (
                        <div className="text-center py-8 text-gray-500">
                          No programs configured. Add some to let users select their program of interest.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for adding/editing inquiry types and programs */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? `Edit ${modalType === 'inquiry' ? 'Inquiry Type' : 'Program'}` : `Add New ${modalType === 'inquiry' ? 'Inquiry Type' : 'Program'}`}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-3">
            <Input
              label="Label"
              value={formData.label}
              onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
              placeholder={modalType === 'inquiry' ? "e.g., Admission Information" : "e.g., Business Administration"}
              required
            />
            <Input
              label="Value"
              value={formData.value}
              onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
              placeholder={modalType === 'inquiry' ? "e.g., admission" : "e.g., business"}
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={closeModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              {editingItem ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};