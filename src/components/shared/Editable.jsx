import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Edit } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Editable = ({ contentKey, as: Component = 'p', children, className, ...props }) => {
  const { isLiveEditMode, siteContent, updateSiteContent, language } = useAppContext();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState('');

  const content = siteContent[contentKey]?.[language] || children;

  const handleEdit = () => {
    setCurrentValue(content);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateSiteContent(contentKey, currentValue);
    setIsEditing(false);
  };

  if (isLiveEditMode) {
    return (
      <div className="relative group">
        <Component className={className} {...props}>
          {content}
        </Component>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-0 right-0 m-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('edit_content')}</DialogTitle>
            </DialogHeader>
            <Textarea
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              rows={5}
              className="my-4"
            />
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>{t('cancel')}</Button>
              <Button onClick={handleSave}>{t('save')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <Component className={className} {...props}>
      {content}
    </Component>
  );
};

export default Editable;