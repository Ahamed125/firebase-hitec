// import React, { useState, useEffect } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';
// import Input from '../../../components/ui/Input';
// import Select from '../../../components/ui/Select';
// import { Checkbox } from '../../../components/ui/Checkbox';
// import { loadFromFirebase, COLLECTIONS } from '../../../../firebase';

// const ContactForm = () => {
//   const [formConfig, setFormConfig] = useState({
//     enabled: true,
//     inquiryTypes: [],
//     programs: [],
//     requireTerms: false,
//     showNewsletter: false,
//     submitButtonText: 'Send Inquiry', // Changed from buttonText to submitButtonText
//     successMessage: 'Thank you for your inquiry! We will contact you within 24 hours.',
//     formTitle: 'Send Us Your Inquiry',
//     formDescription: 'Fill out the form below and our admissions team will get back to you within 24 hours.',
//     sectionTitle: 'Get Started'
//   });

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     inquiryType: '',
//     program: '',
//     message: '',
//     newsletter: false,
//     terms: false
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Load form configuration from Firebase CONTACT collection
//   useEffect(() => {
//     const loadFormConfig = async () => {
//       try {
//         setLoading(true);
//         const result = await loadFromFirebase(COLLECTIONS.CONTACT);
        
//         if (result.success && result.data && result.data.contactForm) {
//           const contactFormData = result.data.contactForm;
//           setFormConfig(prev => ({
//             ...prev,
//             enabled: contactFormData.enabled !== undefined ? contactFormData.enabled : true,
//             inquiryTypes: contactFormData.inquiryTypes || [],
//             programs: contactFormData.programs || [],
//             requireTerms: contactFormData.requireTerms || false,
//             showNewsletter: contactFormData.showNewsletter || false,
//             submitButtonText: contactFormData.submitButtonText || 'Send Inquiry', // Use submitButtonText
//             successMessage: contactFormData.successMessage || 'Thank you for your inquiry! We will contact you within 24 hours.',
//             formTitle: contactFormData.formTitle || 'Send Us Your Inquiry',
//             formDescription: contactFormData.formDescription || 'Fill out the form below and our admissions team will get back to you within 24 hours.',
//             sectionTitle: contactFormData.sectionTitle || 'Get Started'
//           }));
//         }
//       } catch (error) {
//         console.error('Error loading contact form configuration:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadFormConfig();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
//     if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
//     if (!formData.email?.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
//     if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
//     if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
//     if (!formData.message?.trim()) newErrors.message = 'Message is required';
    
//     // Only validate terms if required in config
//     if (formConfig.requireTerms && !formData.terms) {
//       newErrors.terms = 'You must agree to the terms and conditions';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     setIsSubmitting(true);
    
//     // Simulate form submission
//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       alert(formConfig.successMessage);
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         inquiryType: '',
//         program: '',
//         message: '',
//         newsletter: false,
//         terms: false
//       });
//     } catch (error) {
//       alert('There was an error submitting your form. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // If form is disabled or still loading, don't render
//   if (loading) {
//     return (
//       <section className="py-16 lg:py-24 bg-muted/30">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//             <p className="mt-4 text-muted-foreground">Loading contact form...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!formConfig.enabled) {
//     return (
//       <section className="py-16 lg:py-24 bg-muted/30">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <Icon name="Slash" size={48} className="mx-auto text-muted-foreground mb-4" />
//             <h3 className="text-xl font-semibold text-foreground mb-2">
//               Contact Form Temporarily Unavailable
//             </h3>
//             <p className="text-muted-foreground">
//               Please check back later or contact us directly.
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 lg:py-24 bg-muted/30">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center space-x-2 text-primary mb-4">
//             <Icon name="FileText" size={20} />
//             <span className="text-sm font-medium uppercase tracking-wider">
//               {formConfig.sectionTitle}
//             </span>
//           </div>
//           <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
//             {formConfig.formTitle}
//           </h2>
//           <p className="text-xl text-muted-foreground">
//             {formConfig.formDescription}
//           </p>
//         </div>

