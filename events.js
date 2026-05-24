const events = []

export function addEvent(message) {

  const container =
    document.getElementById(
      "eventContainer"
    )

  const now = new Date()

  const time =
    now.toLocaleTimeString()

  // SAVE EVENT

  events.unshift({

    time,
    message

  })

  // LIMIT

  if (events.length > 8) {

    events.pop()

  }

  // RENDER

  container.innerHTML = ""

  events.forEach(event => {

    container.innerHTML += `

      <div class="event-card">

        <div class="event-time">
          ${event.time}
        </div>

        <div class="event-message">
          ${event.message}
        </div>

      </div>

    `

  })

}