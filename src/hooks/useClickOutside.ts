import {RefObject, useEffect, useRef} from 'react';

type Props = {
	onClickOutside(): void;
	targetRef: RefObject<HTMLElement>;
	exludeRef?: RefObject<HTMLElement>;
}

export function useClickOutside({onClickOutside, targetRef, exludeRef}: Props) {
	const clickOutsideRef = useRef(onClickOutside);
	clickOutsideRef.current = onClickOutside;

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (targetRef.current) {
				const target = event.target as HTMLElement;
				const targetChecks = targetRef.current === target || !targetRef.current.contains(target);
				const excludeChecks = (exludeRef && exludeRef.current) ? (
					exludeRef.current === target || !exludeRef.current.contains(target)
				) : true;

				if (targetChecks && excludeChecks) {
					clickOutsideRef.current();
				}
			}
		}

		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	});
}
