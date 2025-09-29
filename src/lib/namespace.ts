import { RowData } from '@tanstack/react-table'

export interface FilterOption {
  value: any,
  label: string,
  icon?: React.ComponentType<{ className?: string }>
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterTitle: string,
    filterOptions: FilterOption[]
  }
}