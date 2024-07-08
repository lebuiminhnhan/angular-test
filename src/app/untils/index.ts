export const allMonths: string[] = ['January 2024', 'February 2024', 'March 2024', 'April 2024', 'May 2024', 'June 2024', 'July 2024', 'August 2024', 'September 2024', 'October 2024', 'November 2024', 'December 2024'];

export const dataDefault = [
  {
    name: 'General Income',
    monthlyTotals: {
      'January 2024': 0,
      'February 2024': 0,
    },
    total: 0
  },
  {
    name: 'Other Income',
    monthlyTotals: {
      'January 2024': 0,
      'February 2024': 0,
    },
    total: 0,
    subcategories: [
      {
        name: 'Training',
        monthlyTotals: {
          'January 2024': 0,
          'February 2024': 0,
        },
        total: 0
      },
      {
        name: 'Consulting',
        monthlyTotals: {
          'January 2024': 0,
          'February 2024': 0,
        },
        total: 0
      }
    ]
  }
];
