import { EVENTS } from './const.js'

function navigate (href) {
	window.history.pushState({}, '', href)
	const navigationEvent = new Event(EVENTS.PUSH_STATE)
	window.dispatchEvent(navigationEvent)
}

export function Link ({ to, target, ...props }) {
  	const handleClick = (event) => {
		const isMainEvent = event.button === 0
		const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
		const isLocalTarget = !target || target === '_self'

		if (isMainEvent && !isModifiedEvent && isLocalTarget) {
		  event.preventDefault()
		  navigate(to)
	  }
	} 
	return <a href={to} target={target} onClick={handleClick} {...props} />
}