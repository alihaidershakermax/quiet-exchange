
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const LanguageToggle: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <ToggleGroup type="single" value={language} onValueChange={(value) => {
      if (value) changeLanguage(value as "en" | "ar");
    }}>
      <ToggleGroupItem value="en" aria-label="English" className="text-sm">
        EN
      </ToggleGroupItem>
      <ToggleGroupItem value="ar" aria-label="العربية" className="text-sm">
        عربي
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default LanguageToggle;
