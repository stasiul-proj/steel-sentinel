import {
  interceptorBases
}
from "./bases.js"

export function updateBaseTelemetry() {

  const container =
    document.getElementById(
      "basesContainer"
    )

  container.innerHTML = ""

  interceptorBases.forEach(base => {

    let status = "READY"
    let statusClass =
      "base-status-ready"

    // WARNING

    if (
      base.availableInterceptors <= 1
    ) {

      status = "LOW INVENTORY"

      statusClass =
        "base-status-warning"

    }

    // EMPTY

    if (
      base.availableInterceptors <= 0
    ) {

      status = "EMPTY"

      statusClass =
        "base-status-empty"

    }

    container.innerHTML += `

      <div class="base-card">

        <div class="base-name">
          ${base.name}
        </div>

        <div class="log-label">
          AVAILABLE INTERCEPTORS
        </div>

        <div class="log-value">
          ${base.availableInterceptors}
        </div>

        <div class="log-label">
          STATUS
        </div>

        <div class="log-value ${statusClass}">
          ${status}
        </div>

      </div>

    `

  })

}