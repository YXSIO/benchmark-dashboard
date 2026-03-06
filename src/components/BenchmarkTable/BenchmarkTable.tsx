import type { BenchmarkData } from '../../types/benchmark'
import { getFlatColumns } from '../../utils/columns'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import styles from './BenchmarkTable.module.css'

interface BenchmarkTableProps {
  data: BenchmarkData
}

export function BenchmarkTable({ data }: BenchmarkTableProps) {
  const columns = getFlatColumns(data.useCases)

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <TableHeader useCases={data.useCases} />
        <TableBody data={data} columns={columns} />
      </table>
    </div>
  )
}
