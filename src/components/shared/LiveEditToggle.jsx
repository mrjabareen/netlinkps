import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Brush } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LiveEditToggle = () => {
  const { isLiveEditMode, toggleLiveEditMode, isAdmin } = useAppContext();
  const { t } = useTranslation();

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        onClick={toggleLiveEditMode}
        variant={isLiveEditMode ? 'default' : 'outline'}
        size="lg"
        className="rounded-full shadow-lg"
      >
        <Brush className="mr-2 h-5 w-5" />
        {isLiveEditMode ? t('exit_edit_mode') : t('live_edit_mode')}
      </Button>
    </div>
  );
};

export default LiveEditToggle;