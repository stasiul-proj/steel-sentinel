export function updateThreatPanel(analysis) {

  const logsContainer =
    document.getElementById("logsContainer")

  let threatClass = "threat-low"

  if (analysis.threatLevel === "CRITICAL") {
    threatClass = "threat-critical"
  }

  else if (analysis.threatLevel === "HIGH") {
    threatClass = "threat-high"
  }

  else if (analysis.threatLevel === "MEDIUM") {
    threatClass = "threat-medium"
  }

  logsContainer.innerHTML = `
  
    <div class="log-card">

      <div class="log-label">
        PREDICTED TARGET
      </div>

      <div class="log-value">
        ${analysis.predictedTarget}
      </div>

      <div class="log-label">
        THREAT LEVEL
      </div>

      <div class="log-value ${threatClass}">
        ${analysis.threatLevel}
      </div>
      <div class="log-label">
  DETECTION STATE
</div>

<div class="log-value">
  ${analysis.detectionState}
</div>

      <div class="log-label">
        DISTANCE
      </div>

      <div class="log-value">
        ${analysis.distance}
      </div>

      <div class="log-label">
        ETA
      </div>

      <div class="log-value">
        ${analysis.eta}
      </div>

      <div class="log-label">
        AI CONFIDENCE
      </div>

      <div class="log-value">
        ${analysis.confidence}%
      </div>

    </div>

  `

}