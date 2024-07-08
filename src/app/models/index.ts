export class BudgetBuilderModel {

}

export class Category {
  name: string;
  monthlyTotals: MonthlyTotals;
  total: number;
  subcategories?: Category[];

  constructor(name: string, monthlyTotals: { [key: string]: number }, total: number, subcategories?: Category[]) {
    this.name = name;
    this.monthlyTotals = new MonthlyTotals(monthlyTotals);
    this.total = total;
    this.subcategories = subcategories;
  }
}


export class MonthlyTotals {
  [key: string]: number;

  constructor(initialValues: { [key: string]: number }) {
    Object.assign(this, initialValues);
  }
}
