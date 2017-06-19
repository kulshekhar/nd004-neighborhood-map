import * as ko from 'knockout';

export class PlaceFilterVM {
  filter: KnockoutObservable<String>;
  onChangeCallback: (string) => void;

  constructor(params: any) {
    this.filter = ko.observable('');
    this.onChangeCallback = params.onChange;
  }

  onInput(e: Event) {
    this.onChangeCallback && this.onChangeCallback(this.filter());
  }
}
