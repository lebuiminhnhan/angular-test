import { Component, Inject, OnInit, afterNextRender } from '@angular/core';
import { Category, MonthlyTotals } from '../../models';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { allMonths, dataDefault } from '../../untils';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  categories: Category[] = dataDefault;
  allMonths: string[] = allMonths;
  selectedMonths: string[] = ['January 2024', 'February 2024', 'March 2024'];
  displayedMonths: string[] = this.selectedMonths;
  incomeTotal: MonthlyTotals = this.initializeMonthlyTotals();
  totalIncome: number = 0;
  expenseTotal: MonthlyTotals = this.initializeMonthlyTotals();
  totalExpenses: number = 0;
  profitLoss: MonthlyTotals = this.initializeMonthlyTotals();
  totalProfitLoss: number = 0;
  openingBalance: number = 0;
  closingBalance: number = 0;

  constructor(@Inject(DOCUMENT) private document: Document) {
    afterNextRender(() => {
      setTimeout(() => {
        const firstInput = this.document.getElementById('input-General Income-0') as HTMLInputElement;
        if (firstInput) {
          firstInput.focus();
        }
      }, 0);
    })
   }

  ngOnInit(): void {
    this.calculateTotals();
  }

  initializeMonthlyTotals(): MonthlyTotals {
    const totals: MonthlyTotals = {};
    this.allMonths.forEach(month => {
      totals[month] = 0;
    });
    return totals;
  }

  updateDisplayedMonths(): void {
    this.displayedMonths = [...this.selectedMonths];
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalIncome = 0;
    this.totalExpenses = 0;
    this.totalProfitLoss = 0;

    for (const category of this.categories) {
      category.total = 0;
      for (const month of this.displayedMonths) {
        category.total += category.monthlyTotals[month] || 0;
        this.incomeTotal[month] = (this.incomeTotal[month] || 0) + (category.monthlyTotals[month] || 0);
      }
      this.totalIncome += category.total;
    }

    for (const category of this.categories) {
      for (const month of this.displayedMonths) {
        this.expenseTotal[month] = (this.expenseTotal[month] || 0) + (category.monthlyTotals[month] || 0);
      }
      this.totalExpenses += category.total;
    }

    for (const month of this.displayedMonths) {
      this.profitLoss[month] = (this.incomeTotal[month] || 0) - (this.expenseTotal[month] || 0);
      this.totalProfitLoss += this.profitLoss[month];
    }

    this.closingBalance = this.openingBalance + this.totalProfitLoss;
  }

  addParentCategory(): void {
    const newCategory: Category = {
      name: 'New Parent Category',
      monthlyTotals: this.initializeMonthlyTotals(),
      total: 0,
      subcategories: []
    };
    this.categories.push(newCategory);
    this.calculateTotals();
  }

  addSubcategory(parentCategory: Category): void {
    const newSubcategory: Category = {
      name: 'New Subcategory',
      monthlyTotals: this.initializeMonthlyTotals(),
      total: 0
    };
    if (!parentCategory.subcategories) {
      parentCategory.subcategories = [];
    }
    parentCategory.subcategories.push(newSubcategory);
    this.calculateTotals();
  }

  deleteCategory(category: Category, parentCategory?: Category): void {
    if (parentCategory) {
      parentCategory.subcategories = parentCategory.subcategories?.filter(sub => sub !== category);
    } else {
      this.categories = this.categories.filter(cat => cat !== category);
    }
    this.calculateTotals();
  }

  onEnterKey(category: Category, index: number): void {
    const nextInput = document.getElementById(`input-${category.name}-${index + 1}`);
    if (nextInput) {
      nextInput.focus();
    } else {
      this.addParentCategory();
    }
    this.calculateTotals();
  }

  onKeyDown(event: KeyboardEvent, category: Category, index: number): void {
    const target = event.target as HTMLElement;
    if (event.key === 'ArrowUp') {
      const previousInput = document.getElementById(`input-${category.name}-${index - 1}`);
      if (previousInput) {
        previousInput.focus();
      }
    } else if (event.key === 'ArrowDown') {
      const nextInput = document.getElementById(`input-${category.name}-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const siblings = Array.from(target.parentElement!.children).filter(child => child.tagName === 'INPUT');
      const currentIndex = siblings.indexOf(target);
      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        (siblings[currentIndex - 1] as HTMLInputElement).focus();
      } else if (event.key === 'ArrowRight' && currentIndex < siblings.length - 1) {
        (siblings[currentIndex + 1] as HTMLInputElement).focus();
      }
    }
  }

  onRightClick(event: MouseEvent, category: Category, index: number): void {
    event.preventDefault();
    const value = (event.target as HTMLInputElement).value;
    this.displayedMonths.forEach(month => {
      category.monthlyTotals[month] = +value;
    });
    this.calculateTotals();
    alert('Apply to all clicked');
  }
}