//         {/* Contact Form */}
//         <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Information */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <Input
//                 label="First Name"
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 error={errors.firstName}
//                 placeholder="Enter your first name"
//                 required
//               />
//               <Input
//                 label="Last Name"
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 error={errors.lastName}
//                 placeholder="Enter your last name"
//                 required
//               />
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <Input
//                 label="Email Address"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 error={errors.email}
//                 placeholder="your.email@example.com"
//                 required
//               />
//               <Input
//                 label="Phone Number"
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 error={errors.phone}
//                 placeholder="+1 (555) 123-4567"
//                 required
//               />
//             </div>

//             {/* Inquiry Details */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <Select
//                 label="Inquiry Type"
//                 options={formConfig.inquiryTypes}
//                 value={formData.inquiryType}
//                 onChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}
//                 error={errors.inquiryType}
//                 placeholder="Select inquiry type"
//                 required
//               />
//               <Select
//                 label="Program of Interest"
//                 options={formConfig.programs}
//                 value={formData.program}
//                 onChange={(value) => setFormData(prev => ({ ...prev, program: value }))}
//                 placeholder="Select a program (optional)"
//               />
//             </div>

//             {/* Message */}
//             <div>
//               <label className="block text-sm font-medium text-foreground mb-2">
//                 Message <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleInputChange}
//                 rows={6}
//                 className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
//                 placeholder="Please provide details about your inquiry, including any specific questions or requirements..."
//               />
//               {errors.message && (
//                 <p className="mt-1 text-sm text-red-600">{errors.message}</p>
//               )}
//             </div>

//             {/* Checkboxes - Conditionally rendered based on config */}
//             <div className="space-y-4">
//               {formConfig.showNewsletter && (
//                 <Checkbox
//                   label="Subscribe to our newsletter for updates and educational resources"
//                   checked={formData.newsletter}
//                   onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
//                 />
//               )}
              
//               {formConfig.requireTerms && (
//                 <Checkbox
//                   label="I agree to the Terms of Service and Privacy Policy"
//                   checked={formData.terms}
//                   onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
//                   error={errors.terms}
//                   required
//                 />
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="pt-6">
//               <Button
//                 type="submit"
//                 variant="default"
//                 size="lg"
//                 fullWidth
//                 loading={isSubmitting}
//                 disabled={isSubmitting}
//                 className="bg-gradient-primary hover:shadow-lg"
//               >
//                 <Icon name="Send" size={20} className="mr-2" />
//                 {isSubmitting ? 'Sending...' : formConfig.submitButtonText}
//               </Button>
//             </div>
//           </form>

//           {/* Form Footer */}
//           <div className="mt-8 pt-6 border-t border-border text-center">
//             <p className="text-sm text-muted-foreground">
//               <Icon name="Shield" size={16} className="inline mr-1" />
//               Your information is secure and will never be shared with third parties.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactForm;
















import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { loadFromFirebase, saveToFirebase, COLLECTIONS } from '../../../../firebase';

