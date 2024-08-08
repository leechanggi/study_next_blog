// @index('./**/index.{ts,tsx}', f => `export { default as ${f.path.split('/').reverse()[1]} } from '${f.path.replace(/\/index$/, '')}';`)
export { default as Button } from './Atoms/Button';
export { default as Input } from './Atoms/Input';
export { default as Label } from './Atoms/Label';
export { default as Table } from './Atoms/Table';
export { default as Textarea } from './Atoms/Textarea';
export { default as Accordion } from './Molecules/Accordion';
export { default as AlertDialog } from './Molecules/AlertDialog';
export { default as Card } from './Molecules/Card';
export { default as DarkModeToggle } from './Molecules/DarkModeToggle';
export { default as DataTable } from './Molecules/DataTable';
export { default as Dialog } from './Molecules/Dialog';
export { default as Form } from './Molecules/Form';
export { default as AdminAside } from './Organisms/AdminAside';
export { default as AdminChart } from './Organisms/AdminChart';
export { default as Board } from './Organisms/Board';
export { default as BoardItem } from './Organisms/BoardItem';
export { default as DialogContact } from './Organisms/DialogContact';
export { default as FormSearch } from './Organisms/FormSearch';
export { default as InfiniteAside } from './Organisms/InfiniteAside';
export { default as InfiniteTags } from './Organisms/InfiniteTags';
export { default as Markdown } from './Organisms/Markdown';
export { default as PostNavigator } from './Organisms/PostNavigator';
export { default as Footer } from './Templates/Footer';
export { default as Header } from './Templates/Header';
export { default as Main } from './Templates/Main';
export { default as ProviderWrapper } from './Templates/ProviderWrapper';
// @endindex
