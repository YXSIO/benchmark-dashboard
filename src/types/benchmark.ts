export interface Metric {
  id: string
  name: string
  type?: string
  isAverage?: boolean
}

export interface SubDataset {
  id: string
  name: string
  metrics: Metric[]
}

export interface Dataset {
  id: string
  name: string
  subDatasets?: SubDataset[]
  metrics?: Metric[]
}

export interface UseCase {
  id: string
  name: string
  datasets: Dataset[]
}

export type MetricValue = string | null

export interface BenchmarkData {
  models: string[]
  useCases: UseCase[]
  values: Record<string, MetricValue>
  highlight?: {
    rows?: string[]
    cells?: string[]
  }
}

/** Flattened list of { useCaseId, datasetId, subDatasetId?, metricId } for each data column (left-to-right). */
export interface MetricColumn {
  useCaseId: string
  datasetId: string
  subDatasetId?: string
  metricId: string
}
