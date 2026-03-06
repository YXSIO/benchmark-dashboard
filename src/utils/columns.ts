import type { UseCase, Metric, MetricColumn } from '../types/benchmark'

export interface ColumnWithMetric extends MetricColumn {
  metric: Metric
  useCaseName: string
  datasetName: string
}

/**
 * Flatten useCases → datasets → (subDatasets →) metrics into a single list of columns (left-to-right).
 * Sub-dataset metrics come before direct dataset metrics within each dataset.
 */
export function getFlatColumns(useCases: UseCase[]): ColumnWithMetric[] {
  const cols: ColumnWithMetric[] = []
  for (const uc of useCases) {
    for (const ds of uc.datasets) {
      for (const sub of (ds.subDatasets ?? [])) {
        for (const metric of sub.metrics) {
          cols.push({
            useCaseId: uc.id,
            datasetId: ds.id,
            subDatasetId: sub.id,
            metricId: metric.id,
            metric,
            useCaseName: uc.name,
            datasetName: ds.name,
          })
        }
      }
      for (const metric of (ds.metrics ?? [])) {
        cols.push({
          useCaseId: uc.id,
          datasetId: ds.id,
          metricId: metric.id,
          metric,
          useCaseName: uc.name,
          datasetName: ds.name,
        })
      }
    }
  }
  return cols
}
