import {RefObject, useEffect, useRef} from 'react';

type Props = {
	onClickOutside(): void;
	targetRef: RefObject<HTMLElement>;
}

export function useClickOutside({onClickOutside, targetRef}: Props) {
	const clickOutsideRef = useRef(onClickOutside);
	clickOutsideRef.current = onClickOutside;

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (targetRef.current) {
				const target = event.target as HTMLElement;
				if (targetRef.current === target || !targetRef.current.contains(target)) {
					clickOutsideRef.current();
				}
			}
		}

		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, []);
}
