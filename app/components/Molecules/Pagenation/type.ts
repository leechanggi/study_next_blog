import { ButtonElement, ButtonProps } from '../../Atoms/Button/type';

type PaginationRootElement = HTMLElement;
type PaginationRootProps = React.HTMLAttributes<HTMLElement>;

type PaginationContentElement = HTMLUListElement;
type PaginationContentProps = React.ComponentProps<'ul'>;

type PaginationItemElement = HTMLLIElement;
type PaginationItemProps = React.ComponentProps<'li'>;

type PaginationLinkElement = ButtonElement;
type PaginationLinkProps = {
	href: URL;
	isActive?: boolean;
} & Omit<ButtonProps, 'asChild'>;

type PaginationPreviousElement = PaginationLinkElement;
type PaginationPreviousProps = Omit<PaginationLinkProps, 'children'>;

type PaginationNextElement = PaginationLinkElement;
type PaginationNextProps = Omit<PaginationLinkProps, 'children'>;

type PaginationEllipsisElement = HTMLSpanElement;
type PaginationEllipsisProps = React.ComponentProps<'span'>;

export type {
	PaginationRootElement,
	PaginationRootProps,
	PaginationContentElement,
	PaginationContentProps,
	PaginationItemElement,
	PaginationItemProps,
	PaginationLinkElement,
	PaginationLinkProps,
	PaginationPreviousElement,
	PaginationPreviousProps,
	PaginationNextElement,
	PaginationNextProps,
	PaginationEllipsisElement,
	PaginationEllipsisProps,
};
