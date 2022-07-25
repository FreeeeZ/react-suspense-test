import {$i18n} from '@typescript/classes/i18n';
import {$globalVars} from '@typescript/globalVars';
import React, {CSSProperties, ReactElement, useEffect, useState} from 'react';

import AppLoaderImage from '@images/app-loader.component.svg';

import {loaderSpinner, loaderText} from './AppLoader.module.scss';

const startTimerOnMounted = (): void => {
  const timerFromPageLoad = (): number => {
    return $globalVars.secondsFromPageMounted++;
  };

  setInterval(timerFromPageLoad, 1000);
};

const setLoadingStateTexts = (): void => {
  Object.keys({...$i18n.getMessages()}).map((key: string): void => {
    if (key.includes('Loading.')) {
      $globalVars.loadingStateTexts.push($i18n.$t(key));
    } else if (key.includes('Error.')) {
      $globalVars.errorStateText = $i18n.$t(key);
    }
  });
};

const AppLoadingStateText = (): ReactElement => {
  const textChangeDelay = 3000;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const textChangeTimer = (): void => {
      setIndex((prevIndex: number): number => {
        if (prevIndex === $globalVars.loadingStateTexts.length - 1) {
          return $globalVars.loadingStateTexts.length - 1;
        }
        return prevIndex + 1;
      });
    };

    setInterval(textChangeTimer, textChangeDelay);
    return () => {
      clearInterval(
        textChangeTimer as unknown as ReturnType<typeof setInterval>,
      );
    };
  }, []);

  if (
    $globalVars.secondsFromPageMounted * 1000 >
      $globalVars.maxWidgetWaitDelay &&
    $globalVars.loadingStateTexts.length <= 3
  ) {
    $globalVars.loadingStateTexts.push($globalVars.errorStateText);
  }

  return <p className={loaderText}>{$globalVars.loadingStateTexts[index]}</p>;
};

export const AppLoader = ({style}: {style?: CSSProperties}): ReactElement => {
  useState(() => {
    startTimerOnMounted();
    setLoadingStateTexts();
  });

  return (
    <div>
      <div className={loaderSpinner}>
        <AppLoaderImage style={style} />
      </div>
      <AppLoadingStateText />
    </div>
  );
};
