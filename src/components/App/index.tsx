import {$globalVars} from '@typescript/globalVars';
import React, {
  FC,
  ReactElement,
  ReactNode,
  Suspense,
  useEffect,
  useState,
} from 'react';

import {AppLoader} from '@components/AppLoader';
import {SomeConvenientWidget} from '@components/SomeConvenientWidget';

import {pageWrap, pageWrapContainer} from './App.module.scss';

const getWidget = (
  widget: ReactElement,
  currentWidgetDelay: number,
): ReactElement => {
  if (currentWidgetDelay <= $globalVars.maxWidgetWaitDelay) {
    if ($globalVars.widgetCache[widget as never]) {
      return widget;
    }
  }
  throw new Promise<void>((resolve) => {
    setTimeout(() => {
      $globalVars.widgetCache[widget as never] = true;
      resolve();
    }, currentWidgetDelay);
  });
};

const AppDelayedLoader = (): ReactElement => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => setReady(true));
  }, []);

  return (ready && (
    <AppLoader style={{height: 150, width: 150}} />
  )) as ReactElement;
};

const AppContentContainer = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  return <Suspense fallback={<AppDelayedLoader />}>{children}</Suspense>;
};

const AppDelayedWidget = (): ReactElement => {
  return getWidget(<SomeConvenientWidget />, $globalVars.currentWidgetDelay);
};

export const App: FC = (): ReactElement => {
  useState(() => {
    console.log(
      `<--- ${$globalVars.currentWidgetDelay}ms — время загрузки виджета в текущей итерации --->`,
      '\n',
      `<--- ${$globalVars.maxWidgetWaitDelay}ms — максимально допустимая задержка виджета --->`,
      '\n',
    );
  });

  return (
    <div className={pageWrap}>
      <div className={pageWrapContainer}>
        <AppContentContainer>
          <AppDelayedWidget />
        </AppContentContainer>
      </div>
    </div>
  );
};
