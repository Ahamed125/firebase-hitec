import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Eye, 
  CheckCircle, 
  Archive, 
  Trash2, 
  Mail,
  Phone,
  Calendar,
  User,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { loadFromFirebase, saveToFirebase, COLLECTIONS } from '../../firebase';
import { toast } from '../utils/toast';

export const Message = () => {
  const [messages, setMessages] = useState({});
  const [oldMessages, setOldMessages] = useState({});
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Load messages from Firebase
  const loadMessages = async () => {
    try {
      setLoading(true);
      const [messagesResult, oldMessagesResult] = await Promise.all([
        loadFromFirebase(COLLECTIONS.MESSAGES),
        loadFromFirebase(COLLECTIONS.OLD_MESSAGES)
      ]);

      if (messagesResult.success) {
        setMessages(messagesResult.data || {});
      }
      if (oldMessagesResult.success) {
        setOldMessages(oldMessagesResult.data || {});
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const openMessage = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    
    if (message.status === 'new') {
      updateMessageStatus(message.id, 'read');
    }
  };

  const updateMessageStatus = async (messageId, status) => {
    try {
      const updatedMessage = {
        ...messages[messageId],
        status,
        updatedAt: new Date().toISOString()
      };

      await saveToFirebase(COLLECTIONS.MESSAGES, {
        [messageId]: updatedMessage
      });

      setMessages(prev => ({
        ...prev,
        [messageId]: updatedMessage
      }));

      toast.success(`Message marked as ${status}`);
    } catch (error) {
      console.error('Error updating message status:', error);
      toast.error('Failed to update message status');
    }
  };

  const archiveMessage = async (messageId) => {
    try {
      const message = messages[messageId];
      const archivedMessage = {
        ...message,
        status: 'archived',
        archivedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await saveToFirebase(COLLECTIONS.OLD_MESSAGES, {
        [messageId]: archivedMessage
      });

      const updatedMessages = { ...messages };
      delete updatedMessages[messageId];
      await saveToFirebase(COLLECTIONS.MESSAGES, updatedMessages);

      setMessages(updatedMessages);
      setOldMessages(prev => ({
        ...prev,
        [messageId]: archivedMessage
      }));

      toast.success('Message archived successfully');
      if (selectedMessage?.id === messageId) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error archiving message:', error);
      toast.error('Failed to archive message');
    }
  };

  const deleteMessage = async (messageId, fromArchived = false) => {
    if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) return;

    try {
      if (fromArchived) {
        const updatedOldMessages = { ...oldMessages };
        delete updatedOldMessages[messageId];
        await saveToFirebase(COLLECTIONS.OLD_MESSAGES, updatedOldMessages);
        setOldMessages(updatedOldMessages);
      } else {
        const updatedMessages = { ...messages };
        delete updatedMessages[messageId];
        await saveToFirebase(COLLECTIONS.MESSAGES, updatedMessages);
        setMessages(updatedMessages);
      }

      toast.success('Message deleted successfully');
      if (selectedMessage?.id === messageId) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500 text-white';
      case 'read': return 'bg-green-500 text-white';
      case 'replied': return 'bg-purple-500 text-white';
      case 'archived': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return '🔵';
      case 'read': return '🟢';
      case 'replied': return '🟣';
      case 'archived': return '⚫';
      default: return '⚫';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  // Filter and sort messages
  const activeMessages = Object.values(messages)
    .filter(msg => msg.isActive !== false)
    .filter(msg => {
      const matchesSearch = searchTerm === '' || 
        msg.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'name') {
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      }
      return 0;
    });

  const archivedMessages = Object.values(oldMessages)
    .filter(msg => {
      return searchTerm === '' || 
        msg.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message?.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => new Date(b.archivedAt) - new Date(a.archivedAt));

  const getStats = () => {
    const active = Object.values(messages).filter(msg => msg.isActive !== false);
    return {
      total: active.length,
      new: active.filter(msg => msg.status === 'new').length,
      read: active.filter(msg => msg.status === 'read').length,
      replied: active.filter(msg => msg.status === 'replied').length,
      archived: archivedMessages.length
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading messages...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait while we fetch your messages</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              Message Center
            </h1>
            <p className="text-gray-600 mt-2 text-base lg:text-lg">
              Manage and respond to contact form submissions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={loadMessages}
              variant="outline"
              className="bg-white border-gray-300 hover:bg-gray-50"
            >
              <RefreshCw size={18} className="mr-2" />
              Refresh
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download size={18} className="mr-2" />
              Export Messages
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-blue-700 font-medium">Total Messages</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.new}</div>
              <div className="text-sm text-green-700 font-medium">New</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.replied}</div>
              <div className="text-sm text-purple-700 font-medium">Replied</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.read}</div>
              <div className="text-sm text-orange-700 font-medium">Read</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100/50 border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.archived}</div>
              <div className="text-sm text-gray-700 font-medium">Archived</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Section */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('new')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeTab === 'new'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Active Messages ({stats.total})
                </button>
                <button
                  onClick={() => setActiveTab('archived')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeTab === 'archived'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Archived ({stats.archived})
                </button>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                  />
                </div>
                
                {activeTab === 'new' && (
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                )}
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            {activeTab === 'new' ? (
              activeMessages.length === 0 ? (
                <div className="text-center py-16">
                  <Mail size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {searchTerm || statusFilter !== 'all' ? 'No messages found' : 'No Active Messages'}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search criteria or filters'
                      : 'New contact form submissions will appear here.'
                    }
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {activeMessages.map(message => (
                    <div 
                      key={message.id} 
                      className="p-6 hover:bg-blue-50/50 transition-all duration-200 group cursor-pointer"
                      onClick={() => openMessage(message)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {message.firstName?.[0]}{message.lastName?.[0]}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {message.firstName} {message.lastName}
                              </h3>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Mail size={14} />
                                  <span>{message.email}</span>
                                </div>
                                {message.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone size={14} />
                                    <span>{message.phone}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                                {getStatusIcon(message.status)} {message.status.toUpperCase()}
                              </span>
                              <span className="text-xs text-gray-500" title={formatDate(message.createdAt)}>
                                {getTimeAgo(message.createdAt)}
                              </span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-gray-700 line-clamp-2">{message.message}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {message.inquiryTypeLabel}
                              </span>
                              {message.program && (
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                  {message.programLabel}
                                </span>
                              )}
                              {message.newsletter && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                  Newsletter
                                </span>
                              )}
                            </div>

                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {message.status !== 'replied' && (
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateMessageStatus(message.id, 'replied');
                                  }}
                                  className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                                >
                                  <CheckCircle size={14} />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  archiveMessage(message.id);
                                }}
                                className="bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200"
                              >
                                <Archive size={14} />
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteMessage(message.id);
                                }}
                                className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              // Archived Messages
              archivedMessages.length === 0 ? (
                <div className="text-center py-16">
                  <Archive size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    {searchTerm ? 'No archived messages found' : 'No Archived Messages'}
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm ? 'Try adjusting your search criteria' : 'Archived messages will appear here.'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {archivedMessages.map(message => (
                    <div 
                      key={message.id} 
                      className="p-6 hover:bg-gray-50/50 transition-all duration-200 group cursor-pointer"
                      onClick={() => openMessage(message)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {message.firstName?.[0]}{message.lastName?.[0]}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-700">
                                {message.firstName} {message.lastName}
                              </h3>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Mail size={14} />
                                  <span>{message.email}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-500 text-white">
                                ⚫ ARCHIVED
                              </span>
                              <span className="text-xs text-gray-500">
                                {getTimeAgo(message.archivedAt)}
                              </span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-gray-600 line-clamp-2">{message.message}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
                              {message.inquiryTypeLabel}
                            </span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteMessage(message.id, true);
                                }}
                                className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>

      {/* Message Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <div className="flex items-center gap-2">
            <User size={24} className="text-blue-600" />
            Message Details
          </div>
        }
        size="xl"
      >
        {selectedMessage && (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedMessage.firstName} {selectedMessage.lastName}
                </h2>
                <p className="text-gray-600 mt-1">{selectedMessage.email}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedMessage.status)}`}>
                  {selectedMessage.status.toUpperCase()}
                </span>
                <p className="text-sm text-gray-500 mt-1">{formatDate(selectedMessage.createdAt)}</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Phone:</span>
                      <span className="text-blue-900 font-medium">{selectedMessage.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Inquiry Type:</span>
                      <span className="text-blue-900 font-medium">{selectedMessage.inquiryTypeLabel}</span>
                    </div>
                    {selectedMessage.program && (
                      <div className="flex justify-between">
                        <span className="text-blue-700">Program:</span>
                        <span className="text-blue-900 font-medium">{selectedMessage.programLabel}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-green-900 mb-3">Preferences</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Newsletter:</span>
                      <span className={`font-medium ${selectedMessage.newsletter ? 'text-green-600' : 'text-gray-500'}`}>
                        {selectedMessage.newsletter ? 'Subscribed' : 'Not subscribed'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Terms Accepted:</span>
                      <span className={`font-medium ${selectedMessage.termsAccepted ? 'text-green-600' : 'text-gray-500'}`}>
                        {selectedMessage.termsAccepted ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Message Content */}
            <Card>
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold text-gray-900">Message Content</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              {activeTab === 'new' && selectedMessage.status !== 'replied' && (
                <Button
                  onClick={() => {
                    updateMessageStatus(selectedMessage.id, 'replied');
                    setIsModalOpen(false);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
                >
                  <CheckCircle size={18} className="mr-2" />
                  Mark as Replied
                </Button>
              )}
              {activeTab === 'new' && (
                <Button
                  onClick={() => archiveMessage(selectedMessage.id)}
                  className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
                >
                  <Archive size={18} className="mr-2" />
                  Archive Message
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 border-gray-300 hover:bg-gray-50"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};