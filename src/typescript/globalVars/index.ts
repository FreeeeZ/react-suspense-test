import IObject from '@typescript/interfaces/IObject';

export class globalVars {
  public loadingStateTexts: Array<string> = [];
  public errorStateText: string;
  public secondsFromPageMounted = 0;
  public maxWidgetWaitDelay = 8000;
  public maxWidgetDelayValue = 12000;
  public currentWidgetDelay = 0;
  public widgetCache: IObject = {};

  constructor() {
    this.calcCurrentWidgetDelay();
  }

  public calcCurrentWidgetDelay(): number {
    return (this.currentWidgetDelay =
      Math.round(
        (Math.random() *
          (this.maxWidgetDelayValue - this.maxWidgetWaitDelay + 1) +
          this.maxWidgetWaitDelay) /
          1000,
      ) * 1000);
  }
}

export const $globalVars = new globalVars();
