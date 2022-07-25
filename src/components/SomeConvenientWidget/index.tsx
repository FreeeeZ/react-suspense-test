import {$i18n} from '@typescript/classes/i18n';
import React, {FC, ReactElement} from 'react';

import {
  widget,
  widgetButton,
  widgetText,
} from './SomeConvenientWidget.module.scss';

const SuccessText = (props: {
  text: string | null | undefined;
}): ReactElement => {
  return <p className={widgetText}>{props.text}</p>;
};

const RefreshButton = (): ReactElement => {
  const RefreshPage = (): void => {
    return window.location.reload();
  };

  return (
    <button className={widgetButton} onClick={RefreshPage}>
      {$i18n.$t('Common.ViewAgain')}
    </button>
  );
};

export const SomeConvenientWidget: FC = (): ReactElement => {
  return (
    <article className={widget}>
      <SuccessText text={$i18n.$t('Success.LoadingFinished')} />
      <RefreshButton />
    </article>
  );
};
