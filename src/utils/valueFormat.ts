import type { MetricValue } from '../types/benchmark'
import type { MetricColumn } from '../types/benchmark'

/**
 * Format a stored metric value for display: "92.50%", "N/A", or "".
 */
export function formatValue(value: MetricValue): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string' && value.toUpperCase() === 'N/A') return 'N/A'
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (Number.isNaN(num)) return value as string
  return `${num.toFixed(2)}%`
}

/**
 * Produce a stable id from a model display name for use in values/highlight keys.
 */
export function modelNameToId(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

/**
 * Build the values/highlight key for a cell: modelId_useCaseId_datasetId_metricId.
 */
export function cellKey(
  modelId: string,
  useCaseId: string,
  datasetId: string,
  metricId: string
): string {
  return `${modelId}_${useCaseId}_${datasetId}_${metricId}`
}

/**
 * Build the same key from a MetricColumn and model id.
 * Inserts subDatasetId between datasetId and metricId when present.
 */
export function cellKeyFromColumn(modelId: string, col: MetricColumn): string {
  const parts = [modelId, col.useCaseId, col.datasetId]
  if (col.subDatasetId) parts.push(col.subDatasetId)
  parts.push(col.metricId)
  return parts.join('_')
}
