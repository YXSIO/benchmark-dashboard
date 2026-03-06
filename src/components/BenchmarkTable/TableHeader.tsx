import type { UseCase } from '../../types/benchmark'
import styles from './BenchmarkTable.module.css'

interface TableHeaderProps {
  useCases: UseCase[]
}

export function TableHeader({ useCases }: TableHeaderProps) {
  const hasSubDatasets = useCases.some((uc) =>
    uc.datasets.some((ds) => ds.subDatasets && ds.subDatasets.length > 0)
  )

  return (
    <thead className={styles.thead}>
      {/* Row 1: use case names */}
      <tr>
        <th className={styles.cornerTop} rowSpan={2}></th>
        {useCases.map((uc, ucIdx) => {
          const colSpan = uc.datasets.reduce((n, ds) => {
            const subCount = (ds.subDatasets ?? []).reduce((s, sub) => s + sub.metrics.length, 0)
            const directCount = (ds.metrics ?? []).length
            return n + subCount + directCount
          }, 0)
          return (
            <th
              key={uc.id}
              className={styles.useCaseCell}
              colSpan={colSpan}
              style={{ background: `var(--uc-color-${ucIdx})` }}
            >
              {uc.name}
            </th>
          )
        })}
      </tr>
      {/* Row 2: dataset names */}
      <tr>
        {useCases.map((uc, ucIdx) =>
          uc.datasets.map((ds) => {
            const subCount = (ds.subDatasets ?? []).reduce((s, sub) => s + sub.metrics.length, 0)
            const directCount = (ds.metrics ?? []).length
            return (
              <th
                key={`${uc.id}-${ds.id}`}
                className={styles.datasetCell}
                colSpan={subCount + directCount}
                style={{ background: `var(--uc-color-${ucIdx})` }}
              >
                {ds.name}
              </th>
            )
          })
        )}
      </tr>
      {/* Row 3 (conditional): sub-dataset groupings */}
      {hasSubDatasets && (
        <tr>
          <th className={styles.sideHeaderCell}></th>
          {useCases.map((uc) =>
            uc.datasets.flatMap((ds) => {
              const cells = []
              for (const sub of ds.subDatasets ?? []) {
                cells.push(
                  <th
                    key={`${uc.id}-${ds.id}-${sub.id}`}
                    className={styles.subDatasetCell}
                    colSpan={sub.metrics.length}
                  >
                    {sub.name}
                  </th>
                )
              }
              for (const m of ds.metrics ?? []) {
                cells.push(
                  <th
                    key={`${uc.id}-${ds.id}-${m.id}-name`}
                    className={`${styles.metricCell} ${styles.metricNameHeader}`}
                    rowSpan={2}
                  >
                    {m.name}
                  </th>
                )
              }
              return cells
            })
          )}
        </tr>
      )}
      {/* Row 3 or 4: metric names */}
      <tr>
        <th className={styles.sideHeaderCell}>
          <span className={styles.label}>Eval Dataset</span>
        </th>
        {hasSubDatasets
          ? useCases.map((uc) =>
              uc.datasets.flatMap((ds) =>
                (ds.subDatasets ?? []).flatMap((sub) =>
                  sub.metrics.map((m) => (
                    <th
                      key={`${uc.id}-${ds.id}-${sub.id}-${m.id}-name`}
                      className={`${styles.metricCell} ${styles.metricNameHeader}`}
                    >
                      {m.name}
                    </th>
                  ))
                )
              )
            )
          : useCases.map((uc) =>
              uc.datasets.flatMap((ds) =>
                (ds.metrics ?? []).map((m) => (
                  <th
                    key={`${uc.id}-${ds.id}-${m.id}-name`}
                    className={`${styles.metricCell} ${styles.metricNameHeader}`}
                  >
                    {m.name}
                  </th>
                ))
              )
            )}
      </tr>
      {/* Row 4 or 5: metric types */}
      <tr>
        <th className={styles.sideHeaderCell}>
          <span className={styles.label}>Metrics</span>
        </th>
        {useCases.map((uc) =>
          uc.datasets.flatMap((ds) => [
            ...(ds.subDatasets ?? []).flatMap((sub) =>
              sub.metrics.map((m) => (
                <th
                  key={`${uc.id}-${ds.id}-${sub.id}-${m.id}-type`}
                  className={`${styles.metricCell} ${styles.metricTypeHeader}`}
                >
                  {m.type ?? ''}
                </th>
              ))
            ),
            ...(ds.metrics ?? []).map((m) => (
              <th
                key={`${uc.id}-${ds.id}-${m.id}-type`}
                className={`${styles.metricCell} ${styles.metricTypeHeader}`}
              >
                {m.type ?? ''}
              </th>
            )),
          ])
        )}
      </tr>
    </thead>
  )
}
