import {
  startSimulation,
  pauseSimulation,
  resetSimulation
}
from "../core/simulation.js"

import {
  createEnemyDrone
}
from "../core/drones.js"

import {
  environment
}
from "../core/environment.js"

export function initControls(map) {

  const droneCount =
    document.getElementById(
      "droneCount"
    )

  const droneSpeed =
    document.getElementById(
      "droneSpeed"
    )

  const droneAltitude =
    document.getElementById(
      "droneAltitude"
    )

  const radarSensitivity =
    document.getElementById(
      "radarSensitivity"
    )

  // DRONE COUNT

  droneCount.addEventListener(
    "input",
    () => {

      document.getElementById(
        "droneCountValue"
      ).innerText =
        `${droneCount.value} UAVs`

    }
  )

  // DRONE SPEED

  droneSpeed.addEventListener(
    "input",
    () => {

      document.getElementById(
        "droneSpeedValue"
      ).innerText =
        `${droneSpeed.value} km/h`

    }
  )

  // ALTITUDE

  droneAltitude.addEventListener(
    "input",
    () => {

      document.getElementById(
        "droneAltitudeValue"
      ).innerText =
        `${droneAltitude.value} m`

    }
  )

  // RADAR

  radarSensitivity.addEventListener(
    "input",
    () => {

      document.getElementById(
        "radarSensitivityValue"
      ).innerText =
        `${radarSensitivity.value} / 10`

    }
  )

  // BUTTONS

  const startButton =
    document.getElementById(
      "startSimulation"
    )

  const pauseButton =
    document.getElementById(
      "pauseSimulation"
    )

  const resetButton =
    document.getElementById(
      "resetSimulation"
    )

  // START SIMULATION

  startButton.addEventListener(
    "click",
    () => {

      // UI VALUES

      const droneCountValue =
        Number(
          document.getElementById(
            "droneCount"
          ).value
        )

      const droneType =
        document.getElementById(
          "droneType"
        ).value

      const droneSpeedValue =
        Number(
          document.getElementById(
            "droneSpeed"
          ).value
        )

      const aiMode =
        document.getElementById(
          "aiMode"
        ).value

      const weatherMode =
        document.getElementById(
          "weatherMode"
        ).value

      const radarValue =
        Number(
          document.getElementById(
            "radarSensitivity"
          ).value
        )

      // ENVIRONMENT

      environment.aiMode =
        aiMode

      environment.weather =
        weatherMode

      environment.radarSensitivity =
        radarValue

      // CREATE UAVs

      for (
        let i = 0;
        i < droneCountValue;
        i++
      ) {

        // RANDOM SPAWN SIDE

        const side =
          Math.floor(
            Math.random() * 4
          )

        let randomLat = 50.56
        let randomLng = 22.05

        // NORTH

        if (side === 0) {

          randomLat =
            50.70 +
            (Math.random() * 0.03)

          randomLng =
            22.00 +
            (Math.random() * 0.12)

        }

        // SOUTH

        if (side === 1) {

          randomLat =
            50.42 +
            (Math.random() * 0.03)

          randomLng =
            22.00 +
            (Math.random() * 0.12)

        }

        // WEST

        if (side === 2) {

          randomLat =
            50.48 +
            (Math.random() * 0.12)

          randomLng =
            21.86 +
            (Math.random() * 0.03)

        }

        // EAST

        if (side === 3) {

          randomLat =
            50.48 +
            (Math.random() * 0.12)

          randomLng =
            22.16 +
            (Math.random() * 0.03)

        }

        // EXTRA RANDOM OFFSET

        randomLat +=
          (Math.random() - 0.5)
          * 0.02

        randomLng +=
          (Math.random() - 0.5)
          * 0.02

        // CREATE DRONE

        createEnemyDrone(
          map,
          {

            id: `TH-${i + 1}`,

            type: droneType,

            lat: randomLat,
            lng: randomLng,

            targetLat:
              50.565 +
              (
                (Math.random() - 0.5)
                * 0.01
              ),

            targetLng:
              22.058 +
              (
                (Math.random() - 0.5)
                * 0.01
              ),

            speed:
              droneSpeedValue
              * 0.000008

          }
        )

      }

      // START

      startSimulation()

    }
  )

  // PAUSE

  pauseButton.addEventListener(
    "click",
    () => {

      pauseSimulation()

    }
  )

  // RESET

  resetButton.addEventListener(
    "click",
    () => {

      resetSimulation()

    }
  )

}