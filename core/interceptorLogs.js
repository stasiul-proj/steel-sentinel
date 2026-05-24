export function updateInterceptorPanel(interceptor) {

  const container =
    document.getElementById(
      "interceptorContainer"
    )

  let statusClass =
    "interceptor-tracking"

  if (
    interceptor.status ===
    "TARGET DESTROYED"
  ) {

    statusClass =
      "interceptor-status"

  }

  if (
    interceptor.status ===
    "INTERCEPT FAILED"
  ) {

    statusClass =
      "interceptor-failed"

  }

  container.innerHTML = `

    <div class="interceptor-card">

      <div class="log-label">
        ACTIVE INTERCEPTOR
      </div>

      <div class="log-value">
        INT-1
      </div>

      <div class="log-label">
        TARGET UAV
      </div>

      <div class="log-value">
        ${interceptor.targetDrone.id}
      </div>

      <div class="log-label">
        STATUS
      </div>

      <div class="log-value ${statusClass}">
        ${interceptor.status}
      </div>

      <div class="log-label">
        HIT PROBABILITY
      </div>

      <div class="log-value">
        ${interceptor.hitProbability}%
      </div>

    </div>

  `

}