const ContactForm = () => {
  const [formConfig, setFormConfig] = useState({
    enabled: true,
    inquiryTypes: [],
    programs: [],
    requireTerms: false,
    showNewsletter: false,
    submitButtonText: 'Send Inquiry',
    successMessage: 'Thank you for your inquiry! We will contact you within 24 hours.',
    formTitle: 'Send Us Your Inquiry',
    formDescription: 'Fill out the form below and our admissions team will get back to you within 24 hours.',
    sectionTitle: 'Get Started'
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: '',
    program: '',
    message: '',
    newsletter: false,
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load form configuration from Firebase CONTACT collection
  useEffect(() => {
    const loadFormConfig = async () => {
      try {
        setLoading(true);
        const result = await loadFromFirebase(COLLECTIONS.CONTACT);
        
        if (result.success && result.data && result.data.contactForm) {
          const contactFormData = result.data.contactForm;
          setFormConfig(prev => ({
            ...prev,
            enabled: contactFormData.enabled !== undefined ? contactFormData.enabled : true,
            inquiryTypes: contactFormData.inquiryTypes || [],
            programs: contactFormData.programs || [],
            requireTerms: contactFormData.requireTerms || false,
            showNewsletter: contactFormData.showNewsletter || false,
            submitButtonText: contactFormData.submitButtonText || 'Send Inquiry',
            successMessage: contactFormData.successMessage || 'Thank you for your inquiry! We will contact you within 24 hours.',
            formTitle: contactFormData.formTitle || 'Send Us Your Inquiry',
            formDescription: contactFormData.formDescription || 'Fill out the form below and our admissions team will get back to you within 24 hours.',
            sectionTitle: contactFormData.sectionTitle || 'Get Started'
          }));
        }
      } catch (error) {
        console.error('Error loading contact form configuration:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFormConfig();
  }, []);

  // Save message to Firebase
  const saveMessageToFirebase = async (messageData) => {
    try {
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const messageDoc = {
        id: messageId,
        ...messageData,
        status: 'new', // new, read, replied, archived
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      };

      // Save to messages collection
      await saveToFirebase(COLLECTIONS.MESSAGES, {
        [messageId]: messageDoc
      });

      return { success: true, messageId };
    } catch (error) {
      console.error('Error saving message to Firebase:', error);
      return { success: false, error: error.message };
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    if (!formData.message?.trim()) newErrors.message = 'Message is required';
    
    // Only validate terms if required in config
    if (formConfig.requireTerms && !formData.terms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Prepare message data
      const messageData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        inquiryType: formData.inquiryType,
        program: formData.program,
        message: formData.message.trim(),
        newsletter: formData.newsletter,
        termsAccepted: formData.terms,
        // Get inquiry type label
        inquiryTypeLabel: formConfig.inquiryTypes.find(type => type.value === formData.inquiryType)?.label || formData.inquiryType,
        // Get program label
        programLabel: formConfig.programs.find(prog => prog.value === formData.program)?.label || formData.program
      };

      // Save message to Firebase
      const saveResult = await saveMessageToFirebase(messageData);

      if (saveResult.success) {
        alert(formConfig.successMessage);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          inquiryType: '',
          program: '',
          message: '',
          newsletter: false,
          terms: false
        });
      } else {
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If form is disabled or still loading, don't render
  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading contact form...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!formConfig.enabled) {
    return (
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Icon name="Slash" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Contact Form Temporarily Unavailable
            </h3>
            <p className="text-muted-foreground">
              Please check back later or contact us directly.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Icon name="FileText" size={20} />
            <span className="text-sm font-medium uppercase tracking-wider">
              {formConfig.sectionTitle}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {formConfig.formTitle}
          </h2>
          <p className="text-xl text-muted-foreground">
            {formConfig.formDescription}
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                placeholder="Enter your first name"
                required
              />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                placeholder="Enter your last name"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="your.email@example.com"
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            {/* Inquiry Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <Select
                label="Inquiry Type"
                options={formConfig.inquiryTypes}
                value={formData.inquiryType}
                onChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}
                error={errors.inquiryType}
                placeholder="Select inquiry type"
                required
              />
              <Select
                label="Program of Interest"
                options={formConfig.programs}
                value={formData.program}
                onChange={(value) => setFormData(prev => ({ ...prev, program: value }))}
                placeholder="Select a program (optional)"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Please provide details about your inquiry, including any specific questions or requirements..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            {/* Checkboxes - Conditionally rendered based on config */}
            <div className="space-y-4">
              {formConfig.showNewsletter && (
                <Checkbox
                  label="Subscribe to our newsletter for updates and educational resources"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
                />
              )}
              
              {formConfig.requireTerms && (
                <Checkbox
                  label="I agree to the Terms of Service and Privacy Policy"
                  checked={formData.terms}
                  onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
                  error={errors.terms}
                  required
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
                className="bg-gradient-primary hover:shadow-lg"
              >
                <Icon name="Send" size={20} className="mr-2" />
                {isSubmitting ? 'Sending...' : formConfig.submitButtonText}
              </Button>
            </div>
          </form>

          {/* Form Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              <Icon name="Shield" size={16} className="inline mr-1" />
              Your information is secure and will never be shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;