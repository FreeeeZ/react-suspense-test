import IObject from '@typescript/interfaces/IObject';

export class i18n {
  public messages: Record<string, string> = {};

  constructor() {
    this.messages = {
      'Loading.First': 'Виджет грузится',
      'Loading.Second': 'Виджет ещё грузится',
      'Loading.Third': 'Загрузка идёт дольше чем обычно. Пожалуйста, подождите',
      'Error.Timeout': 'Ошибка при загрузке. Пожалуйста -- обновите окно',
      'Success.LoadingFinished': 'Виджет загружен!',
      'Common.ViewAgain': 'Посмотреть еще раз',
    };
  }

  public $t(key: string): string {
    return this.messages[key];
  }

  public getMessages(): IObject {
    return this.messages;
  }
}

export const $i18n = new i18n();
