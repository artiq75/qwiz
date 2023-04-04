// Exemple de hook React / Preact
import { useCallback, useRef, useState } from 'react'
import { interpret } from 'robot3'

export default function useMachine(machine, initialContext = {}) {
  // On crée une nouvelle instance de la machine
  const ref = useRef(null)
  if (ref.current === null) {
    ref.current = interpret(
      machine,
      () => {
        setState(service.machine.current)
        setContext(service.context)
      },
      initialContext
    )
  }
  const service = ref.current

  // On stocke le context & l'état de la machine dans l'état react
  const [state, setState] = useState(service.machine.current)
  const [context, setContext] = useState(service.context)

  // Permet de demander une transition
  const send = useCallback(
    function (type, params = {}) {
      service.send({ type: type, ...params })
    },
    [service]
  )

  // Vérifie si une transition est possible depuis l'état courant
  const can = useCallback(
    (transitionName) => {
      const transitions = service.machine.state.value.transitions
      if (!transitions.has(transitionName)) {
        return false
      }
      const transitionsForName = transitions.get(transitionName)
      for (const t of transitionsForName) {
        if ((t.guards && t.guards(service.context)) || !t.guards) {
          return true
        }
      }
      return false
    },
    [service.context, service.machine.state.value.transitions]
  )

  const isIn = useCallback(
    (stateName) => {
      return state === stateName
    },
    [state]
  )

  return [state, context, send, can, isIn]
}
