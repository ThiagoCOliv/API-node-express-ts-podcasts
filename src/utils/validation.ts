import { FilterOptions } from "../models/FilterOptions";
import { ValidationResult } from "../models/ValidationResult";

export function validateQueryFilters(filters: FilterOptions): ValidationResult 
{
  const errors: string[] = [];

  if (filters.startDate && !isValidDate(filters.startDate))
    errors.push('startDate deve estar no formato YYYY-MM-DD');

  if (filters.endDate && !isValidDate(filters.endDate)) 
    errors.push('endDate deve estar no formato YYYY-MM-DD');

  if (filters.startDate && filters.endDate && filters.startDate > filters.endDate) 
    errors.push('startDate não pode ser maior que endDate');

  return {
    isValid: errors.length === 0,
    errors,
  };
}

function isValidDate(dateString: string): boolean 
{
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) 
    return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}
