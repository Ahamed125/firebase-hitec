import React, { useState, useEffect } from 'react';
import Icon from '../components/AppIcon';
import Header from './../components/ui/Header';
import { loadFromFirebase, COLLECTIONS } from '../../firebase';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());
  const [faqCategories, setFaqCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    phone: '+94773066411',
    email: 'ainudeen@gmail.com'
  });

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setLoading(true);
      const result = await loadFromFirebase(COLLECTIONS.FAQS);
      
      if (result.success && result.data) {
        // Transform the Firebase data structure to match component needs
        const transformedCategories = transformFAQData(result.data);
        setFaqCategories(transformedCategories);
        
        // Open first FAQ item by default if available
        if (transformedCategories.length > 0 && transformedCategories[0].items?.[0]?.id) {
          setOpenItems(new Set([transformedCategories[0].items[0].id]));
        }
      } else {
        // Fallback to default data
        setFaqCategories(getDefaultFAQs());
        setOpenItems(new Set([1762349101485])); // Default first item ID
      }

      // Load contact info from Firebase
      await loadContactInfo();
    } catch (err) {
      console.error('Error loading FAQs:', err);
      setError('Failed to load FAQs. Please try again later.');
      setFaqCategories(getDefaultFAQs());
      setOpenItems(new Set([1762349101485]));
    } finally {
      setLoading(false);
    }
  };

  const transformFAQData = (firebaseData) => {
    if (!firebaseData.categories) return getDefaultFAQs();
    
    return firebaseData.categories.map(category => ({
      id: category.id,
      title: category.title,
      order: category.order,
      items: category.items?.map(item => ({
        id: item.id,
        question: item.question,
        answer: item.answer,
        order: item.order
      })) || []
    })).sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  const loadContactInfo = async () => {
    try {
      const contactResult = await loadFromFirebase(COLLECTIONS.CONTACT);
      if (contactResult.success && contactResult.data) {
        const contactData = contactResult.data;
        if (contactData.methods && contactData.methods.length > 0) {
          const phoneMethod = contactData.methods.find(method => method.type === 'phone');
          const emailMethod = contactData.methods.find(method => method.type === 'email');
          
          setContactInfo({
            phone: phoneMethod?.primary || '+94773066411',
            email: emailMethod?.primary || 'ainudeen@gmail.com'
          });
        }
      }
    } catch (err) {
      console.error('Error loading contact info:', err);
    }
  };

  // Default FAQs in case Firebase data is not available
  const getDefaultFAQs = () => [
    {
      id: 1762349056701,
      title: "Admissions & Enrollment",
      order: 1,
      items: [
        {
          id: 1762349101485,
          question: "What are the admission requirements?",
          answer: `Admission requirements vary by program, but generally include:\n• High school diploma or equivalent\n• Completed application form\n• Official transcripts\n• Personal statement or essay\n• Letters of recommendation (for some programs)\n• English proficiency test scores (for international students)\n\nSpecific programs may have additional requirements such as portfolios, interviews, or prerequisite courses.`,
          order: 1
        },
        {
          id: 1762349101486,
          question: "When are the application deadlines?",
          answer: `We have rolling admissions for most programs with three main intake periods:\n• Fall Semester: Applications due July 15th\n• Spring Semester: Applications due November 15th\n• Summer Session: Applications due March 15th\n\nEarly applications are encouraged as some programs have limited capacity. International students should apply at least 3 months before the intended start date.`,
          order: 2
        },
        {
          id: 1762349101487,
          question: "How long does the admission process take?",
          answer: `The typical admission timeline is:\n• Application review: 2-3 weeks\n• Interview scheduling (if required): 1 week\n• Final decision notification: 1-2 weeks after interview\n• Total process: 4-6 weeks from complete application\n\nWe provide regular updates throughout the process and you can track your application status online.`,
          order: 3
        }
      ]
    },
    {
      id: 1762349056702,
      title: "Financial Aid & Tuition",
      order: 2,
      items: [
        {
          id: 1762349101488,
          question: "What financial aid options are available?",
          answer: `We offer comprehensive financial assistance including:\n• Merit-based scholarships (up to 50% tuition coverage)\n• Need-based grants\n• Federal and state financial aid\n• Work-study programs\n• Payment plans with 0% interest\n• Corporate sponsorship programs\n• Military and veteran benefits\n\nOur financial aid office provides personalized assistance to help you find the best funding options.`,
          order: 1
        },
        {
          id: 1762349101489,
          question: "What is the total cost of attendance?",
          answer: `Tuition and fees vary by program:\n• Undergraduate programs: $15,000-$25,000 per year\n• Graduate programs: $18,000-$30,000 per year\n• Certificate programs: $3,000-$8,000 total\n• Professional development: $500-$2,000 per course\n\nAdditional costs may include books, materials, and technology fees. We provide detailed cost breakdowns for each program.`,
          order: 2
        }
      ]
    },
    {
      id: 1762349056703,
      title: "Programs & Courses",
      order: 3,
      items: [
        {
          id: 1762349101490,
          question: "Do you offer online and hybrid learning options?",
          answer: `Yes, we offer flexible learning formats:\n• Fully online programs with live virtual classes\n• Hybrid programs combining online and on-campus learning\n• Evening and weekend classes for working professionals\n• Accelerated programs for faster completion\n• Self-paced learning modules\n\nAll formats maintain the same academic rigor and accreditation standards as traditional programs.`,
          order: 1
        },
        {
          id: 1762349101491,
          question: "Can I transfer credits from other institutions?",
          answer: `We accept transfer credits from accredited institutions:\n• Up to 60 credits for undergraduate programs\n• Up to 30 credits for graduate programs\n• Professional certifications may qualify for credit\n• Military training and experience considered\n• Prior learning assessment available\n\nOur transfer credit evaluation is free and typically completed within 2 weeks of admission.`,
          order: 2
        }
      ]
    },
    {
      id: 1762349056704,
      title: "Student Support & Services",
      order: 4,
      items: [
        {
          id: 1762349101492,
          question: "What support services are available for students?",
          answer: `We provide comprehensive student support:\n• Academic advising and tutoring\n• Career counseling and job placement assistance\n• Mental health and wellness services\n• Disability support services\n• International student services\n• Technical support for online learning\n• Library and research assistance\n• Student success coaching\n\nAll services are included in tuition with no additional fees.`,
          order: 1
        },
        {
          id: 1762349101493,
          question: "Do you provide career placement assistance?",
          answer: `Our career services include:\n• Resume and interview preparation\n• Job search strategies and networking events\n• Industry connections and internship opportunities\n• Alumni mentorship programs\n• Career fairs and employer partnerships\n• LinkedIn profile optimization\n• Salary negotiation coaching\n\nWe maintain a 92% job placement rate within 6 months of graduation.`,
          order: 2
        }
      ]
    }
  ];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading FAQs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-red-600">
              <Icon name="AlertTriangle" size={48} className="mx-auto mb-4" />
              <p>{error}</p>
              <button 
                onClick={loadFAQs}
                className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 text-primary mb-4">
              <Icon name="HelpCircle" size={20} />
              <span className="text-sm font-medium uppercase tracking-wider">Common Questions</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Find answers to the most common questions about admissions, programs, and student life.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {faqCategories?.map((category) => (
              <div key={category.id}>
                <h3 className="text-xl font-semibold text-foreground mb-6 pb-2 border-b border-border">
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.items?.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-card rounded-lg border border-border overflow-hidden transition-all duration-200 hover:shadow-md"
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                      >
                        <span className="text-lg font-medium text-card-foreground pr-4">
                          {faq.question}
                        </span>
                        <Icon
                          name={openItems.has(faq.id) ? "ChevronUp" : "ChevronDown"}
                          size={20}
                          className="text-muted-foreground flex-shrink-0 transition-transform duration-200"
                        />
                      </button>
                      
                      {openItems.has(faq.id) && (
                        <div className="px-6 pb-4">
                          <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-blue-200" />
            <h3 className="text-2xl font-semibold mb-4">Still Have Questions?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our admissions team is here to help with any specific questions about programs, requirements, or the application process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`tel:${contactInfo.phone}`}
                className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <Icon name="Phone" size={18} className="mr-2" />
                Call: {contactInfo.phone}
              </a>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <Icon name="Mail" size={18} className="mr-2" />
                Email: {contactInfo.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;