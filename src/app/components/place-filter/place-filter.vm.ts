import * as ko from 'knockout';

export class PlaceFilterVM {
  filter: KnockoutObservable<String>;
  onChangeCallback: (string) => void;

  constructor(params: any) {
    this.onChangeCallback = params.onChange;

    this.filter = ko.observable('');
    this.filter.subscribe(s => {
      this.onChangeCallback && this.onChangeCallback(this.filter());
    });
  }
}
