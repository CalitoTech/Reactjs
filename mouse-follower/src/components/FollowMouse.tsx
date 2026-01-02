import { useMouseFollower } from '../hooks/useMouseFollower'

export function FollowMouse() {
  const { enabled, position, toggle } = useMouseFollower()

  return (
    <>
      {enabled && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#09f',
            borderRadius: '50%',
            opacity: 0.8,
            pointerEvents: 'none',
            left: -20,
            top: -20,
            width: 40,
            height: 40,
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        />
      )}
      <button onClick={toggle}>
        {enabled ? 'Desactivar' : 'Activar'} seguimiento de mouse
      </button>
    </>
  )
}