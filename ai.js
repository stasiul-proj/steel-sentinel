import { infrastructure } from "./infrastructure.js"
import { environment } from "./environment.js"
import { radars } from "./radar.js"

export function analyzeThreat(drone) {

  let nearestTarget = null
  let shortestDistance = Infinity

  let detected = false

  // RADAR DETECTION

  radars.forEach(radar => {

    const radarDistance = calculateDistance(

      drone.lat,
      drone.lng,

      radar.lat,
      radar.lng

    ) * 111000

    if (radarDistance < radar.radius) {

      detected = true

    }

  })

  // UNDETECTED TARGET

  if (!detected) {

    return {

      predictedTarget: "UNKNOWN",

      threatLevel: "UNDETECTED",

      detectionState: "UNDETECTED",

      distance: "N/A",

      eta: "N/A",

      threatScore: 0,

      confidence: 0,

      weather: environment.weather,

      radar: environment.radarSensitivity

    }

  }

  // FIND NEAREST TARGET

  infrastructure.forEach(target => {

    const distance = calculateDistance(

      drone.lat,
      drone.lng,

      target.lat,
      target.lng

    )

    if (distance < shortestDistance) {

      shortestDistance = distance
      nearestTarget = target

    }

  })

  // SAFETY CHECK

  if (!nearestTarget) {

    return {

      predictedTarget: "UNKNOWN",

      threatLevel: "UNKNOWN",

      detectionState: "LOST",

      distance: "N/A",

      eta: "N/A",

      threatScore: 0,

      confidence: 0,

      weather: environment.weather,

      radar: environment.radarSensitivity

    }

  }

  // ETA

  const eta =
    Math.floor(shortestDistance * 1000)

  // THREAT SCORE

  let threatScore = 0

  let detectionModifier = 1
  let interceptorModifier = 1

  // WEATHER EFFECTS

  if (environment.weather === "Rain") {

    detectionModifier = 0.85
    interceptorModifier = 0.9

  }

  if (environment.weather === "Fog") {

    detectionModifier = 0.65
    interceptorModifier = 0.7

  }

  if (environment.weather === "Storm") {

    detectionModifier = 0.45
    interceptorModifier = 0.5

  }

  // RADAR EFFECT

  const radarFactor =
    environment.radarSensitivity / 10

  detectionModifier *= radarFactor

  // AI CONFIDENCE

  const confidence = Math.max(

    5,

    Math.floor(
      detectionModifier * 100
    )

  )

  // DETECTION STATES

  let detectionState = "TRACKED"

  if (confidence > 70) {

    detectionState = "LOCKED"

  }

  if (confidence < 35) {

    detectionState = "LOST"

  }

  // TARGET PRIORITY

  if (nearestTarget.type === "ENERGY") {
    threatScore += 40
  }

  if (nearestTarget.type === "STRATEGIC_INDUSTRY") {
    threatScore += 35
  }

  if (nearestTarget.type === "EMERGENCY") {
    threatScore += 25
  }

  if (nearestTarget.type === "TRANSPORT") {
    threatScore += 20
  }

  // DISTANCE FACTOR

  if (shortestDistance < 0.05) {
    threatScore += 15
  }

  if (shortestDistance < 0.03) {
    threatScore += 20
  }

  if (shortestDistance < 0.015) {
    threatScore += 25
  }

  // ETA FACTOR

  if (eta < 40) {
    threatScore += 20
  }

  if (eta < 25) {
    threatScore += 25
  }

  // UAV SPEED FACTOR

  if (drone.speed > 0.015) {
    threatScore += 10
  }

  // DETECTION MODIFIER

  threatScore =
    Math.floor(
      threatScore * detectionModifier
    )

  // FINAL THREAT LEVEL

  let threatLevel = "LOW"

  if (threatScore > 25) {
    threatLevel = "MEDIUM"
  }

  if (threatScore > 50) {
    threatLevel = "HIGH"
  }

  if (threatScore > 75) {
    threatLevel = "CRITICAL"
  }

  // RETURN ANALYSIS

  return {

    predictedTarget:
      nearestTarget.name,

    threatLevel,

    detectionState,

    threatScore,

    distance:
      shortestDistance.toFixed(3),

    eta,

    confidence,

    weather:
      environment.weather,

    radar:
      environment.radarSensitivity

  }

}

// DISTANCE FUNCTION

function calculateDistance(
  lat1,
  lng1,
  lat2,
  lng2
) {

  const dx = lat2 - lat1
  const dy = lng2 - lng1

  return Math.sqrt(dx * dx + dy * dy)

}