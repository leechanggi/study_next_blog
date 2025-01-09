import React from 'react';
import Image from 'next/image';
import { RxCopy } from 'react-icons/rx';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

import { cn } from '@/lib';
import { Tooltip, Button } from '@/components';

import * as Type from './type';

const ImageCardItem = React.forwardRef<Type.ImageCardItemElement, Type.ImageCardItemProps>((props, forwardRef) => {
	const {
		className,
		onCopyButtonClick,
		src,
		alt,
		width,
		height,
		fill,
		loader,
		quality,
		priority,
		loading,
		placeholder,
		blurDataURL,
		unoptimized,
		overrideSrc,
		onLoadingComplete,
		layout = 'fill',
		objectFit = 'contain',
		objectPosition,
		lazyBoundary,
		lazyRoot,
		...rest
	} = props;

	const handleCopy: React.MouseEventHandler<HTMLButtonElement> = event => {
		navigator.clipboard
			.writeText(src.toString())
			.then(() => {
				alert('URL이 클립보드에 복사되었습니다.');
			})
			.catch(err => {
				console.error('클립보드 복사 실패:', err);
			})
			.finally(() => {
				onCopyButtonClick?.(event);
			});
	};

	return (
		<li ref={forwardRef} className={cn('relative', 'rounded-lg', 'border', 'border-zinc-200', 'bg-transparent', 'dark:border-zinc-700', className)} {...rest}>
			<AspectRatio.Root ratio={16 / 9} className='overflow-hidden'>
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					fill={fill}
					loader={loader}
					quality={quality}
					priority={priority}
					loading={loading}
					placeholder={placeholder}
					blurDataURL={blurDataURL}
					unoptimized={unoptimized}
					overrideSrc={overrideSrc}
					onLoadingComplete={onLoadingComplete}
					layout={layout}
					objectFit={objectFit}
					objectPosition={objectPosition}
					lazyBoundary={lazyBoundary}
					lazyRoot={lazyRoot}
				/>
			</AspectRatio.Root>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<Button type='button' className={cn('absolute', 'top-1', 'right-1')} size='icon' variant='outline' onClick={handleCopy}>
							<RxCopy size='1.25rem' />
							<span className='sr-only'>복사</span>
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>{`${src}`}</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</li>
	);
});
ImageCardItem.displayName = 'ImageCardItem';

export default ImageCardItem;
