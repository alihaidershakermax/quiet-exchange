
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const LanguageToggle: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (value: string) => {
    if (value) {
      changeLanguage(value as "en" | "ar");
    }
  };

  return (
    <ToggleGroup 
      type="single" 
      value={language} 
      onValueChange={handleLanguageChange}
      className="border rounded-md"
    >
      <ToggleGroupItem 
        value="en" 
        aria-label="English" 
        className="text-sm font-medium"
      >
        EN
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="ar" 
        aria-label="العربية" 
        className="text-sm font-medium"
      >
        عربي
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default LanguageToggle;
