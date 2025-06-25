
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, Plus } from "lucide-react";

interface PostCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostCreationModal = ({ isOpen, onClose }: PostCreationModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [publishTime, setPublishTime] = useState('now');

  const predefinedTags = ['Photography', 'AI Art', 'Travel Moments', 'Design', 'Blog'];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 12) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim()) && selectedTags.length < 12) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  const handleSubmit = () => {
    console.log('Creating post:', {
      title,
      description,
      tags: selectedTags,
      image: uploadedImage,
      publishTime
    });
    // TODO: Implement actual post creation
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Upload className="w-6 h-6" />
            Upload a New Project
          </DialogTitle>
          <p className="text-gray-600 text-sm">Please provide the necessary details below</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600 mb-1">Upload an image or video</p>
              <p className="text-sm text-gray-400">1600×1200 (10 mb max)</p>
            </label>
            {uploadedImage && (
              <p className="mt-2 text-sm text-green-600">
                Selected: {uploadedImage.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter project name..."
                className="w-full"
              />
            </div>

            {/* Publish Time */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Choose Publish Time
              </label>
              <div className="flex gap-2">
                <Button
                  variant={publishTime === 'now' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPublishTime('now')}
                >
                  Now
                </Button>
                <Button
                  variant={publishTime === '14:17' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPublishTime('14:17')}
                >
                  14:17
                </Button>
                <Button
                  variant={publishTime === '18:30' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPublishTime('18:30')}
                >
                  18:30
                </Button>
                <Button variant="outline" size="sm">
                  ...
                </Button>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Project Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain your project here..."
              rows={4}
              className="w-full"
            />
          </div>

          {/* Tags Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium">Tags</label>
              <span className="text-sm text-gray-500">
                {12 - selectedTags.length} tags remaining
              </span>
            </div>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-gray-600 hover:text-gray-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add Custom Tag */}
            <div className="flex gap-2 mb-3">
              <Input
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="Add tags (e.g, design, product, article ...)"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addCustomTag()}
              />
            </div>

            {/* Predefined Tags */}
            <div className="flex flex-wrap gap-2">
              {predefinedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  className="inline-flex items-center gap-1 px-3 py-1 border border-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-50"
                  disabled={selectedTags.includes(tag) || selectedTags.length >= 12}
                >
                  <Plus className="w-3 h-3" />
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Saved as a draft
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-gray-900 text-white">
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostCreationModal;
