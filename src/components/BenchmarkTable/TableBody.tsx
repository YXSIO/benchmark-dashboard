import type { BenchmarkData } from '../../types/benchmark'
import type { ColumnWithMetric } from '../../utils/columns'
import { formatValue, modelNameToId, cellKeyFromColumn } from '../../utils/valueFormat'
import styles from './BenchmarkTable.module.css'

interface TableBodyProps {
  data: BenchmarkData
  columns: ColumnWithMetric[]
}

export function TableBody({ data, columns }: TableBodyProps) {
  const { models, values, highlight } = data
  const rowHighlightSet = new Set(highlight?.rows ?? [])
  const cellHighlightSet = new Set(highlight?.cells ?? [])

  return (
    <tbody className={styles.tbody}>
      {models.map((modelName) => {
        const modelId = modelNameToId(modelName)
        const isRowHighlight = rowHighlightSet.has(modelId)

        return (
          <tr
            key={modelId}
            className={isRowHighlight ? styles.rowHighlight : undefined}
          >
            <th className={styles.modelCell} scope="row">
              {modelName}
            </th>
            {columns.map((col) => {
              const key = cellKeyFromColumn(modelId, col)
              const value = values[key] ?? null
              const isCellHighlight = cellHighlightSet.has(key)

              return (
                <td
                  key={key}
                  className={
                    isCellHighlight ? styles.cellHighlight : undefined
                  }
                >
                  {formatValue(value)}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}
