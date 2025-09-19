
    import React from 'react';
    import { useTranslation } from 'react-i18next';
    import { useCountdown } from '@/hooks/useCountdown';
    
    const CountdownTimer = ({ targetDate }) => {
      const [days, hours, minutes, seconds] = useCountdown(targetDate);
      const { t } = useTranslation();
    
      const renderTime = (value, label) => (
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-4xl font-bold text-primary">{value < 0 ? 0 : value}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      );
    
      return (
        <div className="flex items-center gap-4">
          {renderTime(days, t('days'))}
          <span className="text-2xl md:text-4xl font-bold text-primary">:</span>
          {renderTime(hours, t('hours'))}
          <span className="text-2xl md:text-4xl font-bold text-primary">:</span>
          {renderTime(minutes, t('minutes'))}
          <span className="text-2xl md:text-4xl font-bold text-primary">:</span>
          {renderTime(seconds, t('seconds'))}
        </div>
      );
    };
    
    export default CountdownTimer;
  