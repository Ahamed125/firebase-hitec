import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './ui/Button';
import { uploadToCloudinary } from '../cloudinary';
import { toast } from '../utils/toast';

export const ImageUpload = ({ 
  value, 
  onChange, 
  onRemove,
  placeholder = "Click to upload or drag and drop",
  acceptedTypes = "image/*",
  className = ""
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadToCloudinary(file);
      if (result.success) {
        onChange(result.url);
        toast.success('Image uploaded successfully!');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      toast.error('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const inputEvent = { target: { files: [file] } };
      await handleFileChange(inputEvent);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {value ? (
        <div className="relative group">
          <img 
            src={value} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
        >
          <input
            type="file"
            accept={acceptedTypes}
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="mx-auto text-gray-400 mb-2" size={24} />
            <p className="text-sm text-gray-600 mb-1">{placeholder}</p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            {uploading && (
              <div className="mt-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-xs text-gray-500 mt-1">Uploading...</p>
              </div>
            )}
          </label>
        </div>
      )}
    </div>
  );
};