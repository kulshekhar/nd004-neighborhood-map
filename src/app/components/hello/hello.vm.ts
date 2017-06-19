import * as ko from 'knockout';

export class HelloVM {
  message: KnockoutObservable<String>;
  greeting: KnockoutObservable<String>;

  constructor(params: { greeting?: string }) {
    this.message = ko.observable(params.greeting || '');

    this.greeting = ko.computed(() =>
      this.message() && this.message().trim()
        ? this.message().trim()
        : ''
    );
  }
}
