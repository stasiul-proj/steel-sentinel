export function calculatePriority(
  analysis
) {

  let priority = 0

  // THREAT LEVEL

  if (
    analysis.threatLevel ===
    "CRITICAL"
  ) {

    priority += 100

  }

  if (
    analysis.threatLevel ===
    "HIGH"
  ) {

    priority += 70

  }

  if (
    analysis.threatLevel ===
    "MEDIUM"
  ) {

    priority += 40

  }

  // TARGET PRIORITY

  if (
    analysis.predictedTarget
      .includes("POWER")
  ) {

    priority += 60

  }

  if (
    analysis.predictedTarget
      .includes("HSW")
  ) {

    priority += 50

  }

  if (
    analysis.predictedTarget
      .includes("CITY")
  ) {

    priority += 40

  }

  // ETA

  if (analysis.eta < 30) {

    priority += 35

  }

  if (analysis.eta < 15) {

    priority += 45

  }

  // CONFIDENCE

  priority +=
    Math.floor(
      analysis.confidence * 0.4
    )

  return priority

}