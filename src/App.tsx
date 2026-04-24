import React, { useState } from 'react';
import './App.scss';
import { OpenAppButton } from './components/OpenAppButton';

function App() {
  const [clickCount, setClickCount] = useState<number>(0);
  const [lastErrorMessage, setLastErrorMessage] = useState<string>('');

  return (
    <div className="preview">
      <OpenAppButton
        propData={{
          buttonText: '打开 APP',
          appParameter: 'source=zion&component=open_app_button',
          width: '100%',
          height: 'auto',
          paddingVertical: 12,
          paddingHorizontal: 18,
          paddingUnit: 'px',
          borderWidth: 1,
          borderRadius: 8,
          borderUnit: 'px',
          borderColor: '5BB1FF',
          backgroundColor: 'EEF7FF',
          textColor: '5BB1FF',
          fontSize: 16,
          fontUnit: 'px',
          fontWeight: 600,
          fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
        }}
        propState={{
          clickCount: {
            get: () => clickCount,
            set: (value) => setClickCount(value),
          },
          lastErrorMessage: {
            get: () => lastErrorMessage,
            set: (value) => setLastErrorMessage(value),
          },
        }}
        event={{
          onTap: () => console.log('OpenAppButton tapped'),
          onLaunchError: () => console.log('launchApp failed'),
        }}
      />
    </div>
  );
}

export default App;